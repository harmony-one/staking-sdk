const { StakingContract, StakingAPI } = require("harmony-staking-sdk");

const displayUserBalanse = async (accountAddress, stakingContract) => {
    // check the balance of the account associated with the contract instance
    const balance = await stakingContract.web3.eth.getBalance(accountAddress);
    console.log("Account balance:", stakingContract.web3.utils.fromWei(balance));
}

const displayUserDelegations = async (accountAddress, stakingApi) => {
    const delegations = await stakingApi.fetchDelegationsByAddress(
        'mainnet',
        accountAddress
    );

    console.log("Delegations:", delegations);

    console.log("Undelegations:", delegations.map(d => ({
        validatorName: d.validatorName,
        validatorAddress: d.validatorAddress,
        ...d.undelegations
    })));
}

const main = async () => {
    console.log("Starting e2e Delegation - UnDelegation test...");

    const stakingContractConfig = {
        rpcUrl: "https://api.harmony.one", // replace with actual RPC URL
        privateKey: "your-private-key-here", // replace with actual private key
    };

    console.log("Init new StakingContract instance");
    const stakingContract = new StakingContract(stakingContractConfig);

    console.log("Init new StakingAPI instance");
    const stakingApi = new StakingAPI();

    await displayUserBalanse(stakingContract.accountAddress, stakingContract)
    await displayUserDelegations(stakingContract.accountAddress, stakingApi);

    const validatorAddress = "one1w7nvheulzwprf9d9a3r8sqtv5q47qlqx7kured";

    // call the methods in the desired order
    console.log("Calling delegate...");
    let result = await stakingContract.delegate(
        validatorAddress,
        "100",
        (tx) => {
            console.log(`Delegate transaction sent: ${tx}`);
        }
    );
    console.log("Delegate transaction confirmed:", result);

    console.log("Calling unDelegate...");
    result = await stakingContract.unDelegate(
        validatorAddress,
        "100",
        (tx) => {
            console.log(`Undelegate transaction sent: ${tx}`);
        }
    );
    console.log("Undelegate transaction confirmed:", result);

    await displayUserBalanse(stakingContract.accountAddress, stakingContract)
    await displayUserDelegations(stakingContract.accountAddress, stakingApi);

    console.log("Test complete.");
};

main();
