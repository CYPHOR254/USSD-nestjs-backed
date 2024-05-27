import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUssdConnDto } from './dto/create-ussd.dto';
import { UpdateUssdDto } from './dto/update-ussd.dto';
import { ConnectRedisDto } from './dto/connect-redis.dto';
import Redis from 'ioredis';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateRedisDbMngt } from './dto/create-redis-db-mngt.dto';
import { editRedisdbmngt } from './dto/edit-redis-db-mngt.dto';
import { boilerplate as defaultBoilerplate } from '../../public/boilerplate'; // Adjust the path if necessary


@Injectable()
export class UssdService {
  private redisClient: Redis;

  constructor(private prisma: PrismaService) {}

  async connectToRedis(connectRedisDto: ConnectRedisDto) {
    const { ip, port, db, password, userId } = connectRedisDto;

    try {
      const payload = { ip, port, db, userId };
      // const isAllowed = this.checkUserId(payload);

      this.redisClient = new Redis({
        host: ip,
        port: port,
        db: db,
        password: password,
        retryStrategy: (times) => {
          return Math.min(times * 50, 2000);
        },
      });

      await new Promise((resolve, reject) => {
        this.redisClient.on('ready', async () => {
          resolve('Connected to Redis');
        });

        this.redisClient.on('error', async (err) => {
          reject(err);
        });
      });

      const status = await this.redisClient.status;
      const configs = await this.listUssdConfigs('');
      return {
        status,
        configs,
      };
    } catch (error) {
      console.error(error);
      
      return error;
    }
  }

  async createRedisdbMngt(dto: CreateRedisDbMngt) {
    const { userId, port, ip, db, allowedUsers } = dto;

    const redisdbRecords = await this.prisma.redis_db_mngt.findMany({
      where: {
        redisIP: ip,
        redisPort: port,
        redisdb: db,
        createdBy: userId,
      },
    });
    console.log(redisdbRecords);
    if (redisdbRecords.length > 0) {
      throw new BadRequestException(
        `Redis IP, redis port and redis db already exists`,
      );
    }

    await this.prisma.redis_db_mngt.create({
      data: {
        redisIP: ip,
        redisPort: port,
        redisdb: db,
        allowedUserId: JSON.stringify(allowedUsers),
        updatedBy: userId,
        createdBy: userId,
      },
    });

    return {
      message: 'Created Redis database successfully',
      respCode: '00',
    };
  }

  async editRedisdbmngt(editredisdto: editRedisdbmngt) {
    const { id, ip, port, db, allowedUsers, userId } = editredisdto;

    const redisdbRecord = await this.prisma.redis_db_mngt.findUnique({
      where: { id },
    });
    console.log(redisdbRecord);
    if (!redisdbRecord) {
      throw new BadRequestException(`Redis database with id ${id} not found.`);
    }

    const existingRedisdbRecords = await this.prisma.redis_db_mngt.findMany({
      where: {
        redisIP: ip,
        redisPort: port,
        redisdb: db,
        createdBy: userId,
      },
    });
    // console.log(existingRedisdbRecords)
    // if (existingRedisdbRecords.length > 0) {
    //   throw new BadRequestException(
    //     `Records with given parameters already exists`,
    //   );
    // }

    if (redisdbRecord.createdBy !== userId) {
      throw new BadRequestException(`User cannot edit this record`);
    }

    await this.prisma.redis_db_mngt.update({
      where: { id },
      data: {
        redisIP: ip,
        redisPort: port,
        redisdb: db,
        allowedUserId: JSON.stringify(allowedUsers),
      },
    });

    return {
      message: 'Redis records updated successfully',
      respCode: '00',
    };
  }

