  // async createNewUssdConfig(payload: Record<string, string | number>) {
  //   let configs = await this.redisClient.keys('*:config:config');
  //   const ussdName: string = payload['ussdName'] as string;
  //   console.log(ussdName);

  //   configs = configs.map((config) => config.replace(':config:config', ''));

  //   configs.forEach((config) => {
  //     const name = config.split('-ussd')[0];
  //     if (ussdName === name) {
  //       console.log(name, ussdName);
  //       throw new BadRequestException(
  //         'Ussd with given name already exists in the given DB',
  //       );
  //     }
  //   });

  //   const boilerplate = {
  //     prompts: {
  //       'account-blocked': {
  //         name: 'account-blocked',
  //       },
  //       'funds-transfer-wallet-to-savings': [
  //         {
  //           type: 'input',
  //           name: 'ft-wallet-to-savings-credit-account',
  //           'save-as': 'fundsTransferCreditAccount',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'ft-wallet-to-savings-credit-account-error',
  //           previous: 'funds-transfer-other-accounts-page',
  //           next: 'ft-wallet-to-savings-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'ft-wallet-to-savings-amount',
  //           'save-as': 'fundsTransferAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=10',
  //             },
  //           ],
  //           'format-as': 'mobile-number',
  //           error: 'ft-wallet-to-savings-amount-error',
  //           previous: 'ft-wallet-to-savings-credit-account',
  //           next: 'ft-wallet-to-savings-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-wallet-to-savings-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           error: 'ft-wallet-to-savings-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'funds-transfer-wallet-to-savings',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'ft-wallet-to-savings-amount',
  //         },
  //       ],
  //       parking: [
  //         {
  //           type: 'select',
  //           name: 'parking-debit-account',
  //           'save-as': 'billPaymentDebitAccount',
  //           options: 'savings-accounts',
  //           'options-error': 'parking-debit-account-options-error',
  //           error: 'parking-debit-account-error',
  //           previous: 'bill-payment-page',
  //           next: 'parking-credit-account',
  //         },
  //         {
  //           type: 'input',
  //           name: 'parking-credit-account',
  //           'save-as': 'billPaymentCreditAccount',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'parking-credit-account-error',
  //           previous: 'parking-debit-account',
  //           next: 'parking-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'parking-amount',
  //           'save-as': 'billPaymentAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=1',
  //             },
  //           ],
  //           error: 'parking-amount-error',
  //           previous: 'parking-credit-account',
  //           next: 'parking-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'parking-confirm',
  //           options: 'confirm-options',
  //           charges: true,
  //           error: 'parking-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'parking-bill-payment',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'parking-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'parking-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'parking-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //         {
  //           type: 'select',
  //           name: 'parking-member-types-options-error',
  //           options: 'yes-no-options',
  //           error: 'parking-member-types-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'bill-payment-page',
  //         },
  //         {
  //           type: 'select',
  //           name: 'nhif-presentment-error',
  //           options: 'yes-no-options',
  //           error: 'nhif-presentment-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //         {
  //           type: 'select',
  //           name: 'nhif-presentment-amount-error',
  //           options: 'yes-no-options',
  //           error: 'nhif-presentment-amount-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //       ],
  //       'via-agent': [
  //         {
  //           type: 'input',
  //           name: 'via-agent-credit-account',
  //           'save-as': 'agentCode',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'via-agent-credit-account-error',
  //           previous: 'cardless-withdraw-page',
  //           next: 'via-agent-debit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'via-agent-debit-account',
  //           'save-as': 'cardlessDebitAccount',
  //           options: 'customer-accounts',
  //           error: 'via-agent-debit-account-error',
  //           previous: 'cardless-withdraw-page',
  //           next: 'via-agent-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'via-agent-amount',
  //           'save-as': 'cardlessWithdrawAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               arguments: 'min=1',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'via-agent-amount-error',
  //           previous: 'via-agent-debit-account',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'fetch-agent-details',
  //             success: 'via-agent-confirm',
  //             error: 'via-agent-confirm',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'data[0].BUSINESS_NAME',
  //                 'save-as': 'agentBusinessName',
  //               },
  //               {
  //                 path: 'data[0].FLOATACCOUNT',
  //                 'save-as': 'agentFloatAccount',
  //               },
  //               {
  //                 path: 'data[0].CHARGES',
  //                 'save-as': 'agentCodeCharges',
  //                 'format-as': 'agentCodeCharges',
  //               },
  //               {
  //                 path: 'data[0].OUTLET',
  //                 'save-as': 'agentOutlet',
  //               },
  //               {
  //                 path: 'data[0].BUSINESSMOBILE',
  //                 'save-as': 'agentMobile',
  //               },
  //               {
  //                 path: 'data[0].AGENTCODE_ALIAS',
  //                 'save-as': 'agentAlias',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'select',
  //           name: 'via-agent-confirm',
  //           options: 'confirm-options',
  //           charges: true,
  //           previous: 'via-agent-amount',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'cardless-withdrawal-agent',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'via-agent-confirm-error',
  //         },
  //         {
  //           type: 'select',
  //           name: 'fetch-agent-details-error',
  //           options: 'yes-no-options',
  //           error: 'fetch-agent-details-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //       ],
  //       gotv: [
  //         {
  //           type: 'select',
  //           name: 'gotv-debit-account',
  //           'save-as': 'billPaymentDebitAccount',
  //           options: 'fosa-accounts',
  //           'options-error': 'gotv-debit-account-options-error',
  //           error: 'gotv-debit-account-error',
  //           previous: 'bill-payment-page',
  //           next: 'gotv-credit-account',
  //         },
  //         {
  //           type: 'input',
  //           name: 'gotv-credit-account',
  //           'save-as': 'billPaymentCreditAccount',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'gotv-credit-account-error',
  //           previous: 'bill-payment-page',
  //           next: 'gotv-confirm',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'gotvPresentment',
  //             success: 'gotv-confirm',
  //             error: 'gotv-presentment-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.response.DueAmount',
  //                 'save-as': 'billPaymentAmount',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'input',
  //           name: 'gotv-amount',
  //           'save-as': 'billPaymentAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=200',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'gotv-amount-error',
  //           previous: 'gotv-debit-account',
  //           next: 'gotv-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'gotv-confirm',
  //           options: 'confirm-options',
  //           error: 'gotv-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'gotvPayment',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'gotv-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'gotv-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'gotv-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'gotv-credit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'gotv-presentment-error',
  //           options: 'yes-no-options',
  //           error: 'gotv-presentment-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //       ],
  //       'sacco-linking-success': {
  //         type: 'alert',
  //         name: 'sacco-linking-success',
  //       },
  //       'mahitaji-advance': [
  //         {
  //           type: 'input',
  //           name: 'mahitaji-advance-amount',
  //           'save-as': 'mahitaji-advance-amount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               arguments: 'min = 10',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'mahitaji-advance-amount-error',
  //           previous: 'client-page',
  //           next: 'mahitaji-advance-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'mahitaji-advance-confirm',
  //           options: 'confirm-options',
  //           previous: 'mahitaji-advance-amount',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             api: 'mock',
  //             route: 'mahitajiadvance',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'mahitaji-advance-confirm-error',
  //         },
  //       ],
  //       'replace-atm': [
  //         {
  //           type: 'select',
  //           name: 'replace-atm-account',
  //           'save-as': 'replaceAtmAccount',
  //           options: 'customer-accounts',
  //           'options-error': 'replace-atm-account-options-error',
  //           'format-as': '',
  //           error: 'replace-atm-account-error',
  //           previous: 'atm-cards-page',
  //           next: 'replace-atm-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'request-atm-account-types',
  //           'save-as': 'requestAtmType',
  //           options: [
  //             {
  //               label: 'Classic Card',
  //               value: 'Classic Card',
  //             },
  //             {
  //               label: 'Platinum Card',
  //               value: 'Platinum Card',
  //             },
  //           ],
  //           error: 'request-atm-account-types-error',
  //           previous: 'request-atm-account',
  //           next: 'request-atm-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'replace-atm-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           error: 'replace-atm-confirm-error',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'replace-atm-card',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'replace-atm-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'replace-atm-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'replace-atm-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'replace-atm-account',
  //         },
  //       ],
  //       'sacco-linking': [
  //         {
  //           type: 'input',
  //           name: 'sacco-linking-account',
  //           'save-as': 'saccoLinkAccount',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'sacco-linking-account-error',
  //           previous: 'customer-requests-page',
  //           next: 'sacco-linking-confirm',
  //         },
  //         {
  //           type: 'input',
  //           name: 'sacco-linking-id',
  //           'save-as': 'accountLinkingId',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'sacco-linking-id-error',
  //           previous: 'sacco-linking-account',
  //           next: 'sacco-linking-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'sacco-linking-confirm',
  //           charges: true,
  //           options: 'confirm-options',
  //           error: 'sacco-linking-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'sacco-linking',
  //             success: 'sacco-linking-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'sacco-linking-account',
  //         },
  //       ],
  //       'wrong-login': {
  //         type: 'input',
  //         name: 'wrong-login',
  //         'save-as': 'pin',
  //         next: 'client-page',
  //         validation: [
  //           {
  //             name: 'isValidPin',
  //             type: 'custom',
  //           },
  //         ],
  //         errors: ['invalid-pin-error', 'wrong-login'],
  //         action: 'update-parameters',
  //         'external-fetch': {
  //           route: 'login',
  //           success: 'client-page',
  //           'success-handler': {
  //             handler: 'reset_pin_trials',
  //             argument: 'pin-trials-remaining',
  //             'save-as': 'pin-trials-remaining',
  //           },
  //           error: 'wrong-login',
  //           'error-handler': {
  //             handler: 'decrement_pin_trials',
  //             argument: 'pin-trials-remaining',
  //             'save-as': 'pin-trials-remaining',
  //             threshold: '0',
  //             'redirect-on-threshold': 'account-blocked',
  //             'threshold-handler': 'block-account',
  //           },
  //           cache: true,
  //           'cache-path': 'account-details',
  //           'cache-parameters': [
  //             {
  //               path: 'data.transaction_details.access_token',
  //               'save-as': 'access_token',
  //             },
  //             {
  //               path: 'data.transaction_details.user.accounts[0].account_number',
  //               'save-as': 'customer-accounts',
  //               'format-as': 'walletAccount',
  //             },
  //           ],
  //         },
  //         'on-cancel': 'logout',
  //       },
  //       'loan-limit': [
  //         {
  //           type: 'select',
  //           name: 'loan-limit-account',
  //           'save-as': 'debitAccount',
  //           options: 'customer-accounts',
  //           'options-template': 'account-options-template',
  //           error: 'loan-limit-account-error',
  //           previous: 'loans-page',
  //           next: 'loan-limit-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'loan-limit-confirm',
  //           options: 'confirm-options',
  //           previous: 'client-page',
  //           charges: true,
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'loan-limit',
  //             success: 'loan-limit-success',
  //             error: 'loan-limit-success',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.response.loan_limit',
  //                 'save-as': 'loan-limit',
  //               },
  //             ],
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'loan-limit-confirm-error',
  //         },
  //         {
  //           type: 'select',
  //           name: 'balance-account-fosa-options-error',
  //           options: 'yes-no-options',
  //           error: 'balance-account-fosa-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'balance-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'balance-account-loan-options-error',
  //           options: 'yes-no-options',
  //           error: 'balance-account-loan-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'balance-account',
  //         },
  //       ],
  //       'funds-transfer-wallet-to-other-wallet': [
  //         {
  //           type: 'select',
  //           name: 'ft-wallet-to-other-wallet-debit-account',
  //           'save-as': 'fundsTransferDebitAccount',
  //           options: 'customer-accounts',
  //           'options-template': 'account-options-template',
  //           'options-error':
  //             'ft-wallet-to-other-wallet-debit-account-options-error',
  //           error: 'ft-wallet-to-other-wallet-debit-account-error',
  //           previous: 'funds-transfer-page',
  //           next: 'ft-wallet-to-other-wallet-other-number',
  //         },
  //         {
  //           type: 'input',
  //           name: 'ft-wallet-to-other-wallet-other-number',
  //           'save-as': 'billerRefAccount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=10',
  //             },
  //           ],
  //           'format-as': 'mobile-number',
  //           error: 'ft-wallet-to-other-wallet-other-number-error',
  //           previous: 'ft-wallet-to-other-wallet-debit-account',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'account-lookup-presentment',
  //             success: 'ft-wallet-to-other-wallet-amount',
  //             error: 'api-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.transaction_details.account_number',
  //                 'save-as': 'fundsTransferCreditAccount',
  //               },
  //               {
  //                 path: 'data.transaction_details.customer_names',
  //                 'save-as': 'customerName',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'input',
  //           name: 'ft-wallet-to-other-wallet-amount',
  //           'save-as': 'fundsTransferAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=10',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'ft-wallet-to-other-wallet-amount-error',
  //           previous: 'ft-wallet-to-other-wallet-other-number',
  //           next: 'ft-wallet-to-other-wallet-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-wallet-to-other-wallet-confirm',
  //           'show-if': {
  //             param: 'fundsTransferDebitAccount',
  //             'is-not-equal-to': 'fundsTransferCreditAccount',
  //             'on-error': 'ft-same-account-error',
  //           },
  //           options: 'confirm-options',
  //           charges: true,
  //           error: 'ft-wallet-to-other-wallet-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'funds-transfer-to-other-wallet',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'ft-wallet-to-other-wallet-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-wallet-to-other-wallet-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error:
  //             'ft-wallet-to-other-wallet-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'funds-transfer-page',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-wallet-to-other-wallet-credit-account-options-error',
  //           options: 'yes-no-options',
  //           error:
  //             'ft-wallet-to-other-wallet-credit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'funds-transfer-page',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-same-account-error',
  //           options: 'yes-no-options',
  //           error: 'ft-same-account-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'ft-wallet-to-other-wallet-credit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-wallet-to-other-wallet-credit-account',
  //           'save-as': 'fundsTransferCreditAccount',
  //           'ignore-meta': ['working-currency'],
  //           options: [
  //             {
  //               label: 'TA2459012000004',
  //               value: 'TA2459012000004',
  //             },
  //           ],
  //           'options-error':
  //             'ft-wallet-to-other-wallet-credit-account-options-error',
  //           error: 'ft-wallet-to-other-wallet-credit-account-error',
  //           previous: 'ft-wallet-to-other-wallet-debit-account',
  //           next: 'ft-wallet-to-other-wallet-amount',
  //         },
  //       ],
  //       'loan-product-no-found-error': {
  //         type: 'select',
  //         name: 'loan-product-no-found-error',
  //         options: 'yes-no-options',
  //         error: 'loan-product-no-found-error-error',
  //         action: 'navigate',
  //         'on-accept': 'client-page',
  //         'on-cancel': 'logout',
  //       },
  //       'zuku-tv': [
  //         {
  //           type: 'input',
  //           name: 'zuku-tv-credit-account',
  //           'save-as': 'billPaymentCreditAccount',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'zuku-tv-credit-account-error',
  //           previous: 'bill-payment-page',
  //           next: 'zuku-tv-debit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'zuku-tv-debit-account',
  //           'save-as': 'billPaymentDebitAccount',
  //           options: 'fosa-accounts',
  //           'options-error': 'zuku-tv-debit-account-options-error',
  //           error: 'zuku-tv-debit-account-error',
  //           previous: 'zuku-tv-credit-account',
  //           next: 'zuku-tv-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'zuku-tv-amount',
  //           'save-as': 'billPaymentAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=200',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'zuku-tv-amount-error',
  //           previous: 'zuku-tv-debit-account',
  //           next: 'zuku-tv-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'zuku-tv-confirm',
  //           options: 'confirm-options',
  //           error: 'zuku-tv-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'accessKenyaPayment',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'zuku-tv-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'zuku-tv-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'zuku-tv-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'zuku-tv-credit-account',
  //         },
  //       ],
  //       fullstatement: [
  //         {
  //           type: 'select',
  //           name: 'fullstatement-account-savings',
  //           'save-as': 'fullstatementDebitAccount',
  //           'show-if': {
  //             param: 'email',
  //             'validates-to': 'isEmail',
  //             'on-error': 'fullstatement-provide-email',
  //           },
  //           options: 'savings-accounts',
  //           'options-error': 'fullstatement-account-savings-options-error',
  //           error: 'fullstatement-account-savings-error',
  //           previous: 'client-apge',
  //           next: 'fullstatement-period',
  //         },
  //         {
  //           type: 'input',
  //           name: 'fullstatement-provide-email',
  //           'save-as': 'email',
  //           skip: true,
  //           validation: [
  //             {
  //               name: 'isEmail',
  //               type: 'custom',
  //             },
  //           ],
  //           error: 'fullstatement-provide-email-error',
  //           previous: 'client-page',
  //           next: 'fullstatement-provide-email-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'fullstatement-provide-email-account',
  //           'save-as': 'fullstatementDebitAccount',
  //           options: 'customer-accounts',
  //           'options-template': 'account-options-template',
  //           'options-error': 'fullstatement-account-savings-options-error',
  //           error: 'fullstatement-provide-email-account-error',
  //           previous: 'fullstatement-provide-email',
  //           next: 'fullstatement-period',
  //         },
  //         {
  //           type: 'select',
  //           name: 'fullstatement-period',
  //           'save-as': 'fullstatementPeriod',
  //           options: [
  //             {
  //               label: 'Last Month',
  //               value: '1',
  //               'option-value-transform': {
  //                 name: 'moment-date-range',
  //                 format: 'DD-MM-YYYY',
  //               },
  //               'jump-to': 'fullstatement-confirm',
  //             },
  //             {
  //               label: 'Last 3 Months',
  //               value: '3',
  //               'option-value-transform': {
  //                 name: 'moment-date-range',
  //                 format: 'DD-MM-YYYY',
  //               },
  //               'jump-to': 'fullstatement-confirm',
  //             },
  //             {
  //               label: 'last 6 Months',
  //               value: '6',
  //               'option-value-transform': {
  //                 name: 'moment-date-range',
  //                 format: 'DD-MM-YYYY',
  //               },
  //               'jump-to': 'fullstatement-confirm',
  //             },
  //             {
  //               label: 'Past Year',
  //               'option-value-transform': {
  //                 name: 'moment-date-range',
  //                 format: 'DD-MM-YYYY',
  //               },
  //               value: '1',
  //               'jump-to': 'fullstatement-confirm',
  //             },
  //           ],
  //           error: 'fullstatement-period-error',
  //           previous: 'fullstatement-account-savings',
  //           next: 'fullstatement-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'fullstatement-confirm',
  //           options: 'confirm-options',
  //           charges: true,
  //           previous: 'fullstatement-period',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'full-statement',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'fullstatement-confirm-error',
  //         },
  //         {
  //           type: 'select',
  //           name: 'fullstatement-account-savings-options-error',
  //           options: 'yes-no-options',
  //           error: 'fullstatement-account-savings-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'fullstatement-account',
  //         },
  //       ],
  //       'mpesa-alert': {
  //         type: 'alert',
  //         name: 'mpesa-show-alert',
  //       },
  //       'funds-transfer-wallet-to-mno': [
  //         {
  //           type: 'input',
  //           name: 'ft-wallet-to-mno-credit-account',
  //           'save-as': 'fundsTransferCreditAccount',
  //           'format-as': 'credit-bank-wallet',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //             {
  //               name: 'matchesLength',
  //               type: 'joi',
  //               arguments: 'length=10',
  //             },
  //           ],
  //           errors: [
  //             'ft-wallet-to-mno-credit-account-error',
  //             'ft-wallet-to-mno-credit-account-error',
  //           ],
  //           previous: 'funds-transfer-other-accounts-page',
  //           next: 'ft-wallet-to-mno-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'ft-wallet-to-mno-amount',
  //           'save-as': 'fundsTransferAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=10',
  //             },
  //           ],
  //           error: 'ft-wallet-to-mno-amount-error',
  //           previous: 'ft-wallet-to-mno-credit-account',
  //           next: 'ft-wallet-to-mno-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-wallet-to-mno-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           error: 'ft-wallet-to-mno-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'funds-transfer-wallet-to-mno',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'ft-wallet-to-mno-amount',
  //         },
  //       ],
  //       'mpesa-b2b': [
  //         {
  //           type: 'select',
  //           name: 'b2b-debit-account',
  //           'save-as': 'debitAccount',
  //           options: 'savings-accounts',
  //           'options-error': 'b2b-debit-account-options-error',
  //           error: 'b2b-debit-account-error',
  //           previous: 'payment-services-page',
  //           next: 'b2b-type',
  //         },
  //         {
  //           type: 'select',
  //           name: 'b2b-type',
  //           options: [
  //             {
  //               label: 'Buy Goods and Services',
  //               'jump-to': 'b2b-till',
  //             },
  //             {
  //               label: 'Pay Bill',
  //               'jump-to': 'b2b-pay-bill',
  //             },
  //           ],
  //           error: 'b2b-type-error',
  //         },
  //         {
  //           type: 'input',
  //           name: 'b2b-till',
  //           'save-as': 'tillnumber',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'b2b-till-error',
  //           previous: 'b2b-type',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'hakikisha-till-presentment',
  //             success: 'b2b-till-amount',
  //             error: 'hakikisha-till-presentment-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'field127',
  //                 'save-as': 'merchantName',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'input',
  //           name: 'b2b-pay-bill',
  //           'save-as': 'paybill',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'b2b-paybill-error',
  //           previous: 'b2b-type',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'hakikisha-paybill-presentment',
  //             success: 'b2b-account',
  //             error: 'hakikisha-paybill-presentment-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'field127',
  //                 'save-as': 'merchantName',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'input',
  //           name: 'b2b-account',
  //           'save-as': 'accountnumber',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'b2b-account-error',
  //           previous: 'b2b-pay-bill',
  //           next: 'b2b-pay-bill-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'b2b-till-amount',
  //           'save-as': 'tillmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               arguments: 'min= 10',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'b2b-till-amount-error',
  //           previous: 'b2b-till',
  //           next: 'b2b-till-confirm',
  //         },
  //         {
  //           type: 'input',
  //           name: 'b2b-pay-bill-amount',
  //           'save-as': 'billmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               arguments: 'min= 10',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'b2b-pay-bill-amount-error',
  //           previous: 'b2b-account',
  //           next: 'b2b-pay-bill-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'b2b-till-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           previous: 'b2b-till-amount',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'buy-goods-and-services',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'b2b-till-confirm-error',
  //         },
  //         {
  //           type: 'select',
  //           name: 'b2b-pay-bill-confirm',
  //           options: 'confirm-options',
  //           charges: true,
  //           previous: 'b2b-pay-bill-amount',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'pay-bill',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'b2b-pay-bill-confirm-error',
  //         },
  //         {
  //           type: 'select',
  //           name: 'b2b-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'b2b-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'withdrawal-page',
  //         },
  //         {
  //           type: 'select',
  //           name: 'hakikisha-till-presentment-error',
  //           options: 'yes-no-options',
  //           error: 'hakikisha-till-presentment-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //         {
  //           type: 'select',
  //           name: 'hakikisha-paybill-presentment-error',
  //           options: 'yes-no-options',
  //           error: 'hakikisha-paybill-presentment-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //       ],
  //       'pin-change-success': {
  //         type: 'alert',
  //         name: 'pin-change-success-alert',
  //       },
  //       login: [
  //         {
  //           type: 'input',
  //           name: 'login',
  //           'save-as': 'pin',
  //           next: 'client-page',
  //           validation: [
  //             {
  //               name: 'matchesLength',
  //               type: 'joi',
  //               arguments: 'length=4',
  //             },
  //           ],
  //           errors: ['invalid-pin-error', 'invalid-pin-length-error'],
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'login',
  //             success: 'client-page',
  //             'success-handler': {
  //               handler: 'reset_pin_trials',
  //               argument: 'pin-trials-remaining',
  //               'save-as': 'pin-trials-remaining',
  //             },
  //             error: 'wrong-login',
  //             'error-handler': {
  //               handler: 'decrement_pin_trials',
  //               argument: 'pin-trials-remaining',
  //               'save-as': 'pin-trials-remaining',
  //             },
  //             cache: true,
  //             'cache-path': 'account-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.access_token',
  //                 'save-as': 'access_token',
  //               },
  //               {
  //                 path: 'data.fullName',
  //                 'save-as': 'fullName',
  //                 'format-as': 'capitalize',
  //               },
  //             ],
  //           },
  //           'on-cancel': 'logout',
  //         },
  //       ],
  //       terms: {
  //         type: 'select',
  //         name: 'terms',
  //         options: 'yes-no-options',
  //         error: 'terms-error',
  //         action: 'navigate',
  //         'on-accept': 'registration-page',
  //         'on-cancel': 'registration-cancel',
  //       },
  //       'buy-airtime': [
  //         {
  //           type: 'select',
  //           name: 'buy-airtime-provider',
  //           'save-as': 'airtimeProvider',
  //           options: [
  //             {
  //               label: 'Safaricom',
  //               value: 'SAFARICOM',
  //             },
  //             {
  //               label: 'Telkom',
  //               value: 'TELKOM',
  //             },
  //             {
  //               label: 'Airtel',
  //               value: 'AIRTEL',
  //             },
  //           ],
  //           error: 'buy-airtime-provider-error',
  //           next: 'buy-airtime-account-type',
  //           previous: 'client-page',
  //         },
  //         {
  //           type: 'select',
  //           name: 'buy-airtime-account-type',
  //           'save-as': 'airtimeCreditAccount',
  //           options: [
  //             {
  //               label: 'My Phone',
  //               value: '__walletAccount',
  //               'jump-to': 'buy-airtime-debit-account',
  //             },
  //             {
  //               label: 'Other Phone',
  //               'jump-to': 'buy-airtime-credit-account',
  //             },
  //           ],
  //           error: 'buy-airtime-account-type-error',
  //           previous: 'buy-airtime-provider',
  //         },
  //         {
  //           type: 'input',
  //           name: 'buy-airtime-credit-account',
  //           'save-as': 'airtimeCreditAccount',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //               arguments: 'min=10',
  //             },
  //           ],
  //           'format-as': 'mobile-number',
  //           error: 'buy-airtime-credit-account-error',
  //           previous: 'buy-airtime-account-type',
  //           next: 'buy-airtime-debit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'buy-airtime-debit-account',
  //           'save-as': 'airtimeDebitAccount',
  //           options: 'customer-accounts',
  //           'options-template': 'account-options-template',
  //           'options-error': 'buy-airtime-debit-account-options-error',
  //           error: 'buy-airtime-debit-account-error',
  //           previous: 'buy-airtime-provider',
  //           next: 'buy-airtime-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'buy-airtime-amount',
  //           'save-as': 'airtimeAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=10',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'buy-airtime-amount-error',
  //           previous: 'buy-airtime-debit-account',
  //           next: 'buy-airtime-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'buy-airtime-confirm',
  //           options: 'confirm-options',
  //           error: 'buy-airtime-confirm-error',
  //           charges: true,
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'buy-airtime',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'buy-airtime-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'buy-airtime-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'buy-airtime-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'balance-account',
  //         },
  //       ],
  //       'loan-balance-success': {
  //         type: 'select',
  //         name: 'loan-balance-success',
  //         options: 'yes-no-options',
  //         error: 'loan-balance-success-error',
  //         action: 'navigate',
  //         'on-accept': 'client-page',
  //         'on-cancel': 'logout',
  //       },
  //       'mpesa-float': [
  //         {
  //           type: 'select',
  //           name: 'float-debit-account',
  //           'save-as': 'debitAccount',
  //           options: 'savings-accounts',
  //           error: 'float-debit-account-error',
  //           previous: 'payment-services-page',
  //           next: 'float-paybill',
  //         },
  //         {
  //           type: 'input',
  //           name: 'float-paybill',
  //           'save-as': 'floatAccount',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'float-paybill-error',
  //           previous: 'float-debit-account',
  //           next: 'float-store-number',
  //         },
  //         {
  //           type: 'input',
  //           name: 'float-store-number',
  //           'save-as': 'storeNmuber',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'float-store-number-error',
  //           previous: 'float-paybill',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'hakikisha-float-presentment',
  //             success: 'float-amount',
  //             error: 'hakikisha-float-presentment-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'field127',
  //                 'save-as': 'merchantName',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'input',
  //           name: 'float-amount',
  //           'save-as': 'floatamount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               arguments: 'min= 10',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'float-amount-error',
  //           previous: 'float-store-number',
  //           next: 'float-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'float-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           previous: 'float-amount',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'buy-mpesa-float',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'float-confirm-error',
  //         },
  //         {
  //           type: 'select',
  //           name: 'hakikisha-float-presentment-error',
  //           options: 'yes-no-options',
  //           error: 'hakikisha-float-presentment-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //       ],
  //       maintenance: {
  //         type: 'alert',
  //         name: 'maintenance',
  //       },
  //       'confirm-cheque': [
  //         {
  //           type: 'select',
  //           name: 'confirm-cheque-account',
  //           'save-as': 'confirmChequeDebitAccount',
  //           options: 'customer-accounts',
  //           'options-error': 'confirm-cheque-account-options-error',
  //           error: 'confirm-cheque-account-error',
  //           previous: 'cheques-page',
  //           next: 'confirm-cheque-number',
  //         },
  //         {
  //           type: 'input',
  //           name: 'confirm-cheque-number',
  //           'save-as': 'chequeNumber',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'confirm-cheque-number-error',
  //           previous: 'confirm-cheque-account',
  //           next: 'confirm-cheque-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'confirm-cheque-amount',
  //           'save-as': 'chequeAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               arguments: 'min=1',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'confirm-cheque-amount-error',
  //           previous: 'confirm-cheque-number',
  //           next: 'confirm-cheque-name',
  //         },
  //         {
  //           type: 'input',
  //           name: 'confirm-cheque-name',
  //           'save-as': 'chequeName',
  //           validation: [
  //             {
  //               name: 'isValidPin',
  //               type: 'custom',
  //             },
  //           ],
  //           error: 'confirm-cheque-name-error',
  //           previous: 'confirm-cheque-amount',
  //           next: 'confirm-cheque-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'confirm-cheque-confirm',
  //           options: 'confirm-options',
  //           charges: true,
  //           previous: 'confirm-cheque-name',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'confirm-cheque',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'confirm-cheque-confirm-error',
  //         },
  //         {
  //           type: 'select',
  //           name: 'confirm-cheque-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'confirm-cheque-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //       ],
  //       'agent-withdraw': [
  //         {
  //           type: 'select',
  //           name: 'agent-withdraw-debit-account',
  //           'save-as': 'debitAccount',
  //           options: 'customer-accounts',
  //           'options-template': 'account-options-template',
  //           'options-error': 'withdraw-debit-account-options-error',
  //           error: 'agent-withdraw-debit-account-error',
  //           previous: 'client-page',
  //           next: 'agent-withdraw-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'agent-withdraw-amount',
  //           'save-as': 'amount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               arguments: 'min = 10',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'agent-withdraw-amount-error',
  //           previous: 'agent-withdraw-debit-account',
  //           next: 'agent-code',
  //         },
  //         {
  //           type: 'input',
  //           name: 'agent-code',
  //           'save-as': 'agentCode',
  //           validation: [
  //             {
  //               name: 'isAny',
  //               type: 'custom',
  //             },
  //           ],
  //           error: 'agent-code-error',
  //           previous: 'agent-withdraw-amount',
  //           next: 'agent-withdraw-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'agent-withdraw-confirm',
  //           options: 'confirm-options',
  //           previous: 'agent-code',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'agent-withdraw',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'agent-withdraw-confirm-error',
  //         },
  //         {
  //           type: 'select',
  //           name: 'withdraw-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'withdraw-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'client-page',
  //         },
  //       ],
  //       'funds-transfer-savings-to-wallet': [
  //         {
  //           type: 'select',
  //           name: 'ft-savings-to-wallet-debit-account',
  //           'save-as': 'fundsTransferDebitAccount',
  //           options: 'customer-accounts',
  //           'options-error': 'ft-savings-to-wallet-debit-account-options-error',
  //           error: 'ft-savings-to-wallet-debit-account-error',
  //           previous: 'funds-transfer-other-accounts-page',
  //           next: 'ft-savings-to-wallet-credit-account',
  //         },
  //         {
  //           type: 'input',
  //           name: 'ft-savings-to-wallet-credit-account',
  //           'save-as': 'fundsTransferCreditAccount',
  //           'format-as': 'credit-bank-wallet',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //             {
  //               name: 'matchesLength',
  //               type: 'joi',
  //               arguments: 'length=10',
  //             },
  //           ],
  //           errors: [
  //             'ft-savings-to-wallet-credit-account-error',
  //             'ft-savings-to-wallet-credit-account-error',
  //           ],
  //           previous: 'ft-savings-to-wallet-debit-account',
  //           next: 'ft-savings-to-wallet-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'ft-savings-to-wallet-amount',
  //           'save-as': 'fundsTransferAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=10',
  //             },
  //           ],
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'account-lookup-presentment',
  //             success: 'ft-savings-to-wallet-confirm',
  //             error: 'api-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.name',
  //                 'save-as': 'creditAccName',
  //               },
  //               {
  //                 path: 'data.AccountNo',
  //                 'save-as': 'fTCreditAcc',
  //               },
  //             ],
  //           },
  //           error: 'ft-savings-to-wallet-amount-error',
  //           previous: 'ft-savings-to-wallet-credit-account',
  //           next: 'ft-savings-to-wallet-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-savings-to-wallet-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           error: 'ft-savings-to-wallet-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'funds-transfer-savings-to-wallet',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'ft-savings-to-wallet-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-savings-to-wallet-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'ft-savings-to-wallet-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'funds-transfer-page',
  //         },
  //       ],
  //       disabled: {
  //         type: 'alert',
  //         name: 'disabled',
  //       },
  //       'savings-open': [
  //         {
  //           type: 'select',
  //           name: 'savings-open-debit-account',
  //           'save-as': 'debitAccount',
  //           options: 'fosa-accounts',
  //           previous: 'savings-page',
  //           next: 'savings-open-products',
  //           error: 'savings-open-debit-account-error',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'savings-products',
  //             success: 'savings-open-products',
  //             error: 'savings-open-products-error',
  //             cache: true,
  //             'cache-path': 'global-constants',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.response.products',
  //                 'save-as': 'savings-products',
  //                 'format-as': 'savings-products',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'select',
  //           name: 'savings-open-products',
  //           'save-as': 'product',
  //           options: 'savings-products',
  //           previous: 'savings-open-debit-account',
  //           next: 'savings-open-target-amount',
  //           error: 'savings-open-products-error',
  //         },
  //         {
  //           type: 'input',
  //           name: 'savings-open-target-amount',
  //           'save-as': 'amount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=1',
  //             },
  //           ],
  //           previous: 'savings-open-products',
  //           next: 'savings-open-period',
  //           error: 'savings-open-amount-error',
  //         },
  //         {
  //           type: 'input',
  //           name: 'savings-open-period',
  //           'save-as': 'period',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           previous: 'savings-open-target-amount',
  //           next: 'savings-open-deposit',
  //           error: 'open-period-error',
  //         },
  //         {
  //           type: 'input',
  //           name: 'savings-open-deposit',
  //           'save-as': 'deposit',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=0',
  //             },
  //           ],
  //           previous: 'savings-open-period',
  //           next: 'savings-open-confirm',
  //           error: 'savings-open-deposit-error',
  //         },
  //         {
  //           type: 'select',
  //           name: 'savings-open-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           previous: 'savings-open-deposit',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'open-savings-account',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'savings-open-confirm-error',
  //         },
  //       ],
  //       ministatement: [
  //         {
  //           type: 'select',
  //           name: 'ministatement-account',
  //           'save-as': 'ministatementDebitAccount',
  //           options: 'customer-accounts',
  //           'options-template': 'account-options-template',
  //           error: 'ministatement-account-error',
  //           previous: 'client-page',
  //           next: 'ministatement-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ministatement-account-fosa',
  //           'save-as': 'ministatementDebitAccount',
  //           options: 'fosa-accounts',
  //           'options-error': 'ministatement-account-fosa-options-error',
  //           error: 'ministatement-account-fosa-error',
  //           previous: 'ministatement-account',
  //           next: 'ministatement-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ministatement-account-loan',
  //           'save-as': 'ministatementDebitAccount',
  //           options: 'loan-accounts',
  //           'options-error': 'ministatement-account-loan-options-error',
  //           'options-template': 'account-options-template',
  //           error: 'ministatement-account-loan-error',
  //           previous: 'ministatement-account',
  //           next: 'ministatement-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ministatement-confirm',
  //           options: 'confirm-options',
  //           previous: 'ministatement-account',
  //           charges: true,
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'ministatement',
  //             success: 'ministatement-success',
  //             error: 'api-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.response.statement',
  //                 'save-as': 'ministatement',
  //               },
  //             ],
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'ministatement-confirm-error',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ministatement-account-fosa-options-error',
  //           options: 'yes-no-options',
  //           error: 'ministatement-account-fosa-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'ministatement-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ministatement-account-loan-options-error',
  //           options: 'yes-no-options',
  //           error: 'ministatement-account-loan-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'ministatement-account',
  //         },
  //       ],
  //       'withdrawal-mpesa-b2c': [
  //         {
  //           type: 'select',
  //           name: 'withdrawal-mpesa-debit-account',
  //           'save-as': 'withdrawalDebitAccount',
  //           options: 'customer-accounts',
  //           'options-error': 'withdrawal-mpesa-debit-account-options-error',
  //           error: 'withdrawal-mpesa-debit-account-error',
  //           previous: 'funds-transfer-page',
  //           next: 'withdrawal-mpesa-account-type',
  //         },
  //         {
  //           type: 'select',
  //           name: 'withdrawal-mpesa-account-type',
  //           'save-as': 'withdrawalCreditAccount',
  //           options: [
  //             {
  //               label: 'My Number',
  //               value: '__walletAccount',
  //               'jump-to': 'withdrawal-mpesa-amount',
  //             },
  //             {
  //               label: 'Other Number',
  //               'jump-to': 'withdrawal-mpesa-credit-account',
  //             },
  //           ],
  //           error: 'withdrawal-mpesa-account-type-error',
  //           previous: 'withdrawal-mpesa-debit-account',
  //         },
  //         {
  //           type: 'input',
  //           name: 'withdrawal-mpesa-credit-account',
  //           'save-as': 'withdrawalCreditAccount',
  //           'format-as': 'international-mobile-number',
  //           validation: [
  //             {
  //               name: 'matchesLength',
  //               type: 'joi',
  //               arguments: 'length = 10',
  //             },
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           errors: [
  //             'withdrawal-mpesa-credit-account-error',
  //             'withdrawal-mpesa-credit-account-error',
  //           ],
  //           previous: 'withdrawal-mpesa-debit-account',
  //           next: 'withdrawal-mpesa-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'withdrawal-mpesa-amount',
  //           'save-as': 'withdrawalAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               arguments: 'min    = 10',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'withdrawal-mpesa-amount-error',
  //           previous: 'withdrawal-mpesa-account-type',
  //           next: 'withdrawal-mpesa-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'withdrawal-mpesa-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           previous: 'withdrawal-mpesa-amount',
  //           action: 'transact',
  //           'external-fetch': {
  //             api: 'mock',
  //             route: 'send-to-mpesa',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'withdrawal-mpesa-confirm-error',
  //         },
  //         {
  //           type: 'select',
  //           name: 'withdrawal-mpesa-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'withdrawal-mpesa-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'withdrawal-page',
  //         },
  //       ],
  //       'funds-transfer-wallet-to-wallet': [
  //         {
  //           type: 'input',
  //           name: 'ft-wallet-to-wallet-credit-account',
  //           'save-as': 'fundsTransferCreditAccount',
  //           'format-as': 'credit-bank-wallet',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //             {
  //               name: 'matchesLength',
  //               type: 'joi',
  //               arguments: 'length=10',
  //             },
  //           ],
  //           errors: [
  //             'ft-wallet-to-wallet-credit-account-error',
  //             'ft-wallet-to-wallet-credit-account-error',
  //           ],
  //           previous: 'funds-transfer-other-accounts-page',
  //           next: 'ft-wallet-to-wallet-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'ft-wallet-to-wallet-amount',
  //           'save-as': 'fundsTransferAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=10',
  //             },
  //           ],
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'account-lookup-presentment',
  //             success: 'ft-wallet-to-wallet-confirm',
  //             error: 'api-error',
  //             cache: false,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.name',
  //                 'save-as': 'creditAccName',
  //               },
  //               {
  //                 path: 'data.AccountNo',
  //                 'save-as': 'fTCreditAcc',
  //               },
  //             ],
  //           },
  //           error: 'ft-wallet-to-wallet-amount-error',
  //           previous: 'ft-wallet-to-wallet-credit-account',
  //           next: 'ft-wallet-to-wallet-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-wallet-to-wallet-confirm',
  //           options: 'confirm-options',
  //           charges: true,
  //           error: 'ft-wallet-to-wallet-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'funds-transfer-wallet-to-wallet',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'ft-wallet-to-wallet-amount',
  //         },
  //       ],
  //       'standing-orders-amend': [
  //         {
  //           type: 'select',
  //           name: 'so-amend-debit-account',
  //           'save-as': 'soDebitAccount',
  //           options: 'savings-accounts',
  //           'options-error': 'so-amend-debit-account-options-error',
  //           error: 'so-amend-debit-account-error',
  //           previous: 'standing-orders-page',
  //           next: 'so-amend-id',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'standing-orders-lookup',
  //             success: 'so-amend-id',
  //             error: 'standing-orders-lookup-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'field127',
  //                 'save-as': 'current-standing-orders',
  //                 'format-as': 'standing-orders',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'select',
  //           name: 'so-amend-id',
  //           'save-as': 'soId',
  //           options: 'current-standing-orders',
  //           'options-error': 'standing-orders-options-error',
  //           error: 'so-amend-id-error',
  //           previous: 'so-amend-debit-account',
  //           next: 'so-amend-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'so-amend-amount',
  //           'save-as': 'soAmendAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=1',
  //             },
  //           ],
  //           'format-as': 'to-number',
  //           error: 'so-amend-amount-error',
  //           previous: 'so-amend-id',
  //           next: 'so-amend-frequency',
  //         },
  //         {
  //           type: 'select',
  //           name: 'so-amend-frequency',
  //           'save-as': 'soAmendFrequency',
  //           options: [
  //             {
  //               label: 'Daily',
  //               value: 'D',
  //             },
  //             {
  //               label: 'Weekly',
  //               value: 'W',
  //             },
  //             {
  //               label: 'Monthly',
  //               value: 'M',
  //             },
  //             {
  //               label: 'Yearly',
  //               value: 'Y',
  //             },
  //           ],
  //           error: 'so-amend-frequency-error',
  //           previous: 'so-amend-amount',
  //           next: 'so-amend-end-date',
  //         },
  //         {
  //           type: 'input',
  //           name: 'so-amend-end-date',
  //           'save-as': 'soAmendEndDate',
  //           validation: [
  //             {
  //               name: 'isValidDate',
  //               type: 'custom',
  //               arguments: 'format=YYYY-MM-DD',
  //             },
  //           ],
  //           'format-as': 'so-date',
  //           error: 'so-amend-end-date-error',
  //           previous: 'so-amend-amount',
  //           next: 'so-amend-instruction',
  //         },
  //         {
  //           type: 'input',
  //           name: 'so-amend-instruction',
  //           'save-as': 'soInstruction',
  //           'format-as': 'createSpaces',
  //           validation: [
  //             {
  //               name: 'isStatement',
  //               type: 'custom',
  //             },
  //           ],
  //           error: 'so-amend-instruction-error',
  //           previous: 'so-amend-end-date',
  //           next: 'so-amend-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'so-amend-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           previous: 'so-amend-instruction',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'standing-orders-amend',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'so-amend-confirm-error',
  //         },
  //         {
  //           type: 'select',
  //           name: 'so-amend-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'so-amend-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'client-page',
  //         },
  //         {
  //           type: 'select',
  //           name: 'standing-orders-lookup-error',
  //           options: 'yes-no-options',
  //           error: 'standing-orders-lookup-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'client-page',
  //         },
  //         {
  //           type: 'select',
  //           name: 'standing-orders-options-error',
  //           options: 'yes-no-options',
  //           error: 'standing-orders-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'so-amend-debit-account',
  //         },
  //       ],
  //       'via-atm': [
  //         {
  //           type: 'select',
  //           name: 'via-atm-debit-account',
  //           'save-as': 'cardlessDebitAccount',
  //           options: 'customer-accounts',
  //           error: 'via-atm-debit-account-error',
  //           previous: 'cardless-withdraw-page',
  //           next: 'via-atm-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'via-atm-amount',
  //           'save-as': 'cardlessWithdrawAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               arguments: 'min=1',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'via-atm-amount-error',
  //           previous: 'via-atm-debit-account',
  //           next: 'via-atm-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'via-atm-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           previous: 'via-atm-amount',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'cardless-origination',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'via-atm-confirm-error',
  //         },
  //       ],
  //       'merchant-payment': [
  //         {
  //           type: 'input',
  //           name: 'merchant-payment-code',
  //           'save-as': 'merchantCode',
  //           validation: [
  //             {
  //               name: 'isAlphaNumeric',
  //               type: 'custom',
  //             },
  //           ],
  //           error: 'merchant-payment-code-error',
  //           previous: 'client-page',
  //           next: 'merchant-payment-accounts',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'merchant-payment-lookup',
  //             success: 'merchant-payment-accounts',
  //             error: 'merchant-payment-presentment-account-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.transaction_details',
  //                 'save-as': 'lookupMerchant',
  //               },
  //               {
  //                 path: 'data.transaction_details.debit_account',
  //                 'save-as': 'merchantAccount',
  //                 'format-as': 'walletAccount',
  //               },
  //               {
  //                 path: 'data.transaction_details.branch_name',
  //                 'save-as': 'merchantName',
  //                 'format-as': '',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'select',
  //           name: 'merchant-payment-accounts',
  //           'save-as': 'merchantPayDebitAcc',
  //           options: [
  //             {
  //               label: 'My Accounts',
  //               'jump-to': 'merchant-payment-debit-account',
  //             },
  //             {
  //               label: 'From MPESA',
  //               value: '__walletAccount',
  //               'jump-to': 'mpesa-merchant-amount',
  //             },
  //           ],
  //           error: 'merchant-payment-accounts-error',
  //           next: 'merchant-payment-debit-account',
  //           previous: 'merchant-payment-code',
  //         },
  //         {
  //           type: 'select',
  //           name: 'merchant-payment-debit-account',
  //           'save-as': 'merchantPayDebitAcc',
  //           options: 'customer-accounts',
  //           'options-error': 'merchant-payment-account-error',
  //           error: 'merchant-payment-debit-account-error',
  //           previous: 'merchant-payment-accounts',
  //           next: 'merchant-payment-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'merchant-payment-amount',
  //           'save-as': 'merchantAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=1',
  //             },
  //           ],
  //           error: 'merchant-payment-amount-error',
  //           previous: 'merchant-payment-accounts',
  //           next: 'merchant-payment-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'merchant-payment-confirm',
  //           options: 'confirm-options',
  //           charges: true,
  //           error: 'merchant-payment-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'merchant-payment',
  //             success: 'api-success',
  //             error: 'api-success',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'merchant-payment-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'mpesa-merchant-amount',
  //           'save-as': 'merchantAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=1',
  //             },
  //           ],
  //           error: 'mpesa-merchant-amount-error',
  //           previous: 'merchant-payment-accounts',
  //           next: 'mpesa-merchant-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'mpesa-merchant-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           error: 'mpesa-merchant-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'mpesa-merchant-payment',
  //             success: 'mpesa-merchant-payment-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'mpesa-repayment-amount',
  //         },
  //         {
  //           type: 'alert',
  //           name: 'mpesa-merchant-payment-success',
  //         },
  //         {
  //           type: 'select',
  //           name: 'loan-repayment-success',
  //           options: 'yes-no-options',
  //           error: 'loan-repayment-success-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'loans-page',
  //         },
  //         {
  //           type: 'select',
  //           name: 'merchant-payment-account-error',
  //           options: 'yes-no-options',
  //           error: 'merchant-payment-account-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //         {
  //           type: 'select',
  //           name: 'merchant-payment-presentment-account-error',
  //           options: 'yes-no-options',
  //           error: 'merchant-payment-presentment-account-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //       ],
  //       registration: [
  //         {
  //           type: 'select',
  //           name: 'registration',
  //           'save-as': 'activate-acc',
  //           options: [
  //             {
  //               label: 'Activate Account',
  //               value: 'Activate',
  //               'jump-to': 'registration-fullname',
  //             },
  //             {
  //               label: 'Exit',
  //               'jump-to': 'logout',
  //             },
  //           ],
  //           next: 'registration-fullname',
  //           error: 'registration-activate-error',
  //         },
  //         {
  //           type: 'input',
  //           name: 'registration-fullname',
  //           'save-as': 'fullname',
  //           validation: [
  //             {
  //               name: 'isText',
  //               type: 'custom',
  //             },
  //           ],
  //           previous: 'registration',
  //           error: 'registration-fullname-error',
  //           next: 'registration-id-number',
  //         },
  //         {
  //           type: 'input',
  //           name: 'registration-id-number',
  //           'save-as': 'id',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'registration-id-number-error',
  //           previous: 'registration-fullname',
  //           next: 'registration-email',
  //         },
  //         {
  //           type: 'input',
  //           name: 'registration-email',
  //           'save-as': 'email',
  //           validation: [
  //             {
  //               name: 'isEmail',
  //               type: 'custom',
  //             },
  //           ],
  //           error: 'registration-email-error',
  //           previous: 'registration-id-number',
  //           next: 'registration-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'registration-confirm',
  //           options: 'confirm-options',
  //           error: 'registration-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'activate-mobile-banking',
  //             success: 'registration-success',
  //             error: 'registration-error',
  //           },
  //           'on-cancel': 'registration',
  //           previous: 'registration-email',
  //         },
  //       ],
  //       'withdraw-from-wallet-to-mobile': [
  //         {
  //           type: 'select',
  //           name: 'withdraw-from-wallet-to-mobile-type',
  //           'save-as': 'billerRefAccount',
  //           options: [
  //             {
  //               label: 'To Self',
  //               value: '__walletAccount',
  //               'jump-to': 'withdraw-from-wallet-to-mobile-amount',
  //             },
  //             {
  //               label: 'To Other',
  //               'jump-to': 'withdraw-from-wallet-to-mobile-other-number',
  //             },
  //           ],
  //           error: 'withdraw-from-wallet-to-mobile-type-error',
  //           previous: 'withdraw-page',
  //         },
  //         {
  //           type: 'input',
  //           name: 'withdraw-from-wallet-to-mobile-other-number',
  //           'save-as': 'billerRefAccount',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'withdraw-from-wallet-to-mobile-other-number-error',
  //           previous: 'withdraw-from-wallet-to-mobile-type',
  //           next: 'withdraw-from-wallet-to-mobile-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'withdraw-from-wallet-to-mobile-amount',
  //           'save-as': 'withdrawAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               arguments: 'min = 10',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'withdraw-from-wallet-to-mobile-amount-error',
  //           previous: 'withdraw-debit-account',
  //           next: 'withdraw-from-wallet-to-mobile-confirm',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'account-lookup-presentment',
  //             success: 'withdraw-from-wallet-to-mobile-confirm',
  //             error: 'api-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.transaction_details.account_number',
  //                 'save-as': 'withdrawDebitAccount',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'select',
  //           name: 'withdraw-from-wallet-to-mobile-confirm',
  //           options: 'confirm-options',
  //           previous: 'withdraw-from-wallet-to-mobile-amount',
  //           action: 'transact',
  //           'external-fetch': {
  //             api: 'mock',
  //             route: 'withdraw-to-mobile',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'withdraw-from-wallet-to-mobile-confirm-error',
  //         },
  //       ],
  //       hospitals: [
  //         {
  //           type: 'select',
  //           name: 'hospital-debit-account',
  //           'save-as': 'hospitalDebitAccount',
  //           options: 'savings-accounts',
  //           error: 'hospital-debit-account-error',
  //           previous: 'bill-payment-page',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'hospital-list-presentment',
  //             success: 'hospital-account-number',
  //             error: 'hospital-list-accounts-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'data',
  //                 'save-as': 'hospital-list',
  //                 'format-as': 'faulu-schools',
  //               },
  //             ],
  //             'parameter-checks': {
  //               'hospital-list': {
  //                 'is-less-than': '1',
  //                 'redirect-to': 'school-list-accounts-error',
  //               },
  //             },
  //           },
  //         },
  //         {
  //           type: 'select',
  //           name: 'hospital-account-number',
  //           options: 'hospital-list',
  //           'options-error': 'hospital-list-accounts-error',
  //           'save-as': 'fauluHospital',
  //           error: 'hospital-account-number-error',
  //           previous: 'hospital-debit-account',
  //           next: 'hospital-narration',
  //         },
  //         {
  //           type: 'input',
  //           name: 'hospital-narration',
  //           'save-as': 'hospitalNarration',
  //           validation: [
  //             {
  //               name: 'isStatement',
  //               type: 'custom',
  //             },
  //           ],
  //           error: 'hospital-narration-error',
  //           previous: 'hospital-account-number',
  //           next: 'hospital-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'hospital-amount',
  //           'save-as': 'hospitalAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=1',
  //             },
  //           ],
  //           error: 'hospital-amount-error',
  //           previous: 'hospital-narration',
  //           next: 'hospital-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'hospital-confirm',
  //           options: 'confirm-options',
  //           charges: true,
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'hospital-bill-payment',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           error: 'hospital-confirm-error',
  //           'on-cancel': 'client-page',
  //           previous: 'hospital-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'hospital-account-error',
  //           options: 'yes-no-options',
  //           error: 'hospital-account-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //         {
  //           type: 'select',
  //           name: 'hospital-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'hospital-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //         {
  //           type: 'select',
  //           name: 'hospital-list-accounts-error',
  //           options: 'yes-no-options',
  //           error: 'hospital-list-accounts-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //       ],
  //       'withdrawal-airtel-b2c': [
  //         {
  //           type: 'select',
  //           name: 'withdrawal-airtel-debit-account',
  //           'save-as': 'withdrawalDebitAccount',
  //           options: 'savings-accounts',
  //           'options-error': 'withdrawal-airtel-debit-account-options-error',
  //           error: 'withdrawal-airtel-debit-account-error',
  //           previous: 'funds-transfer-page',
  //           next: 'withdrawal-airtel-account-type',
  //         },
  //         {
  //           type: 'select',
  //           name: 'withdrawal-airtel-account-type',
  //           'save-as': 'withdrawalCreditAccount',
  //           options: [
  //             {
  //               label: 'My Number',
  //               value: '__walletAccount',
  //               'jump-to': 'withdrawal-airtel-amount',
  //             },
  //             {
  //               label: 'Other Number',
  //               'jump-to': 'withdrawal-airtel-credit-account',
  //             },
  //           ],
  //           error: 'withdrawal-airtel-account-type-error',
  //           previous: 'withdrawal-airtel-debit-account',
  //         },
  //         {
  //           type: 'input',
  //           name: 'withdrawal-airtel-credit-account',
  //           'save-as': 'withdrawalCreditAccount',
  //           'format-as': 'international-mobile-number',
  //           validation: [
  //             {
  //               name: 'matchesLength',
  //               type: 'joi',
  //               arguments: 'length=10',
  //             },
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           errors: [
  //             'withdrawal-airtel-credit-account-error',
  //             'withdrawal-airtel-credit-account-error',
  //           ],
  //           previous: 'withdrawal-airtel-debit-account',
  //           next: 'withdrawal-airtel-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'withdrawal-airtel-amount',
  //           'save-as': 'withdrawalAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               arguments: 'min=10',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'withdrawal-airtel-amount-error',
  //           previous: 'withdrawal-airtel-account-type',
  //           next: 'withdrawal-airtel-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'withdrawal-airtel-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           previous: 'withdrawal-airtel-amount',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             api: 'mock',
  //             route: 'send-to-airtel-money',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'withdrawal-airtel-confirm-error',
  //         },
  //         {
  //           type: 'select',
  //           name: 'withdrawal-airtel-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'withdrawal-airtel-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'withdrawal-page',
  //         },
  //       ],
  //       'coming-soon': {
  //         type: 'alert',
  //         name: 'coming-soon',
  //       },
  //       'loan-limit-success': {
  //         type: 'select',
  //         name: 'loan-limit-success',
  //         options: 'yes-no-options',
  //         error: 'loan-limit-success-error',
  //         action: 'navigate',
  //         'on-accept': 'client-page',
  //         'on-cancel': 'logout',
  //       },
  //       'pay-bill-water': [
  //         {
  //           type: 'input',
  //           name: 'pay-bill-water-credit-account',
  //           'save-as': 'billPaymentBillerAccount',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'pay-bill-water-credit-account-error',
  //           previous: 'bill-payment-page',
  //           next: 'pay-bill-water-debit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'pay-bill-water-debit-account',
  //           'save-as': 'billPaymentDebitAccount',
  //           options: 'customer-accounts',
  //           'options-error': 'pay-bill-water-debit-account-options-error',
  //           error: 'pay-bill-water-debit-account-error',
  //           previous: 'pay-bill-water-credit-account',
  //           next: 'pay-bill-water-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'pay-bill-water-amount',
  //           'save-as': 'billPaymentAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=20',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'pay-bill-water-amount-error',
  //           previous: 'pay-bill-water-debit-account',
  //           next: 'pay-bill-water-confirm',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'water-presentment',
  //             success: 'pay-bill-water-confirm',
  //             error: 'water-bill-presentment-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.response.amount',
  //                 'save-as': 'billPaymentAmount',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'select',
  //           name: 'pay-bill-water-confirm',
  //           options: 'confirm-options',
  //           error: 'pay-bill-water-confirm-error',
  //           charges: true,
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'water-bill-payment',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'pay-bill-water-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'pay-bill-water-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'pay-bill-water-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'pay-bill-water-credit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'water-bill-presentment-error',
  //           options: 'yes-no-options',
  //           error: 'water-bill-presentment-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //       ],
  //       'loan-limit-error': {
  //         type: 'select',
  //         name: 'loan-limit-error',
  //         options: 'yes-no-options',
  //         error: 'loan-limit-error-error',
  //         action: 'navigate',
  //         'on-accept': 'client-page',
  //         'on-cancel': 'logout',
  //       },
  //       'core-account-opening': [
  //         {
  //           type: 'select',
  //           name: 'core-account-type',
  //           'save-as': 'coreAccountType',
  //           options: [
  //             {
  //               label: 'CB U Dream Account',
  //               value: '1001',
  //               'jump-to': 'cbu-dream-account',
  //             },
  //             {
  //               label: 'Personal Current Account',
  //               value: '1002',
  //               'jump-to': 'personal-current-account',
  //             },
  //             {
  //               label: 'My Saver Account',
  //               value: '1003',
  //               'jump-to': 'my-saver-account',
  //             },
  //           ],
  //           'options-error': 'core-account-type-options-error',
  //           error: 'core-account-type-error',
  //           previous: 'customer-requests-page',
  //         },
  //         {
  //           type: 'input',
  //           name: 'cbu-dream-account',
  //           'save-as': 'coreAccountAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min = 1000',
  //             },
  //           ],
  //           error: 'cbu-dream-account-error',
  //           previous: 'core-account-type',
  //           next: 'core-account-opening-search',
  //         },
  //         {
  //           type: 'input',
  //           name: 'personal-current-account',
  //           'save-as': 'coreAccountAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min = 2000',
  //             },
  //           ],
  //           error: 'personal-current-account-error',
  //           previous: 'core-account-type',
  //           next: 'core-account-opening-search',
  //         },
  //         {
  //           type: 'input',
  //           name: 'my-saver-account',
  //           'save-as': 'coreAccountAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min = 1000',
  //             },
  //           ],
  //           error: 'my-saver-account-error',
  //           previous: 'core-account-type',
  //           next: 'core-account-opening-search',
  //         },
  //         {
  //           type: 'input',
  //           name: 'core-account-opening-search',
  //           action: 'search',
  //           'search-options': {
  //             limit: 5,
  //             dataset: 'account-opening-branches',
  //             saveTo: 'search-options',
  //           },
  //           errors: ['no-results-error', 'result-limit-exceeded-error'],
  //           previous: 'core-account-type',
  //           next: 'core-account-opening-result',
  //         },
  //         {
  //           type: 'select',
  //           name: 'core-account-opening-result',
  //           'save-as': 'coreAccountBranch',
  //           options: 'search-options',
  //           error: 'core-account-opening-result-error',
  //           previous: 'core-account-opening-search',
  //           next: 'core-account-currency',
  //         },
  //         {
  //           type: 'select',
  //           name: 'core-account-currency',
  //           'save-as': 'coreAccountCurrency',
  //           options: [
  //             {
  //               label: 'Kenyan Shilling',
  //               value: 'KES',
  //             },
  //             {
  //               label: 'Euro',
  //               value: 'EUR',
  //             },
  //             {
  //               label: 'British Pound',
  //               value: 'GBP',
  //             },
  //             {
  //               label: 'US Dollar',
  //               value: 'USD',
  //             },
  //           ],
  //           error: 'core-account-currency-error',
  //           previous: 'core-account-opening-result',
  //           next: 'core-account-debit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'core-account-debit-account',
  //           'save-as': 'coreAccountDebitAccount',
  //           options: 'savings-accounts',
  //           'options-error': 'core-account-debit-account-options-error',
  //           error: 'core-account-debit-account-error',
  //           previous: 'core-account-currency',
  //           next: 'core-account-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'core-account-confirm',
  //           options: 'confirm-options',
  //           error: 'core-account-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'core-account-opening',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'core-account-debit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'core-account-type-options-error',
  //           options: 'yes-no-options',
  //           error: 'core-account-type-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'client-page',
  //         },
  //         {
  //           type: 'select',
  //           name: 'core-account-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'core-account-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'core-account-type',
  //         },
  //       ],
  //       'jamii-telkom': [
  //         {
  //           type: 'input',
  //           name: 'jamii-telkom-credit-account',
  //           'save-as': 'billPaymentCreditAccount',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'jamii-telkom-credit-account-error',
  //           previous: 'bill-payment-page',
  //           next: 'jamii-telkom-debit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'jamii-telkom-debit-account',
  //           'save-as': 'billPaymentDebitAccount',
  //           options: 'fosa-accounts',
  //           'options-error': 'jamii-telkom-debit-account-options-error',
  //           error: 'jamii-telkom-debit-account-error',
  //           previous: 'jamii-telkom-credit-account',
  //           next: 'jamii-telkom-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'jamii-telkom-amount',
  //           'save-as': 'billPaymentAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=200',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'jamii-telkom-amount-error',
  //           previous: 'jamii-telkom-debit-account',
  //           next: 'jamii-telkom-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'jamii-telkom-confirm',
  //           options: 'confirm-options',
  //           error: 'jamii-telkom-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'accessKenyaPayment',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'jamii-telkom-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'jamii-telkom-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'jamii-telkom-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'jamii-telkom-credit-account',
  //         },
  //       ],
  //       'inapp-login': {
  //         type: 'input',
  //         name: 'inapp-login',
  //         validation: [
  //           {
  //             name: 'isValidPin',
  //             type: 'custom',
  //           },
  //           {
  //             name: 'isCorrectPin',
  //             type: 'custom',
  //           },
  //         ],
  //         errors: ['invalid-inapp-pin-error', 'wrong-inapp-pin-error'],
  //       },
  //       withdraw: [
  //         {
  //           type: 'select',
  //           name: 'withdraw-debit-account',
  //           'save-as': 'withdrawDebitAccount',
  //           options: 'customer-accounts',
  //           'options-template': 'account-options-template',
  //           'options-error': 'withdraw-debit-account-options-error',
  //           error: 'withdraw-debit-account-error',
  //           previous: 'funds-transfer-page',
  //           next: 'withdraw-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'withdraw-debit-account-fosa',
  //           'save-as': 'withdrawDebitAccount',
  //           options: 'customer-accounts',
  //           'options-error': 'withdraw-debit-account-fosa-options-error',
  //           error: 'withdraw-debit-account-fosa-error',
  //           previous: 'withdraw-debit-account',
  //           next: 'withdraw-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'withdraw-debit-account-bosa',
  //           'save-as': 'withdrawDebitAccount',
  //           options: [
  //             {
  //               label: 'BOSA - 9878429323',
  //               value: '9878429323',
  //             },
  //             {
  //               label: 'BOSA - 1203973709129',
  //               value: '1203973709129',
  //             },
  //           ],
  //           'options-template': 'account-options-template',
  //           'options-error': 'withdraw-debit-account-bosa-options-error',
  //           error: 'withdraw-debit-account-error',
  //           previous: 'withdraw-debit-account',
  //           next: 'withdraw-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'withdraw-amount',
  //           'save-as': 'withdrawAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               arguments: 'min = 10',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'withdraw-amount-error',
  //           previous: 'withdraw-debit-account',
  //           next: 'withdraw-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'withdraw-confirm',
  //           options: 'confirm-options',
  //           previous: 'withdraw-amount',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             api: 'mock',
  //             route: 'withdraw',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'withdraw-confirm-error',
  //         },
  //         {
  //           type: 'select',
  //           name: 'withdraw-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'withdraw-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'client-page',
  //         },
  //         {
  //           type: 'select',
  //           name: 'withdraw-debit-account-fosa-options-error',
  //           options: 'yes-no-options',
  //           error: 'withdraw-debit-account-fosa-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'withdraw-debit-account',
  //           'on-cancel': 'logout',
  //           previous: 'withdraw-debit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'withdraw-debit-account-bosa-options-error',
  //           options: 'yes-no-options',
  //           error: 'withdraw-debit-account-bosa-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'withdraw-debit-account',
  //           'on-cancel': 'logout',
  //           previous: 'withdraw-debit-account',
  //         },
  //       ],
  //       'registration-success': {
  //         type: 'alert',
  //         name: 'registration-success',
  //       },
  //       'electricity-power-postpaid': [
  //         {
  //           type: 'select',
  //           name: 'electricity-power-postpaid-debit-account',
  //           'save-as': 'billPaymentDebitAccount',
  //           options: 'customer-accounts',
  //           'options-error':
  //             'electricity-power-postpaid-debit-account-options-error',
  //           error: 'electricity-power-postpaid-debit-account-error',
  //           previous: 'bill-payment-page',
  //           next: 'electricity-power-postpaid-credit-account',
  //         },
  //         {
  //           type: 'input',
  //           name: 'electricity-power-postpaid-credit-account',
  //           'save-as': 'billPaymentCreditAccount',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'electricity-power-postpaid-credit-account-error',
  //           previous: 'electricity-power-postpaid-debit-account',
  //           next: 'electricity-power-postpaid-confirm',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             api: 'ukulima-api',
  //             route: 'power-postpaid-presentment',
  //             success: 'electricity-power-postpaid-confirm',
  //             error: 'electricity-power-postpaid-presentment-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.response.amount',
  //                 'save-as': 'billPaymentAmount',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'select',
  //           name: 'electricity-power-postpaid-confirm',
  //           options: 'confirm-options',
  //           charges: true,
  //           error: 'electricity-power-postpaid-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'power-Postpaid-Payment',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'electricity-power-postpaid-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'electricity-power-postpaid-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error:
  //             'electricity-power-postpaid-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'electricity-power-postpaid-credit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'electricity-power-postpaid-presentment-error',
  //           options: 'yes-no-options',
  //           error: 'electricity-power-postpaid-presentment-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //       ],
  //       'standing-orders-cancel': [
  //         {
  //           type: 'select',
  //           name: 'so-cancel-debit-account',
  //           'save-as': 'soDebitAccount',
  //           options: 'savings-accounts',
  //           'options-error': 'so-cancel-debit-account-options-error',
  //           error: 'so-cancel-debit-account-error',
  //           previous: 'standing-orders-page',
  //           next: 'standing-orders-lookup',
  //         },
  //         {
  //           type: 'skip',
  //           name: 'standing-orders-lookup',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'standing-orders-lookup',
  //             success: 'so-cancel-id',
  //             error: 'standing-orders-lookup-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'field127',
  //                 'save-as': 'account-standing-orders',
  //                 'format-as': 'standing-orders',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'select',
  //           name: 'so-cancel-id',
  //           'save-as': 'soId',
  //           options: 'account-standing-orders',
  //           'options-error': 'standing-orders-options-error',
  //           error: 'so-cancel-id-error',
  //           previous: 'so-cancel-debit-account',
  //           next: 'so-cancel-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'so-cancel-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           previous: 'so-cancel-id',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'standing-orders-cancel',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'so-cancel-confirm-error',
  //         },
  //         {
  //           type: 'select',
  //           name: 'so-cancel-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'so-cancel-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'client-page',
  //         },
  //         {
  //           type: 'select',
  //           name: 'standing-orders-lookup-error',
  //           options: 'yes-no-options',
  //           error: 'standing-orders-lookup-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'client-page',
  //         },
  //         {
  //           type: 'select',
  //           name: 'standing-orders-options-error',
  //           options: 'yes-no-options',
  //           error: 'standing-orders-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //       ],
  //       'registration-alert': {
  //         name: 'registration-alert',
  //         type: 'alert',
  //       },
  //       'card-balance': [
  //         {
  //           type: 'input',
  //           name: 'card-balance-number',
  //           'save-as': 'cardNumber',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'card-balance-number-error',
  //           previous: 'account-enquiries-page',
  //           next: 'card-balance-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'card-balance-confirm',
  //           options: 'confirm-options',
  //           previous: 'card-balance-number',
  //           charges: true,
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'balance',
  //             success: 'balance-success',
  //             error: 'api-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.field54',
  //                 'format-as': 'universalBalance',
  //               },
  //               {
  //                 path: 'data.field49',
  //                 'save-as': 'currencyCode',
  //               },
  //             ],
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'card-balance-confirm-error',
  //         },
  //       ],
  //       'wallet-account-opening': {
  //         type: 'select',
  //         name: 'wallet-account-opening',
  //         options: 'confirm-options',
  //         charges: false,
  //         previous: 'customer-requests-page',
  //         action: 'transact',
  //         'external-fetch': {
  //           route: 'account-opening',
  //           success: 'api-success',
  //           error: 'api-error',
  //         },
  //         'on-cancel': 'client-page',
  //         error: 'wallet-account-opening-error',
  //       },
  //       'ministatement-success': {
  //         type: 'select',
  //         name: 'ministatement-success',
  //         options: 'yes-no-options',
  //         error: 'ministatement-success-error',
  //         action: 'navigate',
  //         'on-accept': 'client-page',
  //         'on-cancel': 'logout',
  //       },
  //       'loan-repayment': [
  //         {
  //           type: 'select',
  //           name: 'loan-repayment-debit-account',
  //           'save-as': 'debitAccount',
  //           options: 'customer-accounts',
  //           error: 'loan-repayment-debit-account-error',
  //           previous: 'loans-page',
  //           next: 'loan-repayment-products',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'loan-products',
  //             success: 'loan-repayment-products',
  //             error: 'loan-repayment-products',
  //             cache: true,
  //             'cache-path': 'global-constants',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.response.loan_products',
  //                 'save-as': 'loan-products',
  //                 'format-as': 'loanProducts',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'select',
  //           name: 'loan-repayment-products',
  //           'save-as': 'product',
  //           options: 'loan-products',
  //           previous: 'loan-repayment-debit-account',
  //           next: 'loan-repayment-amount',
  //           error: 'loan-repayment-products-error',
  //         },
  //         {
  //           type: 'input',
  //           name: 'loan-repayment-amount',
  //           'save-as': 'amount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               arguments: 'min = 10',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'loan-repayment-amount-error',
  //           previous: 'loan-repayment-debit-account',
  //           next: 'loan-repayment-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'loan-repayment-confirm',
  //           options: 'confirm-options',
  //           charges: true,
  //           previous: 'loan-repayment-amount',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'loan-repayment',
  //             success: 'api-success',
  //             error: 'api-success',
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'loan-repayment-confirm-error',
  //         },
  //       ],
  //       'loyalty-points': [
  //         {
  //           type: 'select',
  //           name: 'loyalty-points-options',
  //           'save-as': 'airtimeCreditAccount',
  //           options: [
  //             {
  //               label: 'Check Loyalty Balance',
  //               'jump-to': 'loyalty-balance-success',
  //             },
  //             {
  //               label: 'Redeem Loyaty Points',
  //             },
  //           ],
  //           error: 'loyalty-points-options-error',
  //           previous: 'settings-page',
  //           next: 'redeem-points-amount',
  //         },
  //         {
  //           type: 'skip',
  //           name: 'fetch-loyalty-balance',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'fetch-loyalty-balance',
  //             success: 'loyalty-balance-success',
  //             error: 'fetch-loyalty-balance-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'data[0].BALANCE',
  //                 'save-as': 'loyaltyBalance',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'select',
  //           name: 'loyalty-balance-success',
  //           options: 'yes-no-options',
  //           error: 'loyalty-balance-success-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'loyalty-points-options',
  //         },
  //         {
  //           type: 'input',
  //           name: 'redeem-points-amount',
  //           'save-as': 'redeemAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=1',
  //             },
  //           ],
  //           error: 'redeem-points-amount-error',
  //           previous: 'loyalty-points-options',
  //           next: 'redeem-points-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'redeem-points-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           error: 'redeem-points-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'redeem-points',
  //             success: 'api-success',
  //             error: 'api-success',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'redeem-points-amount',
  //         },
  //       ],
  //       'language-change': [
  //         {
  //           type: 'select',
  //           name: 'language-change',
  //           'save-as': 'selected_language',
  //           options: 'language-options',
  //           error: 'language-change-error',
  //           previous: 'settings-page',
  //           next: 'language-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'language-confirm',
  //           options: 'confirm-options',
  //           error: 'language-confirm-error',
  //           action: 'update-local',
  //           'local-path': 'language=selected_language',
  //           next: 'client-page',
  //           previous: 'language-change',
  //         },
  //       ],
  //       'first-login': [
  //         {
  //           type: 'input',
  //           name: 'first-login',
  //           'save-as': 'ftp',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           errors: ['wrong-system-pin-error'],
  //           next: 'first-login-new-pin',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             api: 'first-login',
  //             route: 'first-login',
  //             success: 'first-login-new-pin',
  //             error: 'api-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.changePin',
  //                 'save-as': 'isPinChanged',
  //               },
  //               {
  //                 path: 'data.access_token',
  //                 'save-as': 'access_token',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'input',
  //           name: 'first-login-new-pin',
  //           'save-as': 'newPin',
  //           validation: [
  //             {
  //               name: 'isStrongPin',
  //               type: 'custom',
  //             },
  //           ],
  //           error: 'first-login-new-pin-error',
  //           next: 'first-login-confirm',
  //           previous: 'first-login-system-pin',
  //         },
  //         {
  //           type: 'select',
  //           name: 'first-login-confirm',
  //           options: 'confirm-options',
  //           error: 'first-login-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             api: 'change-pin',
  //             route: 'change-pin',
  //             success: 'login',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'logout',
  //           previous: 'first-login-new-pin',
  //         },
  //       ],
  //       'savings-withdraw': [
  //         {
  //           type: 'select',
  //           name: 'savings-withdraw-credit-account',
  //           'save-as': 'creditAccount',
  //           options: 'fosa-accounts',
  //           previous: 'savings-page',
  //           next: 'savings-withdraw-account',
  //           error: 'savings-withdraw-credit-account-error',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'get-savings-accounts',
  //             success: 'savings-withdraw-account',
  //             error: 'savings-accounts-error',
  //             cache: true,
  //             'cache-path': 'global-constants',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.response.savings',
  //                 'format-as': 'savings-accounts',
  //                 'save-as': 'savings-accounts',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'select',
  //           name: 'savings-withdraw-account',
  //           'save-as': 'debitAccount',
  //           options: 'savings-accounts',
  //           error: 'savings-withdraw-account-error',
  //           previous: 'savings-withdraw-credit-account',
  //           next: 'savings-withdraw-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'savings-withdraw-amount',
  //           'save-as': 'amount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=1',
  //             },
  //           ],
  //           previous: 'savings-withdraw-account',
  //           next: 'savings-withdraw-confirm',
  //           error: 'savings-withdraw-amount-error',
  //         },
  //         {
  //           type: 'select',
  //           name: 'savings-withdraw-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           previous: 'savings-withdraw-amount',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'withdraw-from-savings',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'savings-withdraw-confirm-error',
  //         },
  //       ],
  //       'request-cheque-book': [
  //         {
  //           type: 'select',
  //           name: 'request-cheque-book-account',
  //           'save-as': 'requestChequeBookDebitAccount',
  //           options: 'customer-accounts',
  //           'options-error': 'request-cheque-book-account-options-error',
  //           error: 'request-cheque-book-account-error',
  //           previous: 'cheques-page',
  //           next: 'request-cheque-book-leaves',
  //         },
  //         {
  //           type: 'select',
  //           name: 'request-cheque-book-leaves',
  //           'save-as': 'requestChequeBookLeaves',
  //           options: [
  //             {
  //               label: '25 Leaves',
  //               value: 'P25',
  //             },
  //             {
  //               label: '50 Leaves',
  //               value: 'P50',
  //             },
  //             {
  //               label: '100 Leaves',
  //               value: 'P100',
  //             },
  //           ],
  //           error: 'request-cheque-book-leaves-error',
  //           previous: 'request-cheque-book-account',
  //           next: 'request-cheque-book-quantity',
  //         },
  //         {
  //           type: 'input',
  //           name: 'request-cheque-book-quantity',
  //           'save-as': 'requestChequeBookQuantity',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'request-cheque-book-quantity-error',
  //           previous: 'request-cheque-book-leaves',
  //           next: 'request-cheque-book-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'request-cheque-book-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           error: 'request-cheque-book-confirm-error',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'cheque-book',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'request-cheque-book-quantity',
  //         },
  //         {
  //           type: 'select',
  //           name: 'request-cheque-book-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'request-cheque-book-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'request-cheque-book-account',
  //         },
  //       ],
  //       'account-linking-success': {
  //         type: 'alert',
  //         name: 'account-linking-success',
  //       },
  //       'savings-deposit': [
  //         {
  //           type: 'select',
  //           name: 'savings-deposit-debit-account',
  //           'save-as': 'debitAccount',
  //           options: 'fosa-accounts',
  //           previous: 'savings-page',
  //           next: 'savings-deposit-account',
  //           error: 'savings-deposit-debit-account-error',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'get-savings-accounts',
  //             success: 'savings-deposit-account',
  //             error: 'savings-accounts-error',
  //             cache: true,
  //             'cache-path': 'global-constants',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.response.savings',
  //                 'format-as': 'savings-accounts',
  //                 'save-as': 'savings-accounts',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'select',
  //           name: 'savings-deposit-account',
  //           'save-as': 'creditAccount',
  //           options: 'savings-accounts',
  //           error: 'savings-deposit-account-error',
  //           previous: 'savings-deposit-debit-account',
  //           next: 'savings-deposit-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'savings-deposit-amount',
  //           'save-as': 'amount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=1',
  //             },
  //           ],
  //           previous: 'savings-deposit-account',
  //           next: 'savings-deposit-confirm',
  //           error: 'savings-deposit-amount-error',
  //         },
  //         {
  //           type: 'select',
  //           name: 'savings-deposit-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           previous: 'savings-deposit-amount',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'deposit-to-savings',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'savings-deposit-confirm-error',
  //         },
  //       ],
  //       'loan-balance-error': {
  //         type: 'select',
  //         name: 'loan-balance-error',
  //         options: 'yes-no-options',
  //         error: 'loan-balance-error-error',
  //         action: 'navigate',
  //         'on-accept': 'client-page',
  //         'on-cancel': 'logout',
  //       },
  //       'fullstatement-email-error': {
  //         type: 'select',
  //         name: 'fullstatement-email-error',
  //         options: 'yes-no-options',
  //         error: 'fullstatement-email-error-error',
  //         action: 'navigate',
  //         'on-accept': 'client-page',
  //         'on-cancel': 'logout',
  //       },
  //       'loan-application': [
  //         {
  //           type: 'select',
  //           name: 'loan-application-debit-account',
  //           'save-as': 'debitAccount',
  //           options: 'customer-accounts',
  //           error: 'loan-application-debit-account-error',
  //           previous: 'loans-page',
  //           next: 'loan-application-amount',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'loan-products',
  //             success: 'loan-products',
  //             error: 'loan-products',
  //             cache: true,
  //             'cache-path': 'global-constants',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.response.loan_products',
  //                 'save-as': 'loan-products',
  //                 'format-as': 'loanProducts',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'select',
  //           name: 'loan-products',
  //           'save-as': 'product',
  //           options: 'loan-products',
  //           previous: 'loan-application-debit-account',
  //           next: 'loan-application-amount',
  //           error: 'loan-products-error',
  //         },
  //         {
  //           type: 'input',
  //           name: 'loan-application-amount',
  //           'save-as': 'amount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               arguments: 'min = 10',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'loan-application-amount-error',
  //           previous: 'loan-application-debit-account',
  //           next: 'loan-application-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'loan-application-confirm',
  //           options: 'confirm-options',
  //           charges: true,
  //           previous: 'loan-application-amount',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'loan-application',
  //             success: 'api-success',
  //             error: 'api-success',
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'loan-application-confirm-error',
  //         },
  //       ],
  //       'registration-error': {
  //         type: 'alert',
  //         name: 'registration-error',
  //       },
  //       balance: [
  //         {
  //           type: 'select',
  //           name: 'balance-account',
  //           'save-as': 'balanceDebitAccount',
  //           options: 'customer-accounts',
  //           'options-template': 'account-options-template',
  //           error: 'balance-account-error',
  //           previous: 'client-page',
  //           next: 'balance-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'balance-confirm',
  //           options: 'confirm-options',
  //           previous: 'balance-account',
  //           action: 'transact',
  //           charges: true,
  //           'external-fetch': {
  //             route: 'balance',
  //             success: 'balance-api-success',
  //             error: 'api-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.response.actual_balance',
  //                 'save-as': 'actual-balance',
  //               },
  //               {
  //                 path: 'data.response.available_balance',
  //                 'save-as': 'available-balance',
  //               },
  //             ],
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'balance-confirm-error',
  //         },
  //         {
  //           type: 'select',
  //           name: 'balance-account-fosa',
  //           'save-as': 'balanceDebitAccount',
  //           options: 'fosa-accounts',
  //           'options-error': 'balance-account-fosa-options-error',
  //           error: 'balance-account-fosa-error',
  //           previous: 'balance-account',
  //           next: 'balance-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'balance-account-fosa',
  //           'save-as': 'balanceDebitAccount',
  //           options: 'fosa-accounts',
  //           'options-error': 'balance-account-fosa-options-error',
  //           error: 'balance-account-fosa-error',
  //           previous: 'balance-account',
  //           next: 'balance-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'balance-account-loan',
  //           'save-as': 'balanceDebitAccount',
  //           options: 'loan-accounts',
  //           'options-error': 'balance-account-loan-options-error',
  //           'options-template': 'account-options-template',
  //           error: 'balance-account-loan-error',
  //           previous: 'balance-account',
  //           next: 'balance-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'balance-account-fosa-options-error',
  //           options: 'yes-no-options',
  //           error: 'balance-account-fosa-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'balance-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'balance-account-loan-options-error',
  //           options: 'yes-no-options',
  //           error: 'balance-account-loan-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'balance-account',
  //         },
  //       ],
  //       'ft-mobile-to-wallet': [
  //         {
  //           type: 'select',
  //           name: 'ft-mobile-to-wallet-type',
  //           'save-as': 'billerRefAccount',
  //           options: [
  //             {
  //               label: 'My Phone',
  //               value: '__walletAccount',
  //               'jump-to': 'ft-mobile-to-wallet-debit-account',
  //             },
  //             {
  //               label: 'Other Phone',
  //               'jump-to': 'ft-mobile-to-wallet-other-number',
  //             },
  //           ],
  //           error: 'ft-mobile-to-wallet-type-error',
  //           previous: 'funds-transfer-page',
  //         },
  //         {
  //           type: 'input',
  //           name: 'ft-mobile-to-wallet-other-number',
  //           'save-as': 'billerRefAccount',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'ft-mobile-to-wallet-other-number-error',
  //           previous: 'ft-mobile-to-wallet-type',
  //           next: 'ft-mobile-to-wallet-debit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-mobile-to-wallet-debit-account',
  //           'save-as': 'fundsTransferDebitAccount',
  //           options: 'customer-accounts',
  //           'options-error': 'ft-mobile-to-wallet-debit-account-options-error',
  //           error: 'ft-mobile-to-wallet-debit-account-error',
  //           previous: 'ft-mobile-to-wallet-type',
  //           next: 'ft-mobile-to-wallet-amount',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'account-lookup-presentment',
  //             success: 'ft-mobile-to-wallet-amount',
  //             error: 'api-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.transaction_details.account_number',
  //                 'save-as': 'fundsTransferCreditAccount',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'input',
  //           name: 'ft-mobile-to-wallet-amount',
  //           'save-as': 'fundsTransferAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=5',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'ft-mobile-to-wallet-amount-error',
  //           previous: 'ft-mobile-to-wallet-debit-account',
  //           next: 'ft-mobile-to-wallet-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-mobile-to-wallet-confirm',
  //           options: 'yes-no-options',
  //           charges: false,
  //           error: 'ft-mobile-to-wallet-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'funds-transfer-mpesa',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'ft-mobile-to-wallet-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-mobile-to-wallet-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'ft-mobile-to-wallet-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'funds-transfer-page',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-mobile-to-wallet-credit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'ft-mobile-to-wallet-credit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'funds-transfer-page',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-same-account-error',
  //           options: 'yes-no-options',
  //           error: 'ft-same-account-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'ft-mobile-to-wallet-credit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-mobile-to-wallet-credit-account',
  //           'save-as': 'fundsTransferCreditAccount',
  //           options: [
  //             {
  //               label: 'TA2459486000043',
  //               value: 'TA2459486000043',
  //             },
  //           ],
  //           'options-error': 'ft-mobile-to-wallet-credit-account-options-error',
  //           error: 'ft-mobile-to-wallet-credit-account-error',
  //           previous: 'ft-mobile-to-wallet-type',
  //           next: 'ft-mobile-to-wallet-amount',
  //         },
  //       ],
  //       dstv: [
  //         {
  //           type: 'select',
  //           name: 'dstv-debit-account',
  //           'save-as': 'billPaymentDebitAccount',
  //           options: 'customer-accounts',
  //           'options-error': 'dstv-debit-account-options-error',
  //           error: 'dstv-debit-account-error',
  //           previous: 'bill-payment-page',
  //           next: 'dstv-credit-account',
  //         },
  //         {
  //           type: 'input',
  //           name: 'dstv-credit-account',
  //           'save-as': 'billPaymentCreditAccount',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'dstv-credit-account-error',
  //           previous: 'bill-payment-page',
  //           next: 'dstv-confirm',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'dstvPresentment',
  //             success: 'dstv-confirm',
  //             error: 'dstv-presentment-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.response.DueAmount',
  //                 'save-as': 'billPaymentAmount',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'input',
  //           name: 'dstv-amount',
  //           'save-as': 'billPaymentAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=200',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'dstv-amount-error',
  //           previous: 'dstv-debit-account',
  //           next: 'dstv-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'dstv-confirm',
  //           options: 'confirm-options',
  //           error: 'dstv-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'dstvPayment',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'dstv-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'dstv-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'dstv-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'dstv-credit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'dstv-presentment-error',
  //           options: 'yes-no-options',
  //           error: 'dstv-presentment-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //       ],
  //       deposit: [
  //         {
  //           type: 'select',
  //           name: 'deposit-debit-account',
  //           'save-as': 'depositAccountName',
  //           options: [
  //             {
  //               label: 'FOSA',
  //               value: 'FOSA',
  //               'jump-to': 'deposit-debit-account-fosa',
  //             },
  //           ],
  //           'options-template': 'account-options-template',
  //           'options-error': 'deposit-debit-account-options-error',
  //           error: 'deposit-debit-account-error',
  //           previous: 'funds-transfer-page',
  //           next: 'deposit-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'deposit-debit-account-fosa',
  //           'save-as': 'depositCreditAccount',
  //           options: 'customer-accounts',
  //           'options-error': 'deposit-debit-account-fosa-options-error',
  //           error: 'deposit-debit-account-fosa-error',
  //           previous: 'deposit-debit-account',
  //           next: 'deposit-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'deposit-debit-account-bosa',
  //           'save-as': 'depositCreditAccount',
  //           options: [
  //             {
  //               label: 'BOSA - 9878429323',
  //               value: '9878429323',
  //             },
  //             {
  //               label: 'BOSA - 1203973709129',
  //               value: '1203973709129',
  //             },
  //           ],
  //           'options-template': 'account-options-template',
  //           'options-error': 'deposit-debit-account-bosa-options-error',
  //           error: 'deposit-debit-account-error',
  //           previous: 'deposit-debit-account',
  //           next: 'deposit-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'deposit-amount',
  //           'save-as': 'depositAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               arguments: 'min = 10',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'deposit-amount-error',
  //           previous: 'deposit-debit-account',
  //           next: 'deposit-confirm',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             api: 'ukulima-api',
  //             route: 'depositPresentment',
  //             success: 'deposit-confirm',
  //             error: 'deposit-charges-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.transaction_details.charge_amount',
  //                 'save-as': 'charge',
  //               },
  //               {
  //                 path: 'data.transaction_details.excise_duty_amount',
  //                 'save-as': 'excise_duty',
  //               },
  //               {
  //                 path: 'esb_ref',
  //                 'save-as': 'esb_ref',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'select',
  //           name: 'deposit-confirm',
  //           options: 'confirm-options',
  //           previous: 'deposit-amount',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'deposit',
  //             success: 'mpesa-show-alert',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'deposit-confirm-error',
  //         },
  //         {
  //           type: 'select',
  //           name: 'deposit-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'deposit-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'client-page',
  //         },
  //         {
  //           type: 'select',
  //           name: 'deposit-debit-account-fosa-options-error',
  //           options: 'yes-no-options',
  //           error: 'deposit-debit-account-fosa-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'deposit-debit-account',
  //           'on-cancel': 'logout',
  //           previous: 'deposit-debit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'deposit-charges-error',
  //           options: 'yes-no-options',
  //           error: 'deposit-charges-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //       ],
  //       'electricity-power-prepaid': [
  //         {
  //           type: 'input',
  //           name: 'electricity-power-prepaid-credit-account',
  //           'save-as': 'billPaymentCreditAccount',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'electricity-power-prepaid-credit-account-error',
  //           previous: 'bill-payment-page',
  //           next: 'electricity-power-prepaid-debit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'electricity-power-prepaid-debit-account',
  //           'save-as': 'billPaymentDebitAccount',
  //           options: 'customer-accounts',
  //           'options-error':
  //             'electricity-power-prepaid-debit-account-options-error',
  //           error: 'electricity-power-prepaid-debit-account-error',
  //           previous: 'electricity-power-prepaid-credit-account',
  //           next: 'electricity-power-prepaid-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'electricity-power-prepaid-amount',
  //           'save-as': 'billPaymentAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=200',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'electricity-power-prepaid-amount-error',
  //           previous: 'electricity-power-prepaid-debit-account',
  //           next: 'electricity-power-prepaid-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'electricity-power-prepaid-confirm',
  //           options: 'confirm-options',
  //           error: 'electricity-power-prepaid-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'KplcPrepaidPayment',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'electricity-power-prepaid-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'electricity-power-prepaid-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error:
  //             'electricity-power-prepaid-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'electricity-power-prepaid-credit-account',
  //         },
  //       ],
  //       'set-atm-limits': [
  //         {
  //           type: 'skip',
  //           name: 'fetch-interswitch-cards',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'fetch-interswitch-cards',
  //             success: 'set-card-limit-card',
  //             error: 'fetch-interswitch-cards-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'field127',
  //                 'save-as': 'interswitch-cards',
  //                 'format-as': 'interswitch-cards',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'select',
  //           name: 'set-card-limit-card',
  //           'save-as': 'card',
  //           options: 'interswitch-cards',
  //           error: 'set-card-limit-card-error',
  //           previous: 'atm-cards-page',
  //           next: 'set-card-limit-transaction',
  //         },
  //         {
  //           type: 'select',
  //           name: 'set-card-limit-transaction',
  //           options: [
  //             {
  //               label: 'PoS Transaction',
  //               'jump-to': 'pos-amount',
  //             },
  //             {
  //               label: 'ATM Transaction',
  //               'jump-to': 'atm-amount',
  //             },
  //             {
  //               label: 'Online Transaction',
  //               'jump-to': 'online-amount',
  //             },
  //           ],
  //           error: 'set-card-limit-transaction-error',
  //           previous: 'set-card-limit-card',
  //         },
  //         {
  //           type: 'input',
  //           name: 'pos-amount',
  //           'save-as': 'amount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=1',
  //             },
  //           ],
  //           error: 'pos-amount-error',
  //           previous: 'set-card-limit-transaction',
  //           next: 'pos-count',
  //         },
  //         {
  //           type: 'input',
  //           name: 'atm-amount',
  //           'save-as': 'amount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=1',
  //             },
  //           ],
  //           error: 'atm-amount-error',
  //           previous: 'set-card-limit-transaction',
  //           next: 'atm-count',
  //         },
  //         {
  //           type: 'input',
  //           name: 'online-amount',
  //           'save-as': 'amount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=1',
  //             },
  //           ],
  //           error: 'online-amount-error',
  //           previous: 'set-card-limit-transaction',
  //           next: 'online-count',
  //         },
  //         {
  //           type: 'input',
  //           name: 'pos-count',
  //           'save-as': 'count',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'pos-count-error',
  //           previous: 'pos-amount',
  //           next: 'pos-confirm',
  //         },
  //         {
  //           type: 'input',
  //           name: 'atm-count',
  //           'save-as': 'count',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'atm-count-error',
  //           previous: 'atm-amount',
  //           next: 'atm-confirm',
  //         },
  //         {
  //           type: 'input',
  //           name: 'online-count',
  //           'save-as': 'count',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'online-count-error',
  //           previous: 'online-amount',
  //           next: 'online-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'pos-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           error: 'pos-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'pos-limit',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'pos-count',
  //         },
  //         {
  //           type: 'select',
  //           name: 'atm-confirm',
  //           options: 'confirm-options',
  //           charges: true,
  //           error: 'atm-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'atm-limit',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'atm-count',
  //         },
  //         {
  //           type: 'select',
  //           name: 'online-confirm',
  //           options: 'confirm-options',
  //           charges: true,
  //           error: 'online-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'online-limit',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'online-count',
  //         },
  //         {
  //           type: 'select',
  //           name: 'card-lookup-error',
  //           options: 'yes-no-options',
  //           error: 'card-lookup-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'bill-payment-page',
  //         },
  //       ],
  //       'bankers-cheque-request': [
  //         {
  //           type: 'select',
  //           name: 'bankers-cheque-credit-account',
  //           'save-as': 'chequeCreditAccount',
  //           options: 'customer-accounts',
  //           'options-error': 'bankers-cheque-collection-date-error',
  //           previous: 'request-bankers-cheque-payable-to',
  //           next: 'bankers-cheque-description',
  //         },
  //         {
  //           type: 'input',
  //           name: 'request-bankers-cheque-payable-to',
  //           'save-as': 'bankersChequePayableTo',
  //           validation: [
  //             {
  //               name: 'matchesLength',
  //               type: 'joi',
  //               arguments: 'length=10',
  //             },
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'request-bankers-cheque-payable-to-error',
  //           previous: 'cheques-page',
  //           next: 'bankers-cheque-credit-account',
  //         },
  //         {
  //           type: 'input',
  //           name: 'bankers-cheque-description',
  //           'save-as': 'bankersChequeDesc',
  //           validation: [
  //             {
  //               name: 'isStatement',
  //               type: 'custom',
  //             },
  //           ],
  //           error: 'bankers-cheque-description-error',
  //           previous: 'cheques-page',
  //           next: 'request-bankers-cheque-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'bankers-cheque-collection-date',
  //           'save-as': 'chequeCollectionDate',
  //           validation: [
  //             {
  //               name: 'isValidDate',
  //               type: 'custom',
  //               arguments: 'format=YYYY-MM-DD',
  //             },
  //           ],
  //           error: 'bankers-cheque-collection-date-error',
  //           previous: 'bankers-cheque-credit-account',
  //           next: 'request-bankers-cheque-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'request-bankers-cheque-amount',
  //           'save-as': 'bankersChequeAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=100',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'request-bankers-cheque-amount-error',
  //           previous: 'bankers-cheque-description',
  //           next: 'bankers-cheque-branch-search',
  //         },
  //         {
  //           type: 'input',
  //           name: 'bankers-cheque-branch-search',
  //           action: 'search',
  //           'search-options': {
  //             limit: 5,
  //             dataset: 'branch-options',
  //             saveTo: 'branch-search-options',
  //           },
  //           errors: [
  //             'branch-no-results-error',
  //             'branch-result-limit-exceeded-error',
  //           ],
  //           previous: 'request-bankers-cheque-amount',
  //           next: 'bankers-cheque-branch-result',
  //         },
  //         {
  //           type: 'select',
  //           name: 'bankers-cheque-branch-result',
  //           'save-as': 'BankersChequeBranch',
  //           options: 'branch-search-options',
  //           error: 'bankers-cheque-branch-result-error',
  //           previous: 'bankers-cheque-branch-search',
  //           next: 'request-bankers-cheque-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'request-bankers-cheque-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           error: 'request-bankers-cheque-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'bankers-cheque',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'bankers-cheque-branch-result',
  //         },
  //       ],
  //       'school-fees': [
  //         {
  //           type: 'select',
  //           name: 'school-fees-debit-account',
  //           'save-as': 'schoolFeesDebitAccount',
  //           options: [
  //             {
  //               label: 'EWALLET - TA2459032016492',
  //               value: 'TA2459032016492',
  //               type: 'EWALLET',
  //             },
  //             {
  //               label: 'BOSA - 9878429323',
  //               value: '9878429323',
  //             },
  //             {
  //               label: 'BOSA - 1203973709129',
  //               value: '1203973709129',
  //             },
  //           ],
  //           error: 'school-fees-debit-account-error',
  //           previous: 'bill-payment-page',
  //           next: 'school-fees-credit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'school-fees-credit-account',
  //           'save-as': 'schoolFeesCreditAccount',
  //           options: [
  //             {
  //               label: 'Berending Junior Secondary School',
  //               value: '9090909564454r',
  //             },
  //             {
  //               label: 'Cates International Academy',
  //               value: '8980909090454',
  //             },
  //             {
  //               label: 'Marina International School',
  //               value: '576778734343443',
  //             },
  //             {
  //               label: "St Augustine's Secondary School",
  //               value: '123476568',
  //             },
  //           ],
  //           error: 'school-fees-credit-account-error',
  //           next: 'school-fees-child-name',
  //           previous: 'school-fees-debit-account',
  //         },
  //         {
  //           type: 'input',
  //           name: 'school-fees-child-name',
  //           'save-as': 'schoolFeesChildName',
  //           'format-as': 'createSpaces',
  //           validation: [
  //             {
  //               name: 'isStatement',
  //               type: 'custom',
  //             },
  //           ],
  //           error: 'school-fees-child-name-error',
  //           previous: 'school-fees-credit-account',
  //           next: 'school-fees-child-reg',
  //         },
  //         {
  //           type: 'input',
  //           name: 'school-fees-child-reg',
  //           'save-as': 'schoolFeesChildReg',
  //           validation: [
  //             {
  //               name: 'isStudentId',
  //               type: 'custom',
  //             },
  //           ],
  //           error: 'school-fees-child-reg-error',
  //           previous: 'school-fees-child-name',
  //           next: 'school-fees-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'school-fees-amount',
  //           'save-as': 'schoolFeesAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=100',
  //             },
  //           ],
  //           error: 'school-fees-amount-error',
  //           previous: 'school-fees-child-reg',
  //           next: 'school-fees-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'school-fees-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'school-fees-bill-payment',
  //             success: 'api-success',
  //             error: 'api-success',
  //           },
  //           error: 'school-fees-confirm-error',
  //           'on-cancel': 'client-page',
  //           previous: 'school-fees-amount',
  //         },
  //       ],
  //       'star-times': [
  //         {
  //           type: 'input',
  //           name: 'start-times-credit-account',
  //           'save-as': 'billPaymentCreditAccount',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'start-times-credit-account-error',
  //           previous: 'bill-payment-page',
  //           next: 'start-times-debit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'start-times-debit-account',
  //           'save-as': 'billPaymentDebitAccount',
  //           options: 'fosa-accounts',
  //           'options-error': 'start-times-debit-account-options-error',
  //           error: 'start-times-debit-account-error',
  //           previous: 'start-times-credit-account',
  //           next: 'start-times-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'start-times-amount',
  //           'save-as': 'billPaymentAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=200',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'start-times-amount-error',
  //           previous: 'start-times-debit-account',
  //           next: 'start-times-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'start-times-confirm',
  //           options: 'confirm-options',
  //           error: 'start-times-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'accessKenyaPayment',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'start-times-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'start-times-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'start-times-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'start-times-credit-account',
  //         },
  //       ],
  //       'account-phone-number-look-up-error': {
  //         type: 'select',
  //         name: 'account-phone-number-look-up-error',
  //         options: 'yes-no-options',
  //         error: 'account-phone-number-look-up-error-error',
  //         action: 'navigate',
  //         'on-accept': 'client-page',
  //         'on-cancel': 'logout',
  //       },
  //       'registration-cancel': {
  //         type: 'alert',
  //         name: 'registration-cancel',
  //       },
  //       'request-atm': [
  //         {
  //           type: 'select',
  //           name: 'request-atm-account',
  //           'save-as': 'requestAtmAccount',
  //           options: 'customer-accounts',
  //           'options-error': 'request-atm-account-options-error',
  //           error: 'request-atm-account-error',
  //           previous: 'atm-cards-page',
  //           next: 'request-atm-account-types',
  //         },
  //         {
  //           type: 'select',
  //           name: 'request-atm-account-types',
  //           'save-as': 'requestAtmType',
  //           options: [
  //             {
  //               label: 'Classic Card',
  //               value: 'Classic Card',
  //             },
  //             {
  //               label: 'Platinum Card',
  //               value: 'Platinum Card',
  //             },
  //           ],
  //           error: 'request-atm-account-types-error',
  //           previous: 'request-atm-account',
  //           next: 'request-atm-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'request-atm-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           error: 'request-atm-confirm-error',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'request-atm-card',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'request-atm-account-types',
  //         },
  //         {
  //           type: 'select',
  //           name: 'request-atm-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'request-atm-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //         {
  //           type: 'select',
  //           name: 'fetch-interswitch-cards-error',
  //           options: 'yes-no-options',
  //           error: 'fetch-interswitch-cards-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //       ],
  //       'card-linking': [
  //         {
  //           type: 'input',
  //           name: 'card-linking-account',
  //           'save-as': 'cardLinkingAccount',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'card-linking-account-error',
  //           previous: 'customer-requests-page',
  //           next: 'card-linking-id',
  //         },
  //         {
  //           type: 'input',
  //           name: 'card-linking-id',
  //           'save-as': 'cardLinkingId',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'card-linking-id-error',
  //           previous: 'card-linking-account',
  //           next: 'card-linking-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'card-linking-confirm',
  //           charges: true,
  //           options: 'confirm-options',
  //           error: 'card-linking-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'card-linking',
  //             success: 'card-linking-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'card-linking-id',
  //         },
  //         {
  //           type: 'alert',
  //           name: 'card-linking-success',
  //         },
  //       ],
  //       'mpesa-c2b': [
  //         {
  //           type: 'select',
  //           name: 'deposit-mpesa-debit-account',
  //           'save-as': 'depositDebitAccount',
  //           options: 'savings-accounts',
  //           error: 'deposit-mpesa-debit-account-error',
  //           previous: 'funds-transfer-page',
  //           next: 'deposit-mpesa-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'deposit-mpesa-amount',
  //           'save-as': 'depositAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               arguments: 'min=10',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'deposit-mpesa-amount-error',
  //           previous: 'deposit-mpesa-debit-account',
  //           next: 'deposit-mpesa-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'deposit-mpesa-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           previous: 'deposit-mpesa-amount',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             api: 'mock',
  //             route: 'mpesa-c2b',
  //             success: 'mpesa-c2b-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'deposit-mpesa-confirm-error',
  //         },
  //       ],
  //       'unblock-atm': [
  //         {
  //           type: 'skip',
  //           name: 'fetch-interswitch-cards',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'fetch-interswitch-cards',
  //             success: 'unblock-atm-account',
  //             error: 'fetch-interswitch-cards-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'field127',
  //                 'save-as': 'interswitch-cards',
  //                 'format-as': 'interswitch-cards',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'select',
  //           name: 'unblock-atm-account',
  //           'save-as': 'unblockAtmAccount',
  //           options: 'interswitch-cards',
  //           'options-error': 'unblock-atm-account-options-error',
  //           error: 'unblock-atm-account-error',
  //           previous: 'atm-cards-page',
  //           next: 'unblock-atm-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'unblock-atm-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           error: 'unblock-atm-confirm-error',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'unblock-atm',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'unblock-atm-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'unblock-atm-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'unblock-atm-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'unblock-atm-account',
  //         },
  //       ],
  //       'account-mandates': [
  //         {
  //           type: 'select',
  //           name: 'account-mandates-debit-account',
  //           'save-as': 'account',
  //           options: 'savings-accounts',
  //           error: 'account-mandates-debit-account-account-error',
  //           previous: 'customer-requests-page',
  //           next: 'account-mandates-id',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'account-mandates-lookup',
  //             success: 'account-mandates-id',
  //             error: 'account-mandates-lookup-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'Result',
  //                 'save-as': 'account-mandates',
  //                 error: 'account-mandates-account-options-error',
  //                 'format-as': 'account-mandates',
  //                 validation: {
  //                   name: 'isText',
  //                   type: 'joi',
  //                 },
  //               },
  //             ],
  //             'parameter-checks': {
  //               'account-mandates': {
  //                 'is-less-than': '1',
  //                 'redirect-to': 'account-mandates-account-options-error',
  //               },
  //             },
  //           },
  //         },
  //         {
  //           type: 'select',
  //           name: 'account-mandates-id',
  //           'save-as': 'code',
  //           options: 'account-mandates',
  //           error: 'account-mandates-id-error',
  //           previous: 'account-mandates-debit-account',
  //           next: 'account-mandates-type',
  //         },
  //         {
  //           type: 'select',
  //           name: 'account-mandates-type',
  //           options: [
  //             {
  //               label: 'Approve',
  //               'jump-to': 'account-mandates-confirm',
  //             },
  //             {
  //               label: 'Reject',
  //               'jump-to': 'account-mandates-reject-confirm',
  //             },
  //           ],
  //           error: 'account-mandates-type-error',
  //           previous: 'account-mandates-id',
  //         },
  //         {
  //           type: 'select',
  //           name: 'account-mandates-confirm',
  //           options: 'confirm-options',
  //           charges: true,
  //           error: 'account-mandates-confirm-error',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'account-mandates-approve',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'account-mandates-type',
  //         },
  //         {
  //           type: 'select',
  //           name: 'account-mandates-reject-confirm',
  //           options: 'confirm-options',
  //           charges: true,
  //           error: 'account-mandates-reject-confirm-error',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'account-mandates-reject',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'account-mandates-type',
  //         },
  //         {
  //           type: 'select',
  //           name: 'account-mandates-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'account-mandates-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'account-mandates-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'account-mandates-lookup-error',
  //           options: 'yes-no-options',
  //           error: 'account-mandates-lookup-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'account-requests-page',
  //         },
  //       ],
  //       donations: [
  //         {
  //           type: 'input',
  //           name: 'donations-credit-account',
  //           'save-as': 'billPaymentCreditAccount',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'donations-credit-account-error',
  //           previous: 'bill-payment-page',
  //           next: 'donations-debit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'donations-debit-account',
  //           'save-as': 'billPaymentDebitAccount',
  //           options: 'savings-accounts',
  //           'options-error': 'donations-debit-account-options-error',
  //           error: 'donations-debit-account-error',
  //           previous: 'donations-credit-account',
  //           next: 'donations-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'donations-amount',
  //           'save-as': 'billPaymentAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=200',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'donations-amount-error',
  //           previous: 'donations-debit-account',
  //           next: 'donations-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'donations-confirm',
  //           options: 'confirm-options',
  //           charges: true,
  //           error: 'donations-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'donations-bill-payment',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'donations-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'donations-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'donations-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //       ],
  //       nhif: [
  //         {
  //           type: 'select',
  //           name: 'nhif-debit-account',
  //           'save-as': 'billPaymentDebitAccount',
  //           options: 'customer-accounts',
  //           'options-error': 'nhif-debit-account-options-error',
  //           error: 'nhif-debit-account-error',
  //           previous: 'bill-payment-page',
  //           next: 'nhif-member-type',
  //         },
  //         {
  //           type: 'select',
  //           name: 'nhif-member-type',
  //           'save-as': 'billPaymentMemberType',
  //           options: [
  //             {
  //               label: 'NHIF Individual Account',
  //               value: false,
  //             },
  //             {
  //               label: 'NHIF Corporate Account',
  //               value: true,
  //             },
  //           ],
  //           'options-error': 'nhif-member-types-options-error',
  //           error: 'nhif-member-type-error',
  //           previous: 'nhif-debit-account',
  //           next: 'nhif-credit-account',
  //         },
  //         {
  //           type: 'input',
  //           name: 'nhif-credit-account',
  //           'save-as': 'billPaymentCreditAccount',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'nhif-credit-account-error',
  //           previous: 'bill-payment-page',
  //           next: 'nhif-confirm',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             api: 'ukulima-api',
  //             route: 'nhifPresentment',
  //             success: 'nhif-confirm',
  //             error: 'nhif-presentment-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.response.Amount',
  //                 'save-as': 'billPaymentAmount',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'input',
  //           name: 'nhif-amount',
  //           'save-as': 'billPaymentAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=200',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'nhif-amount-error',
  //           previous: 'nhif-debit-account',
  //           next: 'nhif-penalty-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'nhif-penalty-amount',
  //           'save-as': 'billPaymentPenaltyAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=200',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'nhif-penalty-amount-error',
  //           previous: 'nhif-amount',
  //           next: 'nhif-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'nhif-confirm',
  //           options: 'confirm-options',
  //           error: 'nhif-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'nhifPayment',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'nhif-debit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'nhif-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'nhif-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'nhif-credit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'nhif-member-types-options-error',
  //           options: 'yes-no-options',
  //           error: 'nhif-member-types-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'bill-payment-page',
  //         },
  //         {
  //           type: 'select',
  //           name: 'nhif-presentment-error',
  //           options: 'yes-no-options',
  //           error: 'nhif-presentment-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //       ],
  //       'block-atm': [
  //         {
  //           type: 'skip',
  //           name: 'fetch-interswitch-cards',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'fetch-interswitch-cards',
  //             success: 'block-atm-account',
  //             error: 'fetch-interswitch-cards-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'field127',
  //                 'save-as': 'interswitch-cards',
  //                 'format-as': 'interswitch-cards',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'select',
  //           name: 'block-atm-account',
  //           'save-as': 'blockAtmAccount',
  //           options: 'interswitch-cards',
  //           'options-error': 'block-atm-account-options-error',
  //           error: 'block-atm-account-error',
  //           previous: 'atm-cards-page',
  //           next: 'block-atm-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'block-atm-confirm',
  //           options: 'confirm-options',
  //           charges: true,
  //           error: 'block-atm-confirm-error',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'block-atm',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'block-atm-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'block-atm-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'block-atm-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'block-atm-account',
  //         },
  //       ],
  //       logout: {
  //         name: 'logout',
  //       },
  //       'email-change': [
  //         {
  //           type: 'input',
  //           name: 'email-change-current-email',
  //           validation: [
  //             {
  //               name: 'isValidEmail',
  //               type: 'custom',
  //             },
  //             {
  //               name: 'isCurrentEmail',
  //               type: 'custom',
  //             },
  //           ],
  //           errors: [
  //             'email-change-invalid-email-error',
  //             'email-change-wrong-email-error',
  //           ],
  //         },
  //         {
  //           type: 'input',
  //           name: 'email-change-new-email',
  //           'save-as': 'new-email',
  //           validation: [
  //             {
  //               name: 'isValidEmail',
  //               type: 'custom',
  //             },
  //           ],
  //           error: 'email-change-invalid-new-email-error',
  //         },
  //         {
  //           type: 'select',
  //           name: 'email-change-confirm',
  //           options: 'confirm-options',
  //           error: 'email-change-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             api: 'mock',
  //             route: 'email-change',
  //             success: 'email-change-success',
  //             error: 'email-change-error',
  //           },
  //           'on-cancel': 'settings-page',
  //         },
  //       ],
  //       'funds-transfer-savings-to-savings': [
  //         {
  //           type: 'select',
  //           name: 'ft-savings-to-savings-debit-account',
  //           'save-as': 'fundsTransferDebitAccount',
  //           options: 'customer-accounts',
  //           'options-error':
  //             'ft-savings-to-savings-debit-account-options-error',
  //           error: 'ft-savings-to-savings-debit-account-error',
  //           previous: 'funds-transfer-other-accounts-page',
  //           next: 'ft-savings-to-savings-credit-account',
  //         },
  //         {
  //           type: 'input',
  //           name: 'ft-savings-to-savings-credit-account',
  //           'save-as': 'fundsTransferCreditAccount',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           'format-as': '',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'internal-account-lookup',
  //             success: 'ft-savings-to-savings-amount',
  //             error: 'api-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'field54',
  //                 'save-as': 'receiverName',
  //               },
  //               {
  //                 path: 'field65',
  //                 'save-as': 'internalTransferCustomerCbsId',
  //                 'format-as': 'internalTransferCustomerCbsId',
  //               },
  //               {
  //                 path: 'field98',
  //                 'save-as': 'internalTransferCustomerAccountType',
  //                 'format-as': 'internalTransferCustomerAccountType',
  //               },
  //             ],
  //           },
  //           error: 'ft-savings-to-savings-credit-account-error',
  //           previous: 'ft-savings-to-savings-debit-account',
  //         },
  //         {
  //           type: 'input',
  //           name: 'ft-savings-to-savings-amount',
  //           'save-as': 'fundsTransferAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=10',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'ft-savings-to-savings-amount-error',
  //           previous: 'ft-savings-to-savings-credit-account',
  //           next: 'ft-savings-to-savings-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-savings-to-savings-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           error: 'ft-savings-to-savings-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'funds-transfer-savings-to-savings',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'ft-savings-to-savings-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-same-account-error',
  //           options: 'yes-no-options',
  //           error: 'ft-same-account-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'ft-own-accounts-credit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-savings-to-savings-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'ft-savings-to-savings-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'funds-transfer-page',
  //         },
  //       ],
  //       'funds-transfer-to-other-banks': [
  //         {
  //           type: 'select',
  //           name: 'transfer-to-other-banks-credit-bank',
  //           'save-as': 'fundsTransferCreditAccount',
  //           options: 'bank-options',
  //           'options-error':
  //             'transfer-to-other-banks-credit-account-options-error',
  //           error: 'transfer-to-other-banks--credit-bank-error',
  //           previous: 'funds-transfer-page',
  //           next: 'transfer-to-other-banks-credit-account',
  //         },
  //         {
  //           type: 'input',
  //           name: 'transfer-to-other-banks-credit-account',
  //           'save-as': 'fundsTransferCreditAccountDraft',
  //           validation: [
  //             {
  //               name: 'isAlphaNumeric',
  //               type: 'custom',
  //             },
  //           ],
  //           'format-as': 'capitalize',
  //           next: 'transfer-to-other-banks-debit-account',
  //           error: 'transfer-to-other-banks-credit-account-error',
  //           previous: 'transfer-to-other-banks-credit-bank',
  //         },
  //         {
  //           type: 'select',
  //           name: 'transfer-to-other-banks-debit-account',
  //           'save-as': 'fundsTransferDebitAccount',
  //           options: 'customer-accounts',
  //           'options-template': 'account-options-template',
  //           'options-error':
  //             'transfer-to-other-banks-debit-account-options-error',
  //           error: 'transfer-to-other-banks-debit-account-error',
  //           previous: 'transfer-to-other-banks-credit-account',
  //           next: 'transfer-to-other-banks-credit-bank',
  //         },
  //         {
  //           type: 'input',
  //           name: 'transfer-to-other-banks-amount',
  //           'save-as': 'fundsTransferAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=10',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'transfer-to-other-banks-amount-error',
  //           previous: 'transfer-to-other-banks-debit-account',
  //           next: 'transfer-to-other-banks-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'transfer-to-other-banks-confirm',
  //           options: 'confirm-options',
  //           charges: true,
  //           error: 'transfer-to-other-banks-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'transfer-to-other-banks',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'transfer-to-other-banks-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-same-account-error',
  //           options: 'yes-no-options',
  //           error: 'ft-same-account-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'ft-own-accounts-credit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'transfer-to-other-banks-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'transfer-to-other-banks-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'funds-transfer-page',
  //         },
  //       ],
  //       'technical-error': {
  //         type: 'alert',
  //         name: 'technical-error',
  //       },
  //       'loan-balance': [
  //         {
  //           type: 'select',
  //           name: 'loan-balance-account',
  //           'save-as': 'debitAccount',
  //           options: 'customer-accounts',
  //           'options-template': 'account-options-template',
  //           error: 'loan-balance-account-error',
  //           previous: 'loans-page',
  //           next: 'loan-balance-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'loan-balance-confirm',
  //           options: 'confirm-options',
  //           previous: 'client-page',
  //           charges: true,
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'loan-balance',
  //             success: 'loan-balance-success',
  //             error: 'loan-balance-success',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.response.loan_balances',
  //                 'save-as': 'loan-balance',
  //                 'format-as': 'loan-balance',
  //               },
  //             ],
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'loan-balance-confirm-error',
  //         },
  //         {
  //           type: 'select',
  //           name: 'balance-account-fosa-options-error',
  //           options: 'yes-no-options',
  //           error: 'balance-account-fosa-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'balance-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'balance-account-loan-options-error',
  //           options: 'yes-no-options',
  //           error: 'balance-account-loan-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'balance-account',
  //         },
  //       ],
  //       'standing-orders-internal': [
  //         {
  //           type: 'select',
  //           name: 'so-b2b-debit-account',
  //           'save-as': 'soDebitAccount',
  //           options: 'savings-accounts',
  //           'options-error': 'so-b2b-debit-account-options-error',
  //           error: 'so-b2b-debit-account-error',
  //           previous: 'create-standing-orders-page',
  //           next: 'so-b2b-credit-account',
  //         },
  //         {
  //           type: 'input',
  //           name: 'so-b2b-credit-account',
  //           'save-as': 'soCreditAccount',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'so-b2b-credit-account-error',
  //           previous: 'so-b2b-debit-account',
  //           next: 'so-b2b-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'so-b2b-amount',
  //           'save-as': 'soAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=1',
  //             },
  //           ],
  //           error: 'so-b2b-amount-error',
  //           previous: 'so-b2b-credit-account',
  //           next: 'so-b2b-start-date',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'internal-account-lookup',
  //             success: 'so-b2b-start-date',
  //             error: 'so-b2b-start-date',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.name',
  //                 'save-as': 'internal-transfer-customer',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'input',
  //           name: 'so-b2b-start-date',
  //           'save-as': 'soStartDate',
  //           validation: [
  //             {
  //               name: 'isValidDate',
  //               type: 'custom',
  //               arguments: 'format=YYYY-MM-DD',
  //             },
  //           ],
  //           'format-as': 'so-date',
  //           error: 'so-b2b-start-date-error',
  //           previous: 'so-b2b-amount',
  //           next: 'so-b2b-end-date',
  //         },
  //         {
  //           type: 'input',
  //           name: 'so-b2b-end-date',
  //           'save-as': 'soEndDate',
  //           validation: [
  //             {
  //               name: 'isValidDate',
  //               type: 'custom',
  //               arguments: 'format=YYYY-MM-DD',
  //             },
  //           ],
  //           'format-as': 'so-date',
  //           error: 'so-b2b-end-date-error',
  //           previous: 'so-b2b-start-date',
  //           next: 'so-b2b-frequency',
  //         },
  //         {
  //           type: 'select',
  //           name: 'so-b2b-frequency',
  //           'save-as': 'soFrequency',
  //           options: [
  //             {
  //               label: 'Daily',
  //               value: 'D',
  //             },
  //             {
  //               label: 'Weekly',
  //               value: 'W',
  //             },
  //             {
  //               label: 'Monthly',
  //               value: 'M',
  //             },
  //             {
  //               label: 'Yearly',
  //               value: 'Y',
  //             },
  //           ],
  //           error: 'so-b2b-frequency-error',
  //           previous: 'so-b2b-end-date',
  //           next: 'so-b2b-beneficiary-name',
  //         },
  //         {
  //           type: 'input',
  //           name: 'so-b2b-beneficiary-name',
  //           'save-as': 'soBeneficiaryName',
  //           'format-as': 'createSpaces',
  //           validation: [
  //             {
  //               name: 'isStatement',
  //               type: 'custom',
  //             },
  //           ],
  //           error: 'so-b2b-beneficiary-name-error',
  //           previous: 'so-b2b-frequency',
  //           next: 'so-b2b-instruction',
  //         },
  //         {
  //           type: 'input',
  //           name: 'so-b2b-member-number',
  //           'save-as': 'soMemberNumber',
  //           skip: true,
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'so-b2b-member-number-error',
  //           previous: 'so-b2b-beneficiary-name',
  //           next: 'so-b2b-instruction',
  //         },
  //         {
  //           type: 'input',
  //           name: 'so-b2b-instruction',
  //           'save-as': 'soInstruction',
  //           'format-as': 'createSpaces',
  //           validation: [
  //             {
  //               name: 'isStatement',
  //               type: 'custom',
  //             },
  //           ],
  //           error: 'so-b2b-instruction-error',
  //           previous: 'so-b2b-beneficiary-name',
  //           next: 'so-b2b-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'so-b2b-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           previous: 'so-b2b-instruction',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'standing-orders-internal',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'so-b2b-confirm-error',
  //         },
  //         {
  //           type: 'select',
  //           name: 'so-b2b-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'so-b2b-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'client-page',
  //         },
  //       ],
  //       churches: [
  //         {
  //           type: 'select',
  //           name: 'church-debit-account',
  //           'save-as': 'churchDebitAccount',
  //           options: 'savings-accounts',
  //           error: 'church-debit-account-error',
  //           previous: 'bill-payment-page',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'church-list-presentment',
  //             success: 'church-account-number',
  //             error: 'church-list-accounts-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'data',
  //                 'save-as': 'church-list',
  //                 'format-as': 'faulu-schools',
  //               },
  //             ],
  //             'parameter-checks': {
  //               'church-list': {
  //                 'is-less-than': '1',
  //                 'redirect-to': 'school-list-accounts-error',
  //               },
  //             },
  //           },
  //         },
  //         {
  //           type: 'select',
  //           name: 'church-account-number',
  //           options: 'church-list',
  //           'options-error': 'church-list-accounts-error',
  //           'save-as': 'fauluChurch',
  //           error: 'church-account-number-error',
  //           previous: 'church-debit-account',
  //           next: 'church-narration',
  //         },
  //         {
  //           type: 'input',
  //           name: 'church-narration',
  //           'save-as': 'churchNarration',
  //           validation: [
  //             {
  //               name: 'isStatement',
  //               type: 'custom',
  //             },
  //           ],
  //           error: 'church-narration-error',
  //           previous: 'church-account-number',
  //           next: 'church-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'church-amount',
  //           'save-as': 'churchAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=1',
  //             },
  //           ],
  //           error: 'church-amount-error',
  //           previous: 'church-narration',
  //           next: 'church-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'church-confirm',
  //           options: 'confirm-options',
  //           charges: true,
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'church-bill-payment',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           error: 'church-confirm-error',
  //           'on-cancel': 'client-page',
  //           previous: 'church-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'church-account-error',
  //           options: 'yes-no-options',
  //           error: 'church-account-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //         {
  //           type: 'select',
  //           name: 'church-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'church-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //         {
  //           type: 'select',
  //           name: 'church-list-accounts-error',
  //           options: 'yes-no-options',
  //           error: 'church-list-accounts-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //       ],
  //       'savings-products': [
  //         {
  //           type: 'select',
  //           name: 'savings-products-confirm',
  //           options: 'confirm-options',
  //           previous: 'savings-page',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'savings-products',
  //             success: 'api-success',
  //             error: 'savings-products-error',
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'savings-products-confirm-error',
  //         },
  //       ],
  //       'account-linking': [
  //         {
  //           type: 'input',
  //           name: 'account-linking-id',
  //           'save-as': 'accountLinkingId',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'unlinked-accounts-lookup',
  //             success: 'account-linking-accounts',
  //             error: 'api-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'field54',
  //                 'save-as': 'unlinked-accounts',
  //                 'format-as': 'unlinked-accounts',
  //               },
  //             ],
  //             'parameter-checks': {
  //               'unlinked-accounts': {
  //                 'is-less-than': '1',
  //                 'redirect-to': 'account-linking-options-error',
  //               },
  //             },
  //           },
  //           error: 'account-linking-id-error',
  //           previous: 'account-linking-account',
  //           next: 'account-linking-accounts',
  //         },
  //         {
  //           type: 'select',
  //           name: 'account-linking-accounts',
  //           'save-as': 'linkAccount',
  //           options: 'unlinked-accounts',
  //           error: 'account-linking-accounts-error',
  //           'options-error': 'account-linking-options-error',
  //           previous: 'account-mandates-debit-account',
  //           next: 'account-linking-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'account-linking-confirm',
  //           charges: false,
  //           options: 'confirm-options',
  //           error: 'account-linking-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'db-account-linking',
  //             success: 'account-linking-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'account-linking-accounts',
  //         },
  //       ],
  //       'digital-account-opening': [
  //         {
  //           type: 'select',
  //           name: 'digital-account-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           error: 'digital-account-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'digital-account-savings-open',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'open-account-page',
  //         },
  //       ],
  //       'pin-change': [
  //         {
  //           type: 'input',
  //           name: 'pin-change-old-pin',
  //           'save-as': 'oldPin',
  //           validation: [
  //             {
  //               name: 'matchesLength',
  //               type: 'joi',
  //               arguments: 'length=4',
  //             },
  //             {
  //               name: 'isValidPin',
  //               type: 'custom',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'pin-change-old-pin-error',
  //           previous: 'settings-page',
  //           next: 'pin-change-new-pin',
  //         },
  //         {
  //           type: 'input',
  //           name: 'pin-change-new-pin',
  //           'save-as': 'newPin',
  //           validation: [
  //             {
  //               name: 'isValidPin',
  //               type: 'custom',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'pin-change-new-pin-error',
  //           previous: 'pin-change-old-pin',
  //           next: 'pin-change-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'pin-change-confirm',
  //           options: 'confirm-options',
  //           error: 'pin-change-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'pin-change',
  //             success: 'pin-change-success-alert',
  //             error: 'pin-change-error-alert',
  //           },
  //           'on-cancel': 'login-page',
  //           previous: 'pin-change-new-pin',
  //         },
  //         {
  //           type: 'alert',
  //           name: 'pin-change-error-alert',
  //         },
  //       ],
  //       landrates: [
  //         {
  //           type: 'input',
  //           name: 'landrates-credit-account',
  //           'save-as': 'billPaymentBillerAccount',
  //           validation: [
  //             {
  //               name: 'isText',
  //               type: 'custom',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'landrates-credit-account-error',
  //           previous: 'bill-payment-page',
  //           next: 'landrates-debit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'landrates-debit-account',
  //           'save-as': 'billPaymentDebitAccount',
  //           options: 'fosa-accounts',
  //           'options-error': 'landrates-debit-account-options-error',
  //           error: 'landrates-debit-account-error',
  //           previous: 'landrates-credit-account',
  //           next: 'landrates-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'landrates-amount',
  //           'save-as': 'billPaymentAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=200',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'landrates-amount-error',
  //           previous: 'landrates-debit-account',
  //           next: 'landrates-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'landrates-confirm',
  //           options: 'confirm-options',
  //           error: 'landrates-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'billPayment',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'landrates-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'landrates-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'landrates-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'landrates-credit-account',
  //         },
  //       ],
  //       'zuku-internet': [
  //         {
  //           type: 'input',
  //           name: 'zuku-internet-credit-account',
  //           'save-as': 'billPaymentCreditAccount',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'zuku-internet-credit-account-error',
  //           previous: 'bill-payment-page',
  //           next: 'zuku-internet-debit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'zuku-internet-debit-account',
  //           'save-as': 'billPaymentDebitAccount',
  //           options: 'fosa-accounts',
  //           'options-error': 'zuku-internet-debit-account-options-error',
  //           error: 'zuku-internet-debit-account-error',
  //           previous: 'zuku-internet-credit-account',
  //           next: 'zuku-internet-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'zuku-internet-amount',
  //           'save-as': 'billPaymentAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=200',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'zuku-internet-amount-error',
  //           previous: 'zuku-internet-debit-account',
  //           next: 'zuku-internet-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'zuku-internet-confirm',
  //           options: 'confirm-options',
  //           error: 'zuku-internet-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'accessKenyaPayment',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'zuku-internet-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'zuku-internet-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'zuku-internet-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'zuku-internet-credit-account',
  //         },
  //       ],
  //       'api-success': {
  //         type: 'select',
  //         name: 'api-success',
  //         options: 'yes-no-options',
  //         error: 'api-success-error',
  //         action: 'navigate',
  //         'on-accept': 'client-page',
  //         'on-cancel': 'logout',
  //       },
  //       'access-kenya': [
  //         {
  //           type: 'input',
  //           name: 'access-kenya-credit-account',
  //           'save-as': 'billPaymentCreditAccount',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'access-kenya-credit-account-error',
  //           previous: 'bill-payment-page',
  //           next: 'access-kenya-debit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'access-kenya-debit-account',
  //           'save-as': 'billPaymentDebitAccount',
  //           options: 'fosa-accounts',
  //           'options-error': 'access-kenya-debit-account-options-error',
  //           error: 'access-kenya-debit-account-error',
  //           previous: 'access-kenya-credit-account',
  //           next: 'access-kenya-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'access-kenya-amount',
  //           'save-as': 'billPaymentAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=200',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'access-kenya-amount-error',
  //           previous: 'access-kenya-debit-account',
  //           next: 'access-kenya-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'access-kenya-confirm',
  //           options: 'confirm-options',
  //           error: 'access-kenya-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'accessKenyaPayment',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'access-kenya-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'access-kenya-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'access-kenya-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'access-kenya-credit-account',
  //         },
  //       ],
  //       'mpesa-c2b-success': {
  //         type: 'alert',
  //         name: 'mpesa-c2b-success',
  //       },
  //       'api-error': {
  //         type: 'select',
  //         name: 'api-error',
  //         options: 'yes-no-options',
  //         error: 'api-error-error',
  //         action: 'navigate',
  //         'on-accept': 'client-page',
  //         'on-cancel': 'logout',
  //       },
  //       'savings-balance': [
  //         {
  //           type: 'select',
  //           name: 'savings-balance-debit-account',
  //           'save-as': 'debitAccount',
  //           options: 'fosa-accounts',
  //           error: 'savings-balance-debit-account-error',
  //           previous: 'savings-page',
  //           next: 'savings-balance-account',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'get-savings-accounts',
  //             success: 'savings-balance-account',
  //             error: 'savings-accounts-error',
  //             cache: true,
  //             'cache-path': 'global-constants',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.response.savings',
  //                 'format-as': 'savings-accounts',
  //                 'save-as': 'savings-accounts',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'select',
  //           name: 'savings-balance-account',
  //           'save-as': 'account',
  //           options: 'savings-accounts',
  //           'options-template': 'account-options-template',
  //           error: 'savings-balance-account-error',
  //           previous: 'savings-balance-debit-account',
  //           next: 'savings-balance-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'savings-balance-confirm',
  //           options: 'yes-no-options',
  //           error: 'savings-balance-confirm-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //       ],
  //       'funds-transfer-own-accounts': [
  //         {
  //           type: 'select',
  //           name: 'ft-own-accounts-debit-account',
  //           'save-as': 'fundsTransferDebitAccount',
  //           options: 'customer-accounts',
  //           'options-error': 'ft-own-accounts-debit-account-options-error',
  //           error: 'ft-own-accounts-debit-account-error',
  //           previous: 'funds-transfer-page',
  //           next: 'ft-own-accounts-credit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-own-accounts-credit-account',
  //           'save-as': 'fundsTransferCreditAccount',
  //           'ignore-meta': ['working-currency'],
  //           options: 'customer-accounts',
  //           'options-error': 'ft-own-accounts-credit-account-options-error',
  //           error: 'ft-own-accounts-credit-account-error',
  //           previous: 'ft-own-accounts-debit-account',
  //           next: 'ft-own-accounts-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'ft-own-accounts-amount',
  //           'show-if': {
  //             param: 'fundsTransferDebitAccount',
  //             'is-not-equal-to': 'fundsTransferCreditAccount',
  //             'on-error': 'ft-same-account-error',
  //           },
  //           'save-as': 'fundsTransferAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=10',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'ft-own-accounts-amount-error',
  //           previous: 'ft-own-accounts-credit-account',
  //           next: 'ft-own-accounts-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-own-accounts-confirm',
  //           options: 'yes-no-options',
  //           charges: false,
  //           error: 'ft-own-accounts-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'funds-transfer',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'ft-own-accounts-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-own-accounts-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'ft-own-accounts-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'funds-transfer-page',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-own-accounts-credit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'ft-own-accounts-credit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'funds-transfer-page',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-same-account-error',
  //           options: 'yes-no-options',
  //           error: 'ft-same-account-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'ft-own-accounts-credit-account',
  //         },
  //       ],
  //       'balance-api-success': {
  //         type: 'select',
  //         name: 'balance-api-success',
  //         options: 'yes-no-options',
  //         error: 'balance-api-success-error',
  //         action: 'navigate',
  //         'on-accept': 'client-page',
  //         'on-cancel': 'logout',
  //       },
  //       'imsi-check-failed': {
  //         type: 'alert',
  //         name: 'imsi-check-failed',
  //       },
  //       'savings-statement': [
  //         {
  //           type: 'select',
  //           name: 'savings-statement-debit-account',
  //           'save-as': 'debitAccount',
  //           options: 'fosa-accounts',
  //           error: 'savings-statement-debit-account-error',
  //           previous: 'client-page',
  //           next: 'savings-statement-account',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'get-savings-accounts',
  //             success: 'savings-statement-account',
  //             error: 'savings-accounts-error',
  //             cache: true,
  //             'cache-path': 'global-constants',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.response.savings',
  //                 'format-as': 'savings-accounts',
  //                 'save-as': 'savings-accounts',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'select',
  //           name: 'savings-statement-account',
  //           'save-as': 'account',
  //           options: 'savings-accounts',
  //           'options-template': 'account-options-template',
  //           error: 'avings-statement-account-error',
  //           previous: 'savings-statement-debit-account',
  //           next: 'savings-statement-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'savings-statement-confirm',
  //           options: 'confirm-options',
  //           previous: 'savings-statement-account',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'get-savings-statement',
  //             success: 'api-success',
  //             error: 'api-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'data.response.response_message',
  //                 'save-as': '@loan-statement-error',
  //               },
  //             ],
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'savings-statement-confirm-error',
  //         },
  //       ],
  //       'load-wallet': [
  //         {
  //           type: 'select',
  //           name: 'load-wallet-debit-account-fosa',
  //           'save-as': 'loadwalletCreditAccount',
  //           options: 'customer-accounts',
  //           'options-error': 'load-wallet-debit-account-fosa-options-error',
  //           error: 'load-wallet-debit-account-fosa-error',
  //           previous: 'funds-transfer-page',
  //           next: 'load-wallet-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'load-wallet-amount',
  //           'save-as': 'loadwalletAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               arguments: 'min = 10',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'load-wallet-amount-error',
  //           previous: 'load-wallet-debit-account',
  //           next: 'load-wallet-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'load-wallet-confirm',
  //           options: 'confirm-options',
  //           previous: 'load-wallet-amount',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'load-wallet',
  //             success: 'mpesa-show-alert',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'load-wallet-confirm-error',
  //         },
  //         {
  //           type: 'select',
  //           name: 'load-wallet-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'load-wallet-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'client-page',
  //         },
  //         {
  //           type: 'select',
  //           name: 'load-wallet-debit-account-fosa-options-error',
  //           options: 'yes-no-options',
  //           error: 'load-wallet-debit-account-fosa-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'load-wallet-debit-account',
  //           'on-cancel': 'logout',
  //           previous: 'load-wallet-debit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'load-wallet-charges-error',
  //           options: 'yes-no-options',
  //           error: 'load-wallet-charges-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //         {
  //           type: 'select',
  //           name: 'load-wallet-debit-account-bosa',
  //           'save-as': 'loadwalletCreditAccount',
  //           options: [
  //             {
  //               label: 'BOSA - 9878429323',
  //               value: '9878429323',
  //             },
  //             {
  //               label: 'BOSA - 1203973709129',
  //               value: '1203973709129',
  //             },
  //           ],
  //           'options-template': 'account-options-template',
  //           'options-error': 'load-wallet-debit-account-bosa-options-error',
  //           error: 'load-wallet-debit-account-error',
  //           previous: 'load-wallet-debit-account',
  //           next: 'load-wallet-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'load-wallet-debit-account',
  //           'save-as': 'loadwalletAccountName',
  //           options: [
  //             {
  //               label: 'FOSA',
  //               value: 'FOSA',
  //               'jump-to': 'load-wallet-debit-account-fosa',
  //             },
  //           ],
  //           'options-template': 'account-options-template',
  //           'options-error': 'load-wallet-debit-account-options-error',
  //           error: 'load-wallet-debit-account-error',
  //           previous: 'funds-transfer-page',
  //           next: 'load-wallet-amount',
  //         },
  //       ],
  //       'account-activation': [
  //         {
  //           type: 'skip',
  //           name: 'fetch-dormant-accounts',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'fetch-dormant-accounts',
  //             success: 'account-activation-options',
  //             error: 'fetch-dormant-accounts-error',
  //             cache: true,
  //             'cache-path': 'global-request-details',
  //             'cache-parameters': [
  //               {
  //                 path: 'data',
  //                 'save-as': 'dormant-accounts',
  //                 'format-as': 'dormant-accounts-activation',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: 'select',
  //           name: 'account-activation-options',
  //           'save-as': 'activationAccount',
  //           options: 'dormant-accounts',
  //           'options-error': 'account-activation-options-options-error',
  //           error: 'account-activation-options-error',
  //           previous: 'my-account-page',
  //           next: 'account-activation-type',
  //         },
  //         {
  //           type: 'select',
  //           name: 'account-activation-type',
  //           'save-as': 'airtimeCreditAccount',
  //           options: [
  //             {
  //               label: 'Activate Via FT',
  //               value: 'FT',
  //               'jump-to': 'account-activation-ft-debit-account',
  //             },
  //             {
  //               label: 'Activate Via Mpesa',
  //               'jump-to': 'account-activation-confirm-mpesa',
  //             },
  //           ],
  //           error: 'account-activation-type-error',
  //           previous: 'account-activation-options',
  //         },
  //         {
  //           type: 'select',
  //           name: 'account-activation-ft-debit-account',
  //           'save-as': 'dormantDebitAccount',
  //           options: 'savings-accounts',
  //           'options-error': 'buy-airtime-debit-account-options-error',
  //           error: 'account-activation-ft-debit-account-error',
  //           previous: 'account-activation-type',
  //           next: 'account-activation-confirm-ft',
  //         },
  //         {
  //           type: 'select',
  //           name: 'account-activation-confirm-ft',
  //           options: 'confirm-options',
  //           error: 'account-activation-confirm-ft-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'account-activation-ft',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'account-activation-ft-debit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'account-activation-confirm-mpesa',
  //           options: 'confirm-options',
  //           error: 'account-activation-confirm-mpesa-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'account-activation-mpesa',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'account-activation-type',
  //         },
  //         {
  //           type: 'select',
  //           name: 'account-activation-options-options-error',
  //           options: 'yes-no-options',
  //           error: 'account-activation-options-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //         {
  //           type: 'select',
  //           name: 'fetch-dormant-accounts-error',
  //           options: 'yes-no-options',
  //           error: 'fetch-dormant-accounts-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //         },
  //       ],
  //       'account-dormant': {
  //         type: 'alert',
  //         name: 'account-dormant',
  //       },
  //       'stop-cheque': [
  //         {
  //           type: 'select',
  //           name: 'stop-cheque-account',
  //           'save-as': 'stopChequeAccount',
  //           options: 'customer-accounts',
  //           'options-error': 'stop-cheque-account-options-error',
  //           'format-as': '',
  //           error: 'stop-cheque-account-error',
  //           previous: 'cheques-page',
  //           next: 'stop-cheque-number',
  //         },
  //         {
  //           type: 'input',
  //           name: 'stop-cheque-number',
  //           'save-as': 'stopChequeNumber',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'stop-cheque-number-error',
  //           previous: 'stop-cheque-account',
  //           next: 'stop-cheque-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'stop-cheque-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           error: 'stop-cheque-confirm-error',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'stop-cheque',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'stop-cheque-number',
  //         },
  //         {
  //           type: 'select',
  //           name: 'stop-cheque-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'stop-cheque-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'stop-cheque-account',
  //         },
  //       ],
  //       'funds-transfer-wallet-to-mobile-money': [
  //         {
  //           type: 'select',
  //           name: 'ft-wallet-to-mobile-money-debit-account',
  //           'save-as': 'fundsTransferDebitAccount',
  //           options: 'customer-accounts',
  //           'options-template': 'account-options-template',
  //           'options-error':
  //             'ft-wallet-to-mobile-money-debit-account-options-error',
  //           error: 'ft-wallet-to-mobile-money-debit-account-error',
  //           previous: 'funds-transfer-page',
  //           next: 'ft-wallet-to-mobile-money-other-number',
  //         },
  //         {
  //           type: 'input',
  //           name: 'ft-wallet-to-mobile-money-other-number',
  //           'save-as': 'billerRefAccount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=10',
  //             },
  //           ],
  //           'format-as': 'mobile-number',
  //           error: 'ft-wallet-to-mobile-money-other-number-error',
  //           previous: 'ft-wallet-to-mobile-money-debit-account',
  //           next: 'ft-wallet-to-mobile-money-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'ft-wallet-to-mobile-money-amount',
  //           'save-as': 'fundsTransferAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=10',
  //             },
  //           ],
  //           'format-as': '',
  //           error: 'ft-wallet-to-mobile-money-amount-error',
  //           previous: 'ft-wallet-to-mobile-money-other-number',
  //           next: 'ft-wallet-to-mobile-money-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-wallet-to-mobile-money-confirm',
  //           options: 'yes-no-options',
  //           charges: true,
  //           error: 'ft-wallet-to-mobile-money-confirm-error',
  //           action: 'transact',
  //           'external-fetch': {
  //             route: 'funds-transfer-to-mobile',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           previous: 'ft-wallet-to-mobile-money-amount',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-wallet-to-mobile-money-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error:
  //             'ft-wallet-to-mobile-money-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'funds-transfer-page',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-wallet-to-mobile-money-credit-account-options-error',
  //           options: 'yes-no-options',
  //           error:
  //             'ft-wallet-to-mobile-money-credit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'funds-transfer-page',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-same-account-error',
  //           options: 'yes-no-options',
  //           error: 'ft-same-account-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'ft-wallet-to-mobile-money-credit-account',
  //         },
  //         {
  //           type: 'select',
  //           name: 'ft-wallet-to-mobile-money-credit-account',
  //           'save-as': 'fundsTransferCreditAccount',
  //           'ignore-meta': ['working-currency'],
  //           options: [
  //             {
  //               label: 'TA2459012000004',
  //               value: 'TA2459012000004',
  //             },
  //           ],
  //           'options-error':
  //             'ft-wallet-to-mobile-money-credit-account-options-error',
  //           error: 'ft-wallet-to-mobile-money-credit-account-error',
  //           previous: 'ft-wallet-to-mobile-money-debit-account',
  //           next: 'ft-wallet-to-mobile-money-amount',
  //         },
  //       ],
  //       'standing-orders-external': [
  //         {
  //           type: 'select',
  //           name: 'so-b2o-debit-account',
  //           'save-as': 'soDebitAccount',
  //           options: 'savings-accounts',
  //           'options-error': 'so-b2o-debit-account-options-error',
  //           error: 'so-b2o-debit-account-error',
  //           previous: 'create-standing-orders-page',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'pesalink-banks',
  //             success: 'so-bank-search',
  //             error: 'fetch-banks-error',
  //             cache: true,
  //             'cache-path': 'global-constants',
  //             'cache-parameters': [
  //               {
  //                 path: 'data',
  //                 'save-as': 'banks',
  //                 'format-as': 'bank-codes',
  //               },
  //             ],
  //             'parameter-checks': {
  //               banks: {
  //                 'is-less-than': '1',
  //                 'redirect-to': 'fetch-banks-error',
  //               },
  //             },
  //           },
  //         },
  //         {
  //           type: 'input',
  //           name: 'so-bank-search',
  //           action: 'search',
  //           'search-options': {
  //             limit: 5,
  //             dataset: 'banks',
  //             saveTo: 'search-options',
  //           },
  //           errors: ['no-bank-results-error', 'result-limit-exceeded-error'],
  //           previous: 'so-to-bank-debit-account',
  //           next: 'so-bank-result',
  //         },
  //         {
  //           type: 'select',
  //           name: 'so-bank-result',
  //           'save-as': 'soBankCode',
  //           options: 'search-options',
  //           error: 'so-bank-result-error',
  //           previous: 'so-bank-search',
  //           next: 'so-b2o-credit-account',
  //         },
  //         {
  //           type: 'input',
  //           name: 'so-b2o-credit-account',
  //           'save-as': 'soCreditAccount',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'so-b2o-credit-account-error',
  //           previous: 'so-bank-result',
  //           next: 'so-b2o-amount',
  //         },
  //         {
  //           type: 'input',
  //           name: 'so-b2o-amount',
  //           'save-as': 'soAmount',
  //           validation: [
  //             {
  //               name: 'isAmount',
  //               type: 'joi',
  //               arguments: 'min=1',
  //             },
  //           ],
  //           error: 'so-b2o-amount-error',
  //           previous: 'so-b2o-credit-account',
  //           next: 'so-b2o-start-date',
  //         },
  //         {
  //           type: 'input',
  //           name: 'so-b2o-start-date',
  //           'save-as': 'soStartDate',
  //           skip: true,
  //           validation: [
  //             {
  //               name: 'isValidDate',
  //               type: 'custom',
  //               arguments: 'format=YYYY-MM-DD',
  //             },
  //           ],
  //           'format-as': 'so-date',
  //           error: 'so-b2o-start-date-error',
  //           previous: 'so-b2o-amount',
  //           next: 'so-b2o-end-date',
  //         },
  //         {
  //           type: 'input',
  //           name: 'so-b2o-end-date',
  //           'save-as': 'soEndDate',
  //           validation: [
  //             {
  //               name: 'isValidDate',
  //               type: 'custom',
  //               arguments: 'format=YYYY-MM-DD',
  //             },
  //           ],
  //           'format-as': 'so-date',
  //           error: 'so-b2o-end-date-error',
  //           previous: 'so-b2o-start-date',
  //           next: 'so-b2o-frequency',
  //         },
  //         {
  //           type: 'select',
  //           name: 'so-b2o-frequency',
  //           'save-as': 'soFrequency',
  //           options: [
  //             {
  //               label: 'Daily',
  //               value: 'D',
  //             },
  //             {
  //               label: 'Weekly',
  //               value: 'W',
  //             },
  //             {
  //               label: 'Monthly',
  //               value: 'M',
  //             },
  //             {
  //               label: 'Yearly',
  //               value: 'Y',
  //             },
  //           ],
  //           error: 'so-b2o-frequency-error',
  //           previous: 'so-b2o-date',
  //           next: 'so-b2o-beneficiary-name',
  //         },
  //         {
  //           type: 'input',
  //           name: 'so-b2o-beneficiary-name',
  //           'save-as': 'soBeneficiaryName',
  //           'format-as': 'createSpaces',
  //           validation: [
  //             {
  //               name: 'isStatement',
  //               type: 'custom',
  //             },
  //           ],
  //           error: 'so-b2o-beneficiary-name-error',
  //           previous: 'so-b2o-frequency',
  //           next: 'so-b2o-instruction',
  //         },
  //         {
  //           type: 'input',
  //           name: 'so-b2o-member-number',
  //           'save-as': 'soMemberNumber',
  //           validation: [
  //             {
  //               name: 'isNumber',
  //               type: 'joi',
  //             },
  //           ],
  //           error: 'so-b2o-member-number-error',
  //           previous: 'so-b2o-beneficiary-name',
  //           next: 'so-b2o-instruction',
  //         },
  //         {
  //           type: 'input',
  //           name: 'so-b2o-instruction',
  //           'save-as': 'soInstruction',
  //           'format-as': 'createSpaces',
  //           validation: [
  //             {
  //               name: 'isStatement',
  //               type: 'custom',
  //             },
  //           ],
  //           error: 'so-b2o-instruction-error',
  //           previous: 'so-b2o-beneficiary-name',
  //           next: 'so-b2o-confirm',
  //         },
  //         {
  //           type: 'select',
  //           name: 'so-b2o-confirm',
  //           options: 'confirm-options',
  //           charges: false,
  //           previous: 'so-b2o-instruction',
  //           action: 'update-parameters',
  //           'external-fetch': {
  //             route: 'standing-orders-external',
  //             success: 'api-success',
  //             error: 'api-error',
  //           },
  //           'on-cancel': 'client-page',
  //           error: 'so-b2o-confirm-error',
  //         },
  //         {
  //           type: 'select',
  //           name: 'so-b2o-debit-account-options-error',
  //           options: 'yes-no-options',
  //           error: 'so-b2o-debit-account-options-error-error',
  //           action: 'navigate',
  //           'on-accept': 'client-page',
  //           'on-cancel': 'logout',
  //           previous: 'client-page',
  //         },
  //       ],
  //     },
  //     config: {
  //       'dormant-account-check': 'is-dormant',
  //       'page-switch-check': {
  //         name: 'account-type',
  //         options: {
  //           client: {
  //             page: 'login',
  //             enabled: true,
  //           },
  //         },
  //         enabled: true,
  //       },
  //       register: true,
  //       'blocked-account-check': 'is-blocked',
  //       'api-name': 'mb-api',
  //       authenticate: true,
  //       'ussd-response-format': 'safaricom',
  //       'authenticate-transactions': false,
  //       'authenticate-use-page': false,
  //       'imsi-check': 'is-imsi',
  //       'do-not-load-profile': false,
  //       'require-access-token': true,
  //       'first-login-check': 'first-login',
  //       'meta-data': {
  //         'app-contact-name': 'Mobile Banking Service',
  //         'app-contact-number': '+254 709 646 000\n +254 20 271 0274',
  //         'contact-number': '+254 709 646 000',
  //         'app-description': 'Mobile Banking ',
  //         'app-email': 'talktous@eclectics.io',
  //         'app-name': 'api-mobile-banking-ussd@0.0.1',
  //         'app-client': 'Mobile Banking',
  //         'app-shortcode': '*605*202#',
  //         'shortcode ': '*605*202#',
  //         'app-terms-url': 'https://eclectics.io/privacy-policy/',
  //         'app-whatsapp': '+254 709 646 000',
  //         'app-twitter': 'talktous@eclectics.io',
  //         'app-facebook': 'talktous@eclectics.io',
  //         'app-location': 'Utumishi Co-op House,Mamlaka Road Nairobi, Kenya',
  //         'app-currency-code': 'KES.',
  //         'currency-code': 'KES.',
  //         'loan-limit': '20000',
  //         'loan-balance': '10000',
  //       },
  //       'global-constants': {
  //         'amount-minimum': 10,
  //         'cheque-books-minimum': 1,
  //         'funds-transfer-minimum-KES': 10,
  //         'funds-transfer-minimum': 10,
  //         'funds-transfer-minimum-GBP': 1,
  //         'funds-transfer-minimum-EUR': 1,
  //         'funds-transfer-minimum-USD': 1,
  //         'core-account-minimum': 100,
  //         'request-bankers-cheque-amount-minimum': 10,
  //         'pesalink-limit': 999999,
  //         'lock-savings-minimum-amount': 5000,
  //         'personal-account-minimum-amount': 20,
  //         'school-fees-minimum-amount': 10,
  //         'billpayment-amount-minimum': 20,
  //         'minimum-billpayment-amount': 20,
  //         'buy-airtime-minimum': 10,
  //         'lock-savings-min-deposit-amount': 10,
  //         'language-options': [
  //           {
  //             label: 'english-label',
  //             value: 'english',
  //           },
  //           {
  //             label: 'swahili-label',
  //             value: 'swahili',
  //           },
  //         ],
  //         'yes-no-options': [
  //           {
  //             label: 'yes-label',
  //             value: '1',
  //           },
  //           {
  //             label: 'no-label',
  //             value: '2',
  //           },
  //         ],
  //         'confirm-options': [
  //           {
  //             label: 'confirm-label',
  //             value: '1',
  //           },
  //           {
  //             label: 'cancel-label',
  //             value: '2',
  //           },
  //         ],
  //         'loan-products': [
  //           {
  //             label: 'Quick loan',
  //             value: 'Quick loan',
  //           },
  //           {
  //             label: 'Salary loan',
  //             value: 'Salary loan',
  //           },
  //         ],
  //         'bank-options': [
  //           {
  //             label: 'Standard Chartered Bank Kenya',
  //             value: 'TA2459012000004',
  //           },
  //           {
  //             label: 'Cooperative Bank of Kenya',
  //             value: 'TA2459012000004',
  //           },
  //           {
  //             label: 'KCB Bank',
  //             value: 'TA2459012000004',
  //           },
  //           {
  //             label: 'DTB Kenya',
  //             value: 'TA2459012000004',
  //           },
  //           {
  //             label: 'National Bank of Kenya',
  //             value: 'TA2459012000004',
  //           },
  //           {
  //             label: 'Stanbic Bank',
  //             value: 'TA2459012000004',
  //           },
  //         ],
  //         'pesalink-lookup-result': [],
  //       },
  //       'api-user-profile-route': 'account-look-up',
  //       'registration-check': 'is-registered',
  //       'enable-whitelist': false,
  //       'access-token-param': 'access_token',
  //       'pin-trials-max': 3,
  //       'api-environment': 'development',
  //       language: 'english',
  //       'internal-authentication': true,
  //       'app-name': 'api-mobile-banking-ussd',
  //     },
  //     adapter: {
  //       'get-profile': {
  //         template: {
  //           'account-details': {
  //             'account-type': 'client',
  //             'all-accounts': '',
  //             'is-imsi': true,
  //             'loan-accounts': [],
  //             'search-options': [],
  //             'mwallet-account': '__msisdn',
  //           },
  //           'global-request-details': {},
  //           'pin-trials-remaining': 3,
  //           'transaction-pin-trials-remaining': 3,
  //           language: 'english',
  //         },
  //         response: {
  //           status: {
  //             field: 'status',
  //             matches: [
  //               {
  //                 code: 'success',
  //                 status: 'registered',
  //               },
  //               {
  //                 code: 'fail',
  //                 status: 'unregistered',
  //               },
  //               {
  //                 code: '01',
  //                 status: 'imsi-failed',
  //               },
  //             ],
  //             error: {
  //               message: 'message',
  //             },
  //           },
  //           mappers: {
  //             registered: {
  //               'account-details': {
  //                 'is-registered': '__isRegistered',
  //                 'is-imsi': '__imsiCheck',
  //                 'is-blocked': '__isBlocked',
  //                 'is-dormant': '__isDormant',
  //                 'first-login': '__firstLogin',
  //                 firstname: '__firstname',
  //                 username: '__username',
  //                 member_number: '__membernumber',
  //                 'mwallet-account': '__mwallet',
  //                 'moneymart-loan-products': [],
  //               },
  //               msisdn: '__phonenumber',
  //               mwallet: '__walletmwallet',
  //               imsi: '__imsi',
  //               'is-imsi': '__imsiCheck',
  //               deviceChanged: '__deviceChanged',
  //               otpExpired: '__otpExpired',
  //               'transaction-authenticated': false,
  //             },
  //             unregistered: {
  //               'account-details': {
  //                 'is-registered': false,
  //                 'is-blocked': false,
  //                 'is-imsi': true,
  //                 'first-login': false,
  //                 genders: '__genders',
  //                 branches: '__branches',
  //                 subBranches: '__subBranches',
  //               },
  //               imsi: '__imsi',
  //               msisdn: '__phonenumber',
  //               'is-imsi': true,
  //             },
  //             'imsi-failed': {
  //               'account-details': {
  //                 'is-registered': true,
  //                 'is-blocked': false,
  //                 'is-imsi': false,
  //                 'first-login': false,
  //               },
  //               msisdn: '__phonenumber',
  //               'is-imsi': false,
  //             },
  //             merge: [
  //               {
  //                 src: 'account-details',
  //                 destination: 'account-details',
  //               },
  //             ],
  //           },
  //           rules: [
  //             {
  //               name: '__genders',
  //               path: 'data.genders',
  //               'format-as': 'gender-format',
  //               default: [],
  //             },
  //             {
  //               name: '__branches',
  //               path: 'data.branches',
  //               'format-as': 'gender-format',
  //               default: [],
  //             },
  //             {
  //               name: '__subBranches',
  //               path: 'data.genders',
  //               'format-as': 'gender-format',
  //               default: [],
  //             },
  //             {
  //               name: '__deviceChanged',
  //               path: 'deviceChanged',
  //               default: '0',
  //             },
  //             {
  //               name: '__otpExpired',
  //               path: 'otpExpired',
  //               default: '0',
  //             },
  //             {
  //               name: '__isRegistered',
  //               path: 'status',
  //               matches: [
  //                 {
  //                   code: 'success',
  //                   status: true,
  //                 },
  //               ],
  //               default: false,
  //             },
  //             {
  //               name: '__imsiCheck',
  //               path: 'data.field39',
  //               matches: [
  //                 {
  //                   code: '02',
  //                   status: false,
  //                 },
  //               ],
  //               default: true,
  //             },
  //             {
  //               name: '__isBlocked',
  //               path: 'data.ACTIVE',
  //               matches: [
  //                 {
  //                   code: '0',
  //                   status: true,
  //                 },
  //               ],
  //               default: false,
  //             },
  //             {
  //               name: '__firstLogin',
  //               path: 'data.changePassword',
  //               default: false,
  //             },
  //             {
  //               name: '__firstname',
  //               path: 'metadata.memberName',
  //               'format-as': 'capitalize',
  //               default: 'customer',
  //             },
  //             {
  //               name: '__phonenumber',
  //               path: 'metadata.phoneNumber',
  //               default: '',
  //             },
  //             {
  //               name: '__username',
  //               path: 'data.username',
  //             },
  //             {
  //               name: '__membernumber',
  //               path: 'data.memberNumber',
  //               'format-as': 'capitalize',
  //               default: '',
  //             },
  //             {
  //               name: '__mwallet',
  //               path: 'metadata.phoneNumber',
  //               'format-as': 'walletAccount',
  //             },
  //             {
  //               name: '__walletmwallet',
  //               path: 'metadata.phoneNumber',
  //               default: '',
  //             },
  //             {
  //               name: '__active',
  //               path: 'data.ACTIVE',
  //               matches: [
  //                 {
  //                   code: '1',
  //                   status: true,
  //                 },
  //               ],
  //               default: false,
  //             },
  //             {
  //               name: '__imsi',
  //               path: 'data.USSD_IMSI',
  //               default: false,
  //             },
  //           ],
  //           special: {
  //             'account-details.all-accounts':
  //               'mwallet+account-details.savings-accounts',
  //           },
  //         },
  //       },
  //     },
  //     permissions: {
  //       'beta-sandbox': [
  //         {
  //           name: 'account-enquiries-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'funds-transfer-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'buy-airtime',
  //           enabled: true,
  //         },
  //         {
  //           name: 'bill-payment-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'customer-requests-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'withdrawal-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'mpesa-c2b',
  //           enabled: true,
  //         },
  //         {
  //           name: 'loans-page',
  //           enabled: false,
  //         },
  //         {
  //           name: 'lock-savings-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'settings-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'login',
  //           enabled: true,
  //         },
  //         {
  //           name: 'login-pin-change',
  //           enabled: true,
  //         },
  //         {
  //           name: 'terms',
  //           enabled: true,
  //         },
  //         {
  //           name: 'registration',
  //           enabled: true,
  //         },
  //         {
  //           name: 'language-change',
  //           enabled: true,
  //         },
  //         {
  //           name: 'pin-change',
  //           enabled: true,
  //         },
  //         {
  //           name: 'email-change',
  //           enabled: true,
  //         },
  //         {
  //           name: 'contact-us',
  //           enabled: true,
  //         },
  //         {
  //           name: 'tell-a-friend',
  //           enabled: true,
  //         },
  //         {
  //           name: 'balance',
  //           enabled: true,
  //         },
  //         {
  //           name: 'ministatement',
  //           enabled: true,
  //         },
  //         {
  //           name: 'fullstatement',
  //           enabled: true,
  //         },
  //         {
  //           name: 'request-atm',
  //           enabled: true,
  //         },
  //         {
  //           name: 'replace-atm',
  //           enabled: true,
  //         },
  //         {
  //           name: 'stop-atm',
  //           enabled: true,
  //         },
  //         {
  //           name: 'kplc-postpaid',
  //           enabled: true,
  //         },
  //         {
  //           name: 'kplc-prepaid',
  //           enabled: true,
  //         },
  //         {
  //           name: 'dstv',
  //           enabled: true,
  //         },
  //         {
  //           name: 'nhif',
  //           enabled: true,
  //         },
  //         {
  //           name: 'landrates',
  //           enabled: true,
  //         },
  //         {
  //           name: 'nairobiwater',
  //           enabled: true,
  //         },
  //         {
  //           name: 'gotv',
  //           enabled: true,
  //         },
  //         {
  //           name: 'zuku-tv',
  //           enabled: true,
  //         },
  //         {
  //           name: 'zuku-internet',
  //           enabled: true,
  //         },
  //         {
  //           name: 'school-fees',
  //           enabled: true,
  //         },
  //         {
  //           name: 'request-cheque-book',
  //           enabled: true,
  //         },
  //         {
  //           name: 'stop-cheque',
  //           enabled: true,
  //         },
  //         {
  //           name: 'standing-orders-internal',
  //           enabled: true,
  //         },
  //         {
  //           name: 'standing-orders-external',
  //           enabled: true,
  //         },
  //         {
  //           name: 'standing-orders-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'cheques-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'atm-cards-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'account-linking',
  //           enabled: true,
  //         },
  //         {
  //           name: 'wallet-account-opening',
  //           enabled: true,
  //         },
  //         {
  //           name: 'core-account-opening',
  //           enabled: true,
  //         },
  //         {
  //           name: 'view-accounts',
  //           enabled: true,
  //         },
  //         {
  //           name: 'loan-balance',
  //           enabled: true,
  //         },
  //         {
  //           name: 'loan-statement',
  //           enabled: true,
  //         },
  //         {
  //           name: 'loan-limit',
  //           enabled: true,
  //         },
  //         {
  //           name: 'funds-transfer-savings-to-savings',
  //           enabled: true,
  //         },
  //         {
  //           name: 'funds-transfer-savings-to-wallet',
  //           enabled: true,
  //         },
  //         {
  //           name: 'funds-transfer-wallet-to-savings',
  //           enabled: true,
  //         },
  //         {
  //           name: 'funds-transfer-wallet-to-wallet',
  //           enabled: true,
  //         },
  //         {
  //           name: 'loan-enquiries-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'loan-application',
  //           enabled: true,
  //         },
  //         {
  //           name: 'loan-repayment',
  //           enabled: true,
  //         },
  //         {
  //           name: 'funds-transfer-own-accounts',
  //           enabled: true,
  //         },
  //         {
  //           name: 'funds-transfer-other-accounts-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'pesalink-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'rtgs',
  //           enabled: true,
  //         },
  //         {
  //           name: 'eft',
  //           enabled: true,
  //         },
  //         {
  //           name: 'lock-savings-open-account',
  //           enabled: true,
  //         },
  //         {
  //           name: 'lock-savings-save',
  //           enabled: true,
  //         },
  //         {
  //           name: 'lock-savings-ministatement',
  //           enabled: true,
  //         },
  //         {
  //           name: 'lock-savings-unlock',
  //           enabled: true,
  //         },
  //         {
  //           name: 'pesalink-to-phone',
  //           enabled: true,
  //         },
  //         {
  //           name: 'pesalink-to-bank',
  //           enabled: true,
  //         },
  //         {
  //           name: 'pesalink-to-card',
  //           enabled: true,
  //         },
  //         {
  //           name: 'pesalink-link-account',
  //           enabled: true,
  //         },
  //         {
  //           name: 'pesalink-link-primary',
  //           enabled: true,
  //         },
  //         {
  //           name: 'create-standing-orders-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'standing-orders-amend',
  //           enabled: true,
  //         },
  //         {
  //           name: 'standing-orders-cancel',
  //           enabled: true,
  //         },
  //         {
  //           name: 'withdrawal-mpesa-b2c',
  //           enabled: true,
  //         },
  //         {
  //           name: 'withdrawal-airtel-b2c',
  //           enabled: true,
  //         },
  //       ],
  //       production: [
  //         {
  //           name: 'account-enquiries-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'funds-transfer-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'buy-airtime',
  //           enabled: true,
  //         },
  //         {
  //           name: 'bill-payment-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'customer-requests-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'withdrawal-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'mpesa-c2b',
  //           enabled: true,
  //         },
  //         {
  //           name: 'loans-page',
  //           enabled: false,
  //         },
  //         {
  //           name: 'lock-savings-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'settings-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'login',
  //           enabled: true,
  //         },
  //         {
  //           name: 'login-pin-change',
  //           enabled: true,
  //         },
  //         {
  //           name: 'terms',
  //           enabled: true,
  //         },
  //         {
  //           name: 'registration',
  //           enabled: true,
  //         },
  //         {
  //           name: 'language-change',
  //           enabled: false,
  //         },
  //         {
  //           name: 'pin-change',
  //           enabled: true,
  //         },
  //         {
  //           name: 'email-change',
  //           enabled: false,
  //         },
  //         {
  //           name: 'contact-us',
  //           enabled: true,
  //         },
  //         {
  //           name: 'tell-a-friend',
  //           enabled: true,
  //         },
  //         {
  //           name: 'balance',
  //           enabled: true,
  //         },
  //         {
  //           name: 'ministatement',
  //           enabled: true,
  //         },
  //         {
  //           name: 'fullstatement',
  //           enabled: true,
  //         },
  //         {
  //           name: 'request-atm',
  //           enabled: true,
  //         },
  //         {
  //           name: 'replace-atm',
  //           enabled: true,
  //         },
  //         {
  //           name: 'stop-atm',
  //           enabled: false,
  //         },
  //         {
  //           name: 'kplc-postpaid',
  //           enabled: true,
  //         },
  //         {
  //           name: 'kplc-prepaid',
  //           enabled: true,
  //         },
  //         {
  //           name: 'dstv',
  //           enabled: true,
  //         },
  //         {
  //           name: 'nhif',
  //           enabled: true,
  //         },
  //         {
  //           name: 'landrates',
  //           enabled: true,
  //         },
  //         {
  //           name: 'nairobiwater',
  //           enabled: true,
  //         },
  //         {
  //           name: 'gotv',
  //           enabled: true,
  //         },
  //         {
  //           name: 'zuku-tv',
  //           enabled: true,
  //         },
  //         {
  //           name: 'zuku-internet',
  //           enabled: true,
  //         },
  //         {
  //           name: 'school-fees',
  //           enabled: true,
  //         },
  //         {
  //           name: 'request-cheque-book',
  //           enabled: true,
  //         },
  //         {
  //           name: 'stop-cheque',
  //           enabled: true,
  //         },
  //         {
  //           name: 'standing-orders-internal',
  //           enabled: true,
  //         },
  //         {
  //           name: 'standing-orders-external',
  //           enabled: true,
  //         },
  //         {
  //           name: 'standing-orders-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'cheques-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'atm-cards-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'account-linking',
  //           enabled: true,
  //         },
  //         {
  //           name: 'wallet-account-opening',
  //           enabled: true,
  //         },
  //         {
  //           name: 'core-account-opening',
  //           enabled: true,
  //         },
  //         {
  //           name: 'view-accounts',
  //           enabled: true,
  //         },
  //         {
  //           name: 'loan-balance',
  //           enabled: true,
  //         },
  //         {
  //           name: 'loan-statement',
  //           enabled: true,
  //         },
  //         {
  //           name: 'loan-limit',
  //           enabled: true,
  //         },
  //         {
  //           name: 'funds-transfer-savings-to-savings',
  //           enabled: true,
  //         },
  //         {
  //           name: 'funds-transfer-savings-to-wallet',
  //           enabled: true,
  //         },
  //         {
  //           name: 'funds-transfer-wallet-to-savings',
  //           enabled: true,
  //         },
  //         {
  //           name: 'funds-transfer-wallet-to-wallet',
  //           enabled: true,
  //         },
  //         {
  //           name: 'loan-enquiries-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'loan-application',
  //           enabled: true,
  //         },
  //         {
  //           name: 'loan-repayment',
  //           enabled: true,
  //         },
  //         {
  //           name: 'funds-transfer-own-accounts',
  //           enabled: true,
  //         },
  //         {
  //           name: 'funds-transfer-other-accounts-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'pesalink-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'rtgs',
  //           enabled: true,
  //         },
  //         {
  //           name: 'eft',
  //           enabled: true,
  //         },
  //         {
  //           name: 'lock-savings-open-account',
  //           enabled: true,
  //         },
  //         {
  //           name: 'lock-savings-save',
  //           enabled: true,
  //         },
  //         {
  //           name: 'lock-savings-unlock',
  //           enabled: true,
  //         },
  //         {
  //           name: 'lock-savings-ministatement',
  //           enabled: true,
  //         },
  //         {
  //           name: 'pesalink-to-phone',
  //           enabled: true,
  //         },
  //         {
  //           name: 'pesalink-to-bank',
  //           enabled: true,
  //         },
  //         {
  //           name: 'pesalink-to-card',
  //           enabled: true,
  //         },
  //         {
  //           name: 'pesalink-link-account',
  //           enabled: true,
  //         },
  //         {
  //           name: 'pesalink-link-primary',
  //           enabled: true,
  //         },
  //         {
  //           name: 'create-standing-orders-page',
  //           enabled: true,
  //         },
  //         {
  //           name: 'standing-orders-amend',
  //           enabled: true,
  //         },
  //         {
  //           name: 'standing-orders-cancel',
  //           enabled: true,
  //         },
  //         {
  //           name: 'withdrawal-mpesa-b2c',
  //           enabled: true,
  //         },
  //         {
  //           name: 'withdrawal-airtel-b2c',
  //           enabled: true,
  //         },
  //       ],
  //     },
  //     api: {
  //       'mb-api': {
  //         'data-sources': {
  //           timeout: 25000,
  //           'offline-timeout': 50,
  //           development: {
  //             host: '10.20.2.4',
  //             port: 8091,
  //             protocol: 'https',
  //             method: 'post',
  //             path: '',
  //           },
  //           'eclectics-dev': {
  //             host: '10.20.2.4',
  //             port: 8091,
  //             protocol: 'https',
  //             method: 'post',
  //             path: '',
  //           },
  //         },
  //         'meta-data': {
  //           middleware: 'ukulima',
  //           'payload-format': 'JSON',
  //           appName: 'Ukulima Sacco',
  //           currency: 'KES',
  //           'country-code': 'KE',
  //           channel: 'USSD',
  //         },
  //         permissions: {
  //           base64: false,
  //           encrypt: false,
  //           'hash-pin': true,
  //           'fetch-charges': false,
  //         },
  //         'request-settings': {
  //           headers: {
  //             'x-message-type': 0,
  //           },
  //           template: {
  //             txntimestamp: 'create:timeStamp=MMDDHHmmss',
  //             xref: 'create:timeStamp=HHmmss',
  //             payload: {},
  //             channel_details: {
  //               channel_key: '1223445Pl',
  //               host: '127.0.0.1',
  //               geolocation: '',
  //               user_agent_version: 'android kit kat',
  //               user_agent: 'android',
  //               client_id: 'CHURCHILL',
  //               deviceId: '__walletAccount',
  //               channel: 'USSD',
  //             },
  //           },
  //           endpoints: {
  //             'account-look-up': {
  //               'path-suffix': 'ussd/lookup',
  //               'request-group': {
  //                 enabled: true,
  //                 data: {
  //                   phoneNumber: '__walletAccount',
  //                 },
  //                 'group-to': 'payload',
  //               },
  //               response: {
  //                 status: {
  //                   field: 'status',
  //                   matches: [
  //                     {
  //                       code: '06',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'message',
  //                   },
  //                 },
  //                 adapter: 'get-profile',
  //                 'mapper-function': 'profile_mapper',
  //                 save: false,
  //               },
  //             },
  //             login: {
  //               'request-path': 'ussd/login',
  //               'request-group': {
  //                 enabled: true,
  //                 data: {
  //                   username: '__walletAccount',
  //                   deviceId: '__walletAccount',
  //                   pin: '__pin',
  //                 },
  //                 'group-to': 'payload',
  //               },
  //               response: {
  //                 status: {
  //                   field: 'status',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'message',
  //                   },
  //                 },
  //                 'mapper-function': 'login_mapper',
  //                 save: true,
  //               },
  //             },
  //             'first-login': {
  //               'request-path': 'ussd/login',
  //               'request-group': {
  //                 enabled: true,
  //                 data: {
  //                   username: '__walletAccount',
  //                   deviceId: '__walletAccount',
  //                   pin: '__ftp',
  //                 },
  //                 'group-to': 'payload',
  //               },
  //               response: {
  //                 status: {
  //                   field: 'status',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'message',
  //                   },
  //                 },
  //                 'mapper-function': 'login_mapper',
  //                 save: true,
  //               },
  //             },
  //             'activate-mobile-banking': {
  //               'request-path': 'ussd/activate-mobile-banking',
  //               'request-group': {
  //                 enabled: true,
  //                 data: {
  //                   phoneNumber: '__walletAccount',
  //                   email: '__email',
  //                   identification: '__id',
  //                   identificationType: 'National Id',
  //                   language: 'English',
  //                   nationalId: '__id',
  //                   name: '__fullname',
  //                 },
  //                 'group-to': 'payload',
  //               },
  //               response: {
  //                 status: {
  //                   field: 'status',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'message',
  //                   },
  //                 },
  //                 save: true,
  //               },
  //             },
  //             'change-pin': {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'path-suffix': 'ussd/reset-password',
  //               'request-path': 'ussd/reset-password',
  //               'request-group': {
  //                 enabled: false,
  //                 data: {
  //                   oldPin: '__ftp',
  //                   newPin: '__newPin',
  //                 },
  //                 'group-to': 'payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'status',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'pin-change': {
  //               'path-suffix': 'api/customer/login',
  //               'request-path': 'api/customer/login',
  //               'request-group': {
  //                 enabled: false,
  //                 data: {
  //                   account: '__walletAccount',
  //                   credentials: '__newPin',
  //                   old_password: '__oldPin',
  //                   account_type: 'customer_account',
  //                   req_type: 'change_password',
  //                   grant_type: 'access_token',
  //                   transaction_type: 'CUSTOMERS',
  //                   direction: 'REQUEST',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'email-change': {
  //               'request-group': {
  //                 enabled: false,
  //                 data: {
  //                   email_address: '__email',
  //                   req_type: 'change_email',
  //                   transaction_type: 'customer_self_service',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'field39',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'get-savings-accounts': {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-path': 'api/ESBWebservice',
  //               'request-group': {
  //                 data: {
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'SAVINGS',
  //                   direction: 'REQUEST',
  //                   transaction_code: 'SAVING_ACCOUNTS',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'get-savings-statement': {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-path': 'api/ESBWebservice',
  //               'request-group': {
  //                 data: {
  //                   amount: 0,
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'SAVINGS',
  //                   direction: 'REQUEST',
  //                   debit_account: '__debitAccount',
  //                   transaction_code: 'SAVINGS_STATEMENT',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'school-fees-bill-payment': {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-path': 'api/ESBWebservice',
  //               'request-group': {
  //                 data: {
  //                   amount: '__amount',
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'SAVINGS',
  //                   direction: 'REQUEST',
  //                   credit_account: '__schoolFeesCreditAccount',
  //                   debit_account: '__schoolFeesDebitAccount',
  //                   transaction_code: 'DEPOSIT',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'funds-transfer': {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-path': 'api/ESBWebservice',
  //               'request-group': {
  //                 data: {
  //                   amount: '__amount',
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'SAVINGS',
  //                   direction: 'REQUEST',
  //                   credit_account: '__fundsTransferCreditAccount',
  //                   debit_account: '__fundsTransferDebitAccount',
  //                   transaction_code: 'DEPOSIT',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'funds-transfer-to-other-wallet': {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-path': 'api/ESBWebservice',
  //               'request-group': {
  //                 data: {
  //                   amount: '__fundsTransferAmount',
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'FT',
  //                   direction: 'REQUEST',
  //                   credit_account: '__fundsTransferCreditAccount',
  //                   debit_account: '__fundsTransferDebitAccount',
  //                   transaction_code: 'FTMM',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response_message',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'funds-transfer-to-mobile': {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-path': 'api/ESBWebservice',
  //               'request-group': {
  //                 data: {
  //                   amount: '__fundsTransferAmount',
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'B2C',
  //                   direction: 'REQUEST',
  //                   biller_ref: '__billerRefAccount',
  //                   debit_account: '__fundsTransferDebitAccount',
  //                   transaction_code: 'WITHDRAW',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response_message',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'account-lookup-presentment': {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-path': 'api/ESBWebservice',
  //               'request-group': {
  //                 data: {
  //                   phone_number: '__walletAccount',
  //                   account_phone_number: '__billerRefAccount',
  //                   host_code: 'MM',
  //                   account_type: 'TA',
  //                   transaction_type: 'PHONE_NUMBER_LOOKUP',
  //                   direction: 'REQUEST',
  //                   transaction_code: 'LOOKUP',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response_message',
  //                   },
  //                 },
  //                 save: true,
  //               },
  //             },
  //             'full-statement': {
  //               'request-path': 'api/ESBWebservice',
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-group': {
  //                 enabled: false,
  //                 data: {
  //                   amount: 0,
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   email_address: '__email',
  //                   transaction_type: 'FULLSTATEMENT',
  //                   direction: 'REQUEST',
  //                   statement_period: '__fullstatementPeriod',
  //                   debit_account: '__fullstatementDebitAccount',
  //                   transaction_code: 'STATEMENT',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'merchant-payment': {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-path': 'api/ESBWebservice',
  //               'request-group': {
  //                 data: {
  //                   amount: '__merchantAmount',
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'MERCHANTPAY',
  //                   direction: 'REQUEST',
  //                   merchant_code: '__merchantCode',
  //                   complete_payment: 1,
  //                   debit_account: '__merchantPayDebitAcc',
  //                   item_count: 1,
  //                   merchant_deal_id: '0',
  //                   transaction_code: 'ANY',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'merchant-payment-lookup': {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-path': 'api/ESBWebservice',
  //               'request-group': {
  //                 data: {
  //                   amount: 200,
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'MERCHANTPAY',
  //                   direction: 'REQUEST',
  //                   merchant_code: '__merchantCode',
  //                   stage: 'pre',
  //                   debit_account: 'TA2458649000001',
  //                   merchant_deal_id: '0',
  //                   transaction_code: 'ANY',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'mpesa-merchant-payment': {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-path': 'api/ESBWebservice',
  //               'request-group': {
  //                 data: {
  //                   amount: '__merchantAmount',
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'MERCHANTPAY',
  //                   direction: 'MPESACHECKOUT',
  //                   merchant_code: '__merchantCode',
  //                   complete_payment: 1,
  //                   biller_ref: '254706215505',
  //                   debit_account: '__merchantPayDebitAcc',
  //                   item_count: 1,
  //                   merchant_deal_id: '0',
  //                   transaction_code: 'ANY',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'funds-transfer-mpesa': {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-path': 'api/ESBWebservice',
  //               'request-group': {
  //                 data: {
  //                   amount: '__fundsTransferAmount',
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'FT',
  //                   direction: 'MPESACHECKOUT',
  //                   biller_ref: '__billerRefAccount',
  //                   credit_account: '__fundsTransferCreditAccount',
  //                   debit_account: '__fundsTransferDebitAccount',
  //                   transaction_code: 'FTMM',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '000',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response_message',
  //                   },
  //                 },
  //                 save: true,
  //               },
  //             },
  //             'deposit-to-savings': {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-path': 'api/ESBWebservice',
  //               'request-group': {
  //                 data: {
  //                   amount: '__amount',
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'SAVINGS',
  //                   direction: 'REQUEST',
  //                   credit_account: '__creditAccount',
  //                   debit_account: '__debitAccount',
  //                   transaction_code: 'DEPOSIT',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'withdraw-from-savings': {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-path': 'api/ESBWebservice',
  //               'request-group': {
  //                 data: {
  //                   amount: '__amount',
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'SAVINGS',
  //                   direction: 'REQUEST',
  //                   credit_account: '__creditAccount',
  //                   debit_account: '__debitAccount',
  //                   transaction_code: 'WITHDRAWAL',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'open-savings-account': {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-path': 'api/ESBWebservice',
  //               'request-group': {
  //                 data: {
  //                   amount: '__deposit',
  //                   target_amount: '__amount',
  //                   savings_purpose: 'Test',
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'SAVINGS',
  //                   direction: 'REQUEST',
  //                   savings_code: '__product',
  //                   duration: '__period',
  //                   terms_accepted: true,
  //                   debit_account: '__debitAccount',
  //                   transaction_code: 'OPEN_ACCOUNT',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'savings-products': {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-path': 'api/ESBWebservice',
  //               'request-group': {
  //                 data: {
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'SAVINGS',
  //                   direction: 'REQUEST',
  //                   transaction_code: 'SAVING_PRODUCTS',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'loan-balance-balance': {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-path': 'api/ESBWebservice',
  //               'request-group': {
  //                 data: {
  //                   amount: 0,
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   account_type: 'loan_account',
  //                   transaction_type: 'LOAN_SERVICE',
  //                   direction: 'REQUEST',
  //                   debit_account: '__walletAccount',
  //                   transaction_code: 'BALANCE',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'loan-balance': {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-path': 'api/ESBWebservice',
  //               'request-group': {
  //                 data: {
  //                   amount: 0,
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   account_type: 'loan_account',
  //                   transaction_type: 'LOAN_SERVICE',
  //                   direction: 'REQUEST',
  //                   debit_account: '__walletAccount',
  //                   transaction_code: 'BALANCE',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'agent-withdraw': {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-path': 'api/ESBWebservice',
  //               'request-group': {
  //                 data: {
  //                   amount: '__amount',
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   account_type: 'FOSA',
  //                   transaction_type: 'AGENT',
  //                   agent_code: '__agentCode',
  //                   direction: 'REQUEST',
  //                   debit_account: '__debitAccount',
  //                   transaction_code: 'AGENT_WITHDRAWAL',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'cardless-withdrawal-agent': {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-path': 'api/ESBWebservice',
  //               'request-group': {
  //                 data: {
  //                   amount: '__cardlessWithdrawAmount',
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   account_type: 'FOSA',
  //                   transaction_type: 'AGENT',
  //                   agent_code: '__agentCode',
  //                   direction: 'REQUEST',
  //                   debit_account: '__cardlessDebitAccount',
  //                   transaction_code: 'AGENT_WITHDRAWAL',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'cardless-withdrawal-agent-charges': {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-path': 'api/ESBWebservice',
  //               'request-group': {
  //                 data: {
  //                   amount: '__cardlessWithdrawAmount',
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   account_type: 'FOSA',
  //                   transaction_type: 'AGENT',
  //                   agent_code: '__agentCode',
  //                   direction: 'REQUEST',
  //                   debit_account: '__cardlessDebitAccount',
  //                   transaction_code: 'AGENT_WITHDRAWAL',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'loan-products': {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-path': 'api/ESBWebservice',
  //               'request-group': {
  //                 data: {
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   account_type: 'WALLET',
  //                   transaction_type: 'LOAN_SERVICE',
  //                   direction: 'REQUEST',
  //                   transaction_code: 'PRODUCTS',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response_message',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'loan-application': {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-path': 'api/ESBWebservice',
  //               'request-group': {
  //                 data: {
  //                   amount: '__amount',
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   account_type: 'LOAN',
  //                   transaction_type: 'LOAN',
  //                   loan_code: '__product',
  //                   direction: 'REQUEST',
  //                   debit_account: '__debitAccount',
  //                   transaction_code: 'REQUEST',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'loan-limit': {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-path': 'api/ESBWebservice',
  //               'request-group': {
  //                 data: {
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'LOAN_SERVICE',
  //                   direction: 'REQUEST',
  //                   transaction_code: 'LIMIT',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'loan-repayment': {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-path': 'api/ESBWebservice',
  //               'request-group': {
  //                 data: {
  //                   amount: '__amount',
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   account_type: 'LOAN',
  //                   transaction_type: 'LOAN',
  //                   direction: 'REQUEST',
  //                   debit_account: '__debitAccount',
  //                   transaction_code: 'PAYMENT',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             registration: {
  //               'custom-headers': {
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-path': 'api/customer/register',
  //               'request-group': {
  //                 data: {
  //                   document_type: 'ID',
  //                   grant_type: 'access_token',
  //                   gender: 'm',
  //                   account_type: 'customer',
  //                   req_type: 'register_customer',
  //                   transaction_type: 'CUSTOMERS',
  //                   email_address: '__email',
  //                   first_name: '__firstname',
  //                   middle_name: '__othername',
  //                   last_name: '__surname',
  //                   phone_number: '__walletAccount',
  //                   id_number: '__id',
  //                   dob: '__dob',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'withdraw-to-mobile': {
  //               'request-path': 'api/ESBWebservice',
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-group': {
  //                 enabled: true,
  //                 data: {
  //                   amount: '__withdrawAmount',
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'B2C',
  //                   direction: 'REQUEST',
  //                   biller_ref: '__billerRefAccount',
  //                   debit_account: '__withdrawDebitAccount',
  //                   transaction_code: 'WITHDRAW',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             deposit: {
  //               'request-path': 'api/ESBWebservice',
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-group': {
  //                 enabled: true,
  //                 data: {
  //                   amount: '__depositAmount',
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'MPESACHECKOUT',
  //                   direction: 'MPESACHECKOUT',
  //                   biller_ref: '__walletAccount',
  //                   credit_account: '__depositCreditAccount',
  //                   transaction_code: 'FTMM',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-fields': [
  //                   {
  //                     name: 'esb_ref',
  //                     delete: 'data.payload.esb_ref',
  //                     'group-to': 'esb_ref',
  //                   },
  //                 ],
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'load-wallet': {
  //               'request-path': 'api/ESBWebservice',
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-group': {
  //                 enabled: true,
  //                 data: {
  //                   amount: '__loadwalletAmount',
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'DEPOSIT',
  //                   direction: 'MPESACHECKOUT',
  //                   biller_ref: '__walletAccount',
  //                   credit_account: '__loadwalletCreditAccount',
  //                   transaction_code: 'MPESA',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-fields': [
  //                   {
  //                     name: 'esb_ref',
  //                     delete: 'data.payload.esb_ref',
  //                     'group-to': 'esb_ref',
  //                   },
  //                 ],
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '000',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             depositPresentment: {
  //               'request-path': 'api/ESBWebservice',
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-group': {
  //                 enabled: true,
  //                 data: {
  //                   amount: '__depositAmount',
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'FT',
  //                   direction: 'MPESACHECKOUT',
  //                   debit_account: '__depositCreditAccount',
  //                   credit_account: '__depositCreditAccount',
  //                   transaction_code: 'FTMM',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             balance: {
  //               'request-path': 'api/ESBWebservice',
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-group': {
  //                 enabled: false,
  //                 data: {
  //                   amount: 0,
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   account_type: 'FOSA',
  //                   transaction_type: 'BI',
  //                   direction: 'REQUEST',
  //                   debit_account: '__balanceDebitAccount',
  //                   transaction_code: 'BIMM',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response_message',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             ministatement: {
  //               'request-path': 'api/ESBWebservice',
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-group': {
  //                 enabled: false,
  //                 data: {
  //                   amount: 0,
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'MINI',
  //                   direction: 'REQUEST',
  //                   debit_account: '__ministatementDebitAccount',
  //                   transaction_code: 'MINIMM',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             mahitajiadvance: {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-group': {
  //                 enabled: false,
  //                 data: {},
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'field39',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             loanrepayment: {
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-group': {
  //                 enabled: false,
  //                 data: {},
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'field39',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             KplcPrepaidPayment: {
  //               'request-path': 'api/ESBWebservice',
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-group': {
  //                 enabled: true,
  //                 data: {
  //                   amount: '__billPaymentAmount',
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'BILL',
  //                   direction: 'REQUEST',
  //                   biller_ref: '__billPaymentCreditAccount',
  //                   debit_account: '__billPaymentDebitAccount',
  //                   transaction_code: 'KPLCPREPAID',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response_message',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'power-postpaid-presentment': {
  //               'request-path': 'api/ESBWebservice',
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-group': {
  //                 enabled: true,
  //                 data: {
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'BILLPRESENTMENT',
  //                   direction: 'REQUEST',
  //                   biller_ref: '__billPaymentCreditAccount',
  //                   debit_account: '__billPaymentDebitAccount',
  //                   transaction_code: 'KPLCPOSTPAID',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response_message',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'power-Postpaid-Payment': {
  //               'request-path': 'api/ESBWebservice',
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-group': {
  //                 enabled: true,
  //                 data: {
  //                   amount: '__billPaymentAmount',
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'BILL',
  //                   direction: 'REQUEST',
  //                   biller_ref: '__billPaymentCreditAccount',
  //                   debit_account: '__billPaymentDebitAccount',
  //                   transaction_code: 'KPLCPOSTPAID',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response_message',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'water-bill-payment': {
  //               'request-path': 'api/ESBWebservice',
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-group': {
  //                 enabled: true,
  //                 data: {
  //                   amount: '__billPaymentAmount',
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'BILL',
  //                   transaction_id: '2323',
  //                   direction: 'REQUEST',
  //                   biller_ref: '__billPaymentBillerAccount',
  //                   debit_account: '__billPaymentDebitAccount',
  //                   transaction_code: 'NAIROBI_WATER',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response_message',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'water-presentment': {
  //               'request-path': 'api/ESBWebservice',
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-group': {
  //                 enabled: true,
  //                 data: {
  //                   amount: 200,
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'BILLPRESENTMENT',
  //                   direction: 'REQUEST',
  //                   biller_ref: '__billPaymentBillerAccount',
  //                   debit_account: '__billPaymentDebitAccount',
  //                   transaction_code: 'NAIROBI_WATER',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response_message',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             nhifPresentment: {
  //               'request-path': 'api/ESBWebservice',
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-group': {
  //                 enabled: true,
  //                 data: {
  //                   amount: 55,
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'BILLPRESENTMENT',
  //                   direction: 'REQUEST',
  //                   IsPenalty: false,
  //                   biller_ref: '__billPaymentCreditAccount',
  //                   debit_account: '__billPaymentDebitAccount',
  //                   transaction_code: 'NHIF',
  //                   IsCorporate: false,
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response_message',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             nhifPayment: {
  //               'request-path': 'api/ESBWebservice',
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-group': {
  //                 enabled: true,
  //                 data: {
  //                   amount: '__billPaymentAmount',
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'BILL',
  //                   direction: 'REQUEST',
  //                   biller_ref: '__billPaymentCreditAccount',
  //                   debit_account: '__billPaymentDebitAccount',
  //                   transaction_code: 'NHIF',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response_message',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             dstvPresentment: {
  //               'request-path': 'api/ESBWebservice',
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-group': {
  //                 enabled: true,
  //                 data: {
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'BILLPRESENTMENT',
  //                   direction: 'REQUEST',
  //                   biller_ref: '__billPaymentCreditAccount',
  //                   debit_account: '__billPaymentDebitAccount',
  //                   transaction_code: 'DSTV',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response_message',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             dstvPayment: {
  //               'request-path': 'api/ESBWebservice',
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-group': {
  //                 enabled: true,
  //                 data: {
  //                   amount: '__billPaymentAmount',
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'BILL',
  //                   direction: 'REQUEST',
  //                   biller_ref: '__billPaymentCreditAccount',
  //                   debit_account: '__billPaymentDebitAccount',
  //                   transaction_code: 'DSTV',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response_message',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             gotvPresentment: {
  //               'request-path': 'api/ESBWebservice',
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-group': {
  //                 enabled: true,
  //                 data: {
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'BILLPRESENTMENT',
  //                   direction: 'REQUEST',
  //                   biller_ref: '__billPaymentCreditAccount',
  //                   debit_account: '__billPaymentDebitAccount',
  //                   transaction_code: 'GOTV',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response_message',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             gotvPayment: {
  //               'request-path': 'api/ESBWebservice',
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-group': {
  //                 enabled: true,
  //                 data: {
  //                   amount: '__billPaymentAmount',
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'BILL',
  //                   direction: 'REQUEST',
  //                   biller_ref: '__billPaymentCreditAccount',
  //                   debit_account: '__billPaymentDebitAccount',
  //                   transaction_code: 'GOTV',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response_message',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //             'buy-airtime': {
  //               'request-path': 'api/ESBWebservice',
  //               'custom-headers': {
  //                 Authorization: 'Bearer __access_token',
  //                 'Content-Type': 'application/json',
  //               },
  //               'request-group': {
  //                 enabled: true,
  //                 data: {
  //                   amount: '__airtimeAmount',
  //                   phone_number: '__walletAccount',
  //                   host_code: 'MM',
  //                   transaction_type: 'AIRTIMETOPUP',
  //                   direction: 'REQUEST',
  //                   biller_ref: '__airtimeCreditAccount',
  //                   debit_account: '__airtimeDebitAccount',
  //                   transaction_code: '__airtimeProvider',
  //                   currency: 'KES',
  //                 },
  //                 'group-to': 'data.payload',
  //                 'group-format': 'JSON',
  //                 'group-base64': false,
  //               },
  //               response: {
  //                 status: {
  //                   field: 'data.response.response_code',
  //                   matches: [
  //                     {
  //                       code: '00',
  //                       status: 'success',
  //                     },
  //                   ],
  //                   error: {
  //                     message: 'data.response.response',
  //                   },
  //                 },
  //                 save: false,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //     pages: {
  //       'create-standing-orders-page': {
  //         type: 'select',
  //         name: 'create-standing-orders-page',
  //         options: [
  //           {
  //             name: 'standing-orders-internal',
  //             label: 'standing-orders-internal-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'standing-orders-external',
  //             label: 'standing-orders-external-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //         ],
  //         error: 'create-standing-orders-page-error',
  //         previous: 'standing-orders-page',
  //       },
  //       'login-page': {
  //         type: 'select',
  //         name: 'login-page',
  //         options: [
  //           {
  //             name: 'login',
  //             label: 'login-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'pin-change',
  //             label: 'login-pin-change-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'registration',
  //             label: 'registration-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //         ],
  //         error: 'login-page-error',
  //       },
  //       'withdraw-page': {
  //         type: 'select',
  //         name: 'withdraw-page',
  //         options: [
  //           {
  //             name: 'withdraw-from-wallet-to-mobile',
  //             label: 'withdraw-from-wallet-to-mobile-label',
  //             enabled: true,
  //             authenticate: false,
  //             logo: '',
  //           },
  //           {
  //             name: 'withdraw',
  //             label: 'withdraw-label',
  //             enabled: true,
  //             authenticate: false,
  //             logo: '',
  //           },
  //         ],
  //         error: 'withdraw-page-error',
  //         previous: 'client-page',
  //       },
  //       'customer-requests-page': {
  //         type: 'select',
  //         name: 'customer-requests-page',
  //         options: [
  //           {
  //             name: 'cheques-page',
  //             label: 'cheques-page-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'atm-cards-page',
  //             label: 'atm-cards-page-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'account-linking',
  //             label: 'account-linking-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'account-requests-page',
  //             label: 'account-requests-page-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'cardless-withdraw-page',
  //             label: 'cardless-withdrawal-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //         ],
  //         error: 'customer-requests-page-error',
  //         previous: 'client-page',
  //       },
  //       'bill-payment-page': {
  //         type: 'select',
  //         name: 'bill-payment-page',
  //         options: [
  //           {
  //             name: 'pay-bill-water',
  //             label: 'pay-bill-water-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'electricity-power-postpaid',
  //             label: 'electricity-power-postpaid-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'electricity-power-prepaid',
  //             label: 'electricity-power-prepaid-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'dstv',
  //             label: 'dstv-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'school-fees',
  //             label: 'school-fees-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'gotv',
  //             label: 'gotv-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'nhif',
  //             label: 'nhif-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'landrates',
  //             label: 'landrates-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //         ],
  //         error: 'bill-payment-page-error',
  //         previous: 'client-page',
  //       },
  //       'account-enquiries-page': {
  //         type: 'select',
  //         name: 'account-enquiries-page',
  //         options: [
  //           {
  //             name: 'balance',
  //             label: 'balance-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'ministatement',
  //             label: 'ministatement-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'fullstatement',
  //             label: 'fullstatement-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'card-balance',
  //             label: 'card-balance-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //         ],
  //         error: 'account-enquiries-page-error',
  //         previous: 'client-page',
  //       },
  //       'registration-page': {
  //         type: 'select',
  //         name: 'registration-page',
  //         options: [
  //           {
  //             name: 'terms',
  //             label: 'terms-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'registration',
  //             label: 'registration-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //         ],
  //         error: 'registration-page-error',
  //       },
  //       'atm-cards-page': {
  //         type: 'select',
  //         name: 'atm-cards-page',
  //         options: [
  //           {
  //             name: 'request-atm',
  //             label: 'request-atm-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'replace-atm',
  //             label: 'replace-atm-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'block-atm',
  //             label: 'block-atm-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'unblock-atm',
  //             label: 'unblock-atm-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'set-atm-limits',
  //             label: 'set-atm-limits-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //         ],
  //         error: 'atm-cards-page-error',
  //         previous: 'customer-requests-page',
  //       },
  //       'settings-page': {
  //         type: 'select',
  //         name: 'settings-page',
  //         previous: 'client-page',
  //         options: [
  //           {
  //             name: 'language-change',
  //             label: 'language-change-label',
  //             enabled: false,
  //           },
  //           {
  //             name: 'pin-change',
  //             label: 'pin-change-label',
  //             enabled: true,
  //           },
  //           {
  //             name: 'email-change',
  //             label: 'email-change-label',
  //             enabled: false,
  //           },
  //         ],
  //         error: 'settings-page-error',
  //       },
  //       'pesalink-page': {
  //         type: 'select',
  //         name: 'pesalink-page',
  //         options: [
  //           {
  //             name: 'pesalink-to-phone',
  //             label: 'pesalink-to-phone-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'pesalink-to-bank',
  //             label: 'pesalink-to-bank-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'pesalink-to-card',
  //             label: 'pesalink-to-card-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'pesalink-to-ecitizen',
  //             label: 'pesalink-to-ecitizen-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'pesalink-link-account',
  //             label: 'pesalink-link-account-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'pesalink-link-primary',
  //             label: 'pesalink-link-primary-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //         ],
  //         error: 'pesalink-page-error',
  //         previous: 'funds-transfer-page',
  //       },
  //       'loans-page': {
  //         type: 'select',
  //         name: 'loans-page',
  //         options: [
  //           {
  //             name: 'loan-limit',
  //             label: 'loan-limit-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'loan-application',
  //             label: 'loan-application-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'loan-balance',
  //             label: 'loan-balance-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'loan-repayment',
  //             label: 'loan-repayment-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'loan-statement',
  //             label: 'loan-statement-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //         ],
  //         error: 'loans-page-error',
  //         previous: 'client-page',
  //       },
  //       'client-page': {
  //         type: 'select',
  //         name: 'client-page',
  //         options: [
  //           {
  //             name: 'account-enquiries-page',
  //             label: 'account-enquiries-page-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'loans-page',
  //             label: 'loans-page-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'cardless-withdraw-page',
  //             label: 'cardless-withdraw-page-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'customer-requests-page',
  //             label: 'customer-requests-page-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'ministatement',
  //             label: 'ministatement-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'withdraw-page',
  //             label: 'withdraw-page-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'agent-withdraw',
  //             label: 'agent-withdraw-label',
  //             enabled: false,
  //             authenticate: false,
  //             logo: '',
  //           },
  //           {
  //             name: 'savings-page',
  //             label: 'savings-page-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'settings-page',
  //             label: 'settings-page-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //         ],
  //         error: 'client-page-error',
  //       },
  //       'account-requests-page': {
  //         type: 'select',
  //         name: 'account-requests-page',
  //         options: [
  //           {
  //             name: 'account-mandates',
  //             label: 'account-mandates-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'account-linking',
  //             label: 'account-linking-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'account-activation',
  //             label: 'account-activation-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'card-linking',
  //             label: 'card-linking-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'sacco-linking',
  //             label: 'sacco-linking-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'wallet-account-opening',
  //             label: 'wallet-account-opening-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'core-account-opening',
  //             label: 'core-account-opening-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'view-accounts',
  //             label: 'view-accounts-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //         ],
  //         error: 'account-requests-page-error',
  //         previous: 'customer-requests-page',
  //       },
  //       'savings-page': {
  //         type: 'select',
  //         name: 'savings-page',
  //         options: [
  //           {
  //             name: 'savings-open',
  //             label: 'savings-open-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'savings-balance',
  //             label: 'savings-balance-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'savings-statement',
  //             label: 'savings-statement-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'savings-withdraw',
  //             label: 'savings-withdraw-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'savings-deposit',
  //             label: 'savings-deposit-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //         ],
  //         error: 'savings-page-error',
  //         previous: 'client-page',
  //       },
  //       'wallet-page': {
  //         type: 'select',
  //         name: 'wallet-page',
  //         options: [
  //           {
  //             name: 'balance',
  //             label: 'balance-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'ministatement',
  //             label: 'ministatement-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'withdraw',
  //             label: 'withdraw-label',
  //             enabled: true,
  //             authenticate: false,
  //             logo: '',
  //           },
  //           {
  //             name: 'agent-withdraw',
  //             label: 'agent-withdraw-label',
  //             enabled: true,
  //             authenticate: false,
  //             logo: '',
  //           },
  //           {
  //             name: 'deposit',
  //             label: 'deposit-label',
  //             enabled: true,
  //             authenticate: false,
  //             logo: '',
  //           },
  //           {
  //             name: 'bill-payment-page',
  //             label: 'bill-payment-page-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'buy-airtime',
  //             label: 'buy-airtime-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //         ],
  //         error: 'wallet-page-error',
  //         previous: 'client-page',
  //       },
  //       'funds-transfer-other-accounts-page': {
  //         type: 'select',
  //         name: 'funds-transfer-other-accounts-page',
  //         options: [
  //           {
  //             name: 'funds-transfer-own-accounts',
  //             label: 'funds-transfer-own-accounts-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'funds-transfer-savings-to-savings',
  //             label: 'funds-transfer-other-accounts-page-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //         ],
  //         error: 'funds-transfer-other-accounts-page-error',
  //         previous: 'funds-transfer-page',
  //       },
  //       'standing-orders-page': {
  //         type: 'select',
  //         name: 'standing-orders-page',
  //         options: [
  //           {
  //             name: 'create-standing-orders-page',
  //             label: 'create-standing-orders-page-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'standing-orders-amend',
  //             label: 'standing-orders-amend-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'standing-orders-cancel',
  //             label: 'standing-orders-cancel-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //         ],
  //         error: 'standing-orders-page-error',
  //         previous: 'my-account-page',
  //       },
  //       'cardless-withdraw-page': {
  //         type: 'select',
  //         name: 'cardless-withdraw-page',
  //         options: [
  //           {
  //             name: 'via-atm',
  //             label: 'via-atm-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'via-agent',
  //             label: 'via-agent-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //         ],
  //         error: 'cardless-withdraw-page-error',
  //         previous: 'client-page',
  //       },
  //       'funds-transfer-page': {
  //         type: 'select',
  //         name: 'funds-transfer-page',
  //         options: [
  //           {
  //             name: 'funds-transfer-wallet-to-other-wallet',
  //             label: 'funds-transfer-wallet-to-other-wallet-label',
  //             enabled: true,
  //             authenticate: false,
  //             logo: '',
  //           },
  //           {
  //             name: 'funds-transfer-to-other-banks',
  //             label: 'funds-transfer-other-bank-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'funds-transfer-wallet-to-mobile-money',
  //             label: 'funds-transfer-wallet-to-mobile-money-label',
  //             enabled: true,
  //             authenticate: false,
  //             logo: '',
  //           },
  //           {
  //             name: 'load-wallet',
  //             label: 'load-wallet-label',
  //             enabled: false,
  //             authenticate: false,
  //             logo: '',
  //           },
  //           {
  //             name: 'funds-transfer-other-accounts-page',
  //             label: 'funds-transfer-other-accounts-page-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'withdrawal-mpesa-b2c',
  //             label: 'withdrawal-mpesa-b2c-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'withdrawal-airtel-b2c',
  //             label: 'withdrawal-airtel-b2c-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'mpesa-c2b',
  //             label: 'mpesa-c2b-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'rtgs',
  //             label: 'rtgs-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'pesalink-page',
  //             label: 'pesalink-page-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'eft',
  //             label: 'eft-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'topup-prepaid-card',
  //             label: 'topup-prepaid-card-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'withdraw-from-wallet-to-mobile',
  //             label: 'withdraw-from-wallet-to-mobile-label',
  //             enabled: false,
  //             authenticate: false,
  //             logo: '',
  //           },
  //           {
  //             name: 'withdraw',
  //             label: 'withdraw-label',
  //             enabled: false,
  //             authenticate: false,
  //             logo: '',
  //           },
  //           {
  //             name: 'funds-transfer-own-accounts',
  //             label: 'funds-transfer-own-accounts-label',
  //             enabled: false,
  //             authenticate: false,
  //             logo: '',
  //           },
  //           {
  //             name: 'funds-transfer-other-account',
  //             label: 'funds-transfer-other-account-label',
  //             enabled: false,
  //             authenticate: false,
  //             logo: '',
  //           },
  //           {
  //             name: 'funds-transfer-other-bank',
  //             label: 'funds-transfer-other-bank-label',
  //             enabled: false,
  //             authenticate: false,
  //             logo: '',
  //           },
  //           {
  //             name: 'withdraw',
  //             label: 'withdraw-label',
  //             enabled: false,
  //             authenticate: false,
  //             logo: '',
  //           },
  //         ],
  //         error: 'funds-transfer-page-error',
  //         previous: 'client-page',
  //       },
  //       'cheques-page': {
  //         type: 'select',
  //         name: 'cheques-page',
  //         options: [
  //           {
  //             name: 'request-cheque-book',
  //             label: 'request-cheque-book-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'bankers-cheque-request',
  //             label: 'bankers-cheque-request-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'stop-cheque',
  //             label: 'stop-cheque-label',
  //             enabled: true,
  //             authenticate: false,
  //           },
  //           {
  //             name: 'confirm-cheque',
  //             label: 'confirm-cheque-label',
  //             enabled: false,
  //             authenticate: false,
  //           },
  //         ],
  //         error: 'cheques-page-error',
  //         previous: 'customer-requests-page',
  //       },
  //     },
  //     prompts_cache: {
  //       'account-blocked': ['account-blocked'],
  //       'funds-transfer-wallet-to-savings': [
  //         'ft-wallet-to-savings-credit-account',
  //         'ft-wallet-to-savings-amount',
  //         'ft-wallet-to-savings-confirm',
  //       ],
  //       parking: [
  //         'parking-debit-account',
  //         'parking-credit-account',
  //         'parking-amount',
  //         'parking-confirm',
  //         'parking-debit-account-options-error',
  //         'parking-member-types-options-error',
  //         'nhif-presentment-error',
  //         'nhif-presentment-amount-error',
  //       ],
  //       'via-agent': [
  //         'via-agent-credit-account',
  //         'via-agent-debit-account',
  //         'via-agent-amount',
  //         'via-agent-confirm',
  //         'fetch-agent-details-error',
  //       ],
  //       gotv: [
  //         'gotv-debit-account',
  //         'gotv-credit-account',
  //         'gotv-amount',
  //         'gotv-confirm',
  //         'gotv-debit-account-options-error',
  //         'gotv-presentment-error',
  //       ],
  //       'sacco-linking-success': ['sacco-linking-success'],
  //       'mahitaji-advance': [
  //         'mahitaji-advance-amount',
  //         'mahitaji-advance-confirm',
  //       ],
  //       'replace-atm': [
  //         'replace-atm-account',
  //         'request-atm-account-types',
  //         'replace-atm-confirm',
  //         'replace-atm-account-options-error',
  //       ],
  //       'sacco-linking': [
  //         'sacco-linking-account',
  //         'sacco-linking-id',
  //         'sacco-linking-confirm',
  //       ],
  //       'wrong-login': ['wrong-login'],
  //       'loan-limit': [
  //         'loan-limit-account',
  //         'loan-limit-confirm',
  //         'balance-account-fosa-options-error',
  //         'balance-account-loan-options-error',
  //       ],
  //       'funds-transfer-wallet-to-other-wallet': [
  //         'ft-wallet-to-other-wallet-debit-account',
  //         'ft-wallet-to-other-wallet-other-number',
  //         'ft-wallet-to-other-wallet-amount',
  //         'ft-wallet-to-other-wallet-confirm',
  //         'ft-wallet-to-other-wallet-debit-account-options-error',
  //         'ft-wallet-to-other-wallet-credit-account-options-error',
  //         'ft-same-account-error',
  //         'ft-wallet-to-other-wallet-credit-account',
  //       ],
  //       'loan-product-no-found-error': ['loan-product-no-found-error'],
  //       'zuku-tv': [
  //         'zuku-tv-credit-account',
  //         'zuku-tv-debit-account',
  //         'zuku-tv-amount',
  //         'zuku-tv-confirm',
  //         'zuku-tv-debit-account-options-error',
  //       ],
  //       fullstatement: [
  //         'fullstatement-account-savings',
  //         'fullstatement-provide-email',
  //         'fullstatement-provide-email-account',
  //         'fullstatement-period',
  //         'fullstatement-confirm',
  //         'fullstatement-account-savings-options-error',
  //       ],
  //       'mpesa-alert': ['mpesa-show-alert'],
  //       'funds-transfer-wallet-to-mno': [
  //         'ft-wallet-to-mno-credit-account',
  //         'ft-wallet-to-mno-amount',
  //         'ft-wallet-to-mno-confirm',
  //       ],
  //       'mpesa-b2b': [
  //         'b2b-debit-account',
  //         'b2b-type',
  //         'b2b-till',
  //         'b2b-pay-bill',
  //         'b2b-account',
  //         'b2b-till-amount',
  //         'b2b-pay-bill-amount',
  //         'b2b-till-confirm',
  //         'b2b-pay-bill-confirm',
  //         'b2b-debit-account-options-error',
  //         'hakikisha-till-presentment-error',
  //         'hakikisha-paybill-presentment-error',
  //       ],
  //       'pin-change-success': ['pin-change-success-alert'],
  //       login: ['login'],
  //       terms: ['terms'],
  //       'buy-airtime': [
  //         'buy-airtime-provider',
  //         'buy-airtime-account-type',
  //         'buy-airtime-credit-account',
  //         'buy-airtime-debit-account',
  //         'buy-airtime-amount',
  //         'buy-airtime-confirm',
  //         'buy-airtime-debit-account-options-error',
  //       ],
  //       'loan-balance-success': ['loan-balance-success'],
  //       'mpesa-float': [
  //         'float-debit-account',
  //         'float-paybill',
  //         'float-store-number',
  //         'float-amount',
  //         'float-confirm',
  //         'hakikisha-float-presentment-error',
  //       ],
  //       maintenance: ['maintenance'],
  //       'confirm-cheque': [
  //         'confirm-cheque-account',
  //         'confirm-cheque-number',
  //         'confirm-cheque-amount',
  //         'confirm-cheque-name',
  //         'confirm-cheque-confirm',
  //         'confirm-cheque-account-options-error',
  //       ],
  //       'agent-withdraw': [
  //         'agent-withdraw-debit-account',
  //         'agent-withdraw-amount',
  //         'agent-code',
  //         'agent-withdraw-confirm',
  //         'withdraw-debit-account-options-error',
  //       ],
  //       'funds-transfer-savings-to-wallet': [
  //         'ft-savings-to-wallet-debit-account',
  //         'ft-savings-to-wallet-credit-account',
  //         'ft-savings-to-wallet-amount',
  //         'ft-savings-to-wallet-confirm',
  //         'ft-savings-to-wallet-debit-account-options-error',
  //       ],
  //       disabled: ['disabled'],
  //       'savings-open': [
  //         'savings-open-debit-account',
  //         'savings-open-products',
  //         'savings-open-target-amount',
  //         'savings-open-period',
  //         'savings-open-deposit',
  //         'savings-open-confirm',
  //       ],
  //       ministatement: [
  //         'ministatement-account',
  //         'ministatement-account-fosa',
  //         'ministatement-account-loan',
  //         'ministatement-confirm',
  //         'ministatement-account-fosa-options-error',
  //         'ministatement-account-loan-options-error',
  //       ],
  //       'withdrawal-mpesa-b2c': [
  //         'withdrawal-mpesa-debit-account',
  //         'withdrawal-mpesa-account-type',
  //         'withdrawal-mpesa-credit-account',
  //         'withdrawal-mpesa-amount',
  //         'withdrawal-mpesa-confirm',
  //         'withdrawal-mpesa-debit-account-options-error',
  //       ],
  //       'funds-transfer-wallet-to-wallet': [
  //         'ft-wallet-to-wallet-credit-account',
  //         'ft-wallet-to-wallet-amount',
  //         'ft-wallet-to-wallet-confirm',
  //       ],
  //       'standing-orders-amend': [
  //         'so-amend-debit-account',
  //         'so-amend-id',
  //         'so-amend-amount',
  //         'so-amend-frequency',
  //         'so-amend-end-date',
  //         'so-amend-instruction',
  //         'so-amend-confirm',
  //         'so-amend-debit-account-options-error',
  //         'standing-orders-lookup-error',
  //         'standing-orders-options-error',
  //       ],
  //       'via-atm': [
  //         'via-atm-debit-account',
  //         'via-atm-amount',
  //         'via-atm-confirm',
  //       ],
  //       'merchant-payment': [
  //         'merchant-payment-code',
  //         'merchant-payment-accounts',
  //         'merchant-payment-debit-account',
  //         'merchant-payment-amount',
  //         'merchant-payment-confirm',
  //         'mpesa-merchant-amount',
  //         'mpesa-merchant-confirm',
  //         'mpesa-merchant-payment-success',
  //         'loan-repayment-success',
  //         'merchant-payment-account-error',
  //         'merchant-payment-presentment-account-error',
  //       ],
  //       registration: [
  //         'registration',
  //         'registration-fullname',
  //         'registration-id-number',
  //         'registration-email',
  //         'registration-confirm',
  //       ],
  //       'withdraw-from-wallet-to-mobile': [
  //         'withdraw-from-wallet-to-mobile-type',
  //         'withdraw-from-wallet-to-mobile-other-number',
  //         'withdraw-from-wallet-to-mobile-amount',
  //         'withdraw-from-wallet-to-mobile-confirm',
  //       ],
  //       hospitals: [
  //         'hospital-debit-account',
  //         'hospital-account-number',
  //         'hospital-narration',
  //         'hospital-amount',
  //         'hospital-confirm',
  //         'hospital-account-error',
  //         'hospital-debit-account-options-error',
  //         'hospital-list-accounts-error',
  //       ],
  //       'withdrawal-airtel-b2c': [
  //         'withdrawal-airtel-debit-account',
  //         'withdrawal-airtel-account-type',
  //         'withdrawal-airtel-credit-account',
  //         'withdrawal-airtel-amount',
  //         'withdrawal-airtel-confirm',
  //         'withdrawal-airtel-debit-account-options-error',
  //       ],
  //       'coming-soon': ['coming-soon'],
  //       'loan-limit-success': ['loan-limit-success'],
  //       'pay-bill-water': [
  //         'pay-bill-water-credit-account',
  //         'pay-bill-water-debit-account',
  //         'pay-bill-water-amount',
  //         'pay-bill-water-confirm',
  //         'pay-bill-water-debit-account-options-error',
  //         'water-bill-presentment-error',
  //       ],
  //       'loan-limit-error': ['loan-limit-error'],
  //       'core-account-opening': [
  //         'core-account-type',
  //         'cbu-dream-account',
  //         'personal-current-account',
  //         'my-saver-account',
  //         'core-account-opening-search',
  //         'core-account-opening-result',
  //         'core-account-currency',
  //         'core-account-debit-account',
  //         'core-account-confirm',
  //         'core-account-type-options-error',
  //         'core-account-debit-account-options-error',
  //       ],
  //       'jamii-telkom': [
  //         'jamii-telkom-credit-account',
  //         'jamii-telkom-debit-account',
  //         'jamii-telkom-amount',
  //         'jamii-telkom-confirm',
  //         'jamii-telkom-debit-account-options-error',
  //       ],
  //       'inapp-login': ['inapp-login'],
  //       withdraw: [
  //         'withdraw-debit-account',
  //         'withdraw-debit-account-fosa',
  //         'withdraw-debit-account-bosa',
  //         'withdraw-amount',
  //         'withdraw-confirm',
  //         'withdraw-debit-account-options-error',
  //         'withdraw-debit-account-fosa-options-error',
  //         'withdraw-debit-account-bosa-options-error',
  //       ],
  //       'registration-success': ['registration-success'],
  //       'electricity-power-postpaid': [
  //         'electricity-power-postpaid-debit-account',
  //         'electricity-power-postpaid-credit-account',
  //         'electricity-power-postpaid-confirm',
  //         'electricity-power-postpaid-debit-account-options-error',
  //         'electricity-power-postpaid-presentment-error',
  //       ],
  //       'standing-orders-cancel': [
  //         'so-cancel-debit-account',
  //         'standing-orders-lookup',
  //         'so-cancel-id',
  //         'so-cancel-confirm',
  //         'so-cancel-debit-account-options-error',
  //         'standing-orders-lookup-error',
  //         'standing-orders-options-error',
  //       ],
  //       'registration-alert': ['registration-alert'],
  //       'card-balance': ['card-balance-number', 'card-balance-confirm'],
  //       'wallet-account-opening': ['wallet-account-opening'],
  //       'ministatement-success': ['ministatement-success'],
  //       'loan-repayment': [
  //         'loan-repayment-debit-account',
  //         'loan-repayment-products',
  //         'loan-repayment-amount',
  //         'loan-repayment-confirm',
  //       ],
  //       'loyalty-points': [
  //         'loyalty-points-options',
  //         'fetch-loyalty-balance',
  //         'loyalty-balance-success',
  //         'redeem-points-amount',
  //         'redeem-points-confirm',
  //       ],
  //       'language-change': ['language-change', 'language-confirm'],
  //       'first-login': [
  //         'first-login',
  //         'first-login-new-pin',
  //         'first-login-confirm',
  //       ],
  //       'savings-withdraw': [
  //         'savings-withdraw-credit-account',
  //         'savings-withdraw-account',
  //         'savings-withdraw-amount',
  //         'savings-withdraw-confirm',
  //       ],
  //       'request-cheque-book': [
  //         'request-cheque-book-account',
  //         'request-cheque-book-leaves',
  //         'request-cheque-book-quantity',
  //         'request-cheque-book-confirm',
  //         'request-cheque-book-account-options-error',
  //       ],
  //       'account-linking-success': ['account-linking-success'],
  //       'savings-deposit': [
  //         'savings-deposit-debit-account',
  //         'savings-deposit-account',
  //         'savings-deposit-amount',
  //         'savings-deposit-confirm',
  //       ],
  //       'loan-balance-error': ['loan-balance-error'],
  //       'fullstatement-email-error': ['fullstatement-email-error'],
  //       'loan-application': [
  //         'loan-application-debit-account',
  //         'loan-products',
  //         'loan-application-amount',
  //         'loan-application-confirm',
  //       ],
  //       'registration-error': ['registration-error'],
  //       balance: [
  //         'balance-account',
  //         'balance-confirm',
  //         'balance-account-fosa',
  //         'balance-account-fosa',
  //         'balance-account-loan',
  //         'balance-account-fosa-options-error',
  //         'balance-account-loan-options-error',
  //       ],
  //       'ft-mobile-to-wallet': [
  //         'ft-mobile-to-wallet-type',
  //         'ft-mobile-to-wallet-other-number',
  //         'ft-mobile-to-wallet-debit-account',
  //         'ft-mobile-to-wallet-amount',
  //         'ft-mobile-to-wallet-confirm',
  //         'ft-mobile-to-wallet-debit-account-options-error',
  //         'ft-mobile-to-wallet-credit-account-options-error',
  //         'ft-same-account-error',
  //         'ft-mobile-to-wallet-credit-account',
  //       ],
  //       dstv: [
  //         'dstv-debit-account',
  //         'dstv-credit-account',
  //         'dstv-amount',
  //         'dstv-confirm',
  //         'dstv-debit-account-options-error',
  //         'dstv-presentment-error',
  //       ],
  //       deposit: [
  //         'deposit-debit-account',
  //         'deposit-debit-account-fosa',
  //         'deposit-debit-account-bosa',
  //         'deposit-amount',
  //         'deposit-confirm',
  //         'deposit-debit-account-options-error',
  //         'deposit-debit-account-fosa-options-error',
  //         'deposit-charges-error',
  //       ],
  //       'electricity-power-prepaid': [
  //         'electricity-power-prepaid-credit-account',
  //         'electricity-power-prepaid-debit-account',
  //         'electricity-power-prepaid-amount',
  //         'electricity-power-prepaid-confirm',
  //         'electricity-power-prepaid-debit-account-options-error',
  //       ],
  //       'set-atm-limits': [
  //         'fetch-interswitch-cards',
  //         'set-card-limit-card',
  //         'set-card-limit-transaction',
  //         'pos-amount',
  //         'atm-amount',
  //         'online-amount',
  //         'pos-count',
  //         'atm-count',
  //         'online-count',
  //         'pos-confirm',
  //         'atm-confirm',
  //         'online-confirm',
  //         'card-lookup-error',
  //       ],
  //       'bankers-cheque-request': [
  //         'bankers-cheque-credit-account',
  //         'request-bankers-cheque-payable-to',
  //         'bankers-cheque-description',
  //         'bankers-cheque-collection-date',
  //         'request-bankers-cheque-amount',
  //         'bankers-cheque-branch-search',
  //         'bankers-cheque-branch-result',
  //         'request-bankers-cheque-confirm',
  //       ],
  //       'school-fees': [
  //         'school-fees-debit-account',
  //         'school-fees-credit-account',
  //         'school-fees-child-name',
  //         'school-fees-child-reg',
  //         'school-fees-amount',
  //         'school-fees-confirm',
  //       ],
  //       'star-times': [
  //         'start-times-credit-account',
  //         'start-times-debit-account',
  //         'start-times-amount',
  //         'start-times-confirm',
  //         'start-times-debit-account-options-error',
  //       ],
  //       'account-phone-number-look-up-error': [
  //         'account-phone-number-look-up-error',
  //       ],
  //       'registration-cancel': ['registration-cancel'],
  //       'request-atm': [
  //         'request-atm-account',
  //         'request-atm-account-types',
  //         'request-atm-confirm',
  //         'request-atm-account-options-error',
  //         'fetch-interswitch-cards-error',
  //       ],
  //       'card-linking': [
  //         'card-linking-account',
  //         'card-linking-id',
  //         'card-linking-confirm',
  //         'card-linking-success',
  //       ],
  //       'mpesa-c2b': [
  //         'deposit-mpesa-debit-account',
  //         'deposit-mpesa-amount',
  //         'deposit-mpesa-confirm',
  //       ],
  //       'unblock-atm': [
  //         'fetch-interswitch-cards',
  //         'unblock-atm-account',
  //         'unblock-atm-confirm',
  //         'unblock-atm-account-options-error',
  //       ],
  //       'account-mandates': [
  //         'account-mandates-debit-account',
  //         'account-mandates-id',
  //         'account-mandates-type',
  //         'account-mandates-confirm',
  //         'account-mandates-reject-confirm',
  //         'account-mandates-account-options-error',
  //         'account-mandates-lookup-error',
  //       ],
  //       donations: [
  //         'donations-credit-account',
  //         'donations-debit-account',
  //         'donations-amount',
  //         'donations-confirm',
  //         'donations-debit-account-options-error',
  //       ],
  //       nhif: [
  //         'nhif-debit-account',
  //         'nhif-member-type',
  //         'nhif-credit-account',
  //         'nhif-amount',
  //         'nhif-penalty-amount',
  //         'nhif-confirm',
  //         'nhif-debit-account-options-error',
  //         'nhif-member-types-options-error',
  //         'nhif-presentment-error',
  //       ],
  //       'block-atm': [
  //         'fetch-interswitch-cards',
  //         'block-atm-account',
  //         'block-atm-confirm',
  //         'block-atm-account-options-error',
  //       ],
  //       logout: ['logout'],
  //       'email-change': [
  //         'email-change-current-email',
  //         'email-change-new-email',
  //         'email-change-confirm',
  //       ],
  //       'funds-transfer-savings-to-savings': [
  //         'ft-savings-to-savings-debit-account',
  //         'ft-savings-to-savings-credit-account',
  //         'ft-savings-to-savings-amount',
  //         'ft-savings-to-savings-confirm',
  //         'ft-same-account-error',
  //         'ft-savings-to-savings-debit-account-options-error',
  //       ],
  //       'funds-transfer-to-other-banks': [
  //         'transfer-to-other-banks-credit-bank',
  //         'transfer-to-other-banks-credit-account',
  //         'transfer-to-other-banks-debit-account',
  //         'transfer-to-other-banks-amount',
  //         'transfer-to-other-banks-confirm',
  //         'ft-same-account-error',
  //         'transfer-to-other-banks-debit-account-options-error',
  //       ],
  //       'technical-error': ['technical-error'],
  //       'loan-balance': [
  //         'loan-balance-account',
  //         'loan-balance-confirm',
  //         'balance-account-fosa-options-error',
  //         'balance-account-loan-options-error',
  //       ],
  //       'standing-orders-internal': [
  //         'so-b2b-debit-account',
  //         'so-b2b-credit-account',
  //         'so-b2b-amount',
  //         'so-b2b-start-date',
  //         'so-b2b-end-date',
  //         'so-b2b-frequency',
  //         'so-b2b-beneficiary-name',
  //         'so-b2b-member-number',
  //         'so-b2b-instruction',
  //         'so-b2b-confirm',
  //         'so-b2b-debit-account-options-error',
  //       ],
  //       churches: [
  //         'church-debit-account',
  //         'church-account-number',
  //         'church-narration',
  //         'church-amount',
  //         'church-confirm',
  //         'church-account-error',
  //         'church-debit-account-options-error',
  //         'church-list-accounts-error',
  //       ],
  //       'savings-products': ['savings-products-confirm'],
  //       'account-linking': [
  //         'account-linking-id',
  //         'account-linking-accounts',
  //         'account-linking-confirm',
  //       ],
  //       'digital-account-opening': ['digital-account-confirm'],
  //       'pin-change': [
  //         'pin-change-old-pin',
  //         'pin-change-new-pin',
  //         'pin-change-confirm',
  //         'pin-change-error-alert',
  //       ],
  //       landrates: [
  //         'landrates-credit-account',
  //         'landrates-debit-account',
  //         'landrates-amount',
  //         'landrates-confirm',
  //         'landrates-debit-account-options-error',
  //       ],
  //       'zuku-internet': [
  //         'zuku-internet-credit-account',
  //         'zuku-internet-debit-account',
  //         'zuku-internet-amount',
  //         'zuku-internet-confirm',
  //         'zuku-internet-debit-account-options-error',
  //       ],
  //       'api-success': ['api-success'],
  //       'access-kenya': [
  //         'access-kenya-credit-account',
  //         'access-kenya-debit-account',
  //         'access-kenya-amount',
  //         'access-kenya-confirm',
  //         'access-kenya-debit-account-options-error',
  //       ],
  //       'mpesa-c2b-success': ['mpesa-c2b-success'],
  //       'api-error': ['api-error'],
  //       'savings-balance': [
  //         'savings-balance-debit-account',
  //         'savings-balance-account',
  //         'savings-balance-confirm',
  //       ],
  //       'funds-transfer-own-accounts': [
  //         'ft-own-accounts-debit-account',
  //         'ft-own-accounts-credit-account',
  //         'ft-own-accounts-amount',
  //         'ft-own-accounts-confirm',
  //         'ft-own-accounts-debit-account-options-error',
  //         'ft-own-accounts-credit-account-options-error',
  //         'ft-same-account-error',
  //       ],
  //       'balance-api-success': ['balance-api-success'],
  //       'imsi-check-failed': ['imsi-check-failed'],
  //       'savings-statement': [
  //         'savings-statement-debit-account',
  //         'savings-statement-account',
  //         'savings-statement-confirm',
  //       ],
  //       'load-wallet': [
  //         'load-wallet-debit-account-fosa',
  //         'load-wallet-amount',
  //         'load-wallet-confirm',
  //         'load-wallet-debit-account-options-error',
  //         'load-wallet-debit-account-fosa-options-error',
  //         'load-wallet-charges-error',
  //         'load-wallet-debit-account-bosa',
  //         'load-wallet-debit-account',
  //       ],
  //       'account-activation': [
  //         'fetch-dormant-accounts',
  //         'account-activation-options',
  //         'account-activation-type',
  //         'account-activation-ft-debit-account',
  //         'account-activation-confirm-ft',
  //         'account-activation-confirm-mpesa',
  //         'account-activation-options-options-error',
  //         'fetch-dormant-accounts-error',
  //       ],
  //       'account-dormant': ['account-dormant'],
  //       'stop-cheque': [
  //         'stop-cheque-account',
  //         'stop-cheque-number',
  //         'stop-cheque-confirm',
  //         'stop-cheque-account-options-error',
  //       ],
  //       'funds-transfer-wallet-to-mobile-money': [
  //         'ft-wallet-to-mobile-money-debit-account',
  //         'ft-wallet-to-mobile-money-other-number',
  //         'ft-wallet-to-mobile-money-amount',
  //         'ft-wallet-to-mobile-money-confirm',
  //         'ft-wallet-to-mobile-money-debit-account-options-error',
  //         'ft-wallet-to-mobile-money-credit-account-options-error',
  //         'ft-same-account-error',
  //         'ft-wallet-to-mobile-money-credit-account',
  //       ],
  //       'standing-orders-external': [
  //         'so-b2o-debit-account',
  //         'so-bank-search',
  //         'so-bank-result',
  //         'so-b2o-credit-account',
  //         'so-b2o-amount',
  //         'so-b2o-start-date',
  //         'so-b2o-end-date',
  //         'so-b2o-frequency',
  //         'so-b2o-beneficiary-name',
  //         'so-b2o-member-number',
  //         'so-b2o-instruction',
  //         'so-b2o-confirm',
  //         'so-b2o-debit-account-options-error',
  //       ],
  //     },
  //     language: {
  //       'topup-prepaid-card': {
  //         english: {
  //           'topup-prepaid-card-accounts-type':
  //             'Please select the debit account type',
  //           'topup-prepaid-card-accounts-type-error':
  //             'Invalid selection! Select the debit account type',
  //           'topup-prepaid-card-debit-account':
  //             'Please select the debit account',
  //           'topup-prepaid-card-debit-account-error':
  //             'Invalid selection! Select the debit account',
  //           'topup-prepaid-card-credit-account':
  //             'Please enter the card number to top-up.',
  //           'topup-prepaid-card-credit-account-error':
  //             'Invalid card! Enter a valid card number to top-up',
  //           'topup-prepaid-card-amount': 'Please enter amount',
  //           'topup-prepaid-card-amount-error': 'Invalid amount! Enter amount',
  //           'topup-prepaid-card-confirm':
  //             'Dear @firstname, Top-up Pre-paid card @prepaidCreditAccount amount @depositAmount from account @depositDebitAccount',
  //           'topup-prepaid-card-confirm-error':
  //             'Invalid selection! Top-up Pre-paid card @prepaidCreditAccount amount @depositAmount from account @depositDebitAccount',
  //         },
  //         swahili: {
  //           'topup-prepaid-card-accounts-type': '',
  //           'topup-prepaid-card-accounts-type-error': '',
  //           'topup-prepaid-card-debit-account': '',
  //           'topup-prepaid-card-debit-account-error': '',
  //           'topup-prepaid-card-credit-account': '',
  //           'topup-prepaid-card-credit-account-error': '',
  //           'topup-prepaid-card-amount': '',
  //           'topup-prepaid-card-amount-error': '',
  //           'topup-prepaid-card-confirm': '',
  //           'topup-prepaid-card-confirm-error': '',
  //         },
  //       },
  //       'account-requests-page': {
  //         english: {
  //           'account-requests-page': 'Please select an option below',
  //           'account-requests-page-error':
  //             'Invalid selection! Select an option below',
  //           'account-linking-label': 'Link Account',
  //           'account-activation-label': 'Activate Dormant Account',
  //           'digital-account-opening-label': 'Open Digital Account',
  //           'card-linking-label': 'Link Card',
  //           'sacco-linking-label': 'Link Sacco Account',
  //           'wallet-account-opening-label': 'Activate Wallet Account',
  //           'core-account-opening-label': 'Open a Bank Account',
  //           'view-accounts-label': 'View My Accounts',
  //           'account-mandates-label': 'Account Mandates',
  //         },
  //         swahili: {
  //           'account-requests-page': '',
  //           'account-requests-page-error': '',
  //           'account-linking-label': '',
  //           'card-linking-label': '',
  //           'sacco-linking-label': '',
  //           'wallet-account-opening-label': '',
  //           'core-account-opening-label': '',
  //           'view-accounts-label': '',
  //           'account-mandates-label': '',
  //         },
  //       },
  //       'lock-savings-account-error': {
  //         english: {
  //           'lock-savings-account-error':
  //             'You do not have an active savings account sucbscription. Do you need another service?',
  //           'lock-savings-account-error-error':
  //             'Invalid selection!  You do not have an active savings account sucbscription. Do you need another service?',
  //         },
  //         swahili: {
  //           'lock-savings-account-error': '',
  //           'lock-savings-account-error-error': '',
  //         },
  //       },
  //       'lock-savings-balance-success': {
  //         english: {
  //           'lock-savings-balance-success': '',
  //           'lock-savings-balance-success-error': '',
  //         },
  //       },
  //       'insurance-success': {
  //         english: {
  //           'insurance-success':
  //             'Dear @firstname, your @requestName request has been received. A @app-client Insurance agent will call you as soon as possible. Continue ?',
  //           'insurance-success-error':
  //             'Invalid selection! Your @requestName request has been received. A @app-client Insurance agent will call you as soon as possible. Continue ?. Continue ?',
  //         },
  //         swahili: {
  //           'insurance-success': '',
  //           'insurance-success-error': '',
  //         },
  //       },
  //       'faulu-selfReg': {
  //         english: {
  //           'faulu-selfReg': '',
  //         },
  //         swahili: {
  //           'faulu-selfReg': '',
  //         },
  //         french: {
  //           'faulu-selfReg': '',
  //         },
  //       },
  //       parking: {
  //         english: {
  //           'nhif-presentment-error': '',
  //           'parking-debit-account': '',
  //           'parking-debit-account-error': '',
  //           'parking-credit-account': '',
  //           'parking-credit-account-error': '',
  //           'parking-amount': '',
  //           'parking-amount-error': '',
  //           'parking-confirm': '',
  //           'parking-debit-account-options-error': '',
  //           'parking-member-types-options-error': '',
  //           'nhif-presentment-amount-error': '',
  //         },
  //         swahili: {
  //           'nhif-presentment-error': '',
  //           'parking-debit-account': '',
  //           'parking-debit-account-error': '',
  //           'parking-credit-account': '',
  //           'parking-credit-account-error': '',
  //           'parking-amount': '',
  //           'parking-amount-error': '',
  //           'parking-confirm': '',
  //           'parking-debit-account-options-error': '',
  //           'parking-member-types-options-error': '',
  //           'nhif-presentment-amount-error': '',
  //         },
  //         french: {
  //           'nhif-presentment-error': '',
  //           'parking-debit-account': '',
  //           'parking-debit-account-error': '',
  //           'parking-credit-account': '',
  //           'parking-credit-account-error': '',
  //           'parking-amount': '',
  //           'parking-amount-error': '',
  //           'parking-confirm': '',
  //           'parking-debit-account-options-error': '',
  //           'parking-member-types-options-error': '',
  //           'nhif-presentment-amount-error': '',
  //         },
  //       },
  //       gotv: {
  //         english: {
  //           'gotv-presentment-error':
  //             'Dear @firstname, we are currently unable to fetch the NHIF bill for Account @billPaymentCreditAccount . Do you wish to do another transaction ? ',
  //           'gotv-presentment-error-error':
  //             'Invalid selection! We are currently unable to fetch the NHIF bill for Account @billPaymentCreditAccount. Do you wish to do another transaction ? ',
  //           'gotv-credit-account': 'Please enter the GOTV Account number',
  //           'gotv-credit-account-error':
  //             'Invalid entry! Please enter the GOTV Account number',
  //           'gotv-debit-account': 'Please select the account to be debited',
  //           'gotv-debit-account-error':
  //             'Invalid selection! Select the account to be debited',
  //           'gotv-amount':
  //             'Please enter the amount to pay ( min @currency-code @minimum-billpayment-amount ) ',
  //           'gotv-amount-error':
  //             'Invalid entry! Please enter the amount to pay ( min @currency-code @minimum-billpayment-amount ) ',
  //           'gotv-confirm':
  //             'Dear @firstname, you are about to pay  @currency-code @billPaymentAmount to GOTV for @billPaymentCreditAccount from @billPaymentDebitAccount',
  //           'gotv-confirm-error':
  //             'Invalid selection! You are about to pay  @currency-code @billPaymentAmount to GOTV for @billPaymentCreditAccount from @billPaymentDebitAccount',
  //           'gotv-debit-account-options-error':
  //             'Dear @firstname, you currently do not have any linked Savings accounts.Do you want to do another transaction',
  //           'gotv-debit-account-options-error-error':
  //             'Invalid selection ! You currently do not have any linked Savings accounts.Do you want to do another transaction',
  //         },
  //       },
  //       'bill-payment-page': {
  //         english: {
  //           'bill-payment-page': 'Please select an option below',
  //           'bill-payment-page-error':
  //             'Invalid selection! select an option below',
  //           'electricity-power-postpaid-label': 'Electricity Post-Paid',
  //           'electricity-power-prepaid-label': 'Electricity Pre-Paid',
  //           'dstv-label': 'Pay DSTV',
  //           'gotv-label': 'Gotv',
  //           'nhif-label': 'Pay NHIF',
  //           'landrates-label': 'Land Rates',
  //           'pay-bill-water-label': 'Pay Water',
  //           'school-fees-label': 'Pay School Fees',
  //         },
  //       },
  //       'cancel-standing-orders': {
  //         english: {
  //           'cancel-so-account': '',
  //           'cancel-so-account-error': '',
  //           'cancel-so-select': '',
  //           'cancel-so-select-error': '',
  //           'cancel-so-confirm': '',
  //         },
  //       },
  //       'registration-page': {
  //         english: {
  //           'registration-page':
  //             'Welcome to @app-description service. Please select an option below',
  //           'registration-page-error':
  //             'Invalid selection! Please select an option below',
  //           'terms-label': 'Read Terms and conditions',
  //           'registration-label': 'Self Register',
  //         },
  //       },
  //       'replace-atm': {
  //         english: {
  //           'replace-atm-account':
  //             'Please select the Card to replace an ATM for',
  //           'replace-atm-account-error':
  //             'Invalid selection ! Please select the Card to replace an ATM for',
  //           'replace-atm-confirm': 'Replace Card for Card @replaceAtmAccount',
  //           'replace-atm-confirm-error':
  //             'Invalid selection ! Replace Card for Card @replaceAtmAccount',
  //           'replace-atm-account-options-error':
  //             'You currently do not have any linked accounts.Continue',
  //           'replace-atm-account-options-error-error':
  //             'Invalid selection ! You currently do not have any linked accounts.Continue',
  //         },
  //         swahili: {
  //           'replace-atm-account': '',
  //           'replace-atm-account-error': '',
  //           'replace-atm-confirm': '',
  //           'replace-atm-confirm-error': '',
  //           'replace-atm-account-options-error': '',
  //           'replace-atm-account-options-error-error': '',
  //         },
  //       },
  //       'wrong-login': {
  //         english: {
  //           'wrong-login':
  //             'Wrong PIN! @pin-trials-remaining trials left! Enter your 4 digit PIN to proceed',
  //           'invalid-wrong-login-error':
  //             'Invalid PIN format! Enter a valid 4 digit PIN to proceed',
  //           'incorrect-wrong-login-error':
  //             'Wrong PIN! @pin-trials-remaining trials left! Enter your 4 digit PIN to proceed',
  //         },
  //       },
  //       'registration-open-account': {
  //         english: {
  //           'registration-open-account-type':
  //             'Please selet the digital account type',
  //           'registration-open-account-type-error':
  //             'Invalid selection! Selet the digital account type',
  //           'registration-open-account-title': 'Please select title',
  //           'registration-open-account-title-error':
  //             'Invalid selection! Please select title',
  //           'registration-open-account-surname': 'Please enter your surname',
  //           'registration-open-account-surname-error':
  //             'Invalid surname! Enter your surname',
  //           'registration-open-account-branch-search':
  //             'Enter first name of branch name to perform search',
  //           'registration-open-account-branch-result': 'Select the branch',
  //           'registration-open-account-branch-result-error':
  //             'Invalid selection! Select the branch',
  //           'registration-open-account-firstname':
  //             'Please enter your first name',
  //           'registration-open-account-firstname-error':
  //             'Invalid first name! Enter your first name',
  //           'registration-open-account-othername':
  //             'Please enter your other name(Enter s to skip)',
  //           'registration-open-account-othername-error':
  //             'Invalid other name! Enter your other name',
  //           'registration-open-account-dateofbirth':
  //             'Please enter your date of birth (format 1990-10-20, must be above 18 years ).',
  //           'registration-open-account-dateofbirth-error':
  //             'Invalid date! Please enter your date of birth (format 1990-10-20, and should be more than 18 years).',
  //           'registration-open-account-gender': 'Please select your gender',
  //           'registration-open-account-gender-error':
  //             'Invalid selection! Please select your gender',
  //           'registration-open-account-id':
  //             'Please enter your national ID number',
  //           'registration-open-account-id-error':
  //             'Invalid national ID number ! Enter your national ID number',
  //           'registration-open-account-kra': 'Please enter your KRA PIN',
  //           'registration-open-account-kra-error':
  //             'Invalid KRA Number! Enter your KRA PIN',
  //           'registration-open-account-email':
  //             'Please enter a valid email address',
  //           'registration-open-account-email-error':
  //             'Invalid email address! Enter a valid email',
  //           'registration-open-account-confirm':
  //             'Having read the terms and conditions, do you accept to perform a self registration.',
  //           'registration-open-account-confirm-error':
  //             'Invalid selection! Having read the terms and conditions, do you accept to perform a self registration.',
  //         },
  //       },
  //       'cardless-withdraw-page': {
  //         english: {
  //           'cardless-withdraw-page': 'Select below',
  //           'cardless-withdraw-page-error': 'Invalid selection! select below',
  //           'via-atm-label': 'Cardless Withdrawal',
  //           'via-agent-label': 'Agent Withdrawal',
  //         },
  //         swahili: {
  //           'cardless-withdraw-page': '',
  //           'cardless-withdraw-page-error': '',
  //           'via-atm-label': '',
  //           'via-agent-label': '',
  //         },
  //       },
  //       'loan-limit': {
  //         english: {
  //           'loan-limit-confirm':
  //             'Dear @firstname, you are about to request for your loan limit',
  //           'loan-limit-confirm-error':
  //             'Invalid selection! Dear @firstname, you are about to request for your loan limit',
  //           'loan-limit-account': 'Please select an account',
  //           'loan-limit-account-error': 'Invalid selection! Select an account',
  //         },
  //       },
  //       'transfer-to-other-banks': {
  //         english: {
  //           'transfer-to-other-banks-debit-account':
  //             'Please select the accounts below',
  //           'transfer-to-other-banks-debit-account-error':
  //             'Invalid selection! select the account below',
  //           'transfer-to-other-banks-credit-bank':
  //             'Please select bank option below',
  //           'transfer-to-other-banks-credit-bank-error':
  //             'Invalid selection! select bank option below',
  //           'transfer-to-other-banks-credit-account':
  //             'Please enter bank account to receive money',
  //           'transfer-to-other-banks-credit-account-error':
  //             'Invalid input! enter bank account to receive money',
  //           'transfer-to-other-banks-amount': 'Please enter amount to transfer',
  //           'transfer-to-other-banks-amount-error':
  //             'Invalid input! enter amount to transfer',
  //           'transfer-to-other-banks-confirm':
  //             'Please confirm money transfer @currency-code @fundsTransferAmount from account @fundsTransferDebitAccount to @fundsTransferCreditAccountDraft',
  //           'transfer-to-other-banks-confirm-error':
  //             'Please confirm money transfer @currency-code @fundsTransferAmount from account @fundsTransferDebitAccount to @fundsTransferCreditAccountDraft',
  //           'transfer-to-other-banks-debit-account-options-error':
  //             'You currently do not have any linked accounts.Continue',
  //           'ft-wallet-to-other-wallet-credit-account-options-error':
  //             'Invalid selection ! You currently do not have any linked accounts.Continue',
  //         },
  //         swahili: {
  //           'transfer-to-other-banks-debit-account': '',
  //           'transfer-to-other-banks-debit-account-error': '',
  //           'transfer-to-other-banks-credit-account': '',
  //           'transfer-to-other-banks-amount': '',
  //           'transfer-to-other-banks-amount-error': '',
  //           'transfer-to-other-banks-confirm': '',
  //           'transfer-to-other-banks-debit-account-options-error': '',
  //         },
  //         french: {
  //           'transfer-to-other-banks-debit-account': '',
  //           'transfer-to-other-banks-debit-account-error': '',
  //           'transfer-to-other-banks-credit-account': '',
  //           'transfer-to-other-banks-amount': '',
  //           'transfer-to-other-banks-amount-error': '',
  //           'transfer-to-other-banks-confirm': '',
  //           'transfer-to-other-banks-debit-account-options-error': '',
  //         },
  //       },
  //       global: {
  //         english: {
  //           previous: 'Previous menu',
  //           home: 'Home',
  //           'api-success':
  //             'Dear @firstname, your @requestName request is being processed. You will receive an SMS response shortly. Do you want to do another transaction ?',
  //           'api-success-error':
  //             'Invalid selection! Dear @firstname, your @requestName request was successful. Do you want to do another transaction ?',
  //           'api-error': 'Dear @firstname, @errMessage . Continue ?',
  //           'api-error-error':
  //             'Invalid selection! Dear @firstname, @errMessage . Continue ?',
  //           logout:
  //             'END Dear @firstname, thank you for accessing @app-description USSD service. Good bye.',
  //           'confirm-label': 'Confirm',
  //           'cancel-label': 'Cancel',
  //           'yes-label': 'Yes',
  //           'no-label': 'No',
  //           'english-label': 'English',
  //           'french-label': 'French',
  //           'swahili-label': 'Kiswahili',
  //           'tx-charge-narration':
  //             ' .Transaction Charges: @currency-code @txcharge Duty: @currency-code @txduty',
  //           'account-options-template': '@option Account',
  //           'fetch-interswitch-cards-error':
  //             'Dear @firstname, we are unable to fetch your cards. Plaese try again later. Do you need another service?',
  //           'fetch-interswitch-cards-error-error':
  //             'Invalid selection! We are unable to fetch your cards. Plaese try again later. Do you need another service?',
  //         },
  //       },
  //       'funds-transfer-wallet-to-other-wallet': {
  //         english: {
  //           'ft-same-account-error':
  //             'You cannot transfer funds to the same account. Do you need another service?',
  //           'ft-same-account-error-error':
  //             'Invalid selection! You cannot transfer funds to the same account. Do you need another service?',
  //           'ft-wallet-to-other-wallet-debit-account':
  //             'Please select the account to transfer from',
  //           'ft-wallet-to-other-wallet-debit-account-error':
  //             'Invalid selection! Select the account to transfer from',
  //           'ft-wallet-to-other-wallet-credit-account':
  //             'Please select the account to transfer to',
  //           'ft-wallet-to-other-wallet-credit-account-error':
  //             'Invalid selection! select the account to transfer to',
  //           'ft-wallet-to-other-wallet-amount':
  //             'Please enter the amount to tranfer(minimum @currency-code @amount-minimum )',
  //           'ft-wallet-to-other-wallet-amount-error':
  //             'Invalid amount! Please enter a valid amount to tranfer(minimum @currency-code @amount-minimum )',
  //           'ft-wallet-to-other-wallet-confirm':
  //             'Confirm @currency-code @fundsTransferAmount from Account -  @fundsTransferDebitAccount to Customer: @customerName Wallet Account - @fundsTransferCreditAccount',
  //           'ft-wallet-to-other-wallet-confirm-error':
  //             'Invalid selection! Transfer @currency-code @fundsTransferAmount from Account - @fundsTransferDebitAccount to Customer: @customerName Wallet Account - @fundsTransferCreditAccount',
  //           'ft-wallet-to-other-wallet-other-number':
  //             'Please enter the phone number in the format 07xxxxxxxx',
  //           'ft-wallet-to-other-wallet-other-number-error':
  //             'Invalid phone Number! Enter a valid phone number in the format 07xxxxxxxx',
  //           'ft-wallet-to-other-wallet-debit-account-options-error':
  //             'You currently do not have any linked accounts.Continue',
  //           'ft-wallet-to-other-wallet-credit-account-options-error':
  //             'Invalid selection ! You currently do not have any linked accounts.Continue',
  //         },
  //       },
  //       'zuku-tv': {
  //         english: {
  //           'zuku-tv-credit-account': '',
  //           'zuku-tv-credit-account-error': '',
  //           'zuku-tv-debit-account': '',
  //           'zuku-tv-debit-account-error': '',
  //           'zuku-tv-amount': '',
  //           'zuku-tv-amount-error': '',
  //           'zuku-tv-confirm': '',
  //           'zuku-tv-debit-account-options-error': '',
  //         },
  //       },
  //       'my-account-page': {
  //         english: {
  //           'my-account-page': 'Please select an option below',
  //           'my-account-page-error':
  //             'Invalid selection! Select an option below',
  //           'open-account-page-label': 'Open Account',
  //         },
  //       },
  //       'lock-savings-unlock': {
  //         english: {
  //           'lock-savings-unlock-confirm':
  //             'Unlock lock savings account @lockSavingsAccount',
  //           'lock-savings-unlock-confirm-error':
  //             'Invalid selection! Unlock lock savings account @lockSavingsAccount',
  //         },
  //         swahili: {
  //           'lock-savings-unlock-confirm': '',
  //           'lock-savings-unlock-confirm-error': '',
  //         },
  //       },
  //       forex: {
  //         english: {
  //           'forex-confirm': 'Get Forex Exchange Rates?',
  //           'forex-confirm-error':
  //             'Invalid selection! Get Forex Exchange Rates?',
  //           'forex-details':
  //             'Forex Data:\n @forex-data Do you need another service?',
  //           'forex-details-error':
  //             'Invalid selection! Forex Data:\n @forex-data Do you need another service?',
  //           'forex-error':
  //             'Unable to fetch forex data. Do you need another service?',
  //           'forex-error-error':
  //             'Invalid selection! Unable to fetch forex data. Do you need another service?',
  //         },
  //         swahili: {
  //           'forex-confirm': '',
  //           'forex-confirm-error': '',
  //           'forex-details': '',
  //           'forex-details-error': '',
  //           'forex-error': '',
  //           'forex-error-error': '',
  //         },
  //       },
  //       'funds-transfer-wallet-to-mno': {
  //         english: {
  //           'ft-wallet-to-mno-credit-account':
  //             'Please enter the Account to transfer to in the format 07xxxxxxxx',
  //           'ft-wallet-to-mno-credit-account-error':
  //             'Invalid wallet account! Enter a valid wallet Account to transfer to in the format 07xxxxxxxx',
  //           'ft-wallet-to-mno-amount':
  //             'Please enter the amount to tranfer (minimum @currency-code @amount-minimum )',
  //           'ft-wallet-to-mno-amount-error':
  //             'Invalid amount! Please enter a valid amount to tranfer ( minimum @currency-code @amount-minimum  )',
  //           'ft-wallet-to-mno-confirm':
  //             'Dear @firstname, Transfer @currency-code . @fundsTransferAmount to @creditAccName, Wallet @fundsTransferCreditAccount',
  //           'ft-wallet-to-mno-confirm-error':
  //             'Invalid selection! Transfer @currency-code . @fundsTransferAmount to @creditAccName, Wallet @fundsTransferCreditAccount',
  //         },
  //         swahili: {
  //           'ft-wallet-to-mno-credit-account': '',
  //           'ft-wallet-to-mno-credit-account-error': '',
  //           'ft-wallet-to-mno-amount': '',
  //           'ft-wallet-to-mno-amount-error': '',
  //           'ft-wallet-to-mno-confirm': '',
  //           'ft-wallet-to-mno-confirm-error': '',
  //         },
  //       },
  //       error: {
  //         english: {
  //           error:
  //             'Dear @firstname, @app-description service is currently experiencing technical challenges. We apologize for the inconvenience. Kindly try again later.',
  //         },
  //         swahili: {
  //           error: '',
  //         },
  //       },
  //       terms: {
  //         english: {
  //           terms:
  //             'You can read our terms and conditions by visiting @app-terms-url. Do you want to perform another transaction ?',
  //           'terms-error':
  //             'Invalid selection! You can read our terms and conditions by visiting @app-terms-url. Do you want to perform another transaction ?',
  //         },
  //       },
  //       'client-page': {
  //         english: {
  //           'client-page': ' @app-contact-name :',
  //           'client-page-error':
  //             'Invalid selection! Please select an item below',
  //           'loans-page-label': 'Loan Services',
  //           'funds-transfer-page-label': 'Cash Transfer',
  //           'savings-page-label': 'Savings',
  //           'wallet-page-label': 'My Wallet',
  //           'merchant-payment-label': 'Merchant Pay',
  //           'ministatement-label': 'Mini Statement',
  //           'bill-payment-page-label': 'Payment Services',
  //           'cardless-withdraw-page-label': 'Agent/ATM withdrawal',
  //           'customer-requests-page-label': 'My Requests',
  //           'buy-airtime-label': 'Buy Airtime',
  //           'contacts-label': 'Contact Us',
  //           'account-enquiries-page-label': 'Account Enquiry',
  //           'settings-page-label': 'Settings',
  //           'agent-withdraw-label': 'Request services',
  //           'withdraw-page-label': 'Withdraw',
  //           'balance-label': 'Balance Enquiry',
  //         },
  //       },
  //       'atm-single-transaction': {
  //         english: {
  //           'atm-single-transaction-account': 'Please select the Card',
  //           'atm-single-transaction-account-error':
  //             'Invalid selection! Select the Card',
  //           'atm-single-transaction-amount':
  //             'Please enter the single transaction limit (minimum @currency-code @amount-minimum )',
  //           'atm-single-transaction-amount-error':
  //             'Invalid limit! Enter the single transaction limit (minimum @currency-code @amount-minimum )',
  //           'atm-single-transaction-confirm':
  //             'Set @currency-code  @amount as the single transaction limit for Card @atm',
  //           'atm-single-transaction-confirm-error':
  //             'Invalid selection! Set @currency-code  @amount as the single transaction limit for Card @atm',
  //           'atm-single-transaction-account-options-error':
  //             'Dear @firstname, you currently do not have any Cards',
  //           'atm-single-transaction-account-options-error-error':
  //             'Invalid selection! You currently do not have any Cards',
  //         },
  //         swahili: {
  //           'atm-single-transaction-account': '',
  //           'atm-single-transaction-account-error': '',
  //           'atm-single-transaction-amount': '',
  //           'atm-single-transaction-amount-error': '',
  //           'atm-single-transaction-confirm': '',
  //           'atm-single-transaction-confirm-error': '',
  //           'atm-single-transaction-account-options-error': '',
  //           'atm-single-transaction-account-options-error-error': '',
  //         },
  //       },
  //       'mpesa-float': {
  //         english: {
  //           'float-debit-account': 'Please select the account to debit from',
  //           'float-debit-account-error':
  //             'Invalid selection! Select the account to debit from',
  //           'hakikisha-float-presentment-error':
  //             'Dear @firstname, We could not fetch details for store number @storeNumber. Please try again later. Do you need another service?',
  //           'hakikisha-float-presentment-error-error':
  //             'Invalid selection! We could not fetch details for store number @storeNumber. Please try again later. Do you need another service?',
  //           'float-paybill': 'Please enter the agent number',
  //           'float-paybill-error': 'Invalid paybill! Enter the agent number',
  //           'float-store-number': 'Please enter the agent store number',
  //           'float-store-number-error':
  //             'Invalid store number! Enter the agent store number',
  //           'float-amount':
  //             'Please enter the amount of float to purchase (minimum @currency-code @amount-minimum )',
  //           'float-amount-error':
  //             'Invalid amount! Enter the amount of float to purchase (minimum @currency-code @amount-minimum )',
  //           'float-confirm':
  //             'Buy float worth @currency-code  @floatamount for agent @merchantName - Account @floatAccount from account @debitAccount',
  //           'float-confirm-error':
  //             'Invalid selection! Buy float worth @currency-code  @floatamount for agent @merchantName - Account @floatAccount from account @debitAccount',
  //         },
  //         swahili: {
  //           'float-debit-account': '',
  //           'float-debit-account-error': '',
  //           'float-paybill': '',
  //           'float-paybill-error': '',
  //           'float-amount': '',
  //           'float-amount-error': '',
  //           'float-confirm': '',
  //           'float-confirm-error': '',
  //         },
  //       },
  //       'loan-balance-success': {
  //         english: {
  //           'loan-balance-success':
  //             'Dear @firstname, your loan balance is @currency-code @loan-balance . Continue?',
  //           'loan-balance-success-error':
  //             'Invalid selection! Your loan balance is @currency-code @loan-balance . Continue?',
  //         },
  //       },
  //       maintenance: {
  //         english: {
  //           'system-maintenance': '',
  //         },
  //       },
  //       'agent-withdraw': {
  //         english: {
  //           'agent-withdraw-debit-account':
  //             'Select the Account to withdraw from',
  //           'agent-withdraw-debit-account-error':
  //             'Invalid selection! Select the Account to withdraw from',
  //           'agent-withdraw-amount':
  //             'Enter the amount to withdraw(minimum @currency-code @amount-minimum )',
  //           'agent-withdraw-amount-error':
  //             'Invalid amount! Enter a valid amount to withdraw(minimum @currency-code @amount-minimum )',
  //           'agent-code': 'Enter the agent code',
  //           'agent-code-error': 'Invalid agent code! Enter the agent code',
  //           'agent-withdraw-confirm':
  //             'You are about to withdraw @currency-code @amount from agent @agentCode , Account @debitAccount',
  //           'agent-withdraw-confirm-error':
  //             'Invalid selection! You are about to withdraw @currency-code @amount from agent @agentCode , Account @debitAccount',
  //         },
  //       },
  //       'confirm-cheque': {
  //         english: {
  //           'confirm-cheque-account': 'Please select the account',
  //           'confirm-cheque-account-error':
  //             'Invalid selection! Please select the account',
  //           'confirm-cheque-number':
  //             'Please enter the cheque number to confirm',
  //           'confirm-cheque-number-error':
  //             'Invalid Cheque Number! Enter a valid cheque number to confirm',
  //           'confirm-cheque-amount': 'Please enter the cheque amount',
  //           'confirm-cheque-amount-error':
  //             'Invalid amount! Enter the cheque amount',
  //           'confirm-cheque-name': 'Please enter the name issued to the cheque',
  //           'confirm-cheque-name-error':
  //             'Invalid name! Enter the name issued to the cheque',
  //           'confirm-cheque-confirm':
  //             'Dear @firstname, Confirm cheque number @chequeNumber amount @chequeAmount name: @chequeName',
  //           'confirm-cheque-confirm-error':
  //             'Invalid selection! Confirm cheque number @chequeNumber amount @chequeAmount name: @chequeName',
  //         },
  //         swahili: {
  //           'confirm-cheque-account': '',
  //           'confirm-cheque-account-error': '',
  //           'confirm-cheque-number': '',
  //           'confirm-cheque-number-error': '',
  //           'confirm-cheque-amount': '',
  //           'confirm-cheque-amount-error': '',
  //           'confirm-cheque-name': '',
  //           'confirm-cheque-name-error': '',
  //           'confirm-cheque-confirm': '',
  //           'confirm-cheque-confirm-error': '',
  //         },
  //       },
  //       'funds-transfer-savings-to-wallet': {
  //         english: {
  //           'ft-savings-to-wallet-debit-account':
  //             'Please select the account to transfer from',
  //           'ft-savings-to-wallet-debit-account-error':
  //             'Invalid selection! select the account to transfer from',
  //           'ft-savings-to-wallet-credit-account':
  //             'Please enter the Wallet Account to transfer to in the format 07xxxxxxxx',
  //           'ft-savings-to-wallet-credit-account-error':
  //             'Invalid wallet account! Enter a valid Wallet Account to transfer to in the format 07xxxxxxxx',
  //           'ft-savings-to-wallet-amount':
  //             'Please enter the amount to tranfer (minimum @currency-code @amount-minimum )',
  //           'ft-savings-to-wallet-amount-error':
  //             'Invalid amount! Please enter a valid amount to tranfer (minimum @currency-code @amount-minimum )',
  //           'ft-savings-to-wallet-confirm':
  //             'Dear @firstname, Transfer @currency-code  @fundsTransferAmount from - @fundsTransferDebitAccount to @creditAccName Wallet - @fundsTransferCreditAccount',
  //           'ft-savings-to-wallet-confirm-error':
  //             'Invalid selection! Transfer @currency-code  @fundsTransferAmount from - @fundsTransferDebitAccount to @creditAccName Wallet - @fundsTransferCreditAccount',
  //           'ft-savings-to-wallet-debit-account-options-error':
  //             'You currently do not have any linked accounts.Continue',
  //           'ft-savings-to-wallet-debit-account-options-error-error':
  //             'Invalid selection ! You currently do not have any linked accounts.Continue',
  //         },
  //         swahili: {
  //           'ft-savings-to-wallet-debit-account': '',
  //           'ft-savings-to-wallet-debit-account-error': '',
  //           'ft-savings-to-wallet-credit-account': '',
  //           'ft-savings-to-wallet-credit-account-error': '',
  //           'ft-savings-to-wallet-amount': '',
  //           'ft-savings-to-wallet-amount-error': '',
  //           'ft-savings-to-wallet-confirm': '',
  //           'ft-savings-to-wallet-confirm-error': '',
  //           'ft-savings-to-wallet-debit-account-options-error': '',
  //           'ft-savings-to-wallet-debit-account-options-error-error': '',
  //         },
  //       },
  //       'call-deposits': {
  //         english: {
  //           'call-deposits-amount':
  //             'Enter amount to deposit ( Minimum @openiningBalance )',
  //           'call-deposits-amount-error':
  //             'Invalid amount! Enter amount to deposit ( Minimum @openiningBalance )',
  //           'call-deposits-views': 'Please select an option below',
  //           'call-deposits-views-error':
  //             'Invalid selecton! Please select an option below',
  //           'customer-call-deposits-accounts':
  //             'Call Deposit Accounts:\n @call-deposit-accounts Proceed?',
  //           'customer-call-deposits-accounts-error':
  //             'Invalid selection! Call Deposit Accounts:\n @call-deposit-accounts Proceed?',
  //           'call-deposits-account': 'Please select the account to debit',
  //           'call-deposits-account-error':
  //             'Invalid selection! select the account to debit',
  //           'call-deposits-confirm':
  //             'Dear @firstname, confirm to deposit @amount , debit account @debitAccount',
  //           'call-deposits-confirm-error':
  //             'Invalid selection! Confirm to deposit @amount , debit account @debitAccount',
  //         },
  //       },
  //       'medical-cover': {
  //         english: {
  //           'customer-first-name': '',
  //           'customer-first-name-error': '',
  //           'customer-second-name': '',
  //           'branch-select': '',
  //           'domestic-package-name-error': '',
  //           'bancassurance-confirm': '',
  //         },
  //         swahili: {
  //           'customer-first-name': '',
  //           'customer-first-name-error': '',
  //           'customer-second-name': '',
  //           'branch-select': '',
  //           'domestic-package-name-error': '',
  //           'bancassurance-confirm': '',
  //         },
  //         french: {
  //           'customer-first-name': '',
  //           'customer-first-name-error': '',
  //           'customer-second-name': '',
  //           'branch-select': '',
  //           'domestic-package-name-error': '',
  //           'bancassurance-confirm': '',
  //         },
  //       },
  //       'savings-open': {
  //         english: {
  //           'savings-open-debit-account': 'Select the account to debit',
  //           'savings-open-debit-account-error':
  //             'Invalid selection! Select the account to debit',
  //           'savings-open-products': 'Select the savings product',
  //           'savings-open-products-error':
  //             'Invalid selection! Select the savings product',
  //           'savings-open-target-amount': 'Enter the target savings amount',
  //           'savings-open-amount-error':
  //             'Invalid amount! Enter the target savings amount',
  //           'savings-open-period': 'Enter the savings duration ( 1 - 12 )',
  //           'open-period-error':
  //             'Invalid duration! Enter the savings duration ( 1 - 12 )',
  //           'savings-open-deposit':
  //             'Enter the amount to deposit(minimum @currency-code @amount-minimum )',
  //           'savings-open-deposit-error':
  //             'Invalid amount! Enter the amount to deposit(minimum @currency-code @amount-minimum )',
  //           'savings-open-confirm':
  //             'Savings Account Opening details:\nProduct: @product \nDuration: @period \nTarget amount: @currency-code @amount \nInitial Deposit: @currency-code @deposit \nDebit account: @debitAccount',
  //           'savings-open-confirm-error':
  //             'Invalid selection! Savings Account Opening details:\nProduct: @product \nDuration: @period \nTarget amount: @currency-code @amount \nInitial Deposit: @currency-code @deposit \nDebit account: @debitAccount',
  //         },
  //       },
  //       'withdrawal-mpesa-b2c': {
  //         english: {
  //           'withdrawal-mpesa-debit-account':
  //             'Please select the Account to transfer from',
  //           'withdrawal-mpesa-debit-account-error':
  //             'Invalid selection ! Select the Account to transfer from',
  //           'withdrawal-mpesa-account-type': 'Transfer to',
  //           'withdrawal-mpesa-account-type-error':
  //             'Invalid selection! Transfer to',
  //           'withdrawal-mpesa-credit-account':
  //             'Please enter the MPESA phone number to transfer to in the format 07xxxxxxxx',
  //           'withdrawal-mpesa-credit-account-error':
  //             'Invalid Phone number! Enter the MPESA phone number to send to in the format 07xxxxxxxx',
  //           'withdrawal-mpesa-amount':
  //             'Please enter the amount to transfer (Minimum: @currency-code @amount-minimum )',
  //           'withdrawal-mpesa-amount-error':
  //             'Invalid amount! Enter the amount to transfer (Minimum: @currency-code @amount-minimum )',
  //           'withdrawal-mpesa-confirm':
  //             'Transfer @currency-code  @withdrawalAmount to Mpesa - @withdrawalCreditAccount from Account @withdrawalDebitAccount',
  //           'withdrawal-mpesa-confirm-error':
  //             'Invalid selection! Transfer @currency-code  @withdrawalAmount to Airtel - @withdrawalCreditAccount from Account @withdrawalDebitAccount',
  //           'withdrawal-mpesa-debit-account-options-error':
  //             'You currently do not have any linked accounts.Continue',
  //           'withdrawal-mpesa-debit-account-options-error-error':
  //             'Invalid selection! You currently do not have any linked accounts.Continue',
  //         },
  //         swahili: {
  //           'withdrawal-mpesa-debit-account': '',
  //           'withdrawal-mpesa-debit-account-error': '',
  //           'withdrawal-mpesa-account-type': '',
  //           'withdrawal-mpesa-account-type-error': '',
  //           'withdrawal-mpesa-credit-account': '',
  //           'withdrawal-mpesa-credit-account-error': '',
  //           'withdrawal-mpesa-amount': '',
  //           'withdrawal-mpesa-amount-error': '',
  //           'withdrawal-mpesa-confirm': '',
  //           'withdrawal-mpesa-confirm-error': '',
  //           'withdrawal-mpesa-debit-account-options-error': '',
  //           'withdrawal-mpesa-debit-account-options-error-error': '',
  //         },
  //       },
  //       'talk-to-us-page': {
  //         english: {
  //           'talk-to-us-page': 'Welcome to faulu customer service',
  //           'talk-to-us-page-error':
  //             'Invalid selection, select an option below',
  //           'savings-enquiry-label': 'Savings enquiries',
  //           'loan-enquiry-label': 'Loan enquiries',
  //         },
  //         swahili: {
  //           'talk-to-us-page': '',
  //           'talk-to-us-page-error': '',
  //           'savings-enquiry-label': '',
  //           'loan-enquiry-label': '',
  //         },
  //         french: {
  //           'talk-to-us-page': '',
  //           'talk-to-us-page-error': '',
  //           'savings-enquiry-label': '',
  //           'loan-enquiry-label': '',
  //         },
  //       },
  //       ministatement: {
  //         english: {
  //           'ministatement-account': 'Please select the Mini Statement Account',
  //           'ministatement-account-error':
  //             'Invalid selection! Please select the Account',
  //           'ministatement-account-fosa': 'Please select the FOSA Account',
  //           'ministatement-account-fosa-error':
  //             'Invalid selection! Please select the FOSA Account',
  //           'ministatement-account-fosa-options-error':
  //             'Dear @firstname, you currently do not have any linked FOSA accounts.Do you want to do another transaction',
  //           'ministatement-account-bosa': 'Please select the BOSA Account',
  //           'ministatement-account-bosa-error':
  //             'Invalid selection! Please select the BOSA Account',
  //           'ministatement-account-loan': 'Please select the Loan Account',
  //           'ministatement-account-loan-error':
  //             'Invalid selection! Please select the Loan Account',
  //           'ministatement-account-loan-options-error':
  //             'Dear @firstname, you currently do not have an active Loan at the moment.Do you want to do another transaction',
  //           'ministatement-confirm':
  //             'Dear @firstname, you are about to request for a ministatement for  Account @ministatementDebitAccount',
  //           'ministatement-confirm-error':
  //             'Invalid selection! You are about to request for a ministatement for  Account @ministatementDebitAccount',
  //         },
  //       },
  //       'lock-savings-save': {
  //         english: {
  //           'lock-savings-save-debit-account':
  //             'Please select the Account to save from',
  //           'lock-savings-save-debit-account-error':
  //             'Invalid selection! Select the Account to save from',
  //           'lock-savings-save-amount':
  //             'Please enter the Amount to Save ( min @lockSavingsAmount )',
  //           'lock-savings-save-amount-error':
  //             'Invalid amount! Enter the Amount to Save ( min @lockSavingsAmount)',
  //           'lock-savings-save-confirm':
  //             'Save @currency-code . @lockSavingsSaveAmount from @lockSavingsSaveDebitAccount',
  //           'lock-savings-save-confirm-error':
  //             'Invalid selection! save @currency-code . @lockSavingsSaveAmount from @lockSavingsSaveDebitAccount',
  //           'lock-savings-save-debit-account-options-error':
  //             'You currently do not have any linked accounts.Continue',
  //           'lock-savings-save-debit-account-options-error-error':
  //             'Invalid selection ! You currently do not have any linked accounts.Continue',
  //         },
  //         swahili: {
  //           'lock-savings-save-debit-account': '',
  //           'lock-savings-save-debit-account-error': '',
  //           'lock-savings-save-amount': '',
  //           'lock-savings-save-amount-error': '',
  //           'lock-savings-save-confirm': '',
  //           'lock-savings-save-confirm-error': '',
  //           'lock-savings-save-debit-account-options-error': '',
  //           'lock-savings-save-debit-account-options-error-error': '',
  //         },
  //       },
  //       'faulu-general': {
  //         english: {
  //           'faulu-general': 'Select @app-description service you need',
  //         },
  //         swahili: {
  //           'faulu-general': '',
  //         },
  //         french: {
  //           'faulu-general': '',
  //         },
  //       },
  //       'via-atm': {
  //         english: {
  //           'via-atm-debit-account': 'Select account to withdraw from',
  //           'via-atm-debit-account-error':
  //             'Invalid selection! select an account to withdraw from',
  //           'via-atm-amount': 'Please enter amount to withdraw via ATM',
  //           'via-atm-amount-error': 'Please enter amount to withdraw via ATM',
  //           'via-atm-confirm':
  //             'Dear @firstname, confirm withdraw amount: @cardlessWithdrawAmount from account @cardlessDebitAccount via atm?',
  //           'via-atm-confirm-error':
  //             'Invalid selection! withdraw amount: @cardlessWithdrawalAmount from account @cardlessDebitAccount via atm',
  //         },
  //       },
  //       hospitals: {
  //         english: {
  //           'hospital-debit-account': 'Please select the Account to pay from',
  //           'hospital-debit-account-error':
  //             'Invalid selection! Select the Account to pay from',
  //           'hospital-narration': 'Please enter reason for payment',
  //           'hospital-narration-error':
  //             'Invalid entry! Enter reason for payment',
  //           'hospital-account-number': 'Please select a hospital below',
  //           'hospital-account-number-error':
  //             'Invalid selection! Select a hospital below',
  //           'hospital-amount':
  //             'Please enter the Amount you would like to pay (minimum @currency-code @amount-minimum )',
  //           'hospital-amount-error':
  //             'Invalid amount! Enter the Amount you would like to pay (minimum @currency-code @amount-minimum )',
  //           'hospital-confirm':
  //             'Pay @currency-code . @churchAmount from @churchDebitAccount to @fauluChurch Acccount number: @institutionAccount',
  //           'hospital-confirm-error':
  //             'Invalid selection! Pay @currency-code . @churchAmount from @churchDebitAccount to @fauluChurch Acccount number: @institutionAccount',
  //           'hospital-list-accounts-error':
  //             'Dear @firstname, We are currently unable to fetch the list of churches. Please try again later. Do you need another service?',
  //           'hospital-list-accounts-error-error':
  //             'Invalid selection! We are currently unable to fetch the list of churches. Please try again later. Do you need another service?',
  //           'hospital-debit-account-options-error':
  //             'Dear @firstname, you do not have any linked accounts. Do you need another service?',
  //           'hospital-debit-account-options-error-error':
  //             'Invalid selection! You do not have any linked accounts. Do you need another service?',
  //         },
  //       },
  //       'withdrawal-airtel-b2c': {
  //         english: {
  //           'withdrawal-airtel-debit-account':
  //             'Please select the Account to transfer from',
  //           'withdrawal-airtel-debit-account-error':
  //             'Invalid selection ! Select the Account to transfer from',
  //           'withdrawal-airtel-account-type': 'Transfer to',
  //           'withdrawal-airtel-account-type-error':
  //             'Invalid selection! Transfer to',
  //           'withdrawal-airtel-credit-account':
  //             'Please enter the AIRTEL phone number to transfer to in the format 07xxxxxxxx',
  //           'withdrawal-airtel-credit-account-error':
  //             'Invalid Phone number! Enter the AIRTEL phone number to send to in the format 07xxxxxxxx',
  //           'withdrawal-airtel-amount':
  //             'Please enter the amount to transfer(minimum @currency-code @amount-minimum )',
  //           'withdrawal-airtel-amount-error':
  //             'Invalid amount! Enter the amount to transfer(minimum @currency-code @amount-minimum )',
  //           'withdrawal-airtel-confirm':
  //             'Transfer @currency-code  @withdrawalAmount to Airtel - @withdrawalCreditAccount from Account @withdrawalDebitAccount',
  //           'withdrawal-airtel-confirm-error':
  //             'Invalid selection! Transfer @currency-code  @withdrawalAmount to Airtel - @withdrawalCreditAccount from Account @withdrawalDebitAccount',
  //           'withdrawal-airtel-debit-account-options-error':
  //             'You currently do not have any linked accounts.Continue',
  //           'withdrawal-airtel-debit-account-options-error-error':
  //             'Invalid selection! You currently do not have any linked accounts.Continue',
  //         },
  //         swahili: {
  //           'withdrawal-airtel-debit-account': '',
  //           'withdrawal-airtel-debit-account-error': '',
  //           'withdrawal-airtel-account-type': '',
  //           'withdrawal-airtel-account-type-error': '',
  //           'withdrawal-airtel-credit-account': '',
  //           'withdrawal-airtel-credit-account-error': '',
  //           'withdrawal-airtel-amount': '',
  //           'withdrawal-airtel-amount-error': '',
  //           'withdrawal-airtel-confirm': '',
  //           'withdrawal-airtel-confirm-error': '',
  //           'withdrawal-airtel-debit-account-options-error': '',
  //           'withdrawal-airtel-debit-account-options-error-error': '',
  //         },
  //       },
  //       'loan-limit-success': {
  //         english: {
  //           'loan-limit-success':
  //             'Dear @firstname, your loan limit is @currency-code @loan-limit . Continue?',
  //           'loan-limit-success-error':
  //             'Invalid selection! Your loan limit is @currency-code @loan-limit . Continue?',
  //         },
  //       },
  //       eft: {
  //         english: {
  //           'eft-to-bank-debit-account':
  //             'Please select the account to send from',
  //           'eft-to-bank-debit-account-error':
  //             'Invalid selection! Select the account to send from',
  //           'eft-bank-search': 'Please enter bank to perform search',
  //           'eft-bank-result': 'Please select a bank below',
  //           'eft-bank-result-error':
  //             'Invalid selection! Please select a bank below',
  //           'eft-to-bank-bank-account':
  //             'Please select the first letter of the bank you want to send to',
  //           'eft-to-bank-bank-account-error':
  //             'Invalid selection! Select the first letter of the bank you want to send to',
  //           'eft-a-b-bank-account': 'Please select the bank to send to',
  //           'eft-a-b-bank-account-error':
  //             'Invalid selection! Select the bank to send to',
  //           'eft-c-bank-account': 'Please select the bank to send to',
  //           'eft-c-bank-account-error':
  //             'Invalid selection! Select the bank to send to',
  //           'eft-d-e-bank-account': 'Please select the bank to send to',
  //           'eft-d-e-bank-account-error':
  //             'Invalid selection! Select the bank to send to',
  //           'eft-f-bank-account': 'Please select the bank to send to',
  //           'eft-f-bank-account-error':
  //             'Invalid selection! Select the bank to send to',
  //           'eft-g-h-bank-account': 'Please select the bank to send to',
  //           'eft-g-h-bank-account-error':
  //             'Invalid selection! Select the bank to send to',
  //           'eft-i-m-bank-account': 'Please select the bank to send to',
  //           'eft-i-m-bank-account-error':
  //             'Invalid selection! Select the bank to send to',
  //           'eft-n-s-bank-account': 'Please select the bank to send to',
  //           'eft-n-s-bank-account-error':
  //             'Invalid selection! Select the bank to send to',
  //           'eft-t-z-bank-account': 'Please select the bank to send to',
  //           'eft-t-z-bank-account-error':
  //             'Invalid selection! Select the bank to send to',
  //           'eft-to-bank-credit-account':
  //             'Please enter the recipients bank account',
  //           'eft-to-bank-credit-account-error':
  //             'Invalid bank account! Enter the recipients bank Account',
  //           'eft-to-bank-credit-account-name':
  //             'Please enter the recipients bank account name',
  //           'eft-to-bank-credit-account-name-error':
  //             'Invalid bank account! Enter the recipients bank account name',
  //           'eft-to-bank-amount':
  //             'Please enter the amount to send (minimum @currency-code @amount-minimum )',
  //           'eft-to-bank-amount-error':
  //             'Invalid amount! Enter a valid amount to send (minimum @currency-code @amount-minimum )',
  //           'eft-to-bank-reason': 'Please enter the reason for payment',
  //           'eft-to-bank-reason-error':
  //             'Invalid entry! Enter the reason for payment',
  //           'eft-to-bank-confirm':
  //             'Send @currency-code  @eftAmount to  @eftCreditAccount from  @eftDebitAccount via EFT',
  //           'eft-to-bank-confirm-error':
  //             'Invalid selection! send @currency-code  @eftAmount to  @eftCreditAccount from  @eftDebitAccount via EFT',
  //           'eft-to-bank-debit-account-options-error':
  //             'Dear  @firstname, you currently do not have any linked accounts.Do you need another service?',
  //           'eft-to-bank-debit-account-options-error-error':
  //             'Invalid selection! You currently do not have any linked accounts.Do you need another service?',
  //           'eft-branch-search':
  //             'Please enter the branch name in order to conduct a search',
  //           'eft-branch-result': 'Please select a branch below',
  //           'eft-branch-no-results-error':
  //             'There are no branches Matching @searchItem. Please enter the branches first name in order to conduct a search',
  //           'eft-branch-result-limit-exceeded-error':
  //             'Too many results. Please enter the full name of the branch separated by a dot ( . ) to narrow the results',
  //           'eft-branch-result-error':
  //             'Invalid Selection! Please select a branch below',
  //         },
  //         swahili: {
  //           'eft-to-bank-debit-account': '',
  //           'eft-to-bank-debit-account-error': '',
  //           'eft-to-bank-bank-account': '',
  //           'eft-to-bank-bank-account-error': '',
  //           'eft-a-b-bank-account': '',
  //           'eft-a-b-bank-account-error': '',
  //           'eft-c-bank-account': '',
  //           'eft-c-bank-account-error': '',
  //           'eft-d-e-bank-account': '',
  //           'eft-d-e-bank-account-error': '',
  //           'eft-f-bank-account': '',
  //           'eft-f-bank-account-error': '',
  //           'eft-g-h-bank-account': '',
  //           'eft-g-h-bank-account-error': '',
  //           'eft-i-m-bank-account': '',
  //           'eft-i-m-bank-account-error': '',
  //           'eft-n-s-bank-account': '',
  //           'eft-n-s-bank-account-error': '',
  //           'eft-t-z-bank-account': '',
  //           'eft-t-z-bank-account-error': '',
  //           'eft-to-bank-credit-account': '',
  //           'eft-to-bank-credit-account-error': '',
  //           'eft-to-bank-credit-account-name': '',
  //           'eft-to-bank-credit-account-name-error': '',
  //           'eft-to-bank-amount': '',
  //           'eft-to-bank-amount-error': '',
  //           'eft-to-bank-reason': '',
  //           'eft-to-bank-reason-error': '',
  //           'eft-to-bank-confirm': '',
  //           'eft-to-bank-confirm-error': '',
  //           'eft-to-bank-debit-account-options-error': '',
  //           'eft-to-bank-debit-account-options-error-error': '',
  //           'eft-branch-search': '',
  //           'eft-branch-result': '',
  //           'eft-branch-no-results-error': '',
  //           'eft-branch-result-limit-exceeded-error': '',
  //           'eft-branch-result-error': '',
  //         },
  //       },
  //       'pay-bill-water': {
  //         english: {
  //           'water-bill-presentment-error':
  //             'Dear @firstname, we are currently unable to fetch the bill for Account @billPaymentCreditAccount . Do you wish to do another transaction ? ',
  //           'water-bill-presentment-error-error':
  //             'Invalid selection! We are currently unable to fetch the bill for Account @billPaymentCreditAccount. Do you wish to do another transaction ? ',
  //           'pay-bill-water-credit-account': 'Please enter Water Meter number',
  //           'pay-bill-water-credit-account-error':
  //             'Invalid account! Enter Water number',
  //           'pay-bill-water-debit-account':
  //             'Please select the account to be debited',
  //           'pay-bill-water-debit-account-error':
  //             'Invalid selection! Select the account to be debited',
  //           'pay-bill-water-amount':
  //             'Please enter the amount to pay ( min @currency-code @minimum-billpayment-amount ) ',
  //           'pay-bill-water-amount-error':
  //             'Invalid entry! Please enter the amount to pay ( min @currency-code @minimum-billpayment-amount ) ',
  //           'pay-bill-water-confirm':
  //             'Dear @firstname, you are about to pay  @currency-code @billPaymentAmount to Water for @billPaymentBillerAccount from @billPaymentDebitAccount',
  //           'pay-bill-water-confirm-error':
  //             'Invalid selection! You are about to pay  @currency-code @billPaymentAmount to Water for @billPaymentBillerAccount from @billPaymentDebitAccount',
  //           'pay-bill-water-debit-account-options-error':
  //             'Dear @firstname, you currently do not have any linked Savings accounts.Do you want to do another transaction',
  //           'pay-bill-water-debit-account-options-error-error':
  //             'Invalid selection ! You currently do not have any linked Savings accounts.Do you want to do another transaction',
  //         },
  //       },
  //       'loan-limit-error': {
  //         english: {
  //           'loan-limit-error':
  //             'Dear @firstname, your loan limit is not available . Continue?',
  //           'loan-limit-error-error':
  //             'Invalid selection! Your loan limit is not available . Continue?',
  //         },
  //       },
  //       'inapp-login': {
  //         english: {
  //           'inapp-login': 'Please enter your 4 digit PIN to access',
  //           'invalid-inapp-pin-error':
  //             'Invalid PIN Format! Enter a valid PIN to access',
  //           'wrong-inapp-pin-error':
  //             'Wrong PIN! @trials remaining. Enter your PIN to access',
  //         },
  //       },
  //       withdraw: {
  //         english: {
  //           'withdraw-debit-account':
  //             'Please select the account to withdraw from',
  //           'withdraw-debit-account-error':
  //             'Invalid selection! Please select the account to withdraw from',
  //           'withdraw-debit-account-options-error':
  //             'Dear @firstname, you currently do not have any linked accounts.Do you want to do another transaction',
  //           'withdraw-debit-account-fosa':
  //             'Please select the FOSA account to withdraw from',
  //           'withdraw-debit-account-bosa':
  //             'Please select the BOSA account to withdraw from',
  //           'withdraw-debit-account-fosa-error':
  //             'Invalid selection! Please select the FOSA account to withdraw from',
  //           'withdraw-debit-account-bosa-error':
  //             'Invalid selection! Please select the BOSA account to withdraw from',
  //           'withdraw-debit-account-fosa-options-error':
  //             'Dear @firstname, you currently do not have any linked FOSA accounts.Do you want to do another transaction',
  //           'withdraw-debit-account-bosa-options-error':
  //             'Dear @firstname, you currently do not have any linked BOSA accounts.Do you want to do another transaction',
  //           'withdraw-amount':
  //             'Please enter the amount to withdraw(minimum @currency-code @amount-minimum )',
  //           'withdraw-amount-error':
  //             'Invalid amount! Please enter the amount to withdraw(minimum @currency-code @amount-minimum )',
  //           'withdraw-confirm':
  //             'Dear @firstname, you are about to withdraw @currency-code @withdrawAmount fromAccount @withdrawDebitAccount to MPESA Account @msisdn',
  //           'withdraw-confirm-error':
  //             'Invalid selection! You are about to withdraw @currency-code @withdrawAmount from Account @withdrawDebitAccount to MPESA Account @msisdn',
  //         },
  //       },
  //       'registration-success': {
  //         english: {
  //           'registration-success':
  //             'Dear customer, your self registration request was successful. Kindly dial @shortcode to login.',
  //         },
  //       },
  //       'contact-us': {
  //         english: {
  //           'contact-us':
  //             'Contact us on: \nPhone: @app-contact-number \nEmail: @app-email \nWhatsapp: @app-whatsapp \nContinue ?',
  //           'contact-us-error':
  //             'Invalid selection! Contact us on: \nPhone: @app-contact-number \nEmail: @app-email \nWhatsapp: @app-whatsapp \nContinue ?',
  //         },
  //         swahili: {
  //           'contact-us': '',
  //           'contact-us-error': '',
  //         },
  //       },
  //       'select-lang': {
  //         english: {
  //           'select-lang':
  //             'Welcome to @app-description, select Language to Proceed',
  //         },
  //         swahili: {
  //           'select-lang': '',
  //         },
  //         french: {
  //           'select-lang': '',
  //         },
  //       },
  //       'electricity-power-postpaid': {
  //         english: {
  //           'electricity-power-postpaid-presentment-error':
  //             'Dear @firstname, we are currently unable to fetch the KPLC Postpaid bill for Account @billPaymentCreditAccount . Do you wish to do another transaction ? ',
  //           'electricity-power-postpaid-presentment-error-error':
  //             'Invalid selection! We are currently unable to fetch the KPLC Postpaid bill for Account @billPaymentCreditAccount. Do you wish to do another transaction ? ',
  //           'electricity-power-postpaid-credit-account':
  //             'Please enter the KPLC Post Paid Meter number',
  //           'electricity-power-postpaid-credit-account-error':
  //             'Invalid account! Enter the KPLC Post Paid Meter number',
  //           'electricity-power-postpaid-debit-account':
  //             'Please select the account to be debited',
  //           'electricity-power-postpaid-debit-account-error':
  //             'Invalid selection! Select the account to be debited',
  //           'electricity-power-postpaid-amount':
  //             'Please enter the amount to pay ( min @currency-code @minimum-billpayment-amount ) ',
  //           'electricity-power-postpaid-amount-error':
  //             'Invalid entry! Please enter the amount to pay ( min @currency-code @minimum-billpayment-amount ) ',
  //           'electricity-power-postpaid-confirm':
  //             'Dear @firstname, you are about to pay  @currency-code @billPaymentAmount to KPLC for Account @billPaymentCreditAccount from @billPaymentDebitAccount',
  //           'electricity-power-postpaid-confirm-error':
  //             'Invalid selection! You are about to pay  @currency-code @billPaymentAmount to KPLC for Account @billPaymentCreditAccount from @billPaymentDebitAccount',
  //           'electricity-power-postpaid-debit-account-options-error':
  //             'Dear @firstname, you currently do not have any linked Savings accounts.Do you want to do another transaction',
  //           'electricity-power-postpaid-debit-account-options-error-error':
  //             'Invalid selection ! You currently do not have any linked Savings accounts.Do you want to do another transaction',
  //         },
  //       },
  //       'payment-services-page': {
  //         english: {
  //           'payment-services-page': 'Please select an option below',
  //           'payment-services-page-error':
  //             'Invalid selection! Select an option below',
  //         },
  //         swahili: {
  //           'payment-services-page': '',
  //           'payment-services-page-error': '',
  //         },
  //       },
  //       'registration-alert': {
  //         english: {
  //           'registration-alert':
  //             'END To activate your account for @app-description, kindly contact @app-contact-name on @app-contact-number or visit your nearest branch.',
  //         },
  //         swahili: {
  //           'registration-alert': '',
  //         },
  //       },
  //       'card-balance': {
  //         english: {
  //           'card-balance-number': 'Please enter the card number',
  //           'card-balance-number-error':
  //             'Invalid Card number! enter a valid card number',
  //           'card-balance-confirm':
  //             'Dear @firstname, view balance for card: @cardNumber',
  //           'card-balance-confirm-error':
  //             'Invalid selection! View balance for card: @cardNumber',
  //         },
  //         swahili: {
  //           'card-balance-number': '',
  //           'card-balance-number-error': '',
  //           'card-balance-confirm': '',
  //           'card-balance-confirm-error': '',
  //         },
  //       },
  //       'loan-enquiries-page': {
  //         english: {
  //           'loan-enquiries-page': 'Please select an option below',
  //           'loan-enquiries-page-error':
  //             'Invalid selection ! Select an option below',
  //         },
  //         swahili: {
  //           'loan-enquiries-page': '',
  //           'loan-enquiries-page-error': '',
  //           'loan-balance-label': '',
  //           'loan-statement-label': '',
  //           'loan-limit-label': '',
  //         },
  //       },
  //       'wallet-account-opening': {
  //         english: {
  //           'wallet-account-opening':
  //             'Request for a activation of your Faulu Bank wallet account',
  //           'wallet-account-opening-error':
  //             'Invalid selection! Request for a activation of your Faulu Bank wallet account',
  //         },
  //         swahili: {
  //           'wallet-account-opening': '',
  //           'wallet-account-opening-error': '',
  //         },
  //       },
  //       'loan-repayment': {
  //         english: {
  //           'loan-repayment-debit-account':
  //             'Please select the account to repay from',
  //           'loan-repayment-debit-account-error':
  //             'Invalid selection! Select the account to repay from',
  //           'loan-repayment-products': 'Please select a loan product below',
  //           'loan-repayment-products-error':
  //             'Invalid selection! Select a loan product below',
  //           'loan-repayment-amount':
  //             'Please enter the amount to repay (minimum @currency-code @amount-minimum )',
  //           'loan-repayment-amount-error':
  //             'Invalid amount! Enter the amount to repay (minimum @currency-code @amount-minimum )',
  //           'loan-repayment-confirm':
  //             'Dear @firstname, you are about to repay @currency-code @amount from Account @debitAccount to service your loan',
  //           'loan-repayment-confirm-error':
  //             'Invalid selection! You are about to repay @currency-code @amount from Account @debitAccount to service your loan',
  //         },
  //       },
  //       'talk-to-us': {
  //         english: {
  //           'talk-to-us': '',
  //         },
  //         swahili: {
  //           'talk-to-us': '',
  //         },
  //         french: {
  //           'talk-to-us': '',
  //         },
  //       },
  //       'language-change': {
  //         english: {
  //           'language-change': 'Please select your preferred language',
  //           'language-change-error':
  //             'Invalid selection! Please select your preferred language',
  //           'language-confirm':
  //             'Dear @firstname, you are about to change your current language',
  //           'language_confirm-error':
  //             'invalid selection! Dear @firstname, you are about to change your current language',
  //         },
  //       },
  //       bancassurance: {
  //         english: {
  //           'bancassurance-page': 'Select faulu bancassurance service',
  //           'motor-insurance-label': 'Motor Insurance',
  //           'medical-insurance-label': 'Medical cover',
  //           'fire-perils-label': 'Fire & Perils',
  //           'domestic-package-label': 'Domestic package',
  //           'last-expense-label': 'Last expense',
  //           'wiba-label': 'WIBA',
  //           'investment-life-label': 'Investment /life',
  //           'personal-accident-label': 'Personal accedent',
  //           'customer-first-name': 'Enter first name',
  //           'customer-first-name-error': 'Invalid name! Enter first name',
  //           'customer-second-name': 'Enter second name',
  //           'customer-second-name-error': 'Invalid name! Enter first name',
  //           'branch-select': 'Select faulu Branch',
  //           'bancassurance-confirm':
  //             'Confirm you want to get faulu insurance cover',
  //         },
  //         swahili: {
  //           bancassurance: '',
  //         },
  //         french: {
  //           bancassurance: '',
  //         },
  //       },
  //       'savings-withdraw': {
  //         english: {
  //           'savings-withdraw-credit-account': 'Select the account to send to',
  //           'savings-withdraw-credit-account-error':
  //             'Invalid selection! Select the account to send to',
  //           'savings-withdraw-account': 'Select the account to withdraw from',
  //           'savings-withdraw-account-error':
  //             'Invalid selection! Select the account to withdraw from',
  //           'savings-withdraw-amount':
  //             'Enter the amount to withdraw(minimum @currency-code @amount-minimum )',
  //           'savings-withdraw-amount-error':
  //             'Invalid amount! Enter a valid amount to withdraw(minimum @currency-code @amount-minimum )',
  //           'savings-withdraw-confirm':
  //             'Dear @firstname, you are about to withdraw @currency-code @amount to Account @creditAccount from Savings Account @debitAccount',
  //           'savings-withdraw-confirm-error':
  //             'Invalid selection! You are about to withdraw @currency-code @amount to Account @creditAccount from Savings Account @debitAccount',
  //         },
  //       },
  //       'funds-transfer-other-bank': {
  //         english: {
  //           'ft-savings-to-obank-debit-account':
  //             'Please select the account to transfer from',
  //           'ft-savings-to-obank-debit-account-error':
  //             'Invalid selection! select the account to transfer from',
  //           'ft-savings-to-obank-account':
  //             'Please select the bank to transfer to',
  //           'ft-savings-to-obank-account-error':
  //             'Invalid selection! Select the bank to transfer to',
  //           'ft-savings-to-obank-credit-account':
  //             'Please enter the @otherBankLabel Account to transfer',
  //           'ft-savings-to-obank-credit-account-error':
  //             'Invalid account! Enter the a valid @otherBankLabel Account',
  //           'ft-savings-to-obank-amount':
  //             'Please enter the amount to tranfer (minimum @currency-code @amount-minimum )',
  //           'ft-savings-to-obank-amount-error':
  //             'Invalid amount! Please enter a valid amount to tranfer (minimum @currency-code @amount-minimum )',
  //           'ft-savings-to-obank-confirm':
  //             'Transfer @working-currency @fundsTransferAmount from  -  @fundsTransferDebitAccount to  - @fundsTransferCreditAccount',
  //           'ft-savings-to-obank-confirm-error':
  //             'Invalid selection! Transfer @working-currency @fundsTransferAmount from  -  @fundsTransferDebitAccount to  -  @fundsTransferCreditAccount',
  //           'ft-same-account-error':
  //             'You cannot transfer funds to the same account. Do you need another service?',
  //           'ft-same-account-error-error':
  //             'Invalid selection! You cannot transfer funds to the same account. Do you need another service?',
  //           'ft-savings-to-obank-debit-account-options-error':
  //             'You currently do not have any linked accounts.Continue',
  //           'ft-savings-to-obank-debit-account-options-error-error':
  //             'Invalid selection ! You currently do not have any linked accounts.Continue',
  //         },
  //       },
  //       'savings-page': {
  //         english: {
  //           'savings-page': 'Please select an item below',
  //           'savings-page-error': 'Invalid selection! Select an item below',
  //           'savings-open-label': 'Open Savings Account',
  //           'savings-balance-label': 'Savings Balance',
  //           'savings-statement-label': 'Savings Statement',
  //           'savings-withdraw-label': 'Withdraw from Savings',
  //           'savings-deposit-label': 'Deposit to Savings',
  //           'savings-products-label': 'Savings Products',
  //         },
  //       },
  //       'request-cheque-book': {
  //         english: {
  //           'request-cheque-book-account':
  //             'Please select the account to get a Cheque book for',
  //           'request-cheque-book-account-error':
  //             'Invalid entry! Please select the account to get a Cheque book for',
  //           'request-cheque-book-leaves': 'Please select the number of Leaves',
  //           'request-cheque-book-quantity':
  //             'Please enter the quantity of Cheque Books (minimum @cheque-books-minimum )',
  //           'request-cheque-book-quantity-error':
  //             'Invalid quantity! Enter the quantity of Cheque Books(minimum @cheque-books-minimum )',
  //           'request-cheque-book-leaves-error':
  //             'Invalid selection! Please select the number of Leaves',
  //           'request-cheque-book-confirm':
  //             'Request for @requestChequeBookQuantity, @requestChequeBookLeaves Leaf Cheque Book(s) for Account  @requestChequeBookDebitAccount',
  //           'request-cheque-book-confirm-error':
  //             'Invalid selection ! Request for  @requestChequeBookQuantity, @requestChequeBookLeaves Leaf Cheque Book(s) for Account @requestChequeBookDebitAccount',
  //           'request-cheque-book-account-options-error':
  //             'You currently do not have any linked accounts.Continue',
  //           'request-cheque-book-account-options-error-error':
  //             'Invalid selection ! You currently do not have any linked accounts.Continue',
  //         },
  //         swahili: {
  //           'request-cheque-book-account': '',
  //           'request-cheque-book-account-error': '',
  //           'request-cheque-book-leaves': '',
  //           'request-cheque-book-quantity': '',
  //           'request-cheque-book-quantity-error': '',
  //           'request-cheque-book-leaves-error': '',
  //           'request-cheque-book-confirm': '',
  //           'request-cheque-book-confirm-error': '',
  //           'request-cheque-book-account-options-error': '',
  //           'request-cheque-book-account-options-error-error': '',
  //         },
  //       },
  //       'savings-deposit': {
  //         english: {
  //           'savings-deposit-debit-account': 'Select the account to debit',
  //           'savings-deposit-debit-account-error':
  //             'Invalid selection! Select the account to debit',
  //           'savings-deposit-account':
  //             'Select the Savings Account to deposit to',
  //           'savings-deposit-account-error':
  //             'Invalid selection! Select the Savings Account to deposit to',
  //           'savings-deposit-amount':
  //             'Enter the amount to deposit(minimum @currency-code @amount-minimum )',
  //           'savings-deposit-amount-error':
  //             'Invalid amount! Enter a valid amount to deposit(minimum @currency-code @amount-minimum )',
  //           'savings-deposit-confirm':
  //             'Dear @firstname, you are about to deposit @currency-code @amount to Savings Account @creditAccount from @debitAccount',
  //           'savings-deposit-confirm-error':
  //             'Dear @firstname, you are about to deposit @currency-code @amount to Savings Account @creditAccount from @debitAccount',
  //         },
  //       },
  //       'loan-balance-error': {
  //         english: {
  //           'loan-balance-error':
  //             'Dear @firstname, you currently do not have an active loan . Continue?',
  //           'loan-balance-error-error':
  //             'Invalid selection! You currently do not have an active loan . Continue?',
  //         },
  //       },
  //       'fullstatement-email-error': {
  //         english: {
  //           'fullstatement-email-error':
  //             'Dear @firstname, your email address is missing. kindly visit your nearest @app-client branch to update your details. Do you need another service?',
  //           'fullstatement-email-error-error':
  //             'Invalid selection! Your email address is missing. kindly visit your nearest @app-client branch to update your details. Do you need another service?',
  //         },
  //         swahili: {
  //           'fullstatement-email-error': '',
  //           'fullstatement-email-error-error': '',
  //         },
  //       },
  //       rtgs: {
  //         english: {
  //           'rtgs-to-bank-debit-account':
  //             'Please select the account to send from',
  //           'rtgs-to-bank-debit-account-error':
  //             'Invalid selection! Select the account to send from',
  //           'rtgs-bank-search': 'Please enter bank to perform search',
  //           'rtgs-bank-result': 'Please select a bank below',
  //           'rtgs-bank-result-error':
  //             'Invalid selection! Please select a bank below',
  //           'fetch-banks-error':
  //             'Sorry could not fetch banks at this moment. Please try again later. Do you need another service?',
  //           'fetch-banks-error-error':
  //             'Invalid selection! Sorry could not fetch banks at this moment. Please try again later. Do you need another service?',
  //           'rtgs-to-bank-bank-account':
  //             'Please select the first letter of the bank you want to send to',
  //           'rtgs-to-bank-bank-account-error':
  //             'Invalid selection! Select the first letter of the bank you want to send to',
  //           'rtgs-a-b-bank-account': 'Please select the bank to send to',
  //           'rtgs-a-b-bank-account-error':
  //             'Invalid selection! Select the bank to send to',
  //           'rtgs-c-bank-account': 'Please select the bank to send to',
  //           'rtgs-c-bank-account-error':
  //             'Invalid selection! Select the bank to send to',
  //           'rtgs-d-e-bank-account': 'Please select the bank to send to',
  //           'rtgs-d-e-bank-account-error':
  //             'Invalid selection! Select the bank to send to',
  //           'rtgs-f-bank-account': 'Please select the bank to send to',
  //           'rtgs-f-bank-account-error':
  //             'Invalid selection! Select the bank to send to',
  //           'rtgs-g-h-bank-account': 'Please select the bank to send to',
  //           'rtgs-g-h-bank-account-error':
  //             'Invalid selection! Select the bank to send to',
  //           'rtgs-i-m-bank-account': 'Please select the bank to send to',
  //           'rtgs-i-m-bank-account-error':
  //             'Invalid selection! Select the bank to send to',
  //           'rtgs-n-s-bank-account': 'Please select the bank to send to',
  //           'rtgs-n-s-bank-account-error':
  //             'Invalid selection! Select the bank to send to',
  //           'rtgs-t-z-bank-account': 'Please select the bank to send to',
  //           'rtgs-t-z-bank-account-error':
  //             'Invalid selection! Select the bank to send to',
  //           'rtgs-to-bank-credit-account':
  //             'Please enter the recipients bank account',
  //           'rtgs-to-bank-credit-account-error':
  //             'Invalid bank account! Enter the recipients bank Account',
  //           'rtgs-to-bank-credit-account-name':
  //             'Please enter the recipients bank account name',
  //           'rtgs-to-bank-credit-account-name-error':
  //             'Invalid bank account! Enter the recipients bank account name',
  //           'rtgs-to-bank-amount':
  //             'Please enter the amount to send (minimum @currency-code @amount-minimum )',
  //           'rtgs-to-bank-amount-error':
  //             'Invalid amount! Enter a valid amount to send (minimum @currency-code @amount-minimum )',
  //           'rtgs-to-bank-reason': 'Please enter the reason for payment',
  //           'rtgs-to-bank-reason-error':
  //             'Invalid entry! Enter the reason for payment',
  //           'rtgs-to-bank-confirm':
  //             'Send @currency-code  @rtgsAmount to  @rtgsCreditAccount from  @rtgsDebitAccount via RTGS',
  //           'rtgs-to-bank-confirm-error':
  //             'Invalid selection! send @currency-code  @rtgsAmount to  @rtgsCreditAccount from  @rtgsDebitAccount via RTGS',
  //           'rtgs-to-bank-debit-account-options-error':
  //             'You currently do not have any linked accounts.Do you need another service?',
  //           'rtgs-to-bank-debit-account-options-error-error':
  //             'Invalid selection! You currently do not have any linked accounts.Do you need another service?',
  //           'branch-search':
  //             'Please enter the branch name in order to conduct a search',
  //           'branch-result': 'Please select a branch below',
  //           'branch-no-results-error':
  //             'There are no branches Matching @searchItem. Please enter the branches first name in order to conduct a search',
  //           'branch-result-limit-exceeded-error':
  //             'Too many results. Please enter the full name of the branch separated by a dot ( . ) to narrow the results',
  //           'branch-result-error':
  //             'Invalid Selection! Please select a branch below',
  //         },
  //         swahili: {
  //           'rtgs-to-bank-debit-account': '',
  //           'rtgs-to-bank-debit-account-error': '',
  //           'rtgs-to-bank-bank-account': '',
  //           'rtgs-to-bank-bank-account-error': '',
  //           'rtgs-a-b-bank-account': '',
  //           'rtgs-a-b-bank-account-error': '',
  //           'rtgs-c-bank-account': '',
  //           'rtgs-c-bank-account-error': '',
  //           'rtgs-d-e-bank-account': '',
  //           'rtgs-d-e-bank-account-error': '',
  //           'rtgs-f-bank-account': '',
  //           'rtgs-f-bank-account-error': '',
  //           'rtgs-g-h-bank-account': '',
  //           'rtgs-g-h-bank-account-error': '',
  //           'rtgs-i-m-bank-account': '',
  //           'rtgs-i-m-bank-account-error': '',
  //           'rtgs-n-s-bank-account': '',
  //           'rtgs-n-s-bank-account-error': '',
  //           'rtgs-t-z-bank-account': '',
  //           'rtgs-t-z-bank-account-error': '',
  //           'rtgs-to-bank-credit-account': '',
  //           'rtgs-to-bank-credit-account-error': '',
  //           'rtgs-to-bank-credit-account-name': '',
  //           'rtgs-to-bank-credit-account-name-error': '',
  //           'rtgs-to-bank-amount': '',
  //           'rtgs-to-bank-amount-error': '',
  //           'rtgs-to-bank-reason': '',
  //           'rtgs-to-bank-reason-error': '',
  //           'rtgs-to-bank-confirm': '',
  //           'rtgs-to-bank-confirm-error': '',
  //           'rtgs-to-bank-debit-account-options-error': '',
  //           'rtgs-to-bank-debit-account-options-error-error': '',
  //           'branch-search': '',
  //           'branch-result': '',
  //           'branch-no-results-error': '',
  //           'branch-result-limit-exceeded-error': '',
  //           'branch-result-error': '',
  //         },
  //       },
  //       'registration-error': {
  //         english: {
  //           'registration-error':
  //             'Dear customer, your self registration request failed. Kindly visit your nearest @app-description branch for assistance.',
  //         },
  //       },
  //       itax: {
  //         english: {
  //           'itax-debit-account': 'Please select the debit account',
  //           'itax-debit-account-error':
  //             'Invalid selection! Select the debit account',
  //           'itax-eslip': 'Please enter the E-slip number',
  //           'itax-eslip-error':
  //             'Invalid E-slip number! Enter a valid E-slip number',
  //           'itax-amount': 'Please enter amount to pay',
  //           'itax-amount-error': 'Invalid amount! Please enter amount to pay',
  //           'itax-confirm':
  //             'Pay @currency-code  @itaxAmount to i-tax E-slip: @eslip from Account @debitAccount',
  //           'itax-confirm-error':
  //             'Invalid selection! Pay @currency-code  @itaxAmount to i-tax E-slip: @eslip from Account @debitAccount',
  //           'itax-debit-account-options-error':
  //             'You currently do not have any linked accounts. Do you need another service?',
  //           'itax-debit-account-options-error-error':
  //             'Invalid selection! You currently do not have any linked accounts. Do you need another service?',
  //           'itax-presentment-error':
  //             'Dear @firstname, we are currently unable to fetch the i-tax bill for E-Slip @eslip. Do you need another service?',
  //           'itax-presentment-error-error':
  //             'Invalid selection! We are currently unable to fetch the i-tax bill for E-Slip @eslip. Do you need another service?',
  //           'itax-presentment-amount-error':
  //             'Dear @firstname, you currently do not have an i-tax bill for E-Slip @eslip. Do you need another service?',
  //           'itax-presentment-amount-error-error':
  //             'Invalid selection! You currently do not have an i-tax bill for E-Slip @eslip. Do you need another service?',
  //         },
  //         swahili: {
  //           'itax-debit-account': '',
  //           'itax-debit-account-error': '',
  //           'itax-eslip': '',
  //           'itax-eslip-error': '',
  //           'itax-amount': '',
  //           'itax-amount-error': '',
  //           'itax-confirm': '',
  //           'itax-confirm-error': '',
  //           'itax-debit-account-options-error': '',
  //           'itax-debit-account-options-error-error': '',
  //           'itax-presentment-error': '',
  //           'itax-presentment-error-error': '',
  //           'itax-presentment-amount-error': '',
  //           'itax-presentment-amount-error-error': '',
  //         },
  //       },
  //       'investment-life': {
  //         english: {
  //           'customer-first-name': '',
  //           'customer-first-name-error': '',
  //           'customer-second-name': '',
  //           'branch-select': '',
  //           'domestic-package-name-error': '',
  //           'bancassurance-confirm': '',
  //         },
  //         swahili: {
  //           'customer-first-name': '',
  //           'customer-first-name-error': '',
  //           'customer-second-name': '',
  //           'branch-select': '',
  //           'domestic-package-name-error': '',
  //           'bancassurance-confirm': '',
  //         },
  //         french: {
  //           'customer-first-name': '',
  //           'customer-first-name-error': '',
  //           'customer-second-name': '',
  //           'branch-select': '',
  //           'domestic-package-name-error': '',
  //           'bancassurance-confirm': '',
  //         },
  //       },
  //       'ft-mobile-to-wallet': {
  //         english: {
  //           'ft-same-account-error':
  //             'You cannot transfer funds to the same account. Do you need another service?',
  //           'ft-same-account-error-error':
  //             'Invalid selection! You cannot transfer funds to the same account. Do you need another service?',
  //           'ft-mobile-to-wallet-debit-account':
  //             'Please select the account to transfer from',
  //           'ft-mobile-to-wallet-type': 'Please select mobile number reference',
  //           'ft-mobile-to-wallet-type-error':
  //             'Invalid selection!Please select mobile number reference',
  //           'ft-mobile-to-wallet-other-number':
  //             'Please enter the phone number in the format 07xxxxxxxx',
  //           'ft-mobile-to-wallet-other-number-error':
  //             'Invalid phone Number! Enter a valid phone number in the format 07xxxxxxxx',
  //           'ft-mobile-to-wallet-debit-account-error':
  //             'Invalid selection! Select the account to transfer from',
  //           'ft-mobile-to-wallet-credit-account':
  //             'Please select the account to transfer to',
  //           'ft-mobile-to-wallet-credit-account-error':
  //             'Invalid selection! select the account to transfer to',
  //           'ft-mobile-to-wallet-amount':
  //             'Please enter the amount to tranfer (minimum @currency-code @amount-minimum )',
  //           'ft-mobile-to-wallet-amount-error':
  //             'Invalid amount! Please enter a valid amount to tranfer(minimum @currency-code @amount-minimum )',
  //           'ft-mobile-to-wallet-confirm':
  //             'Confirm @currency-code @fundsTransferAmount from Account -  @fundsTransferDebitAccount to Mobile Account - @billerRefAccount',
  //           'ft-mobile-to-wallet-confirm-error':
  //             'Invalid selection! Transfer @currency-code @fundsTransferAmount from Account - @fundsTransferDebitAccount to Mobile Account - @billerRefAccount',
  //           'ft-mobile-to-wallet-debit-account-options-error':
  //             'You currently do not have any linked accounts.Continue',
  //           'ft-mobile-to-wallet-credit-account-options-error':
  //             'Invalid selection ! You currently do not have any linked accounts.Continue',
  //           'ft-mobile-to-wallet-credit-account-options-error-error':
  //             'Invalid selection ! You currently do not have any linked accounts.Continue',
  //           'ft-mobile-to-wallet-debit-account-options-error-error':
  //             'Invalid selection ! You currently do not have any linked accounts.Continue',
  //         },
  //       },
  //       dstv: {
  //         english: {
  //           'dstv-presentment-error':
  //             'Dear @firstname, we are currently unable to fetch the DSTV bill for Account @billPaymentCreditAccount . Do you wish to do another transaction ? ',
  //           'dstv-presentment-error-error':
  //             'Invalid selection! We are currently unable to fetch the DSTV bill for Account @billPaymentCreditAccount. Do you wish to do another transaction ? ',
  //           'dstv-credit-account': 'Please enter the DSTV Account number',
  //           'dstv-credit-account-error':
  //             'Invalid entry! Please enter the DSTV Account number',
  //           'dstv-debit-account': 'Please select the account to be debited',
  //           'dstv-debit-account-error':
  //             'Invalid selection! Select the account to be debited',
  //           'dstv-amount':
  //             'Please enter the amount to pay ( min @currency-code @minimum-billpayment-amount ) ',
  //           'dstv-amount-error':
  //             'Invalid entry! Please enter the amount to pay ( min @currency-code @minimum-billpayment-amount ) ',
  //           'dstv-confirm':
  //             'Dear @firstname, you are about to pay  @currency-code @billPaymentAmount to DSTV for @billPaymentCreditAccount from @billPaymentDebitAccount',
  //           'dstv-confirm-error':
  //             'Invalid selection! You are about to pay  @currency-code @billPaymentAmount to DSTV for @billPaymentCreditAccount from @billPaymentDebitAccount',
  //           'dstv-debit-account-options-error':
  //             'Dear @firstname, you currently do not have any linked Savings accounts.Do you want to do another transaction',
  //           'dstv-debit-account-options-error-error':
  //             'Invalid selection ! You currently do not have any linked Savings accounts.Do you want to do another transaction',
  //         },
  //       },
  //       'open-Account': {
  //         english: {
  //           'open-Account': '',
  //         },
  //         swahili: {
  //           'open-Account': '',
  //         },
  //         french: {
  //           'open-Account': '',
  //         },
  //       },
  //       'open-Account-page': {
  //         english: {
  //           'open-Account-page': '',
  //           'open-Account-page-error': '',
  //           'Id-Number-label': '',
  //           'mobile-no-label': '',
  //         },
  //         swahili: {
  //           'open-Account-page': '',
  //           'open-Account-page-error': '',
  //           'Id-Number-label': '',
  //           'mobile-no-label': '',
  //         },
  //         french: {
  //           'open-Account-page': '',
  //           'open-Account-page-error': '',
  //           'Id-Number-label': '',
  //           'mobile-no-label': '',
  //         },
  //       },
  //       'set-atm-limits': {
  //         english: {
  //           'set-card-limit-account': 'Please select the Card',
  //           'set-card-limit-account-error':
  //             'Invalid selection! Select the Card',
  //           'set-card-limit-card': 'Please select the card to set a limit on',
  //           'set-card-limit-card-error':
  //             'Invalid selection! Select the card to set a limit on',
  //           'set-card-limit-transaction': 'Please select the card limit type',
  //           'set-card-limit-transaction-error':
  //             'Invalid selection! Select the card limit type',
  //           'pos-amount': 'Please enter the PoS transaction limit',
  //           'pos-amount-error':
  //             'Invalid amount! Enter the PoS transaction limit',
  //           'atm-amount': 'Please enter the ATM transaction limit',
  //           'atm-amount-error':
  //             'Invalid amount! Enter the ATM transaction limit',
  //           'online-amount': 'Please enter the Online transaction limit',
  //           'online-amount-error':
  //             'Invalid amount! Enter the Online transaction limit',
  //           'pos-count': 'Please enter the PoS transaction count limit',
  //           'pos-count-error':
  //             'Invalid amount! Enter the  PoS transaction count limit',
  //           'atm-count': 'Please enter the ATM transaction count limit',
  //           'atm-count-error':
  //             'Invalid amount! Enter the  ATM transaction count limit',
  //           'online-count': 'Please enter the Online transaction count limit',
  //           'online-count-error':
  //             'Invalid amount! Enter the  Online transaction count limit',
  //           'pos-confirm':
  //             'Set the PoS Transaction limit for card @card to @amount and Transaction count limit to @count',
  //           'pos-confirm-error':
  //             'Invalid selection! Set the PoS Transaction limit for card @card to @amount and Transaction count limit to @count',
  //           'atm-confirm':
  //             'Set the ATM Transaction limit for card @card to @amount and Transaction count limit to @count',
  //           'atm-confirm-error':
  //             'Invalid selection! Set the ATM Transaction limit for card @card to @amount and Transaction count limit to @count',
  //           'online-confirm':
  //             'Set the online Transaction limit for card @card to @amount and Transaction count limit to @count',
  //           'online-confirm-error':
  //             'Invalid selection! Set the online Transaction limit for card @card to @amount and Transaction count limit to @count',
  //           'card-lookup-error':
  //             'We are unable to fetch the cards linked to Account @debitAccount . Do you need another service?',
  //           'card-lookup-error-error':
  //             'Invalid selection! We are unable to fetch the cards linked to Account @debitAccount . Do you need another service?',
  //         },
  //         swahili: {
  //           'set-card-limit-account': '',
  //           'set-card-limit-account-error': '',
  //           'set-card-limit-card': '',
  //           'set-card-limit-card-error': '',
  //           'set-card-limit-transaction': '',
  //           'set-card-limit-transaction-error': '',
  //           'pos-amount': '',
  //           'pos-amount-error': '',
  //           'atm-amount': '',
  //           'atm-amount-error': '',
  //           'online-amount': '',
  //           'online-amount-error': '',
  //           'pos-count': '',
  //           'pos-count-error': '',
  //           'atm-count': '',
  //           'atm-count-error': '',
  //           'online-count': '',
  //           'online-count-error': '',
  //           'pos-confirm': '',
  //           'pos-confirm-error': '',
  //           'atm-confirm': '',
  //           'atm-confirm-error': '',
  //           'online-confirm': '',
  //           'online-confirm-error': '',
  //           'card-lookup-error': '',
  //           'card-lookup-error-error': '',
  //         },
  //       },
  //       'bankers-cheque-request': {
  //         english: {
  //           'request-bankers-cheque-payable-to': 'Payable To.(07xxxxxxxx)',
  //           'request-bankers-cheque-payable-to-error':
  //             'Invalid input! Payable To.(07xxxxxxxx)',
  //           'bankers-cheque-collection-date':
  //             'Please input collection date(YY-MM-DD)',
  //           'bankers-cheque-collection-date-error':
  //             'Invalid input! Please input collection date(YY-MM-DD)',
  //           'bankers-cheque-credit-account':
  //             'Please select account to pay from:',
  //           'bankers-cheque-credit-account-error':
  //             'Invalid selection! Please select account to pay from:',
  //           'bankers-cheque-description': 'Enter payee name',
  //           'bankers-cheque-description-error':
  //             'Invalid name! Enter payee name',
  //           'request-bankers-cheque-amount':
  //             'Please enter the amount(minimum @currency-code @amount-minimum )',
  //           'request-bankers-cheque-amount-error':
  //             'Invalid input! Please enter the amount(minimum @currency-code @amount-minimum )',
  //           'bankers-cheque-branch-search':
  //             'Please enter the brach name for pickup',
  //           'bankers-cheque-branch-result':
  //             'Please select collection branch below',
  //           'bankers-cheque-branch-result-error':
  //             'Invalid selection! Please select collection branch below',
  //           'request-bankers-cheque-confirm':
  //             'Request for bankers cheque worth @currency-code  @bankersChequeAmount to be paid to @bankersChequeDesc',
  //           'request-bankers-cheque-confirm-error':
  //             'Invalid selection! Request for bankers cheque worth @currency-code  @bankersChequeAmount to be paid to @bankersChequeDesc',
  //         },
  //         swahili: {
  //           'request-bankers-cheque-payable-to': '',
  //           'request-bankers-cheque-payable-to-error': '',
  //           'bankers-cheque-collection-date': '',
  //           'bankers-cheque-collection-date-error': '',
  //           'request-bankers-cheque-amount': '',
  //           'request-bankers-cheque-amount-error': '',
  //           'bankers-cheque-faulu-branches': '',
  //           'faulu-branches-error': '',
  //           'request-bankers-cheque-confirm': '',
  //         },
  //         french: {
  //           'request-bankers-cheque-payable-to': '',
  //           'request-bankers-cheque-payable-to-error': '',
  //           'bankers-cheque-collection-date': '',
  //           'bankers-cheque-collection-date-error': '',
  //           'request-bankers-cheque-amount': '',
  //           'request-bankers-cheque-amount-error': '',
  //           'bankers-cheque-faulu-branches': '',
  //           'faulu-branches-error': '',
  //           'request-bankers-cheque-confirm': '',
  //         },
  //       },
  //       'star-times': {
  //         english: {
  //           'start-times-credit-account': '',
  //           'start-times-credit-account-error': '',
  //           'start-times-debit-account': '',
  //           'start-times-debit-account-error': '',
  //           'start-times-amount': '',
  //           'start-times-amount-error': '',
  //           'start-times-confirm': '',
  //           'start-times-debit-account-options-error': '',
  //         },
  //       },
  //       'account-phone-number-look-up-error': {
  //         english: {
  //           'account-phone-number-look-up-error': '',
  //         },
  //         swahili: {
  //           'account-phone-number-look-up-error': '',
  //         },
  //         french: {
  //           'account-phone-number-look-up-error': '',
  //         },
  //       },
  //       'loans-page': {
  //         english: {
  //           'loans-page': 'Please select an item below',
  //           'loans-page-error': 'Invalid selection! Select an item below',
  //           'loan-limit-label': 'Check my Loan limit',
  //           'loan-application-label': 'Apply for Loan',
  //           'loan-balance-label': 'Loan Balance Enquiry',
  //           'loan-repayment-label': 'Loan Repayment',
  //           'loan-statement-label': 'Loan Statement',
  //         },
  //       },
  //       'card-linking': {
  //         english: {
  //           'card-linking-account': 'Please enter the Card to link',
  //           'card-linking-account-error':
  //             'Invalid card! Enter a valid Card number to link',
  //           'card-linking-id': 'Please enter your National ID Number',
  //           'card-linking-id-error':
  //             'Invalid ID! Enter your National ID Number',
  //           'card-linking-confirm':
  //             'Dear @firstname, Link Card @cardLinkingAccount to your @app-description Wallet',
  //           'card-linking-confirm-error':
  //             'Invalid selection! Link Card @cardLinkingAccount to your @app-description Wallet',
  //           'card-linking-success':
  //             'END Dear @firstname, you have successfully linked card: @cardLinkingAccount to your @app-description Wallet. Please dial @app-shortcode to login',
  //         },
  //         swahili: {
  //           'card-linking-account': '',
  //           'card-linking-account-error': '',
  //           'card-linking-id': '',
  //           'card-linking-id-error': '',
  //           'card-linking-confirm': '',
  //           'card-linking-confirm-error': '',
  //           'card-linking-success': '',
  //         },
  //       },
  //       'delete-beneficiary': {
  //         english: {
  //           'view-benefciary-confirm':
  //             'Would you like to view your beneficiaries?',
  //           'view-benefciary-confirm-error':
  //             'Invalid selection! Would you like to view your beneficiaries?',
  //           'delete-beneficiary-account':
  //             'Please select a beneficary to delete',
  //           'delete-beneficiary-account-error':
  //             'Invalid selection! Select a beneficary to delete',
  //           'delete-beneficiary-confirm':
  //             'Dear @firstname, Are you sure you want to delete beneficiary: @beneficaryName Account: @beneficaryAccount',
  //           'delete-beneficiary-confirm-error':
  //             'Invalid selection! Are you sure you want to delete beneficiary: @beneficaryName Account: @beneficaryAccount',
  //           'delete-beneficiary-error':
  //             'Dear @firstname, we are unable to fetch your linked beneficiaries. Please try again later. Do need another service?',
  //           'delete-beneficiary-error-error':
  //             'Invalid selection! We are unable to fetch your linked beneficiaries. Please try again later. Do need another service?',
  //           'delete-beneficiary-options-error':
  //             'Dear @firstname, You do not have any linked beneficiaries. Do you need another service?',
  //           'delete-beneficiary-options-error-error':
  //             'Invalid selection! You do not have any linked beneficiaries. Do you need another service?',
  //         },
  //         swahili: {
  //           'view-benefciary-confirm': '',
  //           'view-benefciary-confirm-error': '',
  //           'delete-beneficiary-account': '',
  //           'delete-beneficiary-account-error': '',
  //           'delete-beneficiary-confirm': '',
  //           'delete-beneficiary-confirm-error': '',
  //           'delete-beneficiary-error': '',
  //           'delete-beneficiary-error-error': '',
  //           'delete-beneficiary-options-error': '',
  //           'delete-beneficiary-options-error-error': '',
  //         },
  //       },
  //       'pesalink-link-primary': {
  //         english: {
  //           'pesalink-link-default-account':
  //             'Please select the primary account',
  //           'pesalink-link-default-account-error':
  //             'Invalid selection! Select the primary account',
  //           'pesalink-link-default-confirm':
  //             'Set Account @pesalinkLinkAccount to be your default PESALINK Account',
  //           'pesalink-link-default-confirm-error':
  //             'Invalid selection! Set Account @pesalinkLinkAccount to be your default PESALINK Account',
  //           'pesalink-link-account-options-error':
  //             'You currently do not have any linked accounts. Do you need another service?',
  //           'pesalink-link-account-options-error-error':
  //             'Invalid selection! You currently do not have any linked accounts. Do you need another service?',
  //         },
  //         swahili: {
  //           'pesalink-link-default-account': '',
  //           'pesalink-link-default-account-error': '',
  //           'pesalink-link-default-confirm': '',
  //           'pesalink-link-default-confirm-error': '',
  //           'pesalink-link-account-options-error': '',
  //           'pesalink-link-account-options-error-error': '',
  //         },
  //       },
  //       nhif: {
  //         english: {
  //           'nhif-presentment-error':
  //             'Dear @firstname, we are currently unable to fetch the NHIF bill for Account @billPaymentCreditAccount . Do you wish to do another transaction ? ',
  //           'nhif-presentment-error-error':
  //             'Invalid selection! We are currently unable to fetch the NHIF bill for Account @billPaymentCreditAccount. Do you wish to do another transaction ? ',
  //           'nhif-member-type': 'Please select the NHIF membership type',
  //           'nhif-error':
  //             'Invalid selection! Please select the NHIF membership type',
  //           'nhif-individual': 'Please enter the NHIF Account number',
  //           'nhif-individual-error':
  //             'Invalid entry! Please enter the NHIF Account number',
  //           'nhif-credit-account': 'Please enter the NHIF Account number',
  //           'nhif-credit-account-error':
  //             'Invalid account! Enter the NHIF Account number',
  //           'nhif-debit-account': 'Please select the account to be debited',
  //           'nhif-debit-account-error':
  //             'Invalid selection! Select the account to be debited',
  //           'nhif-amount':
  //             'Please enter the amount to pay (minimum @currency-code @amount-minimum )',
  //           'nhif-amount-error':
  //             'Invalid entry! Please enter the amount to pay (minimum @currency-code @amount-minimum )',
  //           'nhif-penalty-amount': 'Please enter the penalty amount to pay ',
  //           'nhif-penalty-amount-error':
  //             'Invalid entry! Enter the penalty amount to pay ',
  //           'nhif-confirm':
  //             'Dear @firstname, you are about to pay  @currency-code @billPaymentAmount to NHIF for @billPaymentCreditAccount from @billPaymentDebitAccount',
  //           'nhif-confirm-error':
  //             'Invalid selection! You are about to pay  @currency-code @billPaymentAmount to NHIF for @billPaymentCreditAccount from @billPaymentDebitAccount',
  //           'nhif-debit-account-options-error':
  //             'Dear @firstname, you currently do not have any linked Savings accounts.Do you want to do another transaction',
  //           'nhif-debit-account-options-error-error':
  //             'Invalid selection ! You currently do not have any linked Savings accounts.Do you want to do another transaction',
  //           'nhif-member-types-options-error':
  //             'Dear @firstname, you currently do not have any linked Savings accounts.Do you want to do another transaction',
  //           'nhif-member-types-options-error-error':
  //             'Invalid selection ! You currently do not have any linked Savings accounts.Do you want to do another transaction',
  //         },
  //       },
  //       'block-atm': {
  //         english: {
  //           'block-atm-account': 'Please select the Card to block',
  //           'block-atm-account-error':
  //             'Invalid selection! Select the Card to block',
  //           'block-atm-confirm':
  //             'Dear @firstname, request to Block Card: @blockAtmAccount',
  //           'block-atm-confirm-error':
  //             'Invalid selection! Request to Block Card: @blockAtmAccount',
  //           'block-atm-account-options-error':
  //             'Dear @firstname, you currently do not have any Cards',
  //           'block-atm-account-options-error-error':
  //             'Invalid selection! You currently do not have any Cards',
  //         },
  //         swahili: {
  //           'block-atm-account': '',
  //           'block-atm-account-error': '',
  //           'block-atm-confirm': '',
  //           'block-atm-confirm-error': '',
  //           'block-atm-account-options-error': '',
  //           'block-atm-account-options-error-error': '',
  //         },
  //       },
  //       logout: {
  //         english: {
  //           logout:
  //             'END Dear @firstname, thank you for accessing  @app-description. Good bye.',
  //         },
  //       },
  //       'email-change': {
  //         english: {
  //           'email-change-current-email': 'Please enter your current email',
  //           'email-change-invalid-email-error':
  //             'Invalid email format! enter a valid email',
  //           'email-change-wrong-email-error':
  //             'Incorrect email! Please enter your current email',
  //           'email-change-new-email': 'Please enter your new email',
  //           'email-change-invalid-new-email-error':
  //             'Invalid email format! enter a valid email',
  //           'email-change-confirm':
  //             'Dear @firstname, you are about to set @new_email as your current email',
  //           'email-change-confirm-error':
  //             'Invalid selection! Dear @firstname, you are about to set @new_email as your current email',
  //         },
  //       },
  //       'lock-savings-ministatement': {
  //         english: {
  //           'lock-savings-ministatement':
  //             'You are about to request for the ministatement for your 52 weeks savings challenge Account',
  //           'lock-savings-ministatement-error':
  //             'Invalid selection! Request for the ministatement for your 52 weeks savings challenge Account',
  //           'lock-savings-account-ministatement-error':
  //             'Dear @firstname, you do not have a savings account. Would you  like to open a savings account?',
  //           'lock-savings-account-ministatement-error-error':
  //             'Invalid selection! You do not have a savings account. Would you  like to open a savings account?',
  //         },
  //         swahili: {
  //           'lock-savings-ministatement': '',
  //           'lock-savings-ministatement-error': '',
  //           'lock-savings-account-ministatement-error': '',
  //           'lock-savings-account-ministatement-error-error': '',
  //         },
  //       },
  //       'view-accounts': {
  //         english: {
  //           'view-accounts':
  //             'Dear @firstname, your accounts are: \n @all-accounts \nDo you need another service?',
  //           'view-accounts-error':
  //             'Invalid selection! Your accounts are: \n @all-accounts \nDo you need another service?',
  //         },
  //         swahili: {
  //           'view-accounts': '',
  //           'view-accounts-error': '',
  //         },
  //       },
  //       'login-page': {
  //         english: {
  //           'login-page':
  //             'Welcome to @app-description service. Please select an option below',
  //           'login-page-error':
  //             'Invalid selection! Please select an option below',
  //           'login-label': 'Login',
  //           'registration-page-label': 'Self Register',
  //           'login-pin-change-label': 'Change PIN',
  //         },
  //         swahili: {
  //           'login-page': '',
  //           'login-page-error': '',
  //           'login-label': '',
  //           'registration-page-label': '',
  //           'login-pin-change-label': '',
  //         },
  //       },
  //       'open-account-page': {
  //         english: {},
  //       },
  //       'funds-transfer-savings-to-savings': {
  //         english: {
  //           'ft-savings-to-savings-debit-account':
  //             'Please select the account to transfer from',
  //           'ft-savings-to-savings-debit-account-error':
  //             'Invalid selection! select the account to transfer from',
  //           'ft-savings-to-savings-credit-account':
  //             'Please enter the Bank Account to transfer',
  //           'ft-savings-to-savings-credit-account-error':
  //             'Invalid account! Enter the a valid Bank Account',
  //           'ft-savings-to-savings-amount':
  //             'Please enter the amount to tranfer (minimum @currency-code @amount-minimum )',
  //           'ft-savings-to-savings-amount-error':
  //             'Invalid amount! Please enter a valid amount to tranfer (minimum @currency-code @amount-minimum )',
  //           'ft-savings-to-savings-confirm':
  //             'Dear @firstname, Transfer @currency-code  @fundsTransferAmount from  -  @fundsTransferDebitAccount to @receiverName - @fundsTransferCreditAccount',
  //           'ft-savings-to-savings-confirm-error':
  //             'Invalid selection! Transfer @currency-code  @fundsTransferAmount from  -  @fundsTransferDebitAccount to @receiverName -  @fundsTransferCreditAccount',
  //           'ft-savings-to-savings-debit-account-options-error':
  //             'You currently do not have any linked accounts.Continue',
  //           'ft-savings-to-savings-debit-account-options-error-error':
  //             'Invalid selection ! You currently do not have any linked accounts.Continue',
  //         },
  //         swahili: {
  //           'ft-savings-to-savings-debit-account': '',
  //           'ft-savings-to-savings-debit-account-error': '',
  //           'ft-savings-to-savings-credit-account': '',
  //           'ft-savings-to-savings-credit-account-error': '',
  //           'ft-savings-to-savings-amount': '',
  //           'ft-savings-to-savings-amount-error': '',
  //           'ft-savings-to-savings-confirm': '',
  //           'ft-savings-to-savings-confirm-error': '',
  //           'ft-savings-to-savings-debit-account-options-error': '',
  //           'ft-savings-to-savings-debit-account-options-error-error': '',
  //         },
  //       },
  //       'withdrawal-page': {
  //         english: {
  //           'withdrawal-page': 'Please select an option below',
  //           'withdrawal-page-error':
  //             'Invalid selection! select an option below',
  //           'withdrawal-mpesa-b2c-label': 'Send to Mpesa',
  //           'withdrawal-airtel-b2c-label': 'Send to Airtel Money',
  //         },
  //         swahili: {
  //           'withdrawal-page': '',
  //           'withdrawal-page-error': '',
  //           'withdrawal-mpesa-b2c-label': '',
  //           'withdrawal-airtel-b2c-label': '',
  //         },
  //       },
  //       'bancassurance-page': {
  //         english: {
  //           'bancassurance-page': 'Welcome to Faulu bancassurance service',
  //           'bancassurance-page-error':
  //             'Invalid selection, please select an option below',
  //           'Motor-insurance-label': ' Mortor Insurance',
  //           'Medical-insurance-label': 'Medical Insurance',
  //         },
  //         swahili: {
  //           'bancassurance-page': '',
  //           'bancassurance-page-error': '',
  //           'Motor-insurance-label': '',
  //           'Medical-insurance-label': '',
  //         },
  //         french: {
  //           'bancassurance-page': '',
  //           'bancassurance-page-error': '',
  //           'Motor-insurance-label': '',
  //           'Medical-insurance-label': '',
  //         },
  //       },
  //       'technical-error': {
  //         english: {
  //           'technical-error':
  //             'END Dear customer, the Ukulima Sacco USSD service is currently experiencing technical challenges. We apologize for the inconvenience. Please try again later.',
  //         },
  //       },
  //       'tell-a-friend': {
  //         english: {
  //           'tell-a-friend-number':
  //             'Please enter your friends Phone Number in the format 07xxxxxxxx',
  //           'tell-a-friend-number-error':
  //             'Invalid Phone Number! Enter your friends Phone Number in the format 07xxxxxxxx',
  //           'tell-a-friend-confirm':
  //             'Invite @friendPhoneNumber to use @app-description?',
  //           'tell-a-friend-confirm-error':
  //             'Invalid selection! invite @friendPhoneNumber to use @app-description?',
  //           'tell-a-friend-success':
  //             'Dear @firstname, your request was successful. Do you need another service?',
  //           'tell-a-friend-success-error':
  //             'Invalid selection! Your request was successful. Do you need another service?',
  //           'tell-a-friend-error':
  //             'Dear @firstname, your request failed. Do you need another service?',
  //           'tell-a-friend-error-error':
  //             'Invalid selection! Your request failed. Do you need another service?',
  //         },
  //         swahili: {
  //           'tell-a-friend-number': '',
  //           'tell-a-friend-number-error': '',
  //           'tell-a-friend-confirm': '',
  //           'tell-a-friend-confirm-error': '',
  //           'tell-a-friend-success': '',
  //           'tell-a-friend-success-error': '',
  //           'tell-a-friend-error': '',
  //           'tell-a-friend-error-error': '',
  //         },
  //       },
  //       'loan-balance': {
  //         english: {
  //           'loan-balance-confirm':
  //             'Dear @firstname, you are about to request for your loan balance',
  //           'loan-balance-confirm-error':
  //             'Invalid selection! Dear @firstname, you are about to request for your loan balance',
  //           'loan-balance-account': 'Please select an account',
  //           'loan-balance-account-error':
  //             'Invalid selection! Select an account',
  //         },
  //       },
  //       'savings-products': {
  //         english: {
  //           'savings-products-confirm': '',
  //         },
  //         swahili: {
  //           'savings-products-confirm': '',
  //         },
  //         french: {
  //           'savings-products-confirm': '',
  //         },
  //       },
  //       churches: {
  //         english: {
  //           'church-debit-account': 'Please select the Account to pay from',
  //           'church-debit-account-error':
  //             'Invalid selection! Select the Account to pay from',
  //           'church-narration': 'Please enter reason for payment',
  //           'church-narration-error': 'Invalid entry! Enter reason for payment',
  //           'church-account-number': 'Please select a church below',
  //           'church-account-number-error':
  //             'Invalid selection! Select a church below',
  //           'church-amount':
  //             'Please enter the Amount you would like to pay (minimum @currency-code @amount-minimum )',
  //           'church-amount-error':
  //             'Invalid amount! Enter the Amount you would like to pay (minimum @currency-code @amount-minimum )',
  //           'church-confirm':
  //             'Pay @currency-code . @churchAmount from @churchDebitAccount to @fauluChurch Acccount number: @institutionAccount',
  //           'church-confirm-error':
  //             'Invalid selection! Pay @currency-code . @churchAmount from @churchDebitAccount to @fauluChurch Acccount number: @institutionAccount',
  //           'church-list-accounts-error':
  //             'Dear @firstname, We are currently unable to fetch the list of churches. Please try again later. Do you need another service?',
  //           'church-list-accounts-error-error':
  //             'Invalid selection! We are currently unable to fetch the list of churches. Please try again later. Do you need another service?',
  //           'church-debit-account-options-error':
  //             'Dear @firstname, you do not have any linked accounts. Do you need another service?',
  //           'church-debit-account-options-error-error':
  //             'Invalid selection! You do not have any linked accounts. Do you need another service?',
  //         },
  //       },
  //       landrates: {
  //         english: {
  //           'landrates-credit-account': 'Please enter the Plot number',
  //           'landrates-credit-account-error':
  //             'Invalid plot number! Enter the Plot Meter number',
  //           'landrates-debit-account':
  //             'Please select the account to be debited',
  //           'landrates-debit-account-error':
  //             'Invalid selection! Select the account to be debited',
  //           'landrates-amount':
  //             'Please enter the amount to pay ( min @currency-code @minimum-billpayment-amount ) ',
  //           'landrates-amount-error':
  //             'Invalid entry! Please enter the amount to pay ( min @currency-code @minimum-billpayment-amount ) ',
  //           'landrates-confirm':
  //             'Dear @firstname, you are about to make a Land Rates payment of @currency-code @billPaymentAmount for Plot No. @billPaymentCreditAccount from @billPaymentDebitAccount',
  //           'landrates-confirm-error':
  //             'Invalid selection! You are about to make a Land Rates payment of @currency-code @billPaymentAmount for Plot No. @billPaymentCreditAccount from @billPaymentDebitAccount',
  //           'landrates-debit-account-options-error':
  //             'Dear @firstname, you currently do not have any linked Savings accounts.Do you want to do another transaction',
  //           'landrates-debit-account-options-error-error':
  //             'Invalid selection ! You currently do not have any linked Savings accounts.Do you want to do another transaction',
  //         },
  //       },
  //       'pin-change': {
  //         english: {
  //           'pin-change-old-pin': 'Please enter your 4 digit PIN to proceed',
  //           'pin-change-old-pin-error':
  //             'Wrong PIN! Enter your 4 digit PIN to proceed',
  //           'pin-change-new-pin': 'Please enter a new 4 digit PIN',
  //           'pin-change-new-pin-error':
  //             'Invalid PIN format! Enter a new 4 digit PIN',
  //           'pin-change-confirm':
  //             'Dear @firstname, you are about to change your PIN',
  //           'pin-change-confirm_error':
  //             'Invalid selection! Dear @firstname, you are about to change your PIN',
  //           'pin-change-error':
  //             'Dear @firstname, your PIN change request failed. Continue ?',
  //           'pin-change-error-error':
  //             'Invalid selection! Your PIN change request failed. Continue ?',
  //           'pin-change-error-alert':
  //             'Dear @firstname, your PIN change failed. Kindly dial @shortcode to login',
  //         },
  //       },
  //       'digital-account-opening': {
  //         english: {
  //           'digital-account-confirm':
  //             'Dear @firstname, Confirm to open a savings digital account',
  //           'digital-account-confirm-error':
  //             'Invalid selection! Confirm to open a savings digital account',
  //         },
  //       },
  //       'zuku-internet': {
  //         english: {
  //           'zuku-internet-credit-account': '',
  //           'zuku-internet-credit-account-error': '',
  //           'zuku-internet-debit-account': '',
  //           'zuku-internet-debit-account-error': '',
  //           'zuku-internet-amount': '',
  //           'zuku-internet-amount-error': '',
  //           'zuku-internet-confirm': '',
  //           'zuku-internet-debit-account-options-error': '',
  //         },
  //       },
  //       'api-success': {
  //         english: {
  //           'api-success':
  //             'Dear @firstname, your @requestName request was successful.You will receive an SMS response shortly. Do you want to do another transaction ?',
  //           'api-success-error':
  //             'Invalid selection! Dear @firstname, your @requestName request was successful.You will receive an SMS response shortly. Do you want to do another transaction ?',
  //         },
  //       },
  //       'standing-orders-page': {
  //         english: {
  //           'standing-orders-page': 'Please select an option below',
  //           'standing-orders-page-error':
  //             'Invalid selection! Select an option below',
  //           'create-standing-orders-page-label': 'Create a Standing order',
  //           'standing-orders-amend-label': 'Amend a Standing Order',
  //           'standing-orders-cancel-label': 'Cancel a Standing Order',
  //         },
  //         swahili: {
  //           'standing-orders-page': '',
  //           'standing-orders-page-error': '',
  //           'create-standing-orders-page-label': '',
  //           'standing-orders-amend-label': '',
  //           'standing-orders-cancel-label': '',
  //         },
  //       },
  //       'mpesa-c2b-success': {
  //         english: {
  //           'mpesa-c2b-success':
  //             'END Your request has been successfully received. \nProceed to enter your M-PESA PIN',
  //         },
  //         swahili: {
  //           'mpesa-c2b-success': '',
  //         },
  //       },
  //       'api-error': {
  //         english: {
  //           'api-error': 'Dear @firstname, @errMessage . Continue ?',
  //           'api-error-error':
  //             'Invalid selection! Dear @firstname, @errMessage . Continue ?',
  //         },
  //       },
  //       'funds-transfer-own-accounts': {
  //         english: {
  //           'ft-own-accounts-debit-account':
  //             'Please select the account to transfer from',
  //           'ft-own-accounts-debit-account-error':
  //             'Invalid selection! Select the account to transfer from',
  //           'ft-own-accounts-credit-account':
  //             'Please select the account to transfer to',
  //           'ft-own-accounts-credit-account-error':
  //             'Invalid selection! select the account to transfer to',
  //           'ft-own-accounts-amount':
  //             'Please enter the amount to tranfer(minimum @currency-code @amount-minimum )',
  //           'ft-own-accounts-amount-error':
  //             'Invalid amount! Please enter a valid amount to tranfer(minimum @currency-code @amount-minimum )',
  //           'ft-own-accounts-confirm':
  //             ' @currency-code @fundsTransferAmount from Account -  @fundsTransferDebitAccount to Account - @fundsTransferCreditAccount',
  //           'ft-own-accounts-confirm-error':
  //             'Invalid selection! Transfer @currency-code @fundsTransferAmount from Account - @fundsTransferDebitAccount to Account - @fundsTransferCreditAccount',
  //           'ft-own-accounts-debit-account-options-error':
  //             'You currently do not have any linked accounts.Continue',
  //           'ft-own-accounts-credit-account-options-error':
  //             'You currently do not have any linked accounts.Continue',
  //           'ft-same-account-error':
  //             'You cannot transfer funds to the same account. Do you need another service?',
  //           'ft-same-account-error-error':
  //             'Invalid selection! You cannot transfer funds to the same account. Do you need another service?',
  //           'ft-own-accounts-debit-account-options-error-error':
  //             'Invalid selection ! You currently do not have any linked accounts.Continue',
  //           'ft-own-accounts-credit-account-options-error-error':
  //             'Invalid selection ! You currently do not have any linked accounts.Continue',
  //         },
  //       },
  //       'lock-savings-page': {
  //         english: {
  //           'lock-savings-page': 'Please select an option below',
  //           'lock-savings-page-error':
  //             'Invalid selection! Select an option below',
  //           'lock-savings-open-account-label': 'Open a Savings Account',
  //           'lock-savings-save-label': 'Deposit',
  //           'lock-savings-unlock-label': 'Withdraw from Savings',
  //           'lock-savings-ministatement-label': 'Ministatement',
  //           'lock-savings-balance-label': 'Balance Enquiry',
  //           'lock-savings-withdraw-label': 'Withdraw',
  //         },
  //         swahili: {
  //           'lock-savings-page': '',
  //           'lock-savings-page-error': '',
  //           'lock-savings-open-account-label': '',
  //           'lock-savings-save-label': '',
  //           'lock-savings-unlock-label': '',
  //           'lock-savings-ministatement-label': '',
  //           'lock-savings-balance-label': '',
  //           'lock-savings-withdraw-label': '',
  //         },
  //       },
  //       'account-activation': {
  //         english: {
  //           'account-activation-options': 'Select an account to activate below',
  //           'account-activation-options-error':
  //             'Invalid selection! Seelect an account to activate below',
  //           'account-activation-ft-debit-account': 'Select debit account',
  //           'account-activation-ft-debit-account-error':
  //             'Invalid selection! Select debit account',
  //           'account-activation-confirm-ft':
  //             'Confirm to activate dormant accont @activationAccount',
  //           'account-activation-confirm-ft-error':
  //             'Invalid selection! Confirm to activate dormant accont @activationAccount',
  //           'account-activation-confirm-mpesa':
  //             'Confirm to activate dormant accont @activationAccount',
  //           'account-activation-confirm-mpesa-error':
  //             'Invalid selection! Confirm to activate dormant accont @activationAccount',
  //           'account-activation-options-options-error':
  //             'Dear @firstname, you do not have any dormant accounts. Do you need another service?',
  //           'account-activation-options-options-error-error':
  //             'Invalid selection! You do not have any dormant accounts. Do you need another service?',
  //           'account-requests-page-label': 'Account Requests',
  //           'account-activation-type': 'Please select an option below',
  //           'account-activation-type-error': 'Please select an option below',
  //           'fetch-dormant-accounts-error':
  //             'Dear @firstname, we are unable to fetch your dormant accounts. Please try again later. Do you need another service?',
  //           'fetch-dormant-accounts-error-error':
  //             'Dear @firstname, we are unable to fetch your dormant accounts. Please try again later. Do you need another service?',
  //         },
  //         swahili: {
  //           'customer-requests-page': '',
  //           'customer-requests-page-error': '',
  //           'standing-orders-page-label': '',
  //           'cheques-page-label': '',
  //           'atm-cards-page-label': '',
  //           'account-requests-page-label': '',
  //           'cardless-withdrawal-label': '',
  //         },
  //       },
  //       'funds-transfer-other-account': {
  //         english: {
  //           'ft-savings-to-savings-debit-account':
  //             'Please select the account to transfer from',
  //           'ft-savings-to-savings-debit-account-error':
  //             'Invalid selection! select the account to transfer from',
  //           'ft-savings-to-savings-credit-account':
  //             'Please enter the SC Bank Account to transfer',
  //           'ft-savings-to-savings-credit-account-error':
  //             'Invalid account! Enter the a valid SC Bank Account',
  //           'ft-savings-to-savings-amount':
  //             'Please enter the amount to tranfer (minimum @currency-code @amount-minimum )',
  //           'ft-savings-to-savings-amount-error':
  //             'Invalid amount! Please enter a valid amount to tranfer (minimum @currency-code @amount-minimum )',
  //           'ft-savings-to-savings-confirm':
  //             'Transfer @working-currency @fundsTransferAmount from  -  @fundsTransferDebitAccount to  - @fundsTransferCreditAccount',
  //           'ft-savings-to-savings-confirm-error':
  //             'Invalid selection! Transfer @working-currency @fundsTransferAmount from  -  @fundsTransferDebitAccount to  -  @fundsTransferCreditAccount',
  //           'ft-savings-to-savings-debit-account-options-error':
  //             'You currently do not have any linked accounts.Continue',
  //           'ft-savings-to-savings-debit-account-options-error-error':
  //             'Invalid selection ! You currently do not have any linked accounts.Continue',
  //           'ft-same-account-error':
  //             'You cannot transfer funds to the same account. Do you need another service?',
  //           'ft-same-account-error-error':
  //             'Invalid selection! You cannot transfer funds to the same account. Do you need another service?',
  //         },
  //       },
  //       'account-dormant': {
  //         english: {
  //           'account-dormant': '',
  //         },
  //         swahili: {
  //           'account-dormant': '',
  //         },
  //         french: {
  //           'account-dormant': '',
  //         },
  //       },
  //       'lock-savings-withdraw': {
  //         english: {
  //           'lock-savings-withdraw-debit-account-options-error': '',
  //           'lock-savings-withdraw-debit-account-options-error-error': '',
  //           'lock-savings-withdraw-debit-account':
  //             'Please select the account to withdraw to',
  //           'lock-savings-withdraw-debit-account-error':
  //             'Invalid selection! Select the account to withdraw to',
  //           'lock-savings-withdraw-amount':
  //             'Please enter the amount to withdraw (minimum @currency-code @amount-minimum )',
  //           'lock-savings-withdraw-amount-error':
  //             'Invalid amount! Enter the amount to withdraw (minimum @currency-code @amount-minimum )',
  //           'lock-savings-withdraw-confirm':
  //             'Withdraw @currency-code . @lockSavingsAmount from your lock savings account to  @lockSavingsWithdrawCreditAccount',
  //           'lock-savings-withdraw-confirm-error':
  //             'Invalid selection! Withdraw @currency-code . @lockSavingsAmount from your lock savings account to  @lockSavingsWithdrawCreditAccount',
  //         },
  //         swahili: {
  //           'lock-savings-withdraw-debit-account-options-error': '',
  //           'lock-savings-withdraw-debit-account-options-error-error': '',
  //           'lock-savings-withdraw-debit-account': '',
  //           'lock-savings-withdraw-debit-account-error': '',
  //           'lock-savings-withdraw-amount': '',
  //           'lock-savings-withdraw-amount-error': '',
  //           'lock-savings-withdraw-confirm': '',
  //           'lock-savings-withdraw-confirm-error': '',
  //         },
  //       },
  //       'standing-orders-external': {
  //         english: {
  //           'so-a-b-bank-account': 'Please select a bank below',
  //           'so-a-b-bank-account-error':
  //             'Invalid selection! Select a bank below',
  //           'so-c-bank-account': 'Please select a bank below',
  //           'so-c-bank-account-error': 'Invalid selection! Select a bank below',
  //           'so-d-e-bank-account': 'Please select a bank below',
  //           'so-d-e-bank-account-error':
  //             'Invalid selection! Select a bank below',
  //           'so-f-bank-account': 'Please select a bank below',
  //           'so-f-bank-account-error': 'Invalid selection! Select a bank below',
  //           'so-g-h-bank-account': 'Please select a bank below',
  //           'so-g-h-bank-account-error':
  //             'Invalid selection! Select a bank below',
  //           'so-i-m-bank-account': 'Please select a bank below',
  //           'so-i-m-bank-account-error':
  //             'Invalid selection! Select a bank below',
  //           'so-n-s-bank-account': 'Please select a bank below',
  //           'so-n-s-bank-account-error':
  //             'Invalid selection! Select a bank below',
  //           'so-t-z-bank-account': 'Please select a bank below',
  //           'so-t-z-bank-account-error':
  //             'Invalid selection! Select a bank below',
  //           'so-b2o-bank-account':
  //             'Please select the start letter of your bank',
  //           'so-b2o-bank-account-error':
  //             'Invalid selection! Select the start letter of your bank',
  //           'so-b2o-debit-account': 'Please select the Account to send from',
  //           'so-b2o-debit-account-error':
  //             'Invalid selection! Select the Account to send from',
  //           'so-bank-search': 'Please enter bank to perform search',
  //           'so-bank-result': 'Please select a bank below',
  //           'so-bank-result-error':
  //             'Invalid selection! Please select a bank below',
  //           'so-b2o-credit-account': 'Please enter the Account to send to',
  //           'so-b2o-credit-account-error':
  //             'Invalid Account! Enter the Account to send to',
  //           'so-b2o-amount':
  //             'Please enter the amount to send (minimum @currency-code @amount-minimum )',
  //           'so-b2o-amount-error':
  //             'Invalid amount! Enter the amount to send (minimum @currency-code @amount-minimum )',
  //           'so-b2o-start-date':
  //             'Please enter the start date in the format YYYY-MM-DD e.g 2021-01-26',
  //           'so-b2o-start-date-error':
  //             'Invalid start date! Enter the start date in the format YYYY-MM-DD e.g 2021-01-26',
  //           'so-b2o-end-date':
  //             'Please enter the end date in the format YYYY-MM-DD e.g 2021-01-26',
  //           'so-b2o-end-date-error':
  //             'Invalid end date! Enter the end date in the format YYYY-MM-DD e.g 2021-01-26',
  //           'so-b2o-frequency': 'Please select the frequency',
  //           'so-b2o-frequency-error': 'Invalid selection! Select the frequency',
  //           'so-b2o-beneficiary-name':
  //             'Please enter the recipients full name e.g John doe',
  //           'so-b2o-beneficiary-name-error':
  //             'Invalid name! Enter the recipients full name e.g John Doe',
  //           'so-b2o-member-number':
  //             'Please enter your Member Number ( optionally enter s to skip )',
  //           'so-b2o-member-number-error':
  //             'Invalid Member Number! Enter your Sacco Number ( enter s to skip )',
  //           'so-b2o-instruction': 'Please enter the purpose',
  //           'so-b2o-instruction-error': 'Invalid entry! Enter the purpose',
  //           'so-b2o-confirm':
  //             'Set Standing order @currency-code : @soAmount, Start Date: @soStartDate, To: @soCreditAccount, Frequency @soFrequency, Beneficiary: @soBeneficiaryName, End Date: @soEndDate, Purpose: @soInstruction ',
  //           'so-b2o-confirm-error':
  //             'Invalid selection! Set Standing order @currency-code : @soAmount ,Start Date: @soStartDate, To: @soCreditAccount, Frequency @soFrequency, Beneficiary: @soBeneficiaryName, End Date: @soEndDate, Purpose: @soInstruction',
  //           'so-b2o-debit-account-options-error':
  //             'You currently do not have any linked accounts.Continue',
  //           'so-b2b-debit-account-options-error-error':
  //             'Invalid selection! You currently do not have any linked accounts.Continue',
  //         },
  //         swahili: {
  //           'so-a-b-bank-account': '',
  //           'so-a-b-bank-account-error': '',
  //           'so-c-bank-account': '',
  //           'so-c-bank-account-error': '',
  //           'so-d-e-bank-account': '',
  //           'so-d-e-bank-account-error': '',
  //           'so-f-bank-account': '',
  //           'so-f-bank-account-error': '',
  //           'so-g-h-bank-account': '',
  //           'so-g-h-bank-account-error': '',
  //           'so-i-m-bank-account': '',
  //           'so-i-m-bank-account-error': '',
  //           'so-n-s-bank-account': '',
  //           'so-n-s-bank-account-error': '',
  //           'so-t-z-bank-account': '',
  //           'so-t-z-bank-account-error': '',
  //           'so-b2o-bank-account': '',
  //           'so-b2o-bank-account-error': '',
  //           'so-b2o-debit-account': '',
  //           'so-b2o-debit-account-error': '',
  //           'so-b2o-credit-account': '',
  //           'so-b2o-credit-account-error': '',
  //           'so-b2o-amount': '',
  //           'so-b2o-amount-error': '',
  //           'so-b2o-start-date': '',
  //           'so-b2o-start-date-error': '',
  //           'so-b2o-end-date': '',
  //           'so-b2o-end-date-error': '',
  //           'so-b2o-frequency': '',
  //           'so-b2o-frequency-error': '',
  //           'so-b2o-beneficiary-name': '',
  //           'so-b2o-beneficiary-name-error': '',
  //           'so-b2o-member-number': '',
  //           'so-b2o-member-number-error': '',
  //           'so-b2o-instruction': '',
  //           'so-b2o-instruction-error': '',
  //           'so-b2o-confirm': '',
  //           'so-b2o-confirm-error': '',
  //           'so-b2o-debit-account-options-error': '',
  //           'so-b2b-debit-account-options-error-error': '',
  //         },
  //       },
  //       insurance: {
  //         english: {
  //           'insurance-type': 'Please select the insurance to purchase',
  //           'insurance-type-error':
  //             'Invalid selection! Select the insurance to purchase',
  //           'motor-insurance-confirm':
  //             'Motor Insurance covers your vehicle against own damage and/or theft to the vehicle including third party liabilities.',
  //           'personal-accident-confirm':
  //             'Personal Accident Insurance pays lump sum benefit to the beneficiary in the event of accidental death or injury to the insured person',
  //           'property-insurance-confirm':
  //             'Property Insurance covers your property against any accidental and unforeseen loss or damage.',
  //           'ipf-confirm':
  //             'Insurance Premium Financing lets you enjoy the benefits of insurance upfront and payback in manageable installments.',
  //           'motor-insurance-email':
  //             'Please enter your email to receive the Motor Insurance details on our cover.',
  //           'motor-insurance-email-error':
  //             'Invalid email! Please enter your email to receive the Motor Insurance details on our cover.',
  //           'others-email':
  //             'Please enter your email to receive Insurance details on our covers.',
  //           'others-email-error': 'Invalid email! Please enter your email',
  //           'claims-email': 'Please enter your email',
  //           'claims-email-error': 'Invalid email! Please enter your email',
  //           'personal-accident-email': 'Please enter your email.',
  //           'personal-accident-email-error':
  //             'Invalid email! Please enter your email to receive the Personal Accident Insurance deatils on our cover.',
  //           'motor-insurance-number': 'Please enter ',
  //           'motor-insurance-receive-confirm':
  //             'Dear @firstname, Confirm to receive more details on Motor Insurance.',
  //           'motor-insurance-receive-confirm-error':
  //             'Invalid selection! Confirm to receive more details on Motor Insurance.',
  //           'claims-email-receive-confirm':
  //             'Dear @firstname, Please confirm you would wish to receive a call from us on your claim notification.',
  //           'claims-email-receive-confirm-error':
  //             'Invalid selection! Please confirm you would wish to receive a call from us on your claim notification.',
  //           'others-email-receive-confirm':
  //             'Dear @firstname, Confirm to receive more details on Insurance details.',
  //           'others-email-receive-confirm-error':
  //             'Invalid selection! Confirm to receive more details on Insurance details.',
  //           'personal-accident-receive-confirm':
  //             'Dear @firstname, Confirm to receive more details on Personal Accident Insurance.',
  //           'personal-accident-receive-confirm-error':
  //             'Invalid selection! Confirm to receive more details on Personal Accident Insurance.',
  //           'motor-insurance-confirm-error':
  //             'Invalid selection! Motor Insurance covers your vehicle against own damage and/or theft to the vehicle including third party liabilities.',
  //           'motor-insurance-success':
  //             'Dear @firstname, Thank you for your interest in our services. Our staff will get back to you shortly. Do you need another service?',
  //           'motor-insurance-success-error':
  //             'Invalid selection! Thank you for your interest in our services. Our staff will get back to you shortly. Do you need another service?',
  //           'claims-insurance-success':
  //             'Dear @firstname, Thank you for your notification. Our staff will get back to you shortly. Do you need another service?',
  //           'claims-insurance-success-error':
  //             'Invalid selection! Thank you for your notification. Our staff will get back to you shortly. Do you need another service?',
  //           'personal-insurance-success':
  //             'Dear @firstname, Thank you for your interest in our services. Our staff will get back to you shortly. Do you need another service?',
  //           'personal-insurance-success-error':
  //             'Invalid selection! Thank you for your interest in our services. Our staff will get back to you shortly. Do you need another service?',
  //           'personal-accident-confirm-error':
  //             'Invalid selection! Personal Accident Insurance pays lump sum benefit to the beneficiary in the event of accidental death or injury to the insured person.',
  //           'property-insurance-confirm-error':
  //             'Invalid selection! Property Insurance ',
  //           'ipf-confirm-error':
  //             'Invalid selection! Insurance Premium Financing',
  //           'insurance-app-download':
  //             "Kindly search for 'CB Konnect'  on google and fill in the Insurance purchase form. Do another transaction?",
  //           'insurance-app-download-error':
  //             "Invalid selection! Search for 'CB Konnect' on the google play store and fill in the insurance purchase form. Do another transaction?",
  //         },
  //         swahili: {
  //           'insurance-type': '',
  //           'insurance-type-error': '',
  //           'motor-insurance-confirm': '',
  //           'personal-accident-confirm': '',
  //           'property-insurance-confirm': '',
  //           'ipf-confirm': '',
  //           'motor-insurance-email': '',
  //           'motor-insurance-email-error': '',
  //           'others-email': '',
  //           'others-email-error': '',
  //           'claims-email': '',
  //           'claims-email-error': '',
  //           'personal-accident-email': '',
  //           'personal-accident-email-error': '',
  //           'motor-insurance-number': '',
  //           'motor-insurance-receive-confirm': '',
  //           'motor-insurance-receive-confirm-error': '',
  //           'claims-email-receive-confirm': '',
  //           'claims-email-receive-confirm-error': '',
  //           'others-email-receive-confirm': '',
  //           'others-email-receive-confirm-error': '',
  //           'personal-accident-receive-confirm': '',
  //           'personal-accident-receive-confirm-error': '',
  //           'motor-insurance-confirm-error': '',
  //           'motor-insurance-success': '',
  //           'motor-insurance-success-error': '',
  //           'claims-insurance-success': '',
  //           'claims-insurance-success-error': '',
  //           'personal-insurance-success': '',
  //           'personal-insurance-success-error': '',
  //           'personal-accident-confirm-error': '',
  //           'property-insurance-confirm-error': '',
  //           'ipf-confirm-error': '',
  //           'insurance-app-download': '',
  //           'insurance-app-download-error': '',
  //         },
  //       },
  //       'account-blocked': {
  //         english: {
  //           'account-blocked':
  //             'END Dear customer, your account is currently blocked. Kindly contact @app_contact_name on @app_contact_number, or email @app_email for assistance.',
  //         },
  //       },
  //       'loan-application-success': {
  //         english: {
  //           'loan-application-success': '',
  //         },
  //         swahili: {
  //           'loan-application-success': '',
  //         },
  //         french: {
  //           'loan-application-success': '',
  //         },
  //       },
  //       'domestic-package': {
  //         english: {
  //           'customer-first-name': '',
  //           'customer-first-name-error': '',
  //           'customer-second-name': '',
  //           'branch-select': '',
  //           'domestic-package-name-error': '',
  //           'bancassurance-confirm': '',
  //         },
  //         swahili: {
  //           'customer-first-name': '',
  //           'customer-first-name-error': '',
  //           'customer-second-name': '',
  //           'branch-select': '',
  //           'domestic-package-name-error': '',
  //           'bancassurance-confirm': '',
  //         },
  //         french: {
  //           'customer-first-name': '',
  //           'customer-first-name-error': '',
  //           'customer-second-name': '',
  //           'branch-select': '',
  //           'domestic-package-name-error': '',
  //           'bancassurance-confirm': '',
  //         },
  //       },
  //       'funds-transfer-wallet-to-savings': {
  //         english: {
  //           'ft-wallet-to-savings-credit-account':
  //             'Please enter the Bank Account to transfer to',
  //           'ft-wallet-to-savings-credit-account-error':
  //             'Invalid account! Enter the a valid Bank Account to transfer to',
  //           'ft-wallet-to-savings-amount':
  //             'Please enter the amount to tranfer ( minimum @currency-code @amount-minimum  )',
  //           'ft-wallet-to-savings-amount-error':
  //             'Invalid amount! Please enter a valid amount to tranfer ( minimum @currency-code @amount-minimum  )',
  //           'funds-transfer-wallet-success':
  //             'Dear @firstname, your funds transfer request from wallet to savings was successful. You will receive an SMS response shortly.',
  //           'funds-transfer-wallet-success-error':
  //             'Invalid selection! Your funds transfer request from wallet to savings was successful. You will receive an SMS response shortly.',
  //           'ft-wallet-to-savings-confirm':
  //             'Dear @firstname, Transfer @currency-code . @fundsTransferAmount from Wallet -  @msisdn to  - @fundsTransferCreditAccount',
  //           'ft-wallet-to-savings-confirm-error':
  //             'Invalid selection! Transfer @currency-code . @fundsTransferAmount from Wallet -  @msisdn to  -  @fundsTransferCreditAccount',
  //         },
  //         swahili: {
  //           'ft-wallet-to-savings-credit-account': '',
  //           'ft-wallet-to-savings-credit-account-error': '',
  //           'ft-wallet-to-savings-amount': '',
  //           'ft-wallet-to-savings-amount-error': '',
  //           'funds-transfer-wallet-success': '',
  //           'funds-transfer-wallet-success-error': '',
  //           'ft-wallet-to-savings-confirm': '',
  //           'ft-wallet-to-savings-confirm-error': '',
  //         },
  //       },
  //       'pay-government-bill-page': {
  //         english: {
  //           'pay-government-bill-page': 'Select a category below',
  //           'pay-government-bill-page-error':
  //             'Invalid selection! Select a category below',
  //           'itax-label': 'Itax',
  //           'parking-label': 'Parking',
  //         },
  //         swahili: {
  //           'pay-government-bill-page': '',
  //           'pay-government-bill-page-error': '',
  //           'itax-label': '',
  //           'parking-label': '',
  //         },
  //       },
  //       'sacco-linking-success': {
  //         english: {
  //           'sacco-linking-success':
  //             'END Dear @firstname, you have successfully linked Sacco account to your @app-description Wallet. Please dial @app-shortcode to login',
  //         },
  //         swahili: {
  //           'sacco-linking-success': '',
  //         },
  //       },
  //       'via-agent': {
  //         english: {
  //           'via-agent-credit-account': 'Enter the Agent Code',
  //           'via-agent-credit-account-error':
  //             'Invalid code! Enter the agent code',
  //           'via-agent-debit-account': 'Select account to withdraw from',
  //           'via-agent-debit-account-error':
  //             'Invalid selection! select an account to withdraw from',
  //           'via-agent-amount': 'Please enter amount to withdraw via Agent',
  //           'fetch-agent-details-error':
  //             'Dear @firstname, We could not fetch the details for the Agent code @agentCode. Please try again later. Do you need another service?',
  //           'fetch-agent-details-error-error':
  //             'Invalid selection! We could not fetch the details for the Agent code @agentCode. Please try again later. Do you need another service?',
  //           'via-agent-amount-error':
  //             'Please enter amount to withdraw via Agent',
  //           'via-agent-confirm':
  //             'Confirm withdraw amount: @cardlessWithdrawAmount from account @cardlessDebitAccount via agent @agentBusinessName Float account @agentFloatAccount, Outlet: @agentOutlet',
  //           'via-agent-confirm-error':
  //             'Invalid selection! Withdraw amount: @cardlessWithdrawalAmount from account @cardlessDebitAccount via agent @agentBusinessName Float account @agentFloatAccount, Outlet: @agentOutlet',
  //         },
  //         swahili: {
  //           'via-agent-debit-account': '',
  //           'via-agent-debit-account-error': '',
  //           'via-agent-amount': '',
  //           'via-agent-amount-error': '',
  //           'via-agent-confirm': '',
  //         },
  //       },
  //       'mahitaji-advance': {
  //         english: {
  //           'mahitaji-advance-amount':
  //             'Please enter the amount to borrow ( Maximum @max-mahitaji-amount )',
  //           'mahitaji-advance-amount-error':
  //             'Invalid amount! Enter the amount to borrow ( Maximum @max-mahitaji-amount )',
  //           'mahitaji-advance-confirm':
  //             'Dear @firstname, you are about to borrow @mahitaji-advance-amount payable within a period of 1 month',
  //           'mahitaji-advance-confirm-error':
  //             'Invalid selection! You are about to borrow @mahitaji-advance-amount payable within a period of 1 month',
  //         },
  //       },
  //       'set-security-questions': {
  //         english: {
  //           'set-security-questions':
  //             'Dear customer, you have not set the security questions, would you like to set them?',
  //         },
  //         swahili: {
  //           'set-security-questions': '',
  //         },
  //       },
  //       'personal-accident': {
  //         english: {
  //           'customer-first-name': '',
  //           'customer-first-name-error': '',
  //           'customer-second-name': '',
  //           'branch-select': '',
  //           'domestic-package-name-error': '',
  //           'bancassurance-confirm': '',
  //         },
  //         swahili: {
  //           'customer-first-name': '',
  //           'customer-first-name-error': '',
  //           'customer-second-name': '',
  //           'branch-select': '',
  //           'domestic-package-name-error': '',
  //           'bancassurance-confirm': '',
  //         },
  //         french: {
  //           'customer-first-name': '',
  //           'customer-first-name-error': '',
  //           'customer-second-name': '',
  //           'branch-select': '',
  //           'domestic-package-name-error': '',
  //           'bancassurance-confirm': '',
  //         },
  //       },
  //       'fire-and-perils': {
  //         english: {
  //           'customer-first-name': '',
  //           'customer-first-name-error': '',
  //           'customer-second-name': '',
  //           'branch-select': '',
  //           'domestic-package-name-error': '',
  //           'bancassurance-confirm': '',
  //         },
  //         swahili: {
  //           'customer-first-name': '',
  //           'customer-first-name-error': '',
  //           'customer-second-name': '',
  //           'branch-select': '',
  //           'domestic-package-name-error': '',
  //           'bancassurance-confirm': '',
  //         },
  //         french: {
  //           'customer-first-name': '',
  //           'customer-first-name-error': '',
  //           'customer-second-name': '',
  //           'branch-select': '',
  //           'domestic-package-name-error': '',
  //           'bancassurance-confirm': '',
  //         },
  //       },
  //       'funds-transfer-other-accounts-page': {
  //         english: {
  //           'funds-transfer-other-accounts-page': 'Transfer funds',
  //           'funds-transfer-other-accounts-page-error':
  //             'Invalid selection! Transfer funds',
  //           'funds-transfer-wallet-to-wallet-label': 'Wallet to other Wallet',
  //           'funds-transfer-wallet-to-mno-label':
  //             'Wallet to Unregistred Account',
  //           'funds-transfer-wallet-to-savings-label': 'Wallet to Bank Account',
  //           'funds-transfer-savings-to-wallet-label': 'Bank Account to Wallet',
  //           'funds-transfer-savings-to-savings-label':
  //             'Bank Account to Bank Account',
  //           'ft-same-account-error':
  //             'You cannot transfer funds to the same account. Do you need another service?',
  //           'ft-same-account-error-error':
  //             'Invalid selection! You cannot transfer funds to the same account. Do you need another service?',
  //         },
  //         swahili: {
  //           'funds-transfer-other-accounts-page': '',
  //           'funds-transfer-other-accounts-page-error': '',
  //           'funds-transfer-wallet-to-wallet-label': '',
  //           'funds-transfer-wallet-to-mno-label': '',
  //           'funds-transfer-wallet-to-savings-label': '',
  //           'funds-transfer-savings-to-wallet-label': '',
  //           'funds-transfer-savings-to-savings-label': '',
  //           'ft-same-account-error': '',
  //           'ft-same-account-error-error': '',
  //         },
  //       },
  //       'settings-page': {
  //         english: {
  //           'settings-page': 'Please select an option below',
  //           'settings-page-error':
  //             'Invalid selection! Please select an option below',
  //           'language-change-label': 'Change Language',
  //           'pin-change-label': 'Change Pin',
  //           'email-change-label': 'Change Email',
  //         },
  //       },
  //       'sacco-linking': {
  //         english: {
  //           'sacco-linking-account': 'Please enter the Sacco Account to link',
  //           'sacco-linking-account-error':
  //             'Invalid account! Enter a valid Sacco account number to link',
  //           'sacco-linking-id': 'Please enter your National ID Number',
  //           'sacco-linking-id-error':
  //             'Invalid ID! Enter your National ID Number',
  //           'sacco-linking-confirm':
  //             'Dear @firstname, link Sacco Account @linkAccount to your @app-description Wallet',
  //           'sacco-linking-confirm-error':
  //             'Invalid selection! Link Sacco Account @linkAccount to your @app-description Wallet',
  //         },
  //         swahili: {
  //           'sacco-linking-account': '',
  //           'sacco-linking-account-error': '',
  //           'sacco-linking-id': '',
  //           'sacco-linking-id-error': '',
  //           'sacco-linking-confirm': '',
  //           'sacco-linking-confirm-error': '',
  //         },
  //       },
  //       'login-pin-change': {
  //         english: {
  //           'login-pin-change-old-pin': 'Please enter your old PIN to proceed',
  //           'login-pin-change-invalid-old-pin-error':
  //             'Invalid PIN format! Enter a valid 4 digit PIN to proceed',
  //           'login-pin-change-wrong-old-pin-error':
  //             'Wrong PINc! Enter your old PIN to proceed',
  //           'login-pin-change-new-pin': 'Please enter a new 4 digit PIN',
  //           'login-pin-change-new-pin-error':
  //             'Invalid PIN format! Enter a new 4 digit PIN',
  //           'login-pin-change-new-pin-not-last-entry-error':
  //             'You cannot set your old PIN as the new PIN! Enter a new 4 Digit PIN',
  //           'login-pin-change-new-pin-reenter':
  //             'Please re-enter your 4 digit PIN',
  //           'login-pin-change-new-pin-reenter-error':
  //             'PINS do not match! Re-enter your 4 digit PIN',
  //           'login-pin-change-confirm': 'Change PIN?',
  //           'login-pin-change-confirm-error': 'Invalid selection! Change PIN?',
  //           'login-pin-change-success':
  //             'END Dear @firstname, your PIN change request was successful. Kindly dial @app-shortcode to login.',
  //           'login-pin-change-error':
  //             'Dear @firstname, your PIN change request failed. Continue ?',
  //           'login-pin-change-error-error':
  //             'Invalid selection! Your PIN change request failed. Continue ?',
  //         },
  //         swahili: {
  //           'login-pin-change-old-pin': '',
  //           'login-pin-change-invalid-old-pin-error': '',
  //           'login-pin-change-wrong-old-pin-error': '',
  //           'login-pin-change-new-pin': '',
  //           'login-pin-change-new-pin-error': '',
  //           'login-pin-change-new-pin-not-last-entry-error': '',
  //           'login-pin-change-new-pin-reenter': '',
  //           'login-pin-change-new-pin-reenter-error': '',
  //           'login-pin-change-confirm': '',
  //           'login-pin-change-confirm-error': '',
  //           'login-pin-change-success': '',
  //           'login-pin-change-error': '',
  //           'login-pin-change-error-error': '',
  //         },
  //       },
  //       'funds-transfer-page': {
  //         english: {
  //           'funds-transfer-page': 'Please select cash transfer options below:',
  //           'funds-transfer-page-error':
  //             'Invalid selection! Select an item below',
  //           'withdraw-label': 'Withdraw from Wallet',
  //           'deposit-label': 'Deposit',
  //           'load-wallet-label': 'Load My Wallet',
  //           'funds-transfer-other-accounts-page-label': 'Bank Transfer',
  //           'funds-transfer-wallet-to-other-wallet-label':
  //             'Inter-Wallet Transfer',
  //           'funds-transfer-wallet-to-mobile-money-label': 'Transfer to Mobile',
  //           'funds-transfer-own-accounts-label': 'Transfer to own accounts',
  //           'funds-transfer-other-account-label': 'Transfer to Other account',
  //           'funds-transfer-other-bank-label': 'Transfer to other bank',
  //           'pesalink-page-label': 'Pesalink',
  //           'rtgs-label': 'RTGS',
  //           'eft-label': 'EFT',
  //           'topup-prepaid-card-label': 'Top up card',
  //         },
  //       },
  //       'create-standing-orders-page': {
  //         english: {
  //           'create-standing-orders-page': 'Send money to',
  //           'create-standing-orders-page-error':
  //             'Invalid selection! Send money to',
  //           'standing-orders-internal-label': 'Faulu Bank Account',
  //           'standing-orders-external-label': 'Other Bank Account',
  //         },
  //         swahili: {
  //           'create-standing-orders-page': '',
  //           'create-standing-orders-page-error': '',
  //           'standing-orders-internal-label': '',
  //           'standing-orders-external-label': '',
  //         },
  //       },
  //       'loan-product-no-found-error': {
  //         english: {
  //           'loan-product-no-found-error':
  //             'Dear @firstname ,no loan product found for your account',
  //           'loan-product-no-found-error-error':
  //             'Invalid selection! @firstname ,no loan product found for your account',
  //         },
  //         swahili: {
  //           'loan-product-no-found-error': '',
  //         },
  //         french: {
  //           'loan-product-no-found-error': '',
  //         },
  //       },
  //       fullstatement: {
  //         english: {
  //           'fullstatement-account': 'Please select the Account',
  //           'fullstatement-account-error':
  //             'Invalid selection ! Select the Account',
  //           'fullstatement-provide-email-account': 'Please select the Account',
  //           'fullstatement-provide-email-account-error':
  //             'Invalid selection ! Select the Account',
  //           'fullstatement-account-savings':
  //             'Please select the Faulu Bank Account',
  //           'fullstatement-provide-email': 'Please provide your email address',
  //           'fullstatement-provide-email-error':
  //             'Invalid email! Enter a valid email address',
  //           'fullstatement-account-savings-error':
  //             'Invalid selection ! Select the Faulu Bank Account',
  //           'fullstatement-period': 'Please select the Full Statement duration',
  //           'fullstatement-period-error':
  //             'Invalid selection! Select the Full Statement duration',
  //           'full-statement-success':
  //             'Dear @firstname, your full statement request was successful and will be sent to your registered email address. Do you need another service?',
  //           'full-statement-success-error':
  //             'Invalid selection! Your full statement request was successful and will be sent to your registered email address. Do you need another service?',
  //           'fullstatement-confirm':
  //             'Dear @firstname, Request for a @fullstatementPeriod Full Statement for Account @fullstatementDebitAccount',
  //           'fullstatement-confirm-error':
  //             'Invalid selection! Request for a @fullstatementPeriod  Full Statement for Account @fullstatementDebitAccount',
  //           'fullstatement-account-savings-options-error':
  //             'You currently do not have any linked accounts.Continue',
  //         },
  //         swahili: {
  //           'fullstatement-account': '',
  //           'fullstatement-account-error': '',
  //           'fullstatement-account-savings': '',
  //           'fullstatement-account-savings-error': '',
  //           'fullstatement-period': '',
  //           'fullstatement-period-error': '',
  //           'full-statement-success': '',
  //           'full-statement-success-error': '',
  //           'fullstatement-confirm': '',
  //           'fullstatement-confirm-error': '',
  //           'fullstatement-account-savings-options-error': '',
  //         },
  //       },
  //       'mpesa-alert': {
  //         english: {
  //           'mpesa-show-alert':
  //             'END Dear @firstname, please enter your MPESA PIN to proceed',
  //         },
  //       },
  //       'mpesa-b2b': {
  //         english: {
  //           'b2b-debit-account': 'Please select the account to debit',
  //           'b2b-debit-account-error':
  //             'Invalid selection! Select teh account to debit',
  //           'b2b-type': 'Lipa na Mpesa',
  //           'b2b-type-error': 'Invalid selection! Lipa na Mpesa',
  //           'b2b-till': 'Please enter the till number',
  //           'b2b-till-error': 'Invalid TIll number! Enter a valid till number',
  //           'b2b-pay-bill': 'Please enter the Business (Paybill) number',
  //           'b2b-paybill-error':
  //             'Invalid business number! Enter a valid Business (Paybill) number',
  //           'hakikisha-till-presentment-error':
  //             'Dear @firstname, We could not fetch details for the till number @tillnumber. Please try again later. Do you need another service?',
  //           'hakikisha-till-presentment-error-error':
  //             'Invalid selection! We could not fetch details for the till number @tillnumber. Please try again later. Do you need another service?',
  //           'hakikisha-paybill-presentment-error':
  //             'Dear @firstname, We could not fetch details for the paybill account @paybill. Please try again later. Do you need another service?',
  //           'hakikisha-paybill-presentment-error-error':
  //             'Invalid selection! We could not fetch details for the paybill account @paybill. Please try again later. Do you need another service?',
  //           'b2b-account': 'Please enter the user account number',
  //           'b2b-account-error':
  //             'Invalid account number! Enter a valid user account number ',
  //           'b2b-till-amount':
  //             'Please enter the amount to pay (minimum @currency-code @amount-minimum )',
  //           'b2b-till-amount-error':
  //             'Invalid amount! Enter the amount to pay (minimum @currency-code @amount-minimum )',
  //           'b2b-pay-bill-amount':
  //             'Please enter the amount to pay (minimum @currency-code @amount-minimum )',
  //           'b2b-pay-bill-amount-error':
  //             'Invalid amount! Enter the amount to pay (minimum @currency-code @amount-minimum )',
  //           'b2b-till-confirm':
  //             'Pay @currency-code . @tillmount to @merchantName Till number @tillnumber from Account @debitAccount',
  //           'b2b-till-confirm-error':
  //             'Invalid selection! Pay @currency-code . @tillmount to @merchantName to Till number @tillnumber from Account @debitAccount',
  //           'b2b-pay-bill-confirm':
  //             'Pay @currency-code . @billmount to @merchantName Paybill @paybill , user account @accountnumber from Account @debitAccount',
  //           'b2b-pay-bill-confirm-error':
  //             'Invalid selection! Pay @currency-code . @billmount to @merchantName Paybill @paybill , user account @accountnumber from Account @debitAccount',
  //           'b2b-debit-account-options-error':
  //             'Dear @firstname, you currently do not have any linked accounts. Do you need another service?',
  //           'b2b-debit-account-options-error-error':
  //             'Invalid selection! You currently do not have any linked accounts. Do you need another service?',
  //         },
  //         swahili: {
  //           'b2b-debit-account': '',
  //           'b2b-debit-account-error': '',
  //           'b2b-type': '',
  //           'b2b-type-error': '',
  //           'b2b-till': '',
  //           'b2b-till-error': '',
  //           'b2b-pay-bill': '',
  //           'b2b-paybill-error': '',
  //           'b2b-account': '',
  //           'b2b-account-error': '',
  //           'b2b-till-amount': '',
  //           'b2b-till-amount-error': '',
  //           'b2b-pay-bill-amount': '',
  //           'b2b-pay-bill-amount-error': '',
  //           'b2b-till-confirm': '',
  //           'b2b-till-confirm-error': '',
  //           'b2b-pay-bill-confirm': '',
  //           'b2b-pay-bill-confirm-error': '',
  //           'b2b-debit-account-options-error': '',
  //           'b2b-debit-account-options-error-error': '',
  //         },
  //       },
  //       'pin-change-success': {
  //         english: {
  //           'pin-change-success-alert':
  //             'END Dear @firstname, your PIN change was successful. Kindly dial @shortcode to login',
  //         },
  //       },
  //       'faulu-contact-us': {
  //         english: {
  //           'faulu-contact-us':
  //             'Contact us on: Phone: @app-contact-number \nEmail: @app-email \nWhatsapp: @app-whatsapp \nLocation: @app-location \nContinue ?',
  //           'faulu-contact-us-error':
  //             'Invalid selection!\nPhone: @app-contact-number \nEmail: @app-email \nLocation: @app-location \nContinue ?',
  //         },
  //         swahili: {
  //           'faulu-contact-us': '',
  //         },
  //       },
  //       login: {
  //         english: {
  //           login:
  //             'Welcome @firstname, to @app-description service. Please enter your 4 digit PIN; Forgot PIN? Call @contact-number.',
  //           'login-error':
  //             'Wrong PIN! @pin-trials-remaining remaining. Enter your PIN; Forgot PIN? Call @contact-number.',
  //           'invalid-pin-error':
  //             'Invalid PIN Format! Enter a valid PIN; Forgot PIN? Call @contact-number.',
  //           'wrong-pin-error':
  //             'Wrong PIN! @pin-trials-remaining remaining. Enter your PIN; Forgot PIN? Call @contact-number.',
  //           'invalid-pin-length-error':
  //             'Invalid PIN length! Enter your 4 Digit PIN; Forgot PIN? Call @contact-number.',
  //         },
  //       },
  //       'otp-expired': {
  //         english: {
  //           'otp-expired':
  //             'END Dear @firstname, your One Time Pin has expired. Kindly contact @app-contact-name on @app-contact-number for further assistance',
  //         },
  //         swahili: {
  //           'otp-expired': '',
  //         },
  //       },
  //       'atm-cards-page': {
  //         english: {
  //           'atm-cards-page': 'Please select an option below',
  //           'atm-cards-page-error':
  //             'Invalid selection ! select an option below',
  //           'request-atm-label': 'Request for a new Card',
  //           'replace-atm-label': 'Replace a Card',
  //           'block-atm-label': 'Block a card',
  //           'unblock-atm-label': 'Unblock a Card',
  //           'set-atm-limits-label': 'Set Card limits',
  //         },
  //         swahili: {
  //           'atm-cards-page': '',
  //           'atm-cards-page-error': '',
  //           'request-atm-label': '',
  //           'replace-atm-label': '',
  //           'block-atm-label': '',
  //           'unblock-atm-label': '',
  //           'set-atm-limits-label': '',
  //         },
  //       },
  //       'buy-airtime': {
  //         english: {
  //           'buy-airtime-provider': 'Please select an airtime provider',
  //           'buy-airtime-provider-error':
  //             'Invalid selection! Select an airtime provider',
  //           'buy-airtime-account-type':
  //             'Please select the account to buy airtime for',
  //           'buy-airtime-account-type-error':
  //             'Invalid selection! Please select the account to buy airtime for',
  //           'buy-airtime-credit-account':
  //             'Please enter the @airtimeProvider phone number in the format 07xxxxxxxx',
  //           'buy-airtime-credit-account-error':
  //             'Invalid phone Number! Enter a valid @airtimeProvider phone number in the format 07xxxxxxxx',
  //           'buy-airtime-debit-account': 'Please select the account to debit',
  //           'buy-airtime-debit-account-error':
  //             'Invalid selection! Select the account to debit',
  //           'buy-airtime-amount':
  //             'Please enter the amount of airtime to purchase (minimum @currency-code @amount-minimum )',
  //           'buy-airtime-amount-error':
  //             'Invalid amount! Enter a valid amount of airtime to purchase (minimum @currency-code @amount-minimum )',
  //           'buy-airtime-confirm':
  //             'Dear @firstname, purchase @airtimeProvider airtime worth @currency-code @airtimeAmount for @airtimeCreditAccount from @airtimeDebitAccount',
  //           'buy-airtime-confirm-error':
  //             'Invalis selection! Purchase @airtimeProvider airtime worth @currency-code @airtimeAmount for @airtimeCreditAccount from @airtimeDebitAccount',
  //           'buy-airtime-debit-account-options-error':
  //             'Dear @firstname, you currently do not have any linked Savings accounts.Do you want to do another transaction',
  //           'buy-airtime-debit-account-options-error-error':
  //             'Invalid selection ! You currently do not have any linked Savings accounts.Do you want to do another transaction',
  //         },
  //       },
  //       'motor-insurance': {
  //         english: {
  //           'customer-first-name': '',
  //           'customer-first-name-error': '',
  //           'customer-second-name': '',
  //           'branch-select': '',
  //           'domestic-package-name-error': '',
  //           'bancassurance-confirm': '',
  //         },
  //         swahili: {
  //           'customer-first-name': '',
  //           'customer-first-name-error': '',
  //           'customer-second-name': '',
  //           'branch-select': '',
  //           'domestic-package-name-error': '',
  //           'bancassurance-confirm': '',
  //         },
  //         french: {
  //           'customer-first-name': '',
  //           'customer-first-name-error': '',
  //           'customer-second-name': '',
  //           'branch-select': '',
  //           'domestic-package-name-error': '',
  //           'bancassurance-confirm': '',
  //         },
  //       },
  //       'pesalink-to-card': {
  //         english: {
  //           'pesalink-to-card-debit-account':
  //             'Please select the account to send from',
  //           'pesalink-to-card-debit-account-error':
  //             'Invalid selection! Select the account to send from',
  //           'pesalink-to-card-credit-account':
  //             'Please enter the card number to send to',
  //           'pesalink-to-card-credit-account-error':
  //             'Invalid card number! Enter the card number to send to',
  //           'pesalink-to-card-amount':
  //             'Please enter the amount to send  (minimum @currency-code @amount-minimum )',
  //           'pesalink-to-card-amount-error':
  //             'Invalid amount! Enter a valid amount to send  (minimum @currency-code @amount-minimum )',
  //           'pesalink-to-card-reason': 'Please enter the reason for payment',
  //           'pesalink-to-card-reason-error':
  //             'Invalid entry! Enter the reason for payment',
  //           'pesalink-to-card-confirm':
  //             'Send @currency-code  @pesalinkAmount to card @pesalinkCreditAccount from @pesalinkDebitAccount via PESALINK',
  //           'pesalink-to-card-confirm-error':
  //             'Invalid selection! send @currency-code  @pesalinkAmount to  @pesalinkCreditAccount from  @pesalinkDebitAccount via PESALINK',
  //           'pesalink-to-card-debit-account-options-error':
  //             'You currently do not have any linked accounts.Do you need another service?',
  //           'pesalink-to-card-debit-account-options-error-error':
  //             'Invalid selection! You currently do not have any linked accounts.Do you need another service?',
  //         },
  //         swahili: {
  //           'pesalink-to-card-debit-account': '',
  //           'pesalink-to-card-debit-account-error': '',
  //           'pesalink-to-card-credit-account': '',
  //           'pesalink-to-card-credit-account-error': '',
  //           'pesalink-to-card-amount': '',
  //           'pesalink-to-card-amount-error': '',
  //           'pesalink-to-card-reason': '',
  //           'pesalink-to-card-reason-error': '',
  //           'pesalink-to-card-confirm': '',
  //           'pesalink-to-card-confirm-error': '',
  //           'pesalink-to-card-debit-account-options-error': '',
  //           'pesalink-to-card-debit-account-options-error-error': '',
  //         },
  //       },
  //       disabled: {
  //         english: {
  //           disabled: '',
  //         },
  //       },
  //       'universal-login': {
  //         english: {
  //           'universal-login-pin':
  //             'Welcome to @app-description. Please enter your 4 digit PIN to proceed.',
  //           'universal-login-pin-error':
  //             'Invalid PIN! Enter your 4 Digit PIN to proceed.',
  //           'universal-invalid-pin':
  //             'Invalid PIN. Please enter your 4 digit PIN to proceed.',
  //           'universal-invalid-pin-error':
  //             'Invalid PIN! Enter your 4 Digit PIN to proceed.',
  //         },
  //         swahili: {
  //           'universal-login-pin': '',
  //           'universal-login-pin-error': '',
  //           'universal-invalid-pin': '',
  //           'universal-invalid-pin-error': '',
  //         },
  //         french: {
  //           'universal-login-pin':
  //             'Bienvenue dans @app-description. Veuillez saisir votre code à 4 chiffres pour poursuivre.',
  //           'universal-login-pin-error':
  //             'Code invalide ! Saisissez votre code à 4 chiffres pour poursuivre.',
  //           'universal-invalid-pin':
  //             'Code invalide. Veuillez saisir votre code à 4 chiffres pour poursuivre.',
  //           'universal-invalid-pin-error':
  //             'Code invalide! Saisissez votre code à 4 chiffres pour poursuivre.',
  //         },
  //       },
  //       'funds-transfer-wallet-to-wallet': {
  //         english: {
  //           'ft-wallet-to-wallet-credit-account':
  //             'Please enter the Account to transfer to in the format 07xxxxxxxx',
  //           'ft-wallet-to-wallet-credit-account-error':
  //             'Invalid wallet account! Enter a valid wallet Account to transfer to in the format 07xxxxxxxx',
  //           'ft-wallet-to-wallet-amount':
  //             'Please enter the amount to tranfer (minimum @currency-code @amount-minimum )',
  //           'ft-wallet-to-wallet-amount-error':
  //             'Invalid amount! Please enter a valid amount to tranfer ( minimum @currency-code @amount-minimum  )',
  //           'ft-wallet-to-wallet-confirm':
  //             'Dear @firstname, Transfer @currency-code . @fundsTransferAmount to @creditAccName, Wallet @fundsTransferCreditAccount',
  //           'ft-wallet-to-wallet-confirm-error':
  //             'Invalid selection! Transfer @currency-code . @fundsTransferAmount to @creditAccName, Wallet @fundsTransferCreditAccount',
  //         },
  //         swahili: {
  //           'ft-wallet-to-wallet-credit-account': '',
  //           'ft-wallet-to-wallet-credit-account-error': '',
  //           'ft-wallet-to-wallet-amount': '',
  //           'ft-wallet-to-wallet-amount-error': '',
  //           'ft-wallet-to-wallet-confirm': '',
  //           'ft-wallet-to-wallet-confirm-error': '',
  //         },
  //       },
  //       'lock-savings-open-account': {
  //         english: {
  //           'lock-savings-open-debit-account':
  //             'Please select the Savings Tier:',
  //           'lock-savings-open-debit-account-error':
  //             'Invalid selection! Select the Savings Tier:',
  //           'lock-savings-open-amount':
  //             'Please enter the target Amount to Save ( min @lock-savings-minimum-amount)',
  //           'lock-savings-open-amount-error':
  //             'Invalid amount! Enter the target Amount to Save ( min @lock-savings-minimum-amount)',
  //           'lock-savings-open-period': 'Please select the Lock savings period',
  //           'lock-open-period-error':
  //             'Invalid selection! Select the Lock savings period',
  //           'lock-savings-open-deposit':
  //             'Please enter an amount to deposit ( min @lock-savings-min-deposit-amount)',
  //           'lock-savings-open-deposit-error':
  //             'Invalid amount!  Enter an amount to deposit ( min @lock-savings-min-deposit-amount)',
  //           'lock-savings-open-confirm':
  //             'Dear @firstname, Open a 52 weeks Savings Account.',
  //           'lock-savings-open-confirm-error':
  //             'Invalid selection! Open a 52 weeks Savings Account.',
  //           'lock-savings-existing-account-error':
  //             'Dear @firstname, you already have an existing Savings Account. Do you need another service?',
  //           'lock-savings-existing-account-error-error':
  //             'Invalid selection! You already have an existing Savings Account. Do you need another service?',
  //           'lock-savings-open-debit-account-options-error':
  //             'Dear @firstname, this service is currently unavailable. Please try again later. Do you need another service?',
  //           'lock-savings-open-debit-account-options-error-error':
  //             'Invalid selection! This service is currently unavailable. Please try again later. Do you need another service?',
  //         },
  //         swahili: {
  //           'lock-savings-open-debit-account': '',
  //           'lock-savings-open-debit-account-error': '',
  //           'lock-savings-open-amount': '',
  //           'lock-savings-open-amount-error': '',
  //           'lock-savings-open-period': '',
  //           'lock-open-period-error': '',
  //           'lock-savings-open-deposit': '',
  //           'lock-savings-open-deposit-error': '',
  //           'lock-savings-open-confirm': '',
  //           'lock-savings-open-confirm-error': '',
  //           'lock-savings-existing-account-error': '',
  //           'lock-savings-existing-account-error-error': '',
  //           'lock-savings-open-debit-account-options-error': '',
  //           'lock-savings-open-debit-account-options-error-error': '',
  //         },
  //       },
  //       'pin-change-error': {
  //         english: {
  //           'pin-change-error':
  //             'END Dear @firstname, your PIN change request failed. Kindly dial @app-shortcode to retry.',
  //         },
  //         swahili: {
  //           'pin-change-error': '',
  //         },
  //       },
  //       'standing-orders-amend': {
  //         english: {
  //           'so-amend-debit-account': 'Please select an Account',
  //           'so-amend-debit-account-error':
  //             'Invalid selection! Select an Account',
  //           'standing-orders-lookup-error':
  //             'Dear @firstname, no standing orders were found for the account @soDebitAccount . Do you need another service?',
  //           'standing-orders-lookup-error-error':
  //             'Invalid selection! No standing orders were found for the account @soDebitAccount . Do you need another service?',
  //           'so-amend-id': 'Please select the standing Order',
  //           'so-amend-id-error': 'Invalid Selection! Select the standing Order',
  //           'so-amend-frequency': 'Please select Frequency below',
  //           'so-amend-frequency-error':
  //             'Invalid selection! Select Frequency below',
  //           'so-amend-instruction': 'Please enter the purpose',
  //           'so-amend-instruction-error': 'Invalid entry! Enter the purpose',
  //           'so-amend-amount':
  //             'Please enter the new amount to transfer ( current @currency-code  @so-current-amount )',
  //           'so-amend-amount-error':
  //             'Invalid amount! Enter the new amount to transfer ( current @currency-code  @so-current-amount ',
  //           'so-amend-end-date':
  //             'Please enter the new end date in the format YYYY-MM-DD e.g 2021-01-26',
  //           'so-amend-end-date-error':
  //             'Invalid end date! Enter the new end date in the format YYYY-MM-DD e.g 2021-01-26',
  //           'so-amend-confirm':
  //             'Set Standing order @soId to end on @soAmendEndDate ',
  //           'so-amend-confirm-error':
  //             'Invalid selection! set Standing order @soId to end on @soAmendEndDate ',
  //           'so-amend-debit-account-options-error':
  //             'You currently do not have any linked accounts. Do you need another service?',
  //           'so-amend-debit-account-options-error-error':
  //             'Invalid selection! You currently do not have any linked accounts. Do you need another service?',
  //           'standing-orders-options-error':
  //             'You currently do not have any standing orders on account @soDebitAccount . Do you need another service?',
  //           'standing-orders-options-error-error':
  //             'Invalid selection! you currently do not have any standing orders on account @soDebitAccount . Do you need another service?',
  //         },
  //         swahili: {
  //           'so-amend-debit-account': '',
  //           'so-amend-debit-account-error': '',
  //           'standing-orders-lookup-error': '',
  //           'standing-orders-lookup-error-error': '',
  //           'so-amend-id': '',
  //           'so-amend-id-error': '',
  //           'so-amend-amount': '',
  //           'so-amend-amount-error': '',
  //           'so-amend-end-date': '',
  //           'so-amend-end-date-error': '',
  //           'so-amend-confirm': '',
  //           'so-amend-confirm-error': '',
  //           'so-amend-debit-account-options-error': '',
  //           'so-amend-debit-account-options-error-error': '',
  //           'standing-orders-options-error': '',
  //           'standing-orders-options-error-error': '',
  //         },
  //       },
  //       'merchant-payment': {
  //         english: {
  //           'merchant-payment-code': 'Please enter the merchant code:',
  //           'merchant-payment-code-error':
  //             'Invalid code! Enter a valid merchant code:',
  //           'merchant-payment-presentment-account-error':
  //             'Dear @firstname, we are unable to fetch the merchant details for Account @merchantCode. Please try again later. Do you need another service?',
  //           'merchant-payment-presentment-account-error-error':
  //             'Invalid selection! We are unable to fetch the merchant details for Account @merchantCode. Please try again later. Do you need another service?',
  //           'merchant-payment-accounts':
  //             'Please select the account to pay from',
  //           'merchant-payment-accounts-error':
  //             'Invalid selection! Select the account to pay from',
  //           'merchant-payment-debit-account': 'Please select the debit account',
  //           'merchant-payment-debit-account-error':
  //             'Invalid selection! Select the debit account',
  //           'merchant-payment-amount': 'Please enter amount to pay',
  //           'merchant-payment-amount-error':
  //             'Invalid amount! Enter amount to pay',
  //           'merchant-payment-confirm':
  //             'Pay @merchantAmount, Merchant Name: @merchantName from Account @merchantPayDebitAcc, Merchant code: @merchantCode',
  //           'merchant-payment-confirm-error':
  //             'Invalid selection! Pay @merchantAmount, Merchant Name: @merchantName from Account @merchantPayDebitAcc, Merchant code: @merchantCode',
  //           'mpesa-merchant-amount': 'Please enter amount to pay',
  //           'mpesa-merchant-amount-error':
  //             'Invalid amount! Enter amount to pay',
  //           'mpesa-merchant-confirm':
  //             'Pay @merchantAmount, Merchant Name: @merchantName from MPESA @merchantPayDebitAcc, Merchant code: @merchantCode',
  //           'mpesa-merchant-confirm-error':
  //             'Invalid selection! Pay @merchantAmount, Merchant Name: @merchantName from MPESA @merchantPayDebitAcc, Merchant code: @merchantCode',
  //           'merchant-payment-account-error':
  //             'Dear @firstname, You currently do not have any linked accounts. Do you need another service?',
  //           'merchant-payment-account-error-error':
  //             'Dear @firstname, You currently do not have any linked accounts. Do you need another service?',
  //           'mpesa-merchant-payment-success':
  //             'END Your request has been successfully received. \nProceed to enter your M-PESA PIN',
  //         },
  //         swahili: {
  //           'merchant-payment-code': '',
  //           'merchant-payment-code-error': '',
  //           'merchant-payment-presentment-account-error': '',
  //           'merchant-payment-presentment-account-error-error': '',
  //           'merchant-payment-accounts': '',
  //           'merchant-payment-accounts-error': '',
  //           'merchant-payment-debit-account': '',
  //           'merchant-payment-debit-account-error': '',
  //           'merchant-payment-amount': '',
  //           'merchant-payment-amount-error': '',
  //           'merchant-payment-confirm': '',
  //           'merchant-payment-confirm-error': '',
  //           'mpesa-merchant-amount': '',
  //           'mpesa-merchant-amount-error': '',
  //           'mpesa-merchant-confirm': '',
  //           'mpesa-merchant-confirm-error': '',
  //           'merchant-payment-account-error': '',
  //           'merchant-payment-account-error-error': '',
  //           'mpesa-merchant-payment-success': '',
  //         },
  //       },
  //       'withdraw-from-wallet-to-mobile': {
  //         english: {
  //           'withdraw-from-wallet-to-mobile-amount':
  //             'Please enter the amount to withdraw(minimum @currency-code @amount-minimum )',
  //           'withdraw-from-wallet-to-mobile-amount-error':
  //             'Invalid amount! Please enter the amount to withdraw(minimum @currency-code @amount-minimum )',
  //           'withdraw-from-wallet-to-mobile-confirm':
  //             'Dear @firstname, you are about to withdraw @currency-code @withdrawAmount from Account @withdrawDebitAccount to MPESA Account @msisdn',
  //           'withdraw-from-wallet-to-mobile-confirm-error':
  //             'Invalid selection! You are about to withdraw @currency-code @withdrawAmount from Account @withdrawDebitAccount to MPESA Account @msisdn',
  //           'withdraw-from-wallet-to-mobile-type':
  //             'Please select options below',
  //           'withdraw-from-wallet-to-mobile-type-error':
  //             'Invalid selection! Please select options below',
  //           'withdraw-from-wallet-to-mobile-other-number':
  //             'Please enter the phone number in the format 07xxxxxxxx',
  //           'withdraw-from-wallet-to-mobile-other-number-error':
  //             'Invalid phone Number! Enter a valid phone number in the format 07xxxxxxxx',
  //         },
  //       },
  //       registration: {
  //         english: {
  //           registration: 'Welcome to the @app-contact-name :',
  //           'registration-activate-error':
  //             'Invalid selection! \nWelcome to the @app-contact-name :',
  //           'registration-fullname': 'Please enter your Full Names',
  //           'registration-fullname-error':
  //             'Invalid name! \nEnter your Full Names',
  //           'registration-id-number': 'Please enter your national ID number',
  //           'registration-id-number-error':
  //             'Invalid ID number! \nEnter your national ID number',
  //           'registration-email':
  //             'Please enter a valid email address ( enter s to skip )',
  //           'registration-email-error':
  //             'Invalid email address! \nEnter a valid email( enter s to skip )',
  //           'registration-confirm':
  //             'Having read the terms and conditions(https://www.mbanking/terms), do you accept to perform an activation?',
  //           'registration-confirm-error':
  //             'Invalid selection! \nHaving read the terms and conditions, do you accept to perform a self registration.',
  //         },
  //       },
  //       'pesalink-to-ecitizen': {
  //         english: {
  //           'ecitizen-paybill-number': 'Please enter E-Citizen Paybill Number',
  //           'ecitizen-paybill-number-error':
  //             'Invalid Paybill Number! Please enter E-Citizen Paybill Number',
  //           'ecitizen-reference-number':
  //             'Please enter the E-citizen Reference Number:',
  //           'ecitizen-reference-number-error':
  //             'Invalid input! Please enter the E-citizen Reference Number:',
  //           'pesalink-to-ecitizen-debit-account':
  //             'Please select the account to send from',
  //           'pesalink-to-ecitizen-debit-account-error':
  //             'Invalid selection! Select the account to send from',
  //           'pesalink-to-ecitizen-lookup-banks':
  //             'Please select the Bank to send to',
  //           'pesalink-to-ecitizen-lookup-banks-error':
  //             'Invalid selection! Select the Bank to send to',
  //           'pesalink-to-ecitizen-amount':
  //             'Please enter the amount to send (minimum @currency-code @amount-minimum )',
  //           'pesalink-to-ecitizen-success':
  //             'Dear @firstname, your request has been recieved and is being processed. You will receive an SMS response shortly. Continue ?',
  //           'pesalink-to-ecitizen-success-error':
  //             'Invalid selection! Your request has been recieved and is being processed. You will receive an SMS response shortly. Continue ?',
  //           'pesalink-to-ecitizen-amount-error':
  //             'Invalid amount! Enter a valid amount to send (minimum @currency-code @amount-minimum )',
  //           'pesalink-to-ecitizen-confirm':
  //             'Send @currency-code  @amount to\nPaybill: @ecitizenpaybill \nRef No. @reference\nFrom  @debitAccount via PESALINK',
  //           'pesalink-to-ecitizen-reference-error':
  //             'Dear @firstname, Validation failed or the Reference has already been settled. Do you need another service?',
  //           'pesalink-to-ecitizen-reference-error-error':
  //             'Invalid selection! Validation failed or the Reference has already been settled. Do you need another service?',
  //           'pesalink-to-ecitizen-confirm-error':
  //             'Invalid selection! Send @currency-code  @amount to\nPaybill: @ecitizenpaybill\nRef No. @reference\nFrom  @debitAccount via PESALINK',
  //           'pesalink-to-ecitizen-debit-account-options-error':
  //             'Dear  @firstname, you currently do not have any linked accounts.Do you need another service?',
  //           'pesalink-to-ecitizen-debit-account-options-error-error':
  //             'Invalid selection! You currently do not have any linked accounts.Do you need another service?',
  //           'pesalink-to-ecitizen-lookup-error':
  //             'No Bank Accounts are associated with Paybill Number: @ecitizenpaybill. Do you need another service?',
  //           'pesalink-to-ecitizen-lookup-error-error':
  //             'Invalid selection! No Bank Accounts are associated with Paybill Number: @ecitizenpaybill. Do you need another service?',
  //           'pesalink-to-ecitizen-lookup-banks-options-error':
  //             'No Bank Accounts that are PESALINK enabled are associated with Paybill: @ecitizenpaybill . Do you need another service?',
  //           'pesalink-to-ecitizen-lookup-banks-options-error-error':
  //             'Invalid selection! No Bank Accounts that are PESALINK enabled are associated with Paybill: @ecitizenpaybill. Do you need another service?',
  //         },
  //         swahili: {
  //           'ecitizen-paybill-number': '',
  //           'ecitizen-paybill-number-error': '',
  //           'ecitizen-reference-number': '',
  //           'ecitizen-reference-number-error': '',
  //           'pesalink-to-ecitizen-debit-account': '',
  //           'pesalink-to-ecitizen-debit-account-error': '',
  //           'pesalink-to-ecitizen-lookup-banks': '',
  //           'pesalink-to-ecitizen-lookup-banks-error': '',
  //           'pesalink-to-ecitizen-amount': '',
  //           'pesalink-to-ecitizen-success': '',
  //           'pesalink-to-ecitizen-success-error': '',
  //           'pesalink-to-ecitizen-amount-error': '',
  //           'pesalink-to-ecitizen-confirm': '',
  //           'pesalink-to-ecitizen-reference-error': '',
  //           'pesalink-to-ecitizen-reference-error-error': '',
  //           'pesalink-to-ecitizen-confirm-error': '',
  //           'pesalink-to-ecitizen-debit-account-options-error': '',
  //           'pesalink-to-ecitizen-debit-account-options-error-error': '',
  //           'pesalink-to-ecitizen-lookup-error': '',
  //           'pesalink-to-ecitizen-lookup-error-error': '',
  //           'pesalink-to-ecitizen-lookup-banks-options-error': '',
  //           'pesalink-to-ecitizen-lookup-banks-options-error-error': '',
  //         },
  //       },
  //       'pesalink-page': {
  //         english: {
  //           'pesalink-page': '',
  //           'pesalink-page-error': '',
  //           'pesalink-to-phone-label': '',
  //           'pesalink-to-bank-label': '',
  //           'pesalink-to-card-label': '',
  //         },
  //         swahili: {
  //           'pesalink-page': '',
  //           'pesalink-page-error': '',
  //           'pesalink-to-phone-label': '',
  //           'pesalink-to-bank-label': '',
  //           'pesalink-to-card-label': '',
  //         },
  //         french: {
  //           'pesalink-page': '',
  //           'pesalink-page-error': '',
  //           'pesalink-to-phone-label': '',
  //           'pesalink-to-bank-label': '',
  //           'pesalink-to-card-label': '',
  //         },
  //       },
  //       'transaction-login': {
  //         english: {
  //           'transaction-login':
  //             ' Enter your 4 digit PIN to complete the transaction ( @transaction-pin-trials-remaining trials left )',
  //           'invalid-pin-error':
  //             'Invalid PIN! Enter your 4 digit PIN to complete the transaction ( @transaction-pin-trials-remaining trials left! )',
  //         },
  //         swahili: {
  //           'transaction-login': '',
  //           'invalid-pin-error': '',
  //         },
  //       },
  //       'coming-soon': {
  //         english: {
  //           'coming-soon': '',
  //         },
  //       },
  //       'last-expense': {
  //         english: {
  //           'customer-first-name': '',
  //           'customer-first-name-error': '',
  //           'customer-second-name': '',
  //           'branch-select': '',
  //           'domestic-package-name-error': '',
  //           'bancassurance-confirm': '',
  //         },
  //         swahili: {
  //           'customer-first-name': '',
  //           'customer-first-name-error': '',
  //           'customer-second-name': '',
  //           'branch-select': '',
  //           'domestic-package-name-error': '',
  //           'bancassurance-confirm': '',
  //         },
  //         french: {
  //           'customer-first-name': '',
  //           'customer-first-name-error': '',
  //           'customer-second-name': '',
  //           'branch-select': '',
  //           'domestic-package-name-error': '',
  //           'bancassurance-confirm': '',
  //         },
  //       },
  //       'core-account-opening': {
  //         english: {
  //           'core-account-type': 'Please select the Account type',
  //           'core-account-type-error':
  //             'Invalid selection! Select the Account type',
  //           'cbu-dream-account':
  //             'Please enter the initial amount to deposit ( minimum @currency-code @core-account-minimum )',
  //           'cbu-dream-account-error':
  //             'Invalid amount! Please enter the initial amount to deposit ( minimum @currency-code @core-account-minimum )',
  //           'personal-current-account':
  //             'Please enter the initial amount to deposit ( minimum @currency-code @personal-account-minimum-amount )',
  //           'personal-current-account-error':
  //             'Invalid amount! Please enter the initial amount to deposit ( minimum @currency-code @personal-account-minimum-amount )',
  //           'my-saver-account':
  //             'Please enter the initial amount to deposit ( minimum @currency-code @core-account-minimum )',
  //           'my-saver-account-error':
  //             'Invalid amount! Please enter the initial amount to deposit ( minimum @currency-code @core-account-minimum )',
  //           'core-account-opening-search':
  //             'Please enter the name of your domicile branch in order to conduct a search',
  //           'core-account-opening-result':
  //             'Please select a domicile branch below',
  //           'core-account-opening-result-error':
  //             'Invalid selection! Select a domicile branch below',
  //           'result-limit-exceeded-error':
  //             'Too many results. Please enter the full name of the domicile branch separated by a dot ( . ) to narrow the results',
  //           'core-account-currency':
  //             'Please select the currency of the account',
  //           'core-account-currency-error':
  //             'Invalid selection! Select the currency of the account',
  //           'core-account-debit-account': 'Please select the Account to debit',
  //           'core-account-debit-account-error':
  //             'Invalid selection! Select the Account to debit',
  //           'core-account-confirm':
  //             'You are about to open a @coreAccountType @coreAccountCurrency account. Initial deposit is @currency-code  @coreAccountAmount from Account @coreAccountDebitAccount',
  //           'core-account-confirm-error':
  //             'Invalid selection! You are about to open a @coreAccountType @coreAccountCurrency account. Initial deposit is @currency-code  @coreAccountAmount from Account @coreAccountDebitAccount',
  //           'core-account-type-options-error':
  //             'There are currently no Faulu Bank Products that can be activated via mobile. Do you need another service?',
  //           'core-account-type-options-error-error':
  //             'Invalid selection! There are currently no Faulu Bank Products that can be activated via mobile. Continue',
  //           'core-account-debit-account-options-error':
  //             'You currently do not have any linked accounts. Do you need another service?',
  //           'core-account-debit-account-options-error-error':
  //             'Invalid selection! You currently do not have any linked accounts. Do you need another service?',
  //         },
  //         swahili: {
  //           'core-account-type': '',
  //           'core-account-type-error': '',
  //           'cbu-dream-account': '',
  //           'cbu-dream-account-error': '',
  //           'personal-current-account': '',
  //           'personal-current-account-error': '',
  //           'my-saver-account': '',
  //           'my-saver-account-error': '',
  //           'core-account-opening-search': '',
  //           'core-account-opening-result': '',
  //           'core-account-opening-result-error': '',
  //           'no-results-error': '',
  //           'result-limit-exceeded-error': '',
  //           'core-account-currency': '',
  //           'core-account-currency-error': '',
  //           'core-account-debit-account': '',
  //           'core-account-debit-account-error': '',
  //           'core-account-confirm': '',
  //           'core-account-confirm-error': '',
  //           'core-account-type-options-error': '',
  //           'core-account-type-options-error-error': '',
  //           'core-account-debit-account-options-error': '',
  //           'core-account-debit-account-options-error-error': '',
  //         },
  //       },
  //       'jamii-telkom': {
  //         english: {
  //           'jamii-telkom-credit-account': '',
  //           'jamii-telkom-credit-account-error': '',
  //           'jamii-telkom-debit-account': '',
  //           'jamii-telkom-debit-account-error': '',
  //           'jamii-telkom-amount': '',
  //           'jamii-telkom-amount-error': '',
  //           'jamii-telkom-confirm': '',
  //           'jamii-telkom-debit-account-options-error': '',
  //         },
  //       },
  //       'fixed-deposits': {
  //         english: {
  //           'fixed-deposits-amount':
  //             'Enter amount to deposit ( Minimum @openiningBalance )',
  //           'fixed-deposits-amount-error':
  //             'Invalid amount! Enter amount to deposit ( Minimum @openiningBalance )',
  //           'fetch-account-products-error':
  //             'Dear @firstname, We could not fetch the minimum opening balance. Please try again later. Do you need another service?',
  //           'fixed-deposits-views': 'Please select an option below',
  //           'fixed-deposits-views-error':
  //             'Invalid selecton! Please select an option below',
  //           'customer-fixed-deposits-accounts':
  //             'Fixed Deposit Accounts:\n @fixed-deposit-accounts Proceed?',
  //           'customer-fixed-deposits-accounts-error':
  //             'Invalid selection!Fixed Deposit Accounts:\n @fixed-deposit-accounts Proceed?',
  //           'fetch-account-products-error-error':
  //             'Invalid selection! We could not fetch the minimum opening balance. Please try again later. Do you need another service?',
  //           'fixed-deposits-periods': 'Please select the period',
  //           'fixed-deposits-periods-error':
  //             'Invalid selection! select the period',
  //           'fixed-deposits-account': 'Please select the account to debit',
  //           'fixed-deposits-account-error':
  //             'Invalid selection! select the account to debit',
  //           'fixed-deposits-confirm':
  //             'Dear @firstname, confirm to deposit @amount for a period of @period months, debit account @debitAccount',
  //           'fixed-deposits-confirm-error':
  //             'Invalid selection! Confirm to deposit @amount for a period of @period months, debit account @debitAccount',
  //         },
  //       },
  //       'faulu-selfReg-page': {
  //         english: {
  //           'faulu-selfReg-page': 'Register account if a new customer',
  //           'faulu-selfReg-page-error':
  //             'Invalid selection, please select an option below',
  //           'Salary-account-label': 'Salary account',
  //           'savings-account-label': 'Savings account',
  //         },
  //         swahili: {
  //           'faulu-selfReg-page': '',
  //           'faulu-selfReg-page-error': '',
  //           'Salary-account-label': '',
  //           'savings-account-label': '',
  //         },
  //         french: {
  //           'faulu-selfReg-page': '',
  //           'faulu-selfReg-page-error': '',
  //           'Salary-account-label': '',
  //           'savings-account-label': '',
  //         },
  //       },
  //       'withdraw-page': {
  //         english: {
  //           'withdraw-page': 'Please select an item below',
  //           'withdraw-page-error':
  //             'Invalid selection! Please select an item below',
  //           'withdraw-label': 'Withdraw',
  //           'withdraw-from-wallet-to-mobile-label': 'Withdraw From Wallet',
  //         },
  //       },
  //       'cheques-page': {
  //         english: {
  //           'cheques-page': 'Please select an option below',
  //           'cheques-page-error': 'Invalid selection ! select an option below',
  //           'request-cheque-book-label': 'Request for a Cheque Book',
  //           'bankers-cheque-request-label': 'Request Bankers Cheque',
  //           'stop-cheque-label': 'Stop a Cheque',
  //           'confirm-cheque-label': 'Confirm a Cheque',
  //         },
  //         swahili: {
  //           'cheques-page': '',
  //           'cheques-page-error': '',
  //           'request-cheque-book-label': '',
  //           'stop-cheque-label': '',
  //           'confirm-cheque-label': '',
  //         },
  //       },
  //       'apply-loan-page': {
  //         english: {
  //           'apply-loan-page':
  //             'Welcome to faulu loans services,select loan below',
  //           'apply-loan-page-error': 'Invalid selection, select option below',
  //           'Merchant-loan-label': 'Merchant loan',
  //           'okoa-mteja-label': 'Okoa mteja',
  //         },
  //         swahili: {
  //           'apply-loan-page': '',
  //           'apply-loan-page-error': '',
  //           'Merchant-loan-label': '',
  //           'okoa-mteja-label': '',
  //         },
  //         french: {
  //           'apply-loan-page': '',
  //           'apply-loan-page-error': '',
  //           'Merchant-loan-label': '',
  //           'okoa-mteja-label': '',
  //         },
  //       },
  //       'chap-chap-loan-application': {
  //         english: {},
  //       },
  //       'standing-orders-cancel': {
  //         english: {
  //           'so-cancel-debit-account': 'Please select an Account',
  //           'so-cancel-debit-account-error':
  //             'Invalid selection! Select an Account',
  //           'standing-orders-lookup-error':
  //             'No standing orders were found for the account @soDebitAccount . Do you need another service?',
  //           'standing-orders-lookup-error-error':
  //             'Invalid selection! No standing orders were found for the account @soDebitAccount . Do you need another service?',
  //           'so-cancel-id': 'Please select the standing Order',
  //           'so-cancel-id-error':
  //             'Invalid Selection! Select the standing Order',
  //           'so-cancel-confirm': 'Cancel Standing order @soId',
  //           'so-cancel-confirm-error':
  //             'Invalid selection! Cancel Standing order',
  //           'so-cancel-debit-account-options-error':
  //             'You currently do not have any linked accounts. Do you need another service?',
  //           'so-cancel-debit-account-options-error-error':
  //             'Invalid selection! You currently do not have any linked accounts. Do you need another service?',
  //           'standing-orders-options-error':
  //             'You currently do not have any standing orders on account @soDebitAccount . Do you need another service?',
  //           'standing-orders-options-error-error':
  //             'Invalid selection! you currently do not have any standing orders on account @soDebitAccount . Do you need another service?',
  //         },
  //         swahili: {
  //           'so-cancel-debit-account': '',
  //           'so-cancel-debit-account-error': '',
  //           'standing-orders-lookup-error': '',
  //           'standing-orders-lookup-error-error': '',
  //           'so-cancel-id': '',
  //           'so-cancel-id-error': '',
  //           'so-cancel-confirm': '',
  //           'so-cancel-confirm-error': '',
  //           'so-cancel-debit-account-options-error': '',
  //           'so-cancel-debit-account-options-error-error': '',
  //           'standing-orders-options-error': '',
  //           'standing-orders-options-error-error': '',
  //         },
  //       },
  //       'pesalink-to-bank': {
  //         english: {
  //           'pesalink-to-bank-debit-account':
  //             'Please select the account to send from',
  //           'pesalink-to-bank-debit-account-error':
  //             'Invalid selection! Select the account to send from',
  //           'pesalink-bank-search': 'Please enter bank to perform search',
  //           'pesalink-bank-result': 'Please select a bank below',
  //           'pesalink-bank-result-error':
  //             'Invalid selection! Please select a bank below',
  //           'pesalink-to-bank-bank-account':
  //             'Please select the first letter of the bank you want to send to',
  //           'pesalink-to-bank-bank-account-error':
  //             'Invalid selection! Select the first letter of the bank you want to send to',
  //           'pesalink-a-b-bank-account': 'Please select the bank to send to',
  //           'pesalink-a-b-bank-account-error':
  //             'Invalid selection! Select the bank to send to',
  //           'pesalink-c-bank-account': 'Please select the bank to send to',
  //           'pesalink-c-bank-account-error':
  //             'Invalid selection! Select the bank to send to',
  //           'pesalink-d-e-bank-account': 'Please select the bank to send to',
  //           'pesalink-d-e-bank-account-error':
  //             'Invalid selection! Select the bank to send to',
  //           'pesalink-f-bank-account': 'Please select the bank to send to',
  //           'pesalink-f-bank-account-error':
  //             'Invalid selection! Select the bank to send to',
  //           'pesalink-g-h-bank-account': 'Please select the bank to send to',
  //           'pesalink-g-h-bank-account-error':
  //             'Invalid selection! Select the bank to send to',
  //           'pesalink-i-m-bank-account': 'Please select the bank to send to',
  //           'pesalink-i-m-bank-account-error':
  //             'Invalid selection! Select the bank to send to',
  //           'pesalink-n-s-bank-account': 'Please select the bank to send to',
  //           'pesalink-n-s-bank-account-error':
  //             'Invalid selection! Select the bank to send to',
  //           'pesalink-t-z-bank-account': 'Please select the bank to send to',
  //           'pesalink-t-z-bank-account-error':
  //             'Invalid selection! Select the bank to send to',
  //           'pesalink-to-bank-credit-account':
  //             'Please enter the recipients bank account',
  //           'pesalink-to-bank-credit-account-error':
  //             'Invalid bank account! Enter the recipients bank Account',
  //           'pesalink-to-bank-amount':
  //             'Please enter the amount to send (minimum @currency-code @amount-minimum )',
  //           'pesalink-to-bank-amount-error':
  //             'Invalid amount! Enter a valid amount to send (minimum @currency-code @amount-minimum )',
  //           'pesalink-to-bank-reason': 'Please enter the reason for payment',
  //           'pesalink-to-bank-reason-error':
  //             'Invalid entry! Enter the reason for payment',
  //           'pesalink-to-bank-confirm':
  //             'Send @currency-code  @pesalinkAmount to  @pesalinkCreditAccount from  @pesalinkDebitAccount via PESALINK',
  //           'pesalink-to-bank-confirm-error':
  //             'Invalid selection! send @currency-code  @pesalinkAmount to  @pesalinkCreditAccount from  @pesalinkDebitAccount via PESALINK',
  //           'pesalink-to-bank-debit-account-options-error':
  //             'You currently do not have any linked accounts.Do you need another service?',
  //           'pesalink-to-bank-debit-account-options-error-error':
  //             'Invalid selection! You currently do not have any linked accounts.Do you need another service?',
  //         },
  //         swahili: {
  //           'pesalink-to-bank-debit-account': '',
  //           'pesalink-to-bank-debit-account-error': '',
  //           'pesalink-to-bank-bank-account': '',
  //           'pesalink-to-bank-bank-account-error': '',
  //           'pesalink-a-b-bank-account': '',
  //           'pesalink-a-b-bank-account-error': '',
  //           'pesalink-c-bank-account': '',
  //           'pesalink-c-bank-account-error': '',
  //           'pesalink-d-e-bank-account': '',
  //           'pesalink-d-e-bank-account-error': '',
  //           'pesalink-f-bank-account': '',
  //           'pesalink-f-bank-account-error': '',
  //           'pesalink-g-h-bank-account': '',
  //           'pesalink-g-h-bank-account-error': '',
  //           'pesalink-i-m-bank-account': '',
  //           'pesalink-i-m-bank-account-error': '',
  //           'pesalink-n-s-bank-account': '',
  //           'pesalink-n-s-bank-account-error': '',
  //           'pesalink-t-z-bank-account': '',
  //           'pesalink-t-z-bank-account-error': '',
  //           'pesalink-to-bank-credit-account': '',
  //           'pesalink-to-bank-credit-account-error': '',
  //           'pesalink-to-bank-amount': '',
  //           'pesalink-to-bank-amount-error': '',
  //           'pesalink-to-bank-reason': '',
  //           'pesalink-to-bank-reason-error': '',
  //           'pesalink-to-bank-confirm': '',
  //           'pesalink-to-bank-confirm-error': '',
  //           'pesalink-to-bank-debit-account-options-error': '',
  //           'pesalink-to-bank-debit-account-options-error-error': '',
  //         },
  //       },
  //       'pay-tv-bill-page': {
  //         english: {
  //           'pay-tv-bill-page': 'Select a category below',
  //           'pay-tv-bill-page-error':
  //             'Invalid selection! Select a category below',
  //           'gotv-label': 'Go Tv',
  //           'dstv-label': 'DSTv',
  //           'zuku-tv-label': 'Zuku Tv',
  //           'star-times-label': 'Startimes',
  //         },
  //         swahili: {
  //           'pay-tv-bill-page': '',
  //           'pay-tv-bill-page-error': '',
  //           'gotv-label': '',
  //           'dstv-label': '',
  //           'zuku-tv-label': '',
  //           'star-times-label': '',
  //         },
  //       },
  //       'ministatement-success': {
  //         english: {
  //           'ministatement-success':
  //             'Ministatement : \n @ministatement \nDo you need another service?',
  //           'ministatement-success-error':
  //             'Invalid selection! Ministatement : \n @ministatement \nDo you need another service?',
  //         },
  //         swahili: {
  //           'ministatement-success': '',
  //           'ministatement-success-error': '',
  //         },
  //       },
  //       'pay-internet-bill-page': {
  //         english: {
  //           'pay-internet-bill-page': 'Select a category below',
  //           'pay-internet-bill-page-error':
  //             'Invalid selection! Select a category below',
  //           'zuku-internet-label': 'Zuku Internet',
  //           'access-kenya-label': 'Access Kenya',
  //           'jamii-telkom-label': 'Jamii Telkom',
  //         },
  //         swahili: {
  //           'pay-internet-bill-page': '',
  //           'pay-internet-bill-page-error': '',
  //           'zuku-internet-label': '',
  //           'access-kenya-label': '',
  //           'jamii-telkom-label': '',
  //         },
  //       },
  //       'loyalty-points': {
  //         english: {
  //           'loyalty-points-options': 'Please select an option below',
  //           'loyalty-points-options-error':
  //             'Invalid selection! Select an option below',
  //           'loyalty-balance-success':
  //             'Dear @firstname, your loyalty balance is @loyaltyBalance. Do you need another service?',
  //           'loyalty-balance-success-error':
  //             'Invalid selection! Your loyalty balance is @loyaltyBalance. Do you need another service?',
  //           'redeem-points-amount': 'Enter the points to redeem.',
  //           'redeem-points-amount-error':
  //             'Invalid points! Enter the points to redeem.',
  //           'redeem-points-confirm': 'Confirm to redeem @redeemAmount',
  //           'redeem-points-confirm-error':
  //             'Invalid selection! Confirm to redeem @redeemAmount',
  //         },
  //       },
  //       'pesalink-link-account': {
  //         english: {
  //           'pesalink-link-account': 'Please select the account to register',
  //           'pesalink-link-account-error':
  //             'Invalid selection! Select the account to register',
  //           'pesalink-link-primary':
  //             'Do you want to make this your primary account?',
  //           'pesalink-link-primary-error':
  //             'Invalid selection! Do you want to make this your primary account?',
  //           'pesalink-link-confirm':
  //             'Register @pesalinkLinkAccount with PESALINK',
  //           'pesalink-link-confirm-error':
  //             'Invalid selection! Register @pesalinkLinkAccount with PESALINK',
  //           'pesalink-link-account-options-error':
  //             'You currently do not have any linked accounts. Do you need another service?',
  //           'pesalink-link-account-options-error-error':
  //             'Invalid selection! You currently do not have any linked accounts. Do you need another service?',
  //         },
  //         swahili: {
  //           'pesalink-link-account': '',
  //           'pesalink-link-account-error': '',
  //           'pesalink-link-primary': '',
  //           'pesalink-link-primary-error': '',
  //           'pesalink-link-confirm': '',
  //           'pesalink-link-confirm-error': '',
  //           'pesalink-link-account-options-error': '',
  //           'pesalink-link-account-options-error-error': '',
  //         },
  //       },
  //       'first-login': {
  //         english: {
  //           'first-login':
  //             'Welcome to @app-description service. Please enter your One Time PIN to proceed',
  //           'first-login-system-pin':
  //             'Welcome to @app-description service. Please enter your One Time PIN to proceed',
  //           'invalid-system-pin-error':
  //             'Invalid PIN format! Enter a valid 4 digit PIN to proceed',
  //           'wrong-system-pin-error':
  //             'Wrong One Time PIN! Enter One Time PIN to proceed',
  //           'first-login-new-pin': 'Please enter a new 4 digit PIN',
  //           'first-login-new-pin-error':
  //             'Invalid PIN! Enter a new 4 digit PIN ( hint: avoid entering a birthday or an easy pin e.g 1234, 2222, 4321)',
  //           'first-login-confirm':
  //             'Dear @firstname, you are about to change your PIN',
  //           'first-login-confirm-error':
  //             'Invalid selection! Dear @firstname, you are about to change your PIN',
  //         },
  //       },
  //       'atm-transaction-count': {
  //         english: {
  //           'atm-transaction-count-account': 'Please select the Card',
  //           'atm-transaction-count-account-error':
  //             'Invalid selection! Select the Card',
  //           'atm-transaction-count-count':
  //             'Please enter the daily transaction count limit ( min 1 )',
  //           'atm-transaction-count-count-error':
  //             'Invalid selection! Enter the daily transaction count limit ( min 1 )',
  //           'atm-transaction-count-confirm':
  //             'Allow @count daily transactions from Card @atm',
  //           'atm-transaction-count-confirm-error':
  //             'Invalid selection! Allow @count daily transactions from Card @atm',
  //           'atm-transaction-count-account-options-error':
  //             'Dear @firstname, you currently do not have any Cards',
  //           'atm-transaction-count-account-options-error-error':
  //             'Invalid selection! You currently do not have any Cards',
  //         },
  //         swahili: {
  //           'atm-transaction-count-account': '',
  //           'atm-transaction-count-account-error': '',
  //           'atm-transaction-count-count': '',
  //           'atm-transaction-count-count-error': '',
  //           'atm-transaction-count-confirm': '',
  //           'atm-transaction-count-confirm-error': '',
  //           'atm-transaction-count-account-options-error': '',
  //           'atm-transaction-count-account-options-error-error': '',
  //         },
  //       },
  //       'wallet-page': {
  //         english: {
  //           'wallet-page': 'Please select an item below',
  //           'wallet-page-error':
  //             'Invalid selection! Please select an item below',
  //         },
  //       },
  //       'account-linking-success': {
  //         english: {
  //           'account-linking-success':
  //             'END Dear @firstname, you have successfully linked an account to your @app-description Wallet. Please dial @app-shortcode to login',
  //         },
  //         swahili: {
  //           'account-linking-success': '',
  //         },
  //       },
  //       'account-enquiries-page': {
  //         english: {
  //           'account-enquiries-page': 'Please select an option below',
  //           'account-enquiries-page-error':
  //             'Invalid selection ! select an option below',
  //           'balance-label': 'Balance Enquiry',
  //           'ministatement-label': 'Mini Statement',
  //           'fullstatement-label': 'Full Statement',
  //           'card-balance-label': 'View Card balance',
  //         },
  //         swahili: {
  //           'account-enquiries-page': '',
  //           'account-enquiries-page-error': '',
  //           'balance-label': '',
  //           'ministatement-label': '',
  //           'fullstatement-label': '',
  //           'card-balance-label': '',
  //         },
  //       },
  //       'loan-application': {
  //         english: {
  //           'loan-application-debit-account':
  //             'Please select the account to credit',
  //           'loan-products': 'Please select a loan product below',
  //           'loan-products-error':
  //             'Invalid selection! Select a loan product below',
  //           'loan-application-debit-account-error':
  //             'Invalid selection! Select the account to credit',
  //           'loan-application-amount':
  //             'Please enter the amount to borrow (minimum @currency-code @amount-minimum )',
  //           'loan-application-amount-error':
  //             'Invalid amount! Enter the amount to borrow (minimum @currency-code @amount-minimum )',
  //           'loan-application-confirm':
  //             'Dear @firstname, you are about to borrow @currency-code @amount to be sent to Account @debitAccount ',
  //           'loan-application-confirm-error':
  //             'Invalid selection! You are about to borrow @currency-code @amount to be sent to Account @debitAccount n',
  //         },
  //       },
  //       balance: {
  //         english: {
  //           'balance-account': 'Please select the Balance Enquiry Account',
  //           'balance-account-error':
  //             'Invalid selection! Please select the Account',
  //           'balance-account-fosa': 'Please select the FOSA Account',
  //           'balance-account-fosa-error':
  //             'Invalid selection! Please select the FOSA Account',
  //           'balance-account-fosa-options-error':
  //             'Dear @firstname, you currently do not have any linked FOSA accounts.Do you want to do another transaction?',
  //           'balance-account-bosa': 'Please select the BOSA Account',
  //           'balance-account-bosa-error':
  //             'Invalid selection! Please select the BOSA Account',
  //           'balance-account-loan': 'Please select the FOSA Account',
  //           'balance-account-loan-error':
  //             'Invalid selection! Please select the Loan Account',
  //           'balance-account-loan-options-error':
  //             'Dear @firstname, you currently do not an active Loan at the moment.Do you want to do another transaction',
  //           'balance-confirm':
  //             'Dear @firstname, you are about to perform a balance enquiry request for Account @balanceDebitAccount ',
  //           'balance-confirm-error':
  //             'Invalide selection! Dear @firstname, you are about to perform a balance enquiry request for Account @balanceDebitAccount ',
  //         },
  //       },
  //       deposit: {
  //         english: {
  //           'deposit-debit-account': 'Please select the account to deposit to',
  //           'deposit-debit-account-error':
  //             'Invalid selection! Please select the account to deposit to',
  //           'deposit-debit-account-options-error':
  //             'Dear @firstname, you currently do not have any linked accounts.Do you want to do another transaction',
  //           'deposit-debit-account-fosa':
  //             'Please select the FOSA account to deposit to',
  //           'deposit-debit-account-bosa':
  //             'Please select the BOSA account to deposit to',
  //           'deposit-debit-account-fosa-error':
  //             'Invalid selection! Please select the FOSA account to deposit to',
  //           'deposit-debit-account-bosa-error':
  //             'Invalid selection! Please select the BOSA account to deposit to',
  //           'deposit-debit-account-fosa-options-error':
  //             'Dear @firstname, you currently do not have any linked FOSA accounts.Do you want to do another transaction',
  //           'deposit-debit-account-bosa-options-error':
  //             'Dear @firstname, you currently do not have any linked BOSA accounts.Do you want to do another transaction',
  //           'deposit-amount':
  //             'Please enter the amount to deposit (minimum @currency-code @amount-minimum )',
  //           'deposit-amount-error':
  //             'Invalid amount! Please enter the amount to deposit (minimum @currency-code @amount-minimum )',
  //           'deposit-charges-error':
  //             'Dear @firstname, we are currently unable to fetch the deposit to Mpesa transaction charges for Account @depositCreditAccount. Do you wish to do another transaction ? ',
  //           'deposit-confirm':
  //             'Dear @firstname, deposit @currency-code @depositAmount to Account @depositCreditAccount from MPESA Account @msisdn. Transaction charge @charge',
  //           'deposit-confirm-error':
  //             'Invalid selection! deposit @currency-code @depositAmount to  Account @depositCreditAccount from MPESA Account @msisdn.',
  //         },
  //       },
  //       'atm-daily-amount': {
  //         english: {
  //           'atm-daily-amount-account': 'Please select the Card',
  //           'atm-daily-amount-account-error':
  //             'Invalid selection! Select the Card',
  //           'atm-daily-amount-amount':
  //             'Please enter the daily transaction limit (minimum @currency-code @amount-minimum )',
  //           'atm-daily-amount-amount-error':
  //             'Invalid limit! Enter the daily transaction limit (minimum @currency-code @amount-minimum )',
  //           'atm-daily-amount-confirm':
  //             'Set @currency-code  @amount as the daily transaction limit for Card @atm',
  //           'atm-daily-amount-confirm-error':
  //             'Invalid selection! Set @currency-code  @amount as the daily transaction limit for Card @atm',
  //           'atm-daily-amount-account-options-error':
  //             'You currently do not have any Cards',
  //           'atm-daily-amount-account-options-error-error':
  //             'Invalid selection! You currently do not have any Cards',
  //         },
  //         swahili: {
  //           'atm-daily-amount-account': '',
  //           'atm-daily-amount-account-error': '',
  //           'atm-daily-amount-amount': '',
  //           'atm-daily-amount-amount-error': '',
  //           'atm-daily-amount-confirm': '',
  //           'atm-daily-amount-confirm-error': '',
  //           'atm-daily-amount-account-options-error': '',
  //           'atm-daily-amount-account-options-error-error': '',
  //         },
  //       },
  //       'electricity-power-prepaid': {
  //         english: {
  //           'electricity-power-prepaid-credit-account':
  //             'Please enter the KPLC Pre Paid Meter number',
  //           'electricity-power-prepaid-credit-account-error':
  //             'Invalid account! Enter the KPLC pre Paid Meter number',
  //           'electricity-power-prepaid-debit-account':
  //             'Please select the account to be debited',
  //           'electricity-power-prepaid-debit-account-error':
  //             'Invalid selection! Select the account to be debited',
  //           'electricity-power-prepaid-amount':
  //             'Please enter the amount to pay ( min @currency-code @minimum-billpayment-amount ) ',
  //           'electricity-power-prepaid-amount-error':
  //             'Invalid entry! Please enter the amount to pay ( min @currency-code @minimum-billpayment-amount ) ',
  //           'electricity-power-prepaid-confirm':
  //             'Dear @firstname, you are about to pay  @currency-code @billPaymentAmount to KPLC for @billPaymentCreditAccount from @billPaymentDebitAccount',
  //           'electricity-power-prepaid-confirm-error':
  //             'Invalid selection! You are about to pay  @currency-code @billPaymentAmount to KPLC for @billPaymentCreditAccount from @billPaymentDebitAccount',
  //           'electricity-power-prepaid-debit-account-options-error':
  //             'Dear @firstname, you currently do not have any linked Savings accounts.Do you want to do another transaction',
  //           'electricity-power-prepaid-debit-account-options-error-error':
  //             'Invalid selection ! You currently do not have any linked Savings accounts.Do you want to do another transaction',
  //         },
  //       },
  //       'pay-utility-bill-page': {
  //         english: {
  //           'pay-utility-bill-page': 'Select a category below',
  //           'pay-utility-bill-page-error':
  //             'Invalid selection! Select a category below',
  //           'electricity-power-postpaid-label': 'KPLC Post-Paid',
  //           'electricity-power-prepaid-label': 'KPLC Pre-Paid',
  //           'pay-bill-water-label': 'Pay Water',
  //         },
  //         swahili: {
  //           'pay-utility-bill-page': '',
  //           'pay-utility-bill-page-error': '',
  //           'electricity-power-postpaid-label': '',
  //           'electricity-power-prepaid-label': '',
  //           'pay-bill-water-label': '',
  //         },
  //       },
  //       'school-fees': {
  //         english: {
  //           'school-fees-debit-account':
  //             'Please select the Account to pay from',
  //           'school-fees-debit-account-error':
  //             'Invalid selection! Select the Account to pay from',
  //           'school-fees-credit-account':
  //             'Please select the school account to pay to',
  //           'school-fees-credit-account-error':
  //             'Invalid Selection! Select the school account to pay to',
  //           'school-fees-child-name':
  //             'Please enter the students name e.g John Doe',
  //           'school-fees-child-name-error':
  //             'Invalid name! Enter the students name e.g John Doe',
  //           'school-fees-child-reg':
  //             'Please enter the students registration number e.g 123456',
  //           'school-fees-child-reg-error':
  //             'Invalid number! Enter the students registration number e.g 123456',
  //           'school-fees-amount':
  //             'Please enter the Amount you would like to pay (minimum @currency-code @amount-minimum )',
  //           'school-fees-amount-error':
  //             'Invalid amount! Enter the Amount you would like to pay (minimum @currency-code @amount-minimum )',
  //           'school-fees-confirm':
  //             'Pay @currency-code . @schoolFeesAmount from  @schoolFeesDebitAccount to  @schoolFeesCreditAccount. Name: @schoolFeesChildName, RegId: @schoolFeesChildReg',
  //           'school-fees-confirm-error':
  //             'Invalid selection! Pay @currency-code . @schoolFeesAmount from  @schoolFeesDebitAccount to  @schoolFeesCreditAccount. Name: @schoolFeesChildName, RegId: @schoolFeesChildReg',
  //           'school-search':
  //             'Please enter the schools first name in order to conduct a search',
  //           'school-result': 'Please select a school below',
  //           'no-results-error':
  //             "There are no schools Matching '@search_item'. Please enter the schools first name in order to conduct a search",
  //           'result-limit-exceeded-error':
  //             'Too many results. Please enter the full name of the school separated by a dot ( . ) to narrow the results',
  //           'schools-error': 'Invalid Selection! Please select a school below',
  //         },
  //       },
  //       'cardless-withdrawal': {
  //         english: {
  //           'cardless-withdrawal-debit-accounts-type':
  //             'Please select debit account type',
  //           'cardless-withdrawal-debit-accounts-type-error':
  //             'Invalid selection! Select debit account type',
  //           'cardless-withdrawal-debit-account':
  //             'Please select the debit account',
  //           'cardless-withdrawal-debit-account-error':
  //             'Invalid selection! Select the debit account',
  //           'cardless-withdrawal-credit-account': 'Please enter phone number',
  //           'cardless-withdrawal-credit-account-error':
  //             'Invalid card! Enter a valid phone number',
  //           'cardless-withdrawal-account-type': 'Please select recipient',
  //           'cardless-withdrawal-account-type-error':
  //             'Invalid selection! Select recipient',
  //           'cardless-withdrawal-amount': 'Please enter amount to withdraw',
  //           'cardless-withdrawal-amount-error':
  //             'Invalid amount! Enter amount to withdraw',
  //           'cardless-withdrawal-confirm':
  //             'Dear @firstname, withdraw amount: @cardlessWithdrawalAmount from account @cardlessDebitAccount to account @cardlessCreditAccount',
  //           'cardless-withdrawal-confirm-error':
  //             'Invalid selection! withdraw amount: @cardlessWithdrawalAmount from account @cardlessDebitAccount to account @cardlessCreditAccount',
  //         },
  //         swahili: {
  //           'cardless-withdrawal-debit-accounts-type': '',
  //           'cardless-withdrawal-debit-accounts-type-error': '',
  //           'cardless-withdrawal-debit-account': '',
  //           'cardless-withdrawal-debit-account-error': '',
  //           'cardless-withdrawal-credit-account': '',
  //           'cardless-withdrawal-credit-account-error': '',
  //           'cardless-withdrawal-account-type': '',
  //           'cardless-withdrawal-account-type-error': '',
  //           'cardless-withdrawal-amount': '',
  //           'cardless-withdrawal-amount-error': '',
  //           'cardless-withdrawal-confirm': '',
  //           'cardless-withdrawal-confirm-error': '',
  //         },
  //       },
  //       'faulu-general-page': {
  //         english: {
  //           'faulu-general-page': 'Welcome To Faulu Bank, Select Service below',
  //           'faulu-general-page-error':
  //             'Wrong selection, please select a service below',
  //           'faulu-selfReg-label': 'Self-Registration',
  //           'open-Account-label': 'Open digital account',
  //           'apply-loan-label': 'Loan application',
  //           'bancassurance-label': 'Bancassurance',
  //           'talk-to-us-label': 'Talk to us',
  //           'login-labelx': 'Customer login',
  //         },
  //         swahili: {
  //           'faulu-general-page': '',
  //           'faulu-general-page-error': '',
  //           'faulu-selfReg-label': '',
  //           'open-Account-label': '',
  //           'apply-loan-label': '',
  //           'bancassurance-label': '',
  //           'talk-to-us-label': '',
  //         },
  //         french: {
  //           'faulu-general-page': '',
  //           'faulu-general-page-error': '',
  //           'faulu-selfReg-label': '',
  //           'open-Account-label': '',
  //           'apply-loan-label': '',
  //           'bancassurance-label': '',
  //           'talk-to-us-label': '',
  //         },
  //       },
  //       'registration-cancel': {
  //         english: {
  //           'registration-cancel':
  //             'Dear customer, thank you for visiting  @app-description service.',
  //         },
  //       },
  //       'request-atm': {
  //         english: {
  //           'request-atm-account': 'Please select the Card',
  //           'request-atm-account-error':
  //             'Invalid selection ! Please select the Card',
  //           'request-atm-account-types': 'Please select the type',
  //           'request-atm-account-types-error':
  //             'Invalid selection! Please select the type',
  //           'request-atm-confirm':
  //             'Dear @firstname, Request for a @requestAtmType Card for @requestAtmAccount',
  //           'request-atm-confirm-error':
  //             'Invalid selection ! Request for a @requestAtmType Card for @requestAtmAccount',
  //           'request-atm-account-options-error':
  //             'You currently do not have any linked accounts.Continue',
  //           'request-atm-account-options-error-error':
  //             'Invalid selection ! You currently do not have any linked accounts.Continue',
  //         },
  //         swahili: {
  //           'request-atm-account': '',
  //           'request-atm-account-error': '',
  //           'request-atm-confirm': '',
  //           'request-atm-confirm-error': '',
  //           'request-atm-account-options-error': '',
  //           'request-atm-account-options-error-error': '',
  //         },
  //       },
  //       'experiments-page': {
  //         english: {
  //           'experiments-page': '',
  //           'experiments-page-error': '',
  //           'calculator-label': '',
  //           'forex-label': '',
  //         },
  //         swahili: {
  //           'experiments-page': '',
  //           'experiments-page-error': '',
  //           'calculator-label': '',
  //           'forex-label': '',
  //         },
  //         french: {
  //           'experiments-page': '',
  //           'experiments-page-error': '',
  //           'calculator-label': '',
  //           'forex-label': '',
  //         },
  //       },
  //       'loan-statement': {
  //         english: {
  //           'loan-statement-account': 'Please select the loan account',
  //           'loan-statement-account-error':
  //             'Invalid selection ! Select the loan account',
  //           'loan-statement-period':
  //             'Please select the loan Statement duration',
  //           'loan-statement-period-error':
  //             'Invalid selection! Select the Loan Statement duration',
  //           'loan-statement-confirm':
  //             'Dear @firstname, request for a @period Loan Statement for @loanProdname?',
  //           'loan-statement-confirm-error':
  //             'Invalid selection! Request for a @period Loan Statement for @loanProdname?',
  //           'loan-statement-account-options-error':
  //             'You currently do not have an active loan.Continue',
  //           'loan-statement-error':
  //             'Dear @firstname, @errMessage Do you need another service?',
  //           'loan-statement-error-error':
  //             'Invalid selection! @errMessage Do you need another service?',
  //           'digital-loan-statement-confirm':
  //             'Dear @firstname, Confirm to request loan statement for @loanProdname',
  //           'digital-loan-statement-confirm-error':
  //             'Invalid selection! Confirm to request loan statement for @loanProdname',
  //           'digital-loan-statement-success': '@digitalLoanBalance Proceed?',
  //           'digital-loan-statement-success-error':
  //             'Invalid selection! @digitalLoanBalance Proceed?',
  //           'loan-statement-account-options-error-error':
  //             'Invalid selection! You currently do not have an active loan.Continue',
  //           'loanstatement-email-error':
  //             'You need to set your email to obtain a loan statement. kindly visit your nearest @app-client branch to update your details. Do you need another service?',
  //           'loanstatement-email-error-error':
  //             'Invalid selection! kindly visit your nearest @app-client branch to update your details. Do you need another service?',
  //         },
  //         swahili: {
  //           'loan-statement-account': '',
  //           'loan-statement-account-error': '',
  //           'loan-statement-period': '',
  //           'loan-statement-period-error': '',
  //           'loan-statement-confirm': '',
  //           'loan-statement-confirm-error': '',
  //           'loan-statement-account-options-error': '',
  //           'loan-statement-error': '',
  //           'loan-statement-error-error': '',
  //           'loan-statement-account-options-error-error': '',
  //           'loanstatement-email-error': '',
  //           'loanstatement-email-error-error': '',
  //         },
  //       },
  //       'faulu-login': {
  //         english: {
  //           'faulu-login': '',
  //         },
  //         swahili: {
  //           'faulu-login': '',
  //         },
  //         french: {
  //           'faulu-login': '',
  //         },
  //       },
  //       'mpesa-c2b': {
  //         english: {
  //           'deposit-mpesa-debit-account':
  //             'Please select the account to deposit to',
  //           'deposit-mpesa-debit-account-error':
  //             'Invalid selection! Select the account to deposit to',
  //           'deposit-mpesa-amount':
  //             'Please enter the amount that you would like to deposit (Minimum: @currency-code @amount-minimum )',
  //           'deposit-mpesa-amount-error':
  //             'Invalid amount! Enter the amount that you would like to deposit (Minimum: @currency-code @amount-minimum )',
  //           'mpesa-c2b-error':
  //             'Dear @firstname, @errMessage Do you need another service?',
  //           'mpesa-c2b-error-error':
  //             'Invalid selection! @errMessage Do you need another service?',
  //           'deposit-mpesa-confirm':
  //             'Dear @firstname, deposit @currency-code . @depositAmount from MPESA to @depositDebitAccount',
  //           'deposit-mpesa-confirm-error':
  //             'Invalid selection! Deposit @currency-code . @depositAmount from MPESA to @depositDebitAccount',
  //         },
  //         swahili: {
  //           'deposit-mpesa-debit-account': '',
  //           'deposit-mpesa-debit-account-error': '',
  //           'deposit-mpesa-amount': '',
  //           'deposit-mpesa-amount-error': '',
  //           'mpesa-c2b-error': '',
  //           'mpesa-c2b-error-error': '',
  //           'deposit-mpesa-confirm': '',
  //           'deposit-mpesa-confirm-error': '',
  //         },
  //       },
  //       'apply-loan': {
  //         english: {
  //           'Apply-loan': '',
  //         },
  //         swahili: {
  //           'Apply-loan': '',
  //         },
  //         french: {
  //           'Apply-loan': '',
  //         },
  //       },
  //       'mpesa-airtel-page': {
  //         english: {
  //           'mpesa-airtel-page': 'Please select an option below',
  //           'mpesa-airtel-page-error':
  //             'Invalid selection! Select an option below',
  //           'withdrawal-page-label': 'Transfer to Mpesa/Airtel',
  //           'mpesa-c2b-label': 'Deposit from Mpesa',
  //           'mpesa-b2b-label': 'Lipa na Mpesa',
  //           'mpesa-float-label': 'Buy Float',
  //         },
  //       },
  //       'unblock-atm': {
  //         english: {
  //           'unblock-atm-account': 'Please select the Card to unblock',
  //           'unblock-atm-account-error':
  //             'Invalid selection! Select the Card to unblock',
  //           'unblock-atm-confirm': 'Unblock Card @unblockAtmAccount',
  //           'unblock-atm-confirm-error':
  //             'Invalid selection! Unblock Card @unblockAtmAccount',
  //           'unblock-atm-account-options-error':
  //             'Dear @firstname, you currently do not have any Cards',
  //           'unblock-atm-account-options-error-error':
  //             'Invalid selection! You currently do not have any Cards',
  //         },
  //         swahili: {
  //           'unblock-atm-account': '',
  //           'unblock-atm-account-error': '',
  //           'unblock-atm-confirm': '',
  //           'unblock-atm-confirm-error': '',
  //           'unblock-atm-account-options-error': '',
  //           'unblock-atm-account-options-error-error': '',
  //         },
  //       },
  //       'account-mandates': {
  //         english: {
  //           'account-mandates-account': 'Please select a mandate',
  //           'account-mandates-account-error':
  //             'Invalid selection! Select a mandate',
  //           'account-mandates-confirm':
  //             'Do you wish to approve the transaction with code  @code',
  //           'account-mandates-confirm-error':
  //             'Invalid selcetion! Approve the transaction with code  @code',
  //           'account-mandates-type': 'Please approve or reject the mandate',
  //           'account-mandates-type-error':
  //             'Invalid selection! Approve or reject the mandate',
  //           'account-mandates-reject-confirm':
  //             'Do you wish to reject the transaction with code  @code',
  //           'account-mandates-reject-confirm-error':
  //             'Invalid selcetion! Reject the transaction with code  @code',
  //           'account-mandates-account-options-error':
  //             'Dear @firstname, there are no pending mandates for approval',
  //           'account-mandates-account-options-error-error':
  //             'Invalid selection! There are no pending mandates for approval',
  //           'account-mandates-debit-account': 'Please select an account',
  //           'account-mandates-debit-account-account-error':
  //             'Invalid selection! Select an account',
  //           'account-mandates-id':
  //             'Please select the Joint Account transaction to approve',
  //           'account-mandates-id-error':
  //             'Invalid selection! Select the Joint Account transaction to approve',
  //           'account-mandates-lookup-error':
  //             'There are currently no pending approvals for Account @account . Do you need another service?',
  //           'account-mandates-lookup-error-error':
  //             'Invalid selection! There are currently no pending approvals for Account @account . Do you need another service?',
  //           'account-mandates-code':
  //             'Please enter the Authorization code for mandate ID @id',
  //           'account-mandates-code-error':
  //             'Invalid Code! Enter the Authorization code for mandate ID @id',
  //         },
  //         swahili: {
  //           'account-mandates-account': '',
  //           'account-mandates-account-error': '',
  //           'account-mandates-confirm': '',
  //           'account-mandates-confirm-error': '',
  //           'account-mandates-type': '',
  //           'account-mandates-type-error': '',
  //           'account-mandates-reject-confirm': '',
  //           'account-mandates-reject-confirm-error': '',
  //           'account-mandates-account-options-error': '',
  //           'account-mandates-account-options-error-error': '',
  //           'account-mandates-debit-account': '',
  //           'account-mandates-debit-account-account-error': '',
  //           'account-mandates-id': '',
  //           'account-mandates-id-error': '',
  //           'account-mandates-lookup-error': '',
  //           'account-mandates-lookup-error-error': '',
  //           'account-mandates-code': '',
  //           'account-mandates-code-error': '',
  //         },
  //       },
  //       donations: {
  //         english: {
  //           'donations-credit-account':
  //             'Please enter the Charity donation Account Number:',
  //           'donations-credit-account-error':
  //             'Invalid account! Please enter the Charity donation Account Number:',
  //           'donations-debit-account':
  //             'Please select the account to be debited',
  //           'donations-debit-account-error':
  //             'Invalid selection! Select the account to be debited',
  //           'donations-amount':
  //             'Please enter the amount to pay ( min @currency-code  @minimum-billpayment-amount ) ',
  //           'donations-amount-error':
  //             'Invalid entry! Please enter the amount to pay ( min @currency-code @minimum-billpayment-amount ) ',
  //           'donations-confirm':
  //             'Pay @currency-code . @billPaymentAmount to Charity donation account @billPaymentCreditAccount from @billPaymentDebitAccount',
  //           'donations-confirm-error':
  //             'Invalid selection! Pay @currency-code . @billPaymentAmount to Charity donation account @billPaymentCreditAccount from @billPaymentDebitAccount',
  //           'donations-debit-account-options-error':
  //             'Dear @firstname, you do not have any linked accounts. Do you need another service?',
  //           'donations-debit-account-options-error-error':
  //             'Invalid selection! You do not have any linked accounts. Do you need another service?',
  //         },
  //         swahili: {
  //           'donations-credit-account': '',
  //           'donations-credit-account-error': '',
  //           'donations-debit-account': '',
  //           'donations-debit-account-error': '',
  //           'donations-amount': '',
  //           'donations-amount-error': '',
  //           'donations-confirm': '',
  //           'donations-confirm-error': '',
  //           'donations-debit-account-options-error': '',
  //           'donations-debit-account-options-error-error': '',
  //         },
  //       },
  //       calculator: {
  //         english: {
  //           'calculator-type': 'Calculators',
  //           'calculator-type-error': 'Invalid selection! Calculators',
  //           'investment-amount':
  //             'Please enter the amount to invest (minimum @currency-code @amount-minimum )',
  //           'investment-amount-error':
  //             'Invalid amount! Enter the amount to invest (minimum @currency-code @amount-minimum )',
  //           'investment-interest':
  //             'Please enter the interest rate for the investment',
  //           'investment-interest-error':
  //             'Invalid interest rate! Enter the interest rate for the investment',
  //           'investment-confirm':
  //             'Investment returns:\n @investment-details \nDo you need another service?',
  //           'investment-confirm-error':
  //             'Invalid selection! Investment returns:\n @investment-details \nDo you need another service?',
  //           'loan-amount':
  //             'Please enter the amount to borrow (minimum @currency-code @amount-minimum )',
  //           'loan-amount-error':
  //             'Invalid amount! Enter the amount to borrow (minimum @currency-code @amount-minimum )',
  //           'loan-period': 'Please enter the loan duration in months',
  //           'loan-period-error':
  //             'Invalid duration! Enter the loan duration in months',
  //           'loan-confirm': '@loan-details \nDo you need another service?',
  //           'loan-confirm-error':
  //             'Invalid selection! @loan-details \nDo you need another service?',
  //         },
  //         swahili: {
  //           'calculator-type': '',
  //           'calculator-type-error': '',
  //           'investment-amount': '',
  //           'investment-amount-error': '',
  //           'investment-interest': '',
  //           'investment-interest-error': '',
  //           'investment-confirm': '',
  //           'investment-confirm-error': '',
  //           'loan-amount': '',
  //           'loan-amount-error': '',
  //           'loan-period': '',
  //           'loan-period-error': '',
  //           'loan-confirm': '',
  //           'loan-confirm-error': '',
  //         },
  //       },
  //       'balance-success': {
  //         english: {
  //           'balance-success':
  //             'Your Actual Balance is @currencyCode @actual-balance and Available Balance is @currencyCode @available-balance, Date: @balanceTime. Do you need another service?',
  //           'balance-success-error':
  //             'Invalid selection! your Actual Balance is @currencyCode @actual-balance and Available Balance is @currencyCode @available-balance, Date: @balanceTime. Do you need another service?',
  //         },
  //         swahili: {
  //           'balance-success': '',
  //           'balance-success-error': '',
  //         },
  //       },
  //       wiba: {
  //         english: {
  //           'customer-first-name': '',
  //           'customer-first-name-error': '',
  //           'customer-second-name': '',
  //           'branch-select': '',
  //           'domestic-package-name-error': '',
  //           'bancassurance-confirm': '',
  //         },
  //         swahili: {
  //           'customer-first-name': '',
  //           'customer-first-name-error': '',
  //           'customer-second-name': '',
  //           'branch-select': '',
  //           'domestic-package-name-error': '',
  //           'bancassurance-confirm': '',
  //         },
  //         french: {
  //           'customer-first-name': '',
  //           'customer-first-name-error': '',
  //           'customer-second-name': '',
  //           'branch-select': '',
  //           'domestic-package-name-error': '',
  //           'bancassurance-confirm': '',
  //         },
  //       },
  //       'customer-requests-page': {
  //         english: {
  //           'customer-requests-page': 'Select an option below',
  //           'customer-requests-page-error':
  //             'Invalid selection! Select an option below',
  //           'standing-orders-page-label': 'Standing orders',
  //           'cheques-page-label': 'Cheque Requests',
  //           'atm-cards-page-label': 'Card Requests',
  //           'account-requests-page-label': 'Account Requests',
  //           'cardless-withdrawal-label': 'Cardless Withdrawal',
  //         },
  //         swahili: {
  //           'customer-requests-page': '',
  //           'customer-requests-page-error': '',
  //           'standing-orders-page-label': '',
  //           'cheques-page-label': '',
  //           'atm-cards-page-label': '',
  //           'account-requests-page-label': '',
  //           'cardless-withdrawal-label': '',
  //         },
  //       },
  //       'lock-savings-balance': {
  //         english: {
  //           'lock-savings-balance':
  //             'You are about to request for the balance for your 52 weeks savings challenge Account',
  //           'lock-savings-balance-error':
  //             'Invalid selection! Request for the balance for your 52 weeks savings challenge Account',
  //           'lock-savings-account-error':
  //             'Dear @firstname, you do not have a savings account. Would you  like to open a savings account?',
  //           'lock-savings-account-error-error':
  //             'Invalid selection! You do not have a savings account. Would you  like to open a savings account?',
  //         },
  //         swahili: {
  //           'lock-savings-balance': '',
  //           'lock-savings-balance-error': '',
  //           'lock-savings-account-error': '',
  //           'lock-savings-account-error-error': '',
  //         },
  //       },
  //       'funds-transfer-to-other-banks': {
  //         english: {
  //           'transfer-to-other-banks-credit-bank': '',
  //           'transfer-to-other-banks--credit-bank-error': '',
  //           'transfer-to-other-banks-credit-account': '',
  //           'transfer-to-other-banks-credit-account-error': '',
  //           'transfer-to-other-banks-debit-account': '',
  //           'transfer-to-other-banks-debit-account-error': '',
  //           'transfer-to-other-banks-amount': '',
  //           'transfer-to-other-banks-amount-error': '',
  //           'transfer-to-other-banks-confirm': '',
  //           'transfer-to-other-banks-debit-account-options-error': '',
  //         },
  //         swahili: {
  //           'transfer-to-other-banks-credit-bank': '',
  //           'transfer-to-other-banks--credit-bank-error': '',
  //           'transfer-to-other-banks-credit-account': '',
  //           'transfer-to-other-banks-credit-account-error': '',
  //           'transfer-to-other-banks-debit-account': '',
  //           'transfer-to-other-banks-debit-account-error': '',
  //           'transfer-to-other-banks-amount': '',
  //           'transfer-to-other-banks-amount-error': '',
  //           'transfer-to-other-banks-confirm': '',
  //           'transfer-to-other-banks-debit-account-options-error': '',
  //         },
  //         french: {
  //           'transfer-to-other-banks-credit-bank': '',
  //           'transfer-to-other-banks--credit-bank-error': '',
  //           'transfer-to-other-banks-credit-account': '',
  //           'transfer-to-other-banks-credit-account-error': '',
  //           'transfer-to-other-banks-debit-account': '',
  //           'transfer-to-other-banks-debit-account-error': '',
  //           'transfer-to-other-banks-amount': '',
  //           'transfer-to-other-banks-amount-error': '',
  //           'transfer-to-other-banks-confirm': '',
  //           'transfer-to-other-banks-debit-account-options-error': '',
  //         },
  //       },
  //       'standing-orders-internal': {
  //         english: {
  //           'so-b2b-debit-account': 'Please select the Account to send from',
  //           'so-b2b-debit-account-error':
  //             'Invalid selection! Select the Account to send from',
  //           'so-b2b-credit-account': 'Please enter the Bank Account to send to',
  //           'so-b2b-credit-account-error':
  //             'Invalid Account! Enter the Bank Account to send to',
  //           'so-b2b-amount':
  //             'Please enter the amount to send (minimum @currency-code @amount-minimum )',
  //           'so-b2b-amount-error':
  //             'Invalid amount! Enter the amount to send (minimum @currency-code @amount-minimum )',
  //           'so-b2b-start-date':
  //             'Please enter the start date in the format YYYY-MM-DD e.g 2021-01-26',
  //           'so-b2b-start-date-error':
  //             'Invalid start date! Enter the start date in the format YYYY-MM-DD e.g 2021-01-26',
  //           'so-b2b-end-date':
  //             'Please enter the end date in the format YYYY-MM-DD e.g 2021-01-26',
  //           'so-b2b-end-date-error':
  //             'Invalid end date! Enter the end date in the format YYYY-MM-DD e.g 2021-01-26',
  //           'so-b2b-frequency': 'Please select the frequency',
  //           'so-b2b-frequency-error': 'Invalid selection! Select the frequency',
  //           'so-b2b-beneficiary-name':
  //             'Please enter the recipients full name e.g John doe',
  //           'so-b2b-beneficiary-name-error':
  //             'Invalid name! Enter the recipients full name e.g John Doe',
  //           'so-b2b-beneficiary-lname': 'Please enter the recipients last name',
  //           'so-b2b-beneficiary-lname-error':
  //             'Invalid name! Enter the recipients last name',
  //           'so-b2b-member-number':
  //             'Please enter your Member Number ( optionally enter s to skip )',
  //           'so-b2b-member-number-error':
  //             'Invalid Member Number! Enter your Member Number ( enter s to skip )',
  //           'so-b2b-instruction': 'Please enter the purpose',
  //           'so-b2b-instruction-error': 'Invalid entry! Enter the purpose',
  //           'so-b2b-confirm':
  //             'Set Standing order: @currency-code . @soAmount, Start: @soStartDate, Debit account: @soDebitAccount Credit account: @soCreditAccount, Frequency: @soFrequency, End date: @soEndDate, Beneficiary: @soBeneficiaryName, Purpose: @soInstruction',
  //           'so-b2b-confirm-error':
  //             'Invalid selection! Set Standing order: @currency-code . @soAmount, Start: @soStartDate, Debit account: @soDebitAccount Credit account: @soCreditAccount, Frequency: @soFrequency, End date: @soEndDate, Beneficiary: @soBeneficiaryName, Purpose: @soInstruction',
  //           'so-b2b-debit-account-options-error':
  //             'You currently do not have any linked accounts.Continue',
  //           'so-b2b-debit-account-options-error-error':
  //             'Invalid selection! You currently do not have any linked accounts.Continue',
  //         },
  //         swahili: {
  //           'so-b2b-debit-account': '',
  //           'so-b2b-debit-account-error': '',
  //           'so-b2b-credit-account': '',
  //           'so-b2b-credit-account-error': '',
  //           'so-b2b-amount': '',
  //           'so-b2b-amount-error': '',
  //           'so-b2b-start-date': '',
  //           'so-b2b-start-date-error': '',
  //           'so-b2b-end-date': '',
  //           'so-b2b-end-date-error': '',
  //           'so-b2b-frequency': '',
  //           'so-b2b-frequency-error': '',
  //           'so-b2b-beneficiary-name': '',
  //           'so-b2b-beneficiary-name-error': '',
  //           'so-b2b-beneficiary-lname': '',
  //           'so-b2b-beneficiary-lname-error': '',
  //           'so-b2b-member-number': '',
  //           'so-b2b-member-number-error': '',
  //           'so-b2b-instruction': '',
  //           'so-b2b-instruction-error': '',
  //           'so-b2b-confirm': '',
  //           'so-b2b-confirm-error': '',
  //           'so-b2b-debit-account-options-error': '',
  //           'so-b2b-debit-account-options-error-error': '',
  //         },
  //       },
  //       'account-linking': {
  //         english: {
  //           'account-linking-account': 'Please enter the Account to link',
  //           'account-linking-account-error':
  //             'Invalid account! Enter a valid account number to link',
  //           'account-linking-id': 'Please enter your National ID Number',
  //           'account-linking-id-error':
  //             'Invalid ID! Enter your National ID Number',
  //           'account-linking-confirm':
  //             'Dear @firstname, Link Account @linkAccount to your @app-description Wallet',
  //           'account-linking-confirm-error':
  //             'Invalid selection! Link Account @linkAccount to your @app-description Wallet',
  //         },
  //         swahili: {
  //           'account-linking-account': '',
  //           'account-linking-account-error': '',
  //           'account-linking-id': '',
  //           'account-linking-id-error': '',
  //           'account-linking-confirm': '',
  //           'account-linking-confirm-error': '',
  //         },
  //       },
  //       'set-security-questions-alert': {
  //         english: {
  //           'set-security-questions-alert':
  //             'End Dear customer, you have not set the security questions!',
  //         },
  //         swahili: {
  //           'set-security-questions-alert':
  //             'End Mteja, hujatengeza maswali yako ya ulinzi',
  //         },
  //       },
  //       'access-kenya': {
  //         english: {
  //           'access-kenya-credit-account': '',
  //           'access-kenya-credit-account-error': '',
  //           'access-kenya-debit-account': '',
  //           'access-kenya-debit-account-error': '',
  //           'access-kenya-amount': '',
  //           'access-kenya-amount-error': '',
  //           'access-kenya-confirm': '',
  //           'access-kenya-debit-account-options-error': '',
  //         },
  //       },
  //       'system-error': {
  //         english: {
  //           'system-error': '',
  //         },
  //       },
  //       'activation-welcome-page': {
  //         english: {
  //           'activation-welcome-page':
  //             'Welcome to Faulu MFB. Please let us know if you bank with us?',
  //           'activation-welcome-page-error':
  //             'Invalid seletion, Please let us know if you bank with us?',
  //           'faulu-selfReg-label': 'Yes',
  //           'faulu-general-page-label': 'No',
  //         },
  //         swahili: {
  //           'activation-welcome-page': '',
  //           'activation-welcome-page-error': '',
  //           'faulu-selfReg-label': '',
  //           'faulu-general-page-label': '',
  //         },
  //         french: {
  //           'activation-welcome-page':
  //             'Welcome to Faulu MFB. Please let us know if you bank with us?',
  //           'activation-welcome-page-error':
  //             'Invalid seletion, Please let us know if you bank with us?',
  //           'faulu-selfReg-label': 'Yes',
  //           'faulu-general-page-label': 'No',
  //         },
  //       },
  //       'add-beneficiary': {
  //         english: {
  //           'add-beneficiary-name': 'Please enter the beneficary name',
  //           'add-beneficiary-name-error':
  //             'Invalid name! Enter the beneficary name',
  //           'add-beneficiary-number': 'Please enter the beneficary number',
  //           'add-beneficiary-number-error':
  //             'Invalid number! Enter the beneficary number',
  //           'add-beneficiary-confirm':
  //             'Dear @firstname, add beneficiary @beneficiaryName number: @beneficiaryNumber',
  //           'add-beneficiary-confirm-error':
  //             'Invalid selection! Add beneficiary @beneficiaryName number: @beneficiaryNumber',
  //         },
  //         swahili: {
  //           'add-beneficiary-name': '',
  //           'add-beneficiary-name-error': '',
  //           'add-beneficiary-number': '',
  //           'add-beneficiary-number-error': '',
  //           'add-beneficiary-confirm': '',
  //           'add-beneficiary-confirm-error': '',
  //         },
  //       },
  //       'savings-balance': {
  //         english: {
  //           'savings-balance-debit-account':
  //             'Please select the account to debit',
  //           'savings-balance-debit-account-error':
  //             'Invalid selection! Select the account to debit',
  //           'savings-balance-account': 'Select the savings account',
  //           'savings-balance-account-error':
  //             'Invalid selection! select the savings account',
  //           'savings-balance-confirm':
  //             'Dear @firstname, your balance is @currency-code @savings-account-balance . Continue?',
  //           'savings-balance-confirm-error':
  //             'Invalid selection! Your balance is @currency-code @savings-account-balance . Continue?',
  //         },
  //       },
  //       'beneficiary-page': {
  //         english: {
  //           'beneficiary-page': 'Please select an option below',
  //           'beneficiary-page-error':
  //             'Invalid selection! Please select an option below',
  //           'add-beneficiary-label': 'Add Beneficiary',
  //           'delete-beneficiary-label': 'Delete Beneficiary',
  //         },
  //         swahili: {
  //           'beneficiary-page': '',
  //           'beneficiary-page-error': '',
  //           'add-beneficiary-label': '',
  //           'delete-beneficiary-label': '',
  //         },
  //       },
  //       'pesalink-to-phone': {
  //         english: {
  //           'pesalink-to-phone-debit-account':
  //             'Please select the account to send from',
  //           'pesalink-to-phone-debit-account-error':
  //             'Invalid selection! Select the account to send from',
  //           'pesalink-to-phone-credit-account':
  //             'Please enter the phone number to send to in the format 07xxxxxxxx',
  //           'pesalink-to-phone-credit-account-error':
  //             'Invalid phone number! Enter the phone number to send to in the format 07xxxxxxxx',
  //           'pesalink-to-phone-amount':
  //             'Please enter the amount to send  (minimum @currency-code @amount-minimum )',
  //           'pesalink-to-phone-amount-error':
  //             'Invalid amount! Enter a valid amount to send  (minimum @currency-code @amount-minimum )',
  //           'pesalink-to-phone-reason': 'Please enter the reason for payment',
  //           'pesalink-to-phone-reason-error':
  //             'Invalid entry! Enter the reason for payment',
  //           'pesalink-to-phone-confirm':
  //             'Send @currency-code  @pesalinkAmount to  @pesalinkCreditAccount from  @pesalinkDebitAccount via PESALINK',
  //           'pesalink-to-phone-confirm-error':
  //             'Invalid selection! Send @currency-code  @pesalinkAmount to  @pesalinkCreditAccount from  @pesalinkDebitAccount via PESALINK',
  //           'pesalink-to-phone-debit-account-options-error':
  //             'Dear  @firstname, you currently do not have any linked accounts.Do you need another service?',
  //           'pesalink-to-phone-debit-account-options-error-error':
  //             'Invalid selection! You currently do not have any linked accounts.Do you need another service?',
  //           'pesalink-to-phone-lookup-error':
  //             'The phone number: @pesalinkCreditAccount is not registered on PESALINK. Do you need another service?',
  //           'pesalink-to-phone-lookup-error-error':
  //             'Invalid selection! The phone number: @pesalinkCreditAccount is not registered on PESALINK. Do you need another service?',
  //           'pesalink-to-phone-lookup-banks':
  //             'Please select the Bank to send to',
  //           'pesalink-to-phone-lookup-banks-error':
  //             'Invalid selection! Select the Bank to send to',
  //           'pesalink-to-phone-lookup-banks-options-error':
  //             'No Bank Accounts that are PESALINK enabled are associated with phone number: @pesalinkCreditAccount. Do you need another service?',
  //           'pesalink-to-phone-lookup-banks-options-error-error':
  //             'Invalid selection! No Bank Accounts that are PESALINK enabled are associated with phone number: @pesalinkCreditAccount. Do you need another service?',
  //         },
  //         swahili: {
  //           'pesalink-to-phone-debit-account': '',
  //           'pesalink-to-phone-debit-account-error': '',
  //           'pesalink-to-phone-credit-account': '',
  //           'pesalink-to-phone-credit-account-error': '',
  //           'pesalink-to-phone-amount': '',
  //           'pesalink-to-phone-amount-error': '',
  //           'pesalink-to-phone-reason': '',
  //           'pesalink-to-phone-reason-error': '',
  //           'pesalink-to-phone-confirm': '',
  //           'pesalink-to-phone-confirm-error': '',
  //           'pesalink-to-phone-debit-account-options-error': '',
  //           'pesalink-to-phone-debit-account-options-error-error': '',
  //           'pesalink-to-phone-lookup-error': '',
  //           'pesalink-to-phone-lookup-error-error': '',
  //           'pesalink-to-phone-lookup-banks': '',
  //           'pesalink-to-phone-lookup-banks-error': '',
  //           'pesalink-to-phone-lookup-banks-options-error': '',
  //           'pesalink-to-phone-lookup-banks-options-error-error': '',
  //         },
  //       },
  //       'balance-api-success': {
  //         english: {
  //           'balance-api-success':
  //             'Dear @firstname, your Actual Balance is @app-currency-code @actual-balance and Available Balance is @app-currency-code @available-balance .Continue?',
  //           'balance-api-success-error':
  //             'Invalid selection! Your Actual Balance is @app-currency-code @actual-balance and Available Balance is @app-currency-code @available-balance .Continue?',
  //         },
  //       },
  //       'imsi-check-failed': {
  //         english: {
  //           'imsi-check-failed':
  //             'END Dear customer, the SIM card you are using is currently not in our database. Kindly visit your nearest branch to update your details.',
  //         },
  //         swahili: {
  //           'imsi-check-failed': '',
  //         },
  //       },
  //       'load-wallet': {
  //         english: {
  //           'load-wallet-debit-account':
  //             'Please select the account to deposit to',
  //           'load-wallet-debit-account-error':
  //             'Invalid selection! Please select the account to deposit to',
  //           'load-wallet-debit-account-options-error':
  //             'Dear @firstname, you currently do not have any linked accounts.Do you want to do another transaction',
  //           'load-wallet-debit-account-fosa':
  //             'Please select the FOSA account to deposit to',
  //           'load-wallet-debit-account-bosa':
  //             'Please select the BOSA account to deposit to',
  //           'load-wallet-debit-account-fosa-error':
  //             'Invalid selection! Please select the FOSA account to deposit to',
  //           'load-wallet-debit-account-bosa-error':
  //             'Invalid selection! Please select the BOSA account to deposit to',
  //           'load-wallet-debit-account-fosa-options-error':
  //             'Dear @firstname, you currently do not have any linked FOSA accounts.Do you want to do another transaction',
  //           'load-wallet-debit-account-bosa-options-error':
  //             'Dear @firstname, you currently do not have any linked BOSA accounts.Do you want to do another transaction',
  //           'load-wallet-amount':
  //             'Please enter the amount to deposit (minimum @currency-code @amount-minimum )',
  //           'load-wallet-amount-error':
  //             'Invalid amount! Please enter the amount to deposit (minimum @currency-code @amount-minimum )',
  //           'load-wallet-charges-error':
  //             'Dear @firstname, we are currently unable to fetch the deposit to Mpesa transaction charges for Account @loadwalletCreditAccount. Do you wish to do another transaction ? ',
  //           'load-wallet-confirm':
  //             'Dear @firstname, confirm deposit @currency-code @loadwalletAmount to Account @loadwalletCreditAccount from MPESA Account @msisdn .',
  //           'load-wallet-confirm-error':
  //             'Invalid selection! confirm deposit @currency-code @loadwalletAmount to  Account @loadwalletCreditAccount from MPESA Account @msisdn.',
  //         },
  //       },
  //       'savings-statement': {
  //         english: {
  //           'savings-statement-debit-account': 'Select the account to debit',
  //           'savings-statement-debit-account-error':
  //             'Invalid selection! Select the account to debit',
  //           'savings-statement-account': 'Select the savings account',
  //           'avings-statement-account-error':
  //             'Invalid selection! select the savings account',
  //           'savings-statement-confirm':
  //             'Dear @firstname, you are about to request for a Savings ministatement for account @account , debit account @debitAccount',
  //           'savings-statement-confirm-error':
  //             'Invalid selection! You are about to request for a Savings ministatement for account @account , debit account @debitAccount',
  //         },
  //       },
  //       'stop-cheque': {
  //         english: {
  //           'stop-cheque-account': 'Please select the account to stop a cheque',
  //           'stop-cheque-account-error':
  //             'Invalid selection ! Please select the account to stop a cheque',
  //           'stop-cheque-number': 'Please enter the cheque leaf number',
  //           'stop-cheque-number-error':
  //             'Invalid Cheque Number! Enter the cheque number',
  //           'stop-cheque-confirm':
  //             'Stop Cheque @stopChequeNumber for Account @stopChequeAccount',
  //           'stop-cheque-confirm-error':
  //             'Invalid selection ! stop Cheque @stopChequeNumber for Account @stopChequeAccount',
  //           'stop-cheque-account-options-error':
  //             'You currently do not have any linked accounts.Continue',
  //           'stop-cheque-account-options-error-error':
  //             'Invalid selection ! You currently do not have any linked accounts.Continue',
  //         },
  //         swahili: {
  //           'stop-cheque-account': '',
  //           'stop-cheque-account-error': '',
  //           'stop-cheque-number': '',
  //           'stop-cheque-number-error': '',
  //           'stop-cheque-confirm': '',
  //           'stop-cheque-confirm-error': '',
  //           'stop-cheque-account-options-error': '',
  //           'stop-cheque-account-options-error-error': '',
  //         },
  //       },
  //       'funds-transfer-wallet-to-mobile-money': {
  //         english: {
  //           'ft-same-account-error':
  //             'You cannot transfer funds to the same account. Do you need another service?',
  //           'ft-same-account-error-error':
  //             'Invalid selection! You cannot transfer funds to the same account. Do you need another service?',
  //           'ft-wallet-to-mobile-money-debit-account':
  //             'Please select the account to transfer from',
  //           'ft-wallet-to-mobile-money-debit-account-error':
  //             'Invalid selection! Select the account to transfer from',
  //           'ft-wallet-to-mobile-money-credit-account':
  //             'Please select the account to transfer to',
  //           'ft-wallet-to-mobile-money-credit-account-error':
  //             'Invalid selection! select the account to transfer to',
  //           'ft-wallet-to-mobile-money-amount':
  //             'Please enter the amount to tranfer (minimum @currency-code @funds-transfer-minimum )',
  //           'ft-wallet-to-mobile-money-amount-error':
  //             'Invalid amount! Please enter a valid amount to tranfer (minimum @currency-code @amount-minimum )',
  //           'ft-wallet-to-mobile-money-confirm':
  //             'Confirm @currency-code @fundsTransferAmount from Account -  @fundsTransferDebitAccount to Mobile Number - @billerRefAccount',
  //           'ft-wallet-to-mobile-money-confirm-error':
  //             'Invalid selection! Transfer @currency-code @fundsTransferAmount from Account -  @fundsTransferDebitAccount to Mobile Number - @billerRefAccount',
  //           'ft-wallet-to-mobile-money-other-number':
  //             'Please enter the phone number in the format 07xxxxxxxx',
  //           'ft-wallet-to-mobile-money-other-number-error':
  //             'Invalid phone Number! Enter a valid phone number in the format 07xxxxxxxx',
  //           'ft-wallet-to-mobile-money-debit-account-options-error':
  //             'You currently do not have any linked accounts.Continue',
  //           'ft-wallet-to-mobile-money-credit-account-options-error':
  //             'Invalid selection ! You currently do not have any linked accounts.Continue',
  //         },
  //       },
  //     },
  //     whitelist: {
  //       access: {
  //         '254711940525': 'production',
  //         '254721114064': 'production',
  //       },
  //       details: {
  //         '254711940525': {
  //           name: 'Charlo',
  //           id: '29610150',
  //           'bank-account': '0106004000501',
  //           'bank-branch': 'KE0010010',
  //         },
  //         '254721114064': {
  //           name: 'Francis Irungu Mwangi',
  //           id: '29610150',
  //           'bank-account': '0106004000501',
  //           'bank-branch': 'KE0010010',
  //         },
  //       },
  //       list: ['254711940525', '254721114064'],
  //     },
  //     code: {
  //       decrement_pin_trials: 'return parseInt ( arguments [ 0 ], 10 ) - 1',
  //       crypt_hash: {
  //         hash: '\n\t\t\t\tlet passwordHash       = arguments [ 2 ].HmacSHA256 ( arguments [ 0 ], arguments [ 1 ] )\n\t\t\t\tlet passwordHashBase64 = arguments [ 2 ].enc.Base64.stringify ( passwordHash )\n\n\t\t\t\treturn passwordHashBase64\n\t\t\t',
  //         encrypt:
  //           '\n\t\t\t\tlet secretKey \t\t= arguments [ 1 ]\t\n\t\t\t\tlet encryptionKey \t= secretKey.substr ( 0, 16 )\n\t\t\t\tlet iv_ \t\t\t= secretKey.substr ( secretKey.length - 16 )\n\t\t\t\tlet key\t\t\t\t= arguments [ 2 ].enc.Utf8.parse ( encryptionKey )\n\t\t\t\tlet key_iv\t\t    = arguments [ 2 ].enc.Utf8.parse ( iv_ )\n\t\t\t\tlet plaintext\t\t= arguments [ 2 ].enc.Utf8.parse ( JSON.stringify ( arguments [ 0 ] ) )\n\t\t\t\tlet ciphertext      = arguments [ 2 ].AES.encrypt(\n\t\t\t\t\tplaintext,\n\t\t\t\t\tkey,\n\t\t\t\t\t{\n\t\t\t\t\t\tiv     : key_iv,\n\t\t\t\t\t\tmode   : arguments [ 2 ].mode.CBC,\n\t\t\t\t\t\tpadding: arguments [ 2 ].pad.Pkcs7\n\t\t\t\t\t}\n\t\t\t\t).ciphertext.toString ( arguments [ 2 ].enc.Base64 )\n\n\t\t\t\treturn ciphertext\n\t\t\t',
  //         decrypt:
  //           "\n\t\t\t\tlet secretKey       = arguments [ 1 ]\n\t\t\t\tlet encryptionKey \t= secretKey.substr ( 0, 16 )\n\t\t\t\tlet iv_ \t\t\t= secretKey.substr ( secretKey.length - 16 )\n\t\t\t\tlet key\t\t\t\t= arguments [ 2 ].enc.Utf8.parse ( encryptionKey )\n\t\t\t\tlet key_iv\t\t    = arguments [ 2 ].enc.Utf8.parse ( iv_ )\n\n\t\t\t\tlet bytes = arguments [ 2 ].AES.decrypt ( \n\t\t\t\t\targuments [ 0 ].toString ( arguments [ 2 ].enc.Utf8 ), \n\t\t\t\t\tkey, \n\t\t\t\t\t{\n\t\t\t\t\t\tiv     : key_iv,\n\t\t\t\t\t\tmode   : arguments [ 2 ].mode.CBC,\n\t\t\t\t\t\tpadding: arguments [ 2 ].pad.Pkcs7\n\t\t\t\t\t}\n\t\t\t\t)\n\t\t\t\n\t\t\t\tlet originalText = arguments [ 2 ].enc.Utf8.stringify ( bytes ).toString( 'utf-8' ) \n\t\t\t\n\t\t\t\treturn JSON.parse ( originalText )\n\t\t\t",
  //       },
  //       profile_mapper:
  //         '\r\n\t\tlet obj = arguments [ 0 ].data;\r\n\r\n\t\t//transaction failed\r\n\t\tif ( obj.response.response_code  === \'05\' ) {\r\n\t\t\treturn {\r\n\t\t\t\tstatus: \'failed\',\r\n\t\t\t\tmessage: "The profile request failed"\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\t//account suspended\r\n\t\telse if ( \r\n\t\t\tobj.response.response_code  === \'01\' && \r\n\t\t\tObject.keys ( obj.data ).length === 0  &&\r\n\t\t\tobj.response.response.includes ( \'suspended\' ) \r\n\t\t) {\r\n\t\t\t//user profile data \r\n\t\t\tlet profile = {\r\n\t\t\t\t"account-details"                : {        \r\n\t\t\t\t\t"account-type"               : "client",\r\n\t\t\t\t\t"is-registered"              : true,\r\n\t\t\t\t\t"is-blocked"                 : true,\r\n\t\t\t\t\t"first-login"                : false\r\n\t\t\t\t},\r\n\t\t\t\t"app_contact_name" : "Maisha Bora Support",\r\n\t\t\t\t"app_contact_number" : "254 729 347 882",\r\n\t\t\t\t"app_email" : "support@maishabora.com",\t\t\t\t\r\n\t\t\t\t"shortcode"                      : "*673*1#",\r\n\t\t\t\t"app_description"                : "SC Bank USSD",\t\t\t\t\r\n\t\t\t\t"terms_url"                      : "info@maishabora.com",\r\n\t\t\t\t"app_name"                       : "mobile-banking-ussd@0.0.1",\r\n\t\t\t\t"language"                       : "english",\r\n\t\t\t\t"msisdn"                         : arguments [ 0 ].msisdn,\r\n\t\t\t\t"pin-trials-remaining"           : 3 ,  \r\n\t\t\t\t"global-constants"               : {\r\n\t\t\t\t\t"funds_transfer_minimum"     : 50,\r\n\t\t\t\t\t"airtime_topup_minimum"      : 10,\r\n\t\t\t\t\t"language-options"           : [\r\n\t\t\t\t\t\t{\r\n\t\t\t\t\t\t\t"label"              : "english-label",\r\n\t\t\t\t\t\t\t"value"              : "english"\r\n\t\t\t\t\t\t},\r\n\t\t\t\t\t\t{\r\n\t\t\t\t\t\t\t"label"              : "swahili-label",\r\n\t\t\t\t\t\t\t"value"              : "swahili"\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t],\r\n\t\t\t\t\t"yes-no-options"             : [\r\n\t\t\t\t\t\t{\r\n\t\t\t\t\t\t\t"label"              : "yes-label",\r\n\t\t\t\t\t\t\t"value"              : "1"\r\n\t\t\t\t\t\t},\r\n\t\t\t\t\t\t{\r\n\t\t\t\t\t\t\t"label"              : "no-label",\r\n\t\t\t\t\t\t\t"value"              : "2"\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t],\r\n\t\t\t\t\t"confirm-options"            : [\r\n\t\t\t\t\t\t{\r\n\t\t\t\t\t\t\t"label"              : "confirm-label",\r\n\t\t\t\t\t\t\t"value"              : "1"\r\n\t\t\t\t\t\t},\r\n\t\t\t\t\t\t{\r\n\t\t\t\t\t\t\t"label"              : "cancel-label",\r\n\t\t\t\t\t\t\t"value"              : "2"\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t]\r\n\t\t\t\t},\r\n\t\t\t\t"global-request-details"        : {}\r\n\t\t\t}\r\n\r\n\t\t\treturn {\r\n\t\t\t\tstatus: \'success\',\r\n\t\t\t\tmessage: profile\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\t//not registered\r\n\t\telse if ( \r\n\t\t\tobj.response.response_code  === \'01\' && \r\n\t\t\tObject.keys ( obj.data ).length === 0 \r\n\t\t) {\r\n\t\t\t//user profile data \r\n\t\t\tlet profile = {\r\n\t\t\t\t"account-details"                : {        \r\n\t\t\t\t\t"account-type"               : "client",\r\n\t\t\t\t\t"is-registered"              : false,\r\n\t\t\t\t\t"is-blocked"                 : false,\r\n\t\t\t\t\t"first-login"                : false\r\n\t\t\t\t},\r\n\t\t\t\t"app_description"                : "SC Bank USSD",\r\n\t\t\t\t"app_name"                       : "mobile-banking-ussd@0.0.1",\t\t\t\t\r\n\t\t\t\t"shortcode"                      : "*605*52#",\r\n\t\t\t\t"language"                       : "english",\t\t\t\t\r\n\t\t\t\t"terms_url"                      : "info@maishabora.com",\r\n\t\t\t\t"msisdn"                         : arguments [ 0 ].msisdn,\r\n\t\t\t\t"pin-trials-remaining"           : 3 ,  \r\n\t\t\t\t"global-constants"               : {\r\n\t\t\t\t\t"funds_transfer_minimum"     : 50,\r\n\t\t\t\t\t"airtime_topup_minimum"      : 10,\r\n\t\t\t\t\t"language-options"           : [\r\n\t\t\t\t\t\t{\r\n\t\t\t\t\t\t\t"label"              : "english-label",\r\n\t\t\t\t\t\t\t"value"              : "english"\r\n\t\t\t\t\t\t},\r\n\t\t\t\t\t\t{\r\n\t\t\t\t\t\t\t"label"              : "swahili-label",\r\n\t\t\t\t\t\t\t"value"              : "swahili"\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t],\r\n\t\t\t\t\t"yes-no-options"             : [\r\n\t\t\t\t\t\t{\r\n\t\t\t\t\t\t\t"label"              : "yes-label",\r\n\t\t\t\t\t\t\t"value"              : "1"\r\n\t\t\t\t\t\t},\r\n\t\t\t\t\t\t{\r\n\t\t\t\t\t\t\t"label"              : "no-label",\r\n\t\t\t\t\t\t\t"value"              : "2"\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t],\r\n\t\t\t\t\t"confirm-options"            : [\r\n\t\t\t\t\t\t{\r\n\t\t\t\t\t\t\t"label"              : "confirm-label",\r\n\t\t\t\t\t\t\t"value"              : "1"\r\n\t\t\t\t\t\t},\r\n\t\t\t\t\t\t{\r\n\t\t\t\t\t\t\t"label"              : "cancel-label",\r\n\t\t\t\t\t\t\t"value"              : "2"\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t]\r\n\t\t\t\t},\r\n\t\t\t\t"global-request-details"        : {}\r\n\t\t\t}\r\n\r\n\t\t\treturn {\r\n\t\t\t\tstatus: \'success\',\r\n\t\t\t\tmessage: profile\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\t//registered\r\n\t\telse if ( obj.response.response_code  === \'00\') {\r\n\t\t\tconsole.log ( "Processing Object")\r\n\t\t\t//response mapping to standard USSD Mobile Banking format:\r\n\t\t\tlet accountType    = \'client\';\r\n\t\t\tlet firstLogin     = false;\r\n\t\t\tlet isRegistered   = false;\r\n\t\t\tlet isBlocked      = false;\r\n\t\t\tlet linkedAccounts = [];\r\n\r\n\t\t\tif ( Object.keys ( obj.data ).length  === 0 ) {\r\n\t\t\t\tisBlocked = true;\r\n\t\t\t}\r\n\r\n\t\t\tif ( obj.data.registered  \t\t=== \'0\'  ) {\r\n\t\t\t\tfirstLogin = true;\r\n\t\t\t}\r\n\t\t\tif ( obj.data.registered \t\t===  \'2\'  ){\r\n\t\t\t\tisBlocked = true;\r\n\t\t\t}\r\n\t\t\tif ( obj.response.response_code \t=== \'00\' ) {\r\n\t\t\t\tisRegistered = true;\r\n\t\t\t}\r\n\t\t\t\r\n\t\t\t//map accounts\r\n\t\t\tif ( obj.data.account.accounts ) {\r\n\r\n\t\t\t\tlet accounts = obj.data.account.accounts;\r\n\r\n\t\t\t\taccounts = accounts.map ( ( account) => {\r\n\t\t\t\t\t if ( account.account_type !==\'FOSA\' && account.account_type !==\'SAVINGS\' ) {return {\r\n\t\t\t\t\t\tlabel: /** account.account_name*/\'EWALLET - \' + account.account_number,\r\n\t\t\t\t\t\tvalue: account.account_number,\r\n\t\t\t\t\t\ttype : account.account_type\r\n\t\t\t\t\t}}\r\n\t\t\t\t})\r\n\r\n\t\t\t\tlinkedAccounts = accounts\r\n\t\t\t}\r\n\r\n\t\t\t//user profile data \r\n\t\t\tlet profile = {\r\n\t\t\t\t"account-details"                : {        \r\n\t\t\t\t\t"account-type"               : accountType,\r\n\t\t\t\t\t"identification-id"          : obj.data.account.customer_number,\r\n\t\t\t\t\t"is-registered"              : isRegistered,\r\n\t\t\t\t\t"is-blocked"                 : isBlocked,\r\n\t\t\t\t\t"first-login"                : firstLogin,\r\n\t\t\t\t\t"firstname"                  : obj.data.account.first_name,\r\n\t\t\t\t\t"surname"                    : obj.data.account.last_name,\r\n\t\t\t\t\t"othername"                  : obj.data.account.other_name || \'\',\r\n\t\t\t\t\t"fullname"                   : obj.data.account.full_name || \'\',\r\n\t\t\t\t\t"active"                     : obj.data.registered ,\r\n\t\t\t\t\t"loan-limit"                 : parseInt ( obj.data.loan_scored || 0,10 ) || \'0\',\r\n\t\t\t\t\t"pin"                        : obj.data.PIN || "",\r\n\t\t\t\t\t"fosa-accounts"              : linkedAccounts,  \r\n\t\t\t\t\t"loan-accounts"              : [],      \r\n\t\t\t\t\t"owned-accounts"             : [],\r\n\t\t\t\t\t"current-loans"              : [],\r\n\t\t\t\t\t"search-options"             : []\r\n\t\t\t\t},\r\n\t\t\t\t"app_contact_name" \t\t\t\t : "Maisha Bora Support",\r\n\t\t\t\t"app_contact_number" \t\t\t : "254 729 347 882",\r\n\t\t\t\t"shortcode"                      : "*605*71#",\r\n\t\t\t\t"app_email" \t\t\t\t\t : "support@maishabora.com",\r\n\t\t\t\t"app_description"                : "SC Bank USSD",\r\n\t\t\t\t"app_name"                       : "mobile-banking-ussd@0.0.1",\r\n\t\t\t\t"language"                       : "english",\r\n\t\t\t\t"currency_code"                  : "KES",\r\n\t\t\t\t"terms_url"                      : "info@maishabora.com",\r\n\t\t\t\t"msisdn"                         : obj.data.account.username,\r\n\t\t\t\t"email"                          : obj.data.account.email_address,\r\n\t\t\t\t"pin-trials-remaining"           : 3 - parseInt ( obj.data.account.login_trials || 0, 10 ) ,  \r\n\t\t\t\t"global-constants"               : {\r\n\t\t\t\t\t"funds_transfer_minimum"     : 50,\r\n\t\t\t\t\t"minimum-billpayment-amount" : 200,\r\n\t\t\t\t\t"minimum-airtime-amount"     : 10,\r\n\t\t\t\t\t"airtime_topup_minimum"      : 10,\r\n\t\t\t\t\t"language-options"           : [\r\n\t\t\t\t\t\t{\r\n\t\t\t\t\t\t\t"label"              : "english-label",\r\n\t\t\t\t\t\t\t"value"              : "english"\r\n\t\t\t\t\t\t},\r\n\t\t\t\t\t\t{\r\n\t\t\t\t\t\t\t"label"              : "swahili-label",\r\n\t\t\t\t\t\t\t"value"              : "swahili"\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t],\r\n\t\t\t\t\t"yes-no-options"             : [\r\n\t\t\t\t\t\t{\r\n\t\t\t\t\t\t\t"label"              : "yes-label",\r\n\t\t\t\t\t\t\t"value"              : "1"\r\n\t\t\t\t\t\t},\r\n\t\t\t\t\t\t{\r\n\t\t\t\t\t\t\t"label"              : "no-label",\r\n\t\t\t\t\t\t\t"value"              : "2"\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t],\r\n\t\t\t\t\t"confirm-options"            : [\r\n\t\t\t\t\t\t{\r\n\t\t\t\t\t\t\t"label"              : "confirm-label",\r\n\t\t\t\t\t\t\t"value"              : "1"\r\n\t\t\t\t\t\t},\r\n\t\t\t\t\t\t{\r\n\t\t\t\t\t\t\t"label"              : "cancel-label",\r\n\t\t\t\t\t\t\t"value"              : "2"\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t]\r\n\t\t\t\t},\r\n\t\t\t\t"global-request-details"        : {}\r\n\t\t\t}\r\n\r\n\t\t\treturn {\r\n\t\t\t\tstatus: \'success\',\r\n\t\t\t\tmessage: profile\r\n\t\t\t}\r\n\t\t}\t\t\r\n\t',
  //       login_mapper:
  //         '\r\n\tlet obj = arguments [ 0 ].data;\r\n\tif ( obj.response.response_code === \'01\' ) {\r\n\t\treturn {\r\n\t\t\tstatus : "failed"\r\n\t\t}\r\n\r\n\t}\r\n\tif ( obj.response.response_code === \'00\' ) {\r\n\t\treturn {\r\n\t\t\tstatus : "success",\r\n\t\t\tmessage : {\r\n\t\t\t\taccess_token: obj.data.access_token\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n',
  //       reset_pin_trials: 'return 3',
  //     },
  //   };

  //   boilerplate['config']['app-name'] = ussdName.concat('-ussd@0.0.1');

  //   boilerplate['config']['meta-data']['app-name'] =
  //     ussdName.concat('-ussd@0.0.1');

  //   boilerplate['config']['meta-data']['app-contact-name'] = ussdName;

  //   boilerplate['config']['meta-data']['app-description'] = ussdName
  //     .toUpperCase()
  //     .concat(' USSD');

  //   boilerplate['config']['meta-data']['app-client'] = ussdName;

  //   boilerplate['api']['mb-api']['meta-data']['appName'] = ussdName
  //     .toUpperCase()
  //     .concat(' USSD');

  //   boilerplate['api']['mb-api']['meta-data']['currency'] = 'KES';
  //   boilerplate['api']['mb-api']['meta-data']['country-code'] = 'KE';

  //   const reqBodyKeys = Object.keys(boilerplate);
  //   ['prompts', 'api'];

  //   reqBodyKeys.map((key: string) => {
  //     const objKeys = Object.keys(boilerplate[key]);

  //     objKeys.map(async (objKey) => {
  //       const saveToRedisFunc = await this.redisClient.hset(
  //         `${ussdName.concat('-ussd@0.0.1')}:config:${key}`,
  //         objKey,
  //         JSON.stringify(boilerplate[key][objKey]),
  //       );

  //       if (!!saveToRedisFunc) {
  //         console.log('Saved - ', objKey);
  //       }
  //     });
  //   });
  //   return {
  //     respCode: '00',
  //     msg: `${ussdName.concat('-ussd@0.0.1')} successfully created`,
  //   };
  // }