Harmony Staking SDK
===================

Harmony Staking SDK is a library that allows you to interact with the Harmony blockchain and delegate tokens to validators, undelegate them, collect staking rewards, and send tokens to other users.

Installation
------------

To install the Harmony Staking SDK, use the following command:

Copy code

`npm install harmony-staking-sdk`

Usage
-----

### Staking Contract

The `StakingContract` class allows you to delegate tokens to validators, undelegate them, collect staking rewards, and send tokens to other users. To use this class, you need to provide the following parameters:

*   `rpcUrl`: The RPC endpoint for the Harmony network you want to interact with.
*   `privateKey`: The private key of the account that you want to use to perform the operations. If you don't provide a private key, the SDK will try to use the Metamask wallet if it's installed in your browser.
*   `contractAddress`: The address of the Harmony staking contract you want to interact with.
*   `gasPrice`, `gasPriceRewards`, `gasLimit`: The gas price and gas limit to use when sending transactions to the Harmony network.

Example:

javascriptCopy code

``import { StakingContract } from 'harmony-staking-sdk';  const stakingContract = new StakingContract({   rpcUrl: 'https://api.harmony.one',   privateKey: 'YOUR_PRIVATE_KEY',   contractAddress: '0x00000000000000000000000000000000000000FC',   gasPrice: '100',   gasPriceRewards: '200',   gasLimit: '25000' });  await stakingContract.delegate('VALIDATOR_ADDRESS', 'AMOUNT_IN_ETHER', tx => {   console.log(`Transaction hash: ${tx}`); });  await stakingContract.unDelegate('VALIDATOR_ADDRESS', 'AMOUNT_IN_ETHER', tx => {   console.log(`Transaction hash: ${tx}`); });  await stakingContract.collectRewards(tx => {   console.log(`Transaction hash: ${tx}`); });  await stakingContract.send('RECEIVER_ADDRESS', 'AMOUNT_IN_ETHER', tx => {   console.log(`Transaction hash: ${tx}`); });``

### Staking API

The `StakingAPI` class allows you to fetch information about validators, delegations, network info, and more. To use this class, you need to provide the following parameters:

*   `apiUrl`: The API endpoint for the Harmony staking API.

Example:

javascriptCopy code

`import { StakingAPI } from 'harmony-staking-sdk';  const stakingApi = new StakingAPI({   apiUrl: 'https://api.stake.hmny.io' });  const validators = await stakingApi.fetchValidators('testnet');  console.log(validators);`

Contributing
------------

We welcome contributions to the Harmony Staking SDK! If you'd like to contribute, please submit a pull request to the `develop` branch. Make sure to include tests for your code, and to run the existing tests using `npm test` before submitting your pull request.

License
-------

Harmony Staking SDK is [MIT licensed](https://github.com/harmony-one/staking-sdk/blob/main/LICENSE).