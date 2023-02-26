import { Contract } from "web3-eth-contract";
import { HttpProvider } from "web3-core";
import { AbiItem, toWei } from "web3-utils";
import Web3 from "web3";
import { toChecksumAddress } from "@harmony-js/crypto";
import { abi } from './abi'

interface IStakingContractConfig {
  contractAddress?: string;
  provider?: HttpProvider;
  rpcUrl?: string;
  privateKey?: string
  gasPrice?: string;
  gasPriceRewards?: string;
  gasLimit?: string;
}

const DEFAULT_CONTRACT_ADDRESS = "0x00000000000000000000000000000000000000FC";

export class StakingContract {
  protected contract: Contract

  public web3: Web3
  public accountAddress: string
  protected privateKeyMode = false;

  protected gasPrice = toWei('100', 'Gwei');
  protected gasPriceRewards = toWei('200', 'Gwei');
  protected gasLimit = '100000';

  constructor(config: IStakingContractConfig) {
    this.accountAddress = '';

    const rpcUrl = config.rpcUrl || 'https://api.harmony.one';
    const provider = config.provider || new Web3.providers.HttpProvider(rpcUrl);

    this.web3 = new Web3(provider)

    if (config.privateKey) {
      const account = this.web3.eth.accounts.privateKeyToAccount(config.privateKey);
      this.web3.eth.accounts.wallet.add(account);
      this.accountAddress = account.address;
      this.privateKeyMode = true;
    }

    this.checkPrivateKeyForNodeJsMode();

    this.contract = new this.web3.eth.Contract(
      abi as AbiItem[],
      config.contractAddress || DEFAULT_CONTRACT_ADDRESS
    );

    if (config.gasPrice) {
      this.gasPrice = config.gasPrice;
    }

    if (config.gasPriceRewards) {
      this.gasPriceRewards = config.gasPriceRewards;
    }

    if (config.gasLimit) {
      this.gasLimit = config.gasLimit;
    }
  }

  private checkPrivateKeyForNodeJsMode() {
    //@ts-ignore
    if (!this.privateKeyMode && !window?.ethereum) {
      throw new Error('For using staking sdk without Metamask - you need to set Private Key');
    }
  }

  private async checkAccountAddress() {
    this.checkPrivateKeyForNodeJsMode();

    if (!this.privateKeyMode) {
      //@ts-ignore
      const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      this.accountAddress = address;
    }
  }

  public async getAccountAddress() {
    await this.checkAccountAddress();

    return this.accountAddress;
  }

  /**
    Delegate specified amount of tokens to the specified validator.
    @param {string} validatorAddress - The address of the validator to delegate to.
    @param {string} amount - The amount of tokens to delegate, in ether.
    @param {(tx: string) => void} sendTxCallback - A callback function to be executed when the transaction is sent.
    @returns {Promise<any>} - A promise that resolves to the transaction receipt.
  */
  public async delegate(
    validatorAddress: string,
    amount: string,
    sendTxCallback: (tx: string) => void
  ) {
    await this.checkAccountAddress();

    const networkGasPrice = await this.web3.eth.getGasPrice();
    const gasPrice = Math.max(Number(networkGasPrice), Number(this.gasPrice));

    const amountWei = toWei(amount, 'ether');
    const validatorAddressHex = toChecksumAddress(validatorAddress);

    const result = await this.contract.methods.Delegate(
      this.accountAddress,
      validatorAddressHex,
      amountWei
    ).send({ from: this.accountAddress, gasPrice, gas: this.gasLimit })
      .on('transactionHash', sendTxCallback);

    return result;
  }

  /**
    Un-delegates specified amount of tokens from the validator.
    @param validatorAddress The address of the validator to un-delegate from.
    @param amount The amount of tokens to un-delegate, in ether.
    @param sendTxCallback The callback function to be called with the transaction hash once the transaction is sent.
    @returns A Promise that resolves with the transaction receipt when the transaction is confirmed.
  */
  public async unDelegate(
    validatorAddress: string,
    amount: string,
    sendTxCallback: (tx: string) => void
  ) {
    await this.checkAccountAddress();

    const networkGasPrice = await this.web3.eth.getGasPrice();
    const gasPrice = Math.max(Number(networkGasPrice), Number(this.gasPrice));

    const amountWei = toWei(amount, 'ether');
    const validatorAddressHex = toChecksumAddress(validatorAddress);

    const result = await this.contract.methods.Undelegate(
      this.accountAddress,
      validatorAddressHex,
      amountWei
    )
      .send({ from: this.accountAddress, gasPrice, gas: this.gasLimit })
      .on('transactionHash', sendTxCallback);

    return result;
  }

  /**
    Collect the staking rewards earned by the account associated with the contract instance.
    @param {Function} sendTxCallback - A callback function to handle the transaction hash of the sent transaction.
    @returns {Promise<any>} - A promise that resolves with the transaction receipt object when the transaction is confirmed on the blockchain.
    @throws {Error} - Throws an error if the account address is not set.
  */
  public async collectRewards(sendTxCallback: (tx: string) => void) {
    await this.checkAccountAddress();

    const networkGasPrice = await this.web3.eth.getGasPrice();
    const gasPrice = Math.max(Number(networkGasPrice), Number(this.gasPrice));

    const result = await this.contract.methods.CollectRewards(this.accountAddress)
      .send({ from: this.accountAddress, gasPrice, gas: this.gasLimit })
      .on('transactionHash', sendTxCallback);

    return result;
  }

  /**
    Sends a transaction of a specified amount of ether to a given receiver address.
    @param {string} receiverAddress - The Ethereum address of the recipient of the transaction.
    @param {string} amount - The amount of ether to be sent in the transaction.
    @param {(tx: string) => void} sendTxCallback - A callback function that will be called with the transaction hash once the transaction has been sent.
    @returns {Promise<any>} - A promise that resolves to the result of the transaction.
  */
  public async send(
    receiverAddress: string,
    amount: string,
    sendTxCallback: (tx: string) => void
  ) {
    await this.checkAccountAddress();

    const networkGasPrice = await this.web3.eth.getGasPrice();
    const gasPrice = Math.max(Number(networkGasPrice), Number(this.gasPrice));

    const amountWei = toWei(amount, 'ether');
    const receiverAddressHex = toChecksumAddress(receiverAddress);

    const result = await this.web3.eth.sendTransaction({
      to: receiverAddressHex,
      value: amountWei,
      from: this.accountAddress,
      gasPrice,
      gas: this.gasLimit
    })
      .on('transactionHash', sendTxCallback);

    return result;
  }
}
