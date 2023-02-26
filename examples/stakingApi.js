const { StakingAPI } = require('..');

const main = async () => {
    // create an instance of the StakingAPI class
    const stakingAPI = new StakingAPI({ apiUrl: "https://api.stake.hmny.io" });
  
    // fetch the list of available networks
    const networks = await stakingAPI.fetchNetworks();
    console.log("Networks:", networks);
  
    // fetch the list of validators for the mainnet
    const validators = await stakingAPI.fetchValidators("mainnet");
    console.log("Validators:", validators);
  
    // fetch the details of a validator with a specific address
    const validatorAddress = "one1w7nvheulzwprf9d9a3r8sqtv5q47qlqx7kured";
    const validatorDetails = await stakingAPI.fetchValidatorByAddress(
      "mainnet",
      validatorAddress
    );
    console.log("Validator Details:", validatorDetails);
  
    // fetch the delegations for a specific address
    const delegations = await stakingAPI.fetchDelegationsByAddress(
      "mainnet",
      validatorAddress
    );
    console.log("Delegations:", delegations);
  
    // fetch the staking network information for the mainnet
    const networkInfo = await stakingAPI.fetchNetworkInfo("mainnet");
    console.log("Network Info:", networkInfo);
  
    // fetch the staking network information (lite) for the mainnet
    const networkInfoLite = await stakingAPI.fetchNetworkInfoLite("mainnet");
    console.log("Network Info Lite:", networkInfoLite);
  };
  
  main().catch((error) => console.error(error));