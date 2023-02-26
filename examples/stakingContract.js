const { StakingContract } = require("..");

const main = async () => {
    console.log("Starting sdk test...");

    const stakingContractConfig = {
        rpcUrl: "https://api.harmony.one", // replace with actual RPC URL
        privateKey: "your-private-key-here", // replace with actual private key
    };

    const validatorAddress = "one1w7nvheulzwprf9d9a3r8sqtv5q47qlqx7kured";
    const receiverAddress = "0x431E2eE66080A1d13B82F947B5C89e8c91EF95D1";

    console.log("Init new StakingContract instance");
    const stakingContract = new StakingContract(stakingContractConfig);

    // check the balance of the account associated with the contract instance
    const balance = await stakingContract.web3.eth.getBalance(stakingContract.accountAddress);
    console.log("Account balance:", stakingContract.web3.utils.fromWei(balance));

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

    console.log("Calling collectRewards...");
    result = await stakingContract.collectRewards(
        (tx) => {
            console.log(`collectRewards transaction sent: ${tx}`);
        }
    );
    console.log("collectRewards transaction confirmed:", result);

    console.log("Calling send...");
    result = await stakingContract.send(
        receiverAddress,
        "1",
        (tx) => {
            console.log(`Send transaction sent: ${tx}`);
        }
    );
    console.log("Send transaction confirmed:", result);

    console.log("Sdk test complete.");
};

main();