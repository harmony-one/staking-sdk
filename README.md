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

```js
import { StakingContract } from 'harmony-staking-sdk';

const stakingContract = new StakingContract({
  // Set the RPC endpoint for the Harmony network
  rpcUrl: 'https://api.harmony.one',
  // Set your private key for signing transactions
  privateKey: 'YOUR_PRIVATE_KEY',
});

// Delegate some amount of ONE tokens to a validator
await stakingContract.delegate(
  'VALIDATOR_ADDRESS', 
  'AMOUNT_IN_ETHER', 
  tx => { 
    console.log(`Transaction hash: ${tx}`);
  }
);

// Undelegate some amount of ONE tokens from a validator
await stakingContract.unDelegate(
  'VALIDATOR_ADDRESS', 
  'AMOUNT_IN_ETHER', 
  tx => { 
    console.log(`Transaction hash: ${tx}`);
  }
);

// Collect rewards from all validators where the account has staked
await stakingContract.collectRewards(tx => { 
  console.log(`Transaction hash: ${tx}`);
});

// Send some amount of ONE tokens to a receiver address
await stakingContract.send(
  'RECEIVER_ADDRESS', 
  'AMOUNT_IN_ETHER', 
  tx => { 
    console.log(`Transaction hash: ${tx}`);
  }
);
```

### Staking API

The `StakingAPI` class allows you to fetch information about validators, delegations, network info, and more. To use this class, you need to provide the following parameters:

*   `apiUrl`: The API endpoint for the Harmony staking API.

Example:

```js
const { StakingAPI, NETWORK_TYPE } = require('harmony-staking-sdk');

const stakingApi = new StakingAPI({ apiUrl: 'https://api.stake.hmny.io' });

// Fetch list of available networks
stakingApi.fetchNetworks()
  .then((networks) => {
    console.log('Available networks:', networks);
  })
  .catch((err) => {
    console.error('Error fetching networks:', err);
  });

// Fetch list of validators for the mainnet
stakingApi.fetchValidators(NETWORK_TYPE.MAINNET)
  .then((validators) => {
    console.log('Validators:', validators);
  })
  .catch((err) => {
    console.error('Error fetching validators:', err);
  });

// Fetch information about a specific validator
const validatorAddress = 'one1w7nvheulzwprf9d9a3r8sqtv5q47qlqx7kured';

stakingApi.fetchValidatorByAddress(NETWORK_TYPE.MAINNET, validatorAddress)
  .then((validator) => {
    console.log('Validator information:', validator);
  })
  .catch((err) => {
    console.error(`Error fetching validator information for address ${validatorAddress}:`, err);
  });

// Fetch the avatar URL for a specific validator
const avatarUrl = stakingApi.getValidatorAvatarUrl(NETWORK_TYPE.MAINNET, validatorAddress);

console.log('Avatar URL:', avatarUrl);

// Fetch historical data for a specific validator
stakingApi.fetchValidatorHistory(NETWORK_TYPE.MAINNET, validatorAddress)
  .then((history) => {
    console.log('Validator history:', history);
  })
  .catch((err) => {
    console.error(`Error fetching validator history for address ${validatorAddress}:`, err);
  });

// Fetch the list of delegations for a specific address
const delegatorAddress = 'one13hnlv6vmyj6umjtf6kafwy6w3vq3ynzxs8tuzy';

stakingApi.fetchDelegationsByAddress(NETWORK_TYPE.MAINNET, delegatorAddress)
  .then((delegations) => {
    console.log('Delegations:', delegations);
  })
  .catch((err) => {
    console.error(`Error fetching delegations for address ${delegatorAddress}:`, err);
  });

// Fetch network information for the mainnet
stakingApi.fetchNetworkInfo(NETWORK_TYPE.MAINNET)
  .then((info) => {
    console.log('Network information:', info);
  })
  .catch((err) => {
    console.error('Error fetching network information:', err);
  });
```

Contributing
------------

We welcome contributions to the Harmony Staking SDK! If you'd like to contribute, please submit a pull request to the `develop` branch. Make sure to include tests for your code, and to run the existing tests using `npm test` before submitting your pull request.

License
-------

Harmony Staking SDK is [MIT licensed](https://github.com/harmony-one/staking-sdk/blob/main/LICENSE).