  async checkUserId(payload): Promise<boolean> {
    try {
      const { ip, port, db, userId } = payload;
      const userCreated = await this.prisma.sys_users.findUnique({
        where: { id: userId },
      });
      const adminId = userCreated.createdBy;
      console.log(adminId);
      if (adminId == null) {
        return true;
      }

      const existingRedisdbMngtRecords =
        await this.prisma.redis_db_mngt.findMany({
          where: {
            redisIP: ip,
            redisPort: port,
            redisdb: db,
            createdBy: adminId,
          },
        });
      console.log(existingRedisdbMngtRecords);
      if (!existingRedisdbMngtRecords) {
        throw new BadRequestException(
          `Records given do not match with the user's records`,
        );
      }

      if (existingRedisdbMngtRecords.length <= 0) {
        return true;
      }

      for (const recordsExisting of existingRedisdbMngtRecords) {
        if (recordsExisting['allowedUserId'].includes(JSON.stringify(userId))) {
          return true;
        } else {
          return false;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async listRedisdbMngt(payload: any) {
    const { adminId } = payload;
    const findAllRedisdbMngt = await this.prisma.redis_db_mngt.findMany({
      where: {
        createdBy: adminId,
      },
    });

    return {
      findAllRedisdbMngt,
      message: 'Successful',
      respCode: '00',
    };
  }

  async deleteRedisdbMngt(payload: any) {
    const { id } = payload;

    await this.prisma.redis_db_mngt.delete({
      where: {
        id: id,
      },
    });

    return {
      message: 'Redis db management deleted successfully',
      respCode: '00',
    };
  }

  async listUssdConfigs(searchString: string) {
    const str = searchString ? searchString : '*:config:config';
    const configs = await this.redisClient.keys(str);

    const formattedConfigs = configs.map((config) => {
      const formattedKey = config.replace(':config:config', '');
      return formattedKey;
    });

    console.log(formattedConfigs);
    return formattedConfigs;
  }

  async fetchConfigsFromRedis(
    appName: string,
  ): Promise<Record<string, string>> {
    try {
      console.log(this.redisClient.options.db);

      const configsInUSSD: string[] = await this.getUSSDConfigs(
        this.redisClient,
        this.redisClient.options.db,
        `${appName}:config:*`,
      );

      const result: Record<string, any> = {};

      for (const config of configsInUSSD) {
        const configName = config.split(':')[2].toLowerCase();
        const dataFromRedis = await this.redisClient.hgetall(config);
        const keys = Object.keys(dataFromRedis);
        const tempResult: Record<string, any> = {};

        for (const key of keys) {
          try {
            let strToJson =
              typeof dataFromRedis[key] !== 'string'
                ? JSON.parse(dataFromRedis[key])
                : dataFromRedis[key];

            if (typeof strToJson === 'string') {
              strToJson = JSON.parse(strToJson);
            }

            tempResult[key] = strToJson;
          } catch (error) {
            console.error(error);
            throw new Error(`Failed to parse data for key: ${key}`);
          }
        }

        result[configName] = tempResult;
      }

      return result;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        'Failed to fetch configurations from Redis',
      );
    }
  }

  async getUSSDConfigs(
    client,
    db: number,
    searchString?: string,
  ): Promise<string[]> {
    try {
      await client.select(db);

      const str = searchString ? searchString : '*:config:*';

      const configs = await client.keys(str);

      const USSDAppNames: Set<string> = new Set<string>();

      for (const config of configs) {
        const temp = config.split(':');
        const app_name = temp[0];
        USSDAppNames.add(app_name);
      }

      console.log(configs, USSDAppNames);

      if (!!searchString) {
        return configs;
      }

      return Array.from(USSDAppNames);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async publishUssdConfigs(payload: Record<string, any>) {
    try {
      const ussdName = payload['appName'];
      const selectedRedisDB = this.redisClient.options.db;

      const configArray = await this.getUSSDConfigs(
        this.redisClient,
        selectedRedisDB,
        `${ussdName}:config*`,
      );

      // console.log(configArray);
      // console.log(`${ussdName}:config*`);

      // configArray.map(async (config) => {
      //   let name2 = config;
      //   console.log(config, name2);

      //   let copyStatus = await redisClient?.COPY(config, name2);

      //   if (copyStatus) {
      //     logger.info(`Copied ${config} to ${name2}`);
      //   } else {
      //     logger.error(`Failed to copy ${config}`);
      //   }
      // });

      // console.log(req.body.data);

      const reqBodyKeys = Object.keys(payload['data']);

      reqBodyKeys.map((key: string) => {
        const objKeys = Object.keys(payload['data'][key]);

        objKeys.map(async (objKey) => {
          const saveToRedisFunc = await this.redisClient?.hset(
            `${ussdName}:config:${key}`,
            objKey,
            JSON.stringify(payload.data[key][objKey]),
          );

          if (!!saveToRedisFunc) {
            console.log('Changed');
          }
        });
      });
      console.log(selectedRedisDB, 'done');

      return { msg: 'done' };
    } catch (error) {
      console.error(error);
    }
  }

  async disconnectFromRedis() {
    try {
      await this.redisClient.disconnect();
      return { msg: 'Disconnected from Redis' };
    } catch (error) {
      return { msg: 'No active Redis Connection found' };
    }
  }

  async createConn(dto: CreateUssdConnDto) {
    const { email, port, ip } = dto;

    // Check if the email exists in the sys_users table
    const existingUser = await this.prisma.sys_users.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (!existingUser) {
      throw new BadRequestException('Email does not exist');
    }

    // Get all RedisConn records for this user's email
    const redisConns = await this.prisma.redis_conn.findMany({
      where: { userEmail: email.toLowerCase() },
    });
    for (const records of redisConns) {
      if (records['redisPort'] == port && records['redisIP'] == ip) {
        throw new BadRequestException(`Port and IP already exist for ${email}`);
      }
    }

    await this.prisma.redis_conn.create({
      data: {
        userEmail: email,
        redisPort: port,
        redisIP: ip,
        isActive: true,
      },
    });

    // // Extract the unique IP and port combinations from the RedisConn records
    // const uniqueConns = Array.from(
    //   new Set(redisConns.map((conn) => `${conn.redisIP}:${conn.redisPort}`))
    // )

    return {
      message: 'Connection Created',
      respCode: '00',
    };
  }

  async listConn(payload: Record<string, string>) {
    const { email } = payload;

    // Get all RedisConn records for this user's email
    const redisConns = await this.prisma.redis_conn.findMany({
      where: { userEmail: email.toLowerCase() },
    });

    return {
      connections: redisConns,
      message: 'Success',
      respCode: '00',
    };
  }

  async updateConn(dto: UpdateUssdDto) {
    const { id, ip, port, email } = dto;
    console.log(dto);

    const redisConns = await this.prisma.redis_conn.findMany({
      where: { userEmail: email.toLowerCase() },
    });
    for (const records of redisConns) {
      if (records['redisPort'] == port && records['redisIP'] == ip) {
        throw new BadRequestException(`Port and IP already exist for ${email}`);
      }
    }

    try {
      await this.prisma.redis_conn.update({
        where: { id },
        data: {
          redisIP: ip,
          redisPort: port,
        },
      });

      return {
        message: 'Connection updated successfully',
        respCode: '00',
      };
    } catch (error) {
      return { message: `Could not update connection: ${error.message}` };
    }
  }

  async deleteConn(payload: any) {
    const { userEmail, userId } = payload;

    // Check if the email exists in the sys_users table
    const existingUser = await this.prisma.sys_users.findUnique({
      where: { email: userEmail.toLowerCase() },
    });
    if (!existingUser) {
      throw new BadRequestException('Email does not exist');
    }

    await this.prisma.redis_conn.delete({
      where: {
        id: userId,
      },
    });

    return {
      message: 'Connection deleted successfully',
      respCode: '00',
    };
  }

  async createHostedUrl(payload: any) {
    const { userEmail, port, ip, protocol, params } = payload;

    // Check if the email exists in the sys_users table
    const existingUser = await this.prisma.sys_users.findUnique({
      where: { email: userEmail.toLowerCase() },
    });
    if (!existingUser) {
      throw new BadRequestException('Email does not exist');
    }

    // Get all RedisConn records for this user's email
    const existingHostedUrls = await this.prisma.hosted_ussd_urls.findMany({
      where: { userEmail: userEmail.toLowerCase() },
    });

    for (const url of existingHostedUrls) {
      if (
        url['urlIP'] == ip &&
        url['urlPort'] == port &&
        url['protocol'] == protocol &&
        url['params'] == params
      ) {
        throw new BadRequestException(
          `Hosted URL with given details already exist for ${userEmail}`,
        );
      }
    }

    await this.prisma.hosted_ussd_urls.create({
      data: {
        userEmail: userEmail,
        urlIP: ip,
        urlPort: port,
        protocol: protocol,
        params: params,
      },
    });

    return {
      message: 'Hosted URL Saved successfully',
      respCode: '00',
    };
  }
  async editHostedUrl(payload: any) {
    const { userEmail, urlId, port, ip, protocol, params } = payload;

    // Check if the email exists in the sys_users table
    const existingUser = await this.prisma.sys_users.findUnique({
      where: { email: userEmail.toLowerCase() },
    });
    if (!existingUser) {
      throw new BadRequestException('Email does not exist');
    }

    await this.prisma.hosted_ussd_urls.update({
      where: { id: urlId },
      data: {
        urlIP: ip,
        urlPort: port,
        protocol: protocol,
        params: params,
      },
    });

    return {
      message: 'Hosted URL updated successfully',
      respCode: '00',
    };
  }
  async listHostedUrls(payload: any) {
    const { userEmail } = payload;
  
    if (!userEmail) {
      throw new BadRequestException('User email is required');
    }
  
    const emailLowerCase = userEmail.toLowerCase();
  
    // Check if the email exists in the sys_users table
    const existingUser = await this.prisma.sys_users.findUnique({
      where: { email: emailLowerCase },
    });
    if (!existingUser) {
      throw new BadRequestException('Email does not exist');
    }
  
    // Get all RedisConn records for this user's email
    const existingHostedUrls = await this.prisma.hosted_ussd_urls.findMany({
      where: { userEmail: emailLowerCase },
    });
  
    return {
      message: 'Hosted URLs fetched successfully',
      data: existingHostedUrls,
      respCode: '00',
    };
  }
  async deleteHostedUrl(payload: any) {
    const { userEmail, urlId } = payload;

    // Check if the email exists in the sys_users table
    const existingUser = await this.prisma.sys_users.findUnique({
      where: { email: userEmail.toLowerCase() },
    });
    if (!existingUser) {
      throw new BadRequestException('Email does not exist');
    }

    await this.prisma.hosted_ussd_urls.delete({
      where: { id: urlId },
    });

    return {
      message: 'Hosted URL deleted successfully',
      respCode: '00',
    };
  }

  async createNewUssdConfig(payload: Record<string, string | number>) {
    // Retrieve all existing USSD configurations
    let configs = await this.redisClient.keys('*:config:config');
    const ussdName: string = payload['ussdName'] as string;
    console.log(ussdName);

    // Normalize config names by removing the prefix
    configs = configs.map((config) => config.replace(':config:config', ''));

    // Check if the USSD name already exists
    configs.forEach((config) => {
      const name = config.split('-ussd')[0];
      if (ussdName === name) {
        console.log(name, ussdName);
        throw new BadRequestException(
          'Ussd with given name already exists in the given DB',
        );
      }
    });

    // Clone the imported boilerplate to avoid mutating the original object
    const boilerplate = JSON.parse(JSON.stringify(defaultBoilerplate));

    // Update boilerplate with specific USSD name details
    boilerplate.config['app-name'] = ussdName.concat('-ussd@0.0.1');
    boilerplate.config['meta-data']['app-name'] = ussdName.concat('-ussd@0.0.1');
    boilerplate.config['meta-data']['app-contact-name'] = ussdName;
    boilerplate.config['meta-data']['app-description'] = ussdName.toUpperCase().concat(' USSD');
    boilerplate.config['meta-data']['app-client'] = ussdName;
    boilerplate.api['mb-api']['meta-data']['appName'] = ussdName.toUpperCase().concat(' USSD');
    boilerplate.api['mb-api']['meta-data']['currency'] = 'KES';
    boilerplate.api['mb-api']['meta-data']['country-code'] = 'KE';

    // Save the new configuration to Redis
    const reqBodyKeys = Object.keys(boilerplate);

    for (const key of reqBodyKeys) {
      const objKeys = Object.keys(boilerplate[key]);

      for (const objKey of objKeys) {
        const saveToRedisFunc = await this.redisClient.hset(
          `${ussdName.concat('-ussd@0.0.1')}:config:${key}`,
          objKey,
          JSON.stringify(boilerplate[key][objKey]),
        );

        if (!!saveToRedisFunc) {
          console.log('Saved - ', objKey);
        }
      }
    }

    return {
      respCode: '00',
      msg: `${ussdName.concat('-ussd@0.0.1')} successfully created`,
    };
  }
}

