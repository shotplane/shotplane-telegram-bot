import Web3 from "web3";
class BlockchainService {
  web3: Web3 & any;
  contract: any;
  privateKey: string;
  
  constructor({ providerUrl, privateKey }: { providerUrl: string, privateKey: string }) {
    this.web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));
    this.privateKey = privateKey;
  }

  async getContract(address, abi) {
    this.contract = new this.web3.eth.Contract(JSON.parse(abi), address);
    return { web3: this.web3, contract: this.contract };
  }

  async getContractvsTx(address, abi, blockNumber, transactionHash) {
    const contract = new this.web3.eth.Contract(JSON.parse(abi), address);
    const blockData = await this.web3.eth.getBlock(blockNumber);
    if (!blockData) {
      throw new Error("Invalid block data");
    }
    const existedTxHash = blockData.transactions.find((txHash) => txHash === transactionHash);
    if (!existedTxHash) {
      throw new Error("Transaction hash not found in the block");
    }
    const transaction = await this.web3.eth.getTransactionReceipt(existedTxHash);
    if (!transaction) {
      throw new Error("Transaction receipt not found");
    }

    return { transaction, contract };
  }

  async ClaimToWonCoin(txHash, receiverAddr, coinSymbol, fromChain, toChain) {
    const account = this.web3.eth.accounts.wallet.add(this.privateKey);
    const method = this.contract.methods.ClaimToWonCoin(txHash, receiverAddr, coinSymbol, fromChain, toChain);
    return method.send({
      from: account.address,
      gas: 3000000
    });
  }


  async addApprovedTokenAddress(tokenAddress: string) {
    const account = this.web3.eth.accounts.wallet.add(this.privateKey);
    return this.contract.methods.addApprovedTokenAddress(tokenAddress).send({
      from: account.address,
      gas: 3000000
    });
  }

  async removeApprovedTokenAddress(tokenAddress: string) {
    const account = this.web3.eth.accounts.wallet.add(this.privateKey);
    return this.contract.methods.removeApprovedTokenAddress(tokenAddress).send({
      from: account.address,
      gas: 3000000
    });
  }

  async crossFromToken(amount: number, tokenAddress: string, receiverAddress: string, token: string, fromChain: number, toChain: number) {
    const account = this.web3.eth.accounts.wallet.add(this.privateKey);
    return this.contract.methods.crossFromToken(amount, tokenAddress, receiverAddress, token, fromChain, toChain).send({
      from: account.address,
      gas: 3000000
    });
  }

  async crossFromWonCoin(amount: number, receiverAddress: string, token: string, fromChain: number, toChain: number) {
    const account = this.web3.eth.accounts.wallet.add(this.privateKey);
    // const amountInWei = Web3.utils.toWei(amount.toString(), 'ether');
    return this.contract.methods.crossFromWonCoin(amount, receiverAddress, token, fromChain, toChain).send({
      from: account.address,
      gas: 3000000,
    });
  }

  async isTokenApproved(tokenAddress: string) {
    return this.contract.methods.isTokenApproved(tokenAddress).call();
  }

  async setApprover(approver: string) {
    const account = this.web3.eth.accounts.wallet.add(this.privateKey);
    return this.contract.methods.setApprover(approver).send({
      from: account.address,
      gas: 3000000
    });
  }

  async setbridgeUtilsAddress(bridgeUtilsAddress: string) {
    const account = this.web3.eth.accounts.wallet.add(this.privateKey);
    return this.contract.methods.setbridgeUtilsAddress(bridgeUtilsAddress).send({
      from: account.address,
      gas: 3000000
    });
  }

  async setcontract(paused: boolean) {
    const account = this.web3.eth.accounts.wallet.add(this.privateKey);
    return this.contract.methods.setcontract(paused).send({
      from: account.address,
      gas: 3000000
    });
  }

  async setfundFromWallet(fundFrom: string) {
    const account = this.web3.eth.accounts.wallet.add(this.privateKey);
    return this.contract.methods.setfundFromWallet(fundFrom).send({
      from: account.address,
      gas: 3000000
    });
  }

  async setfundToWallet(fundTo: string) {
    const account = this.web3.eth.accounts.wallet.add(this.privateKey);
    return this.contract.methods.setfundToWallet(fundTo).send({
      from: account.address,
      gas: 3000000
    });
  }

  async setgetBnbWallet(getBnbWallet: string) {
    const account = this.web3.eth.accounts.wallet.add(this.privateKey);
    return this.contract.methods.setgetBnbWallet(getBnbWallet).send({
      from: account.address,
      gas: 3000000
    });
  }

  async setContract(paused: boolean) {
    const account = this.web3.eth.accounts.wallet.add(this.privateKey);
    return this.contract.methods.setContract(paused).send({
      from: account.address,
      gas: 3000000
    });
  }

  async setFundFromWallet(fundFrom: string) {
    const account = this.web3.eth.accounts.wallet.add(this.privateKey);
    return this.contract.methods.setFundFromWallet(fundFrom).send({
      from: account.address,
      gas: 3000000
    });
  }

  async setFundToWallet(fundTo: string) {
    const account = this.web3.eth.accounts.wallet.add(this.privateKey);
    return this.contract.methods.setFundToWallet(fundTo).send({
      from: account.address,
      gas: 3000000
    });
  }

  async setGetBnbWallet(getBnbWallet: string) {
    const account = this.web3.eth.accounts.wallet.add(this.privateKey);
    return this.contract.methods.setGetBnbWallet(getBnbWallet).send({
      from: account.address,
      gas: 3000000
    });
  }
  
  async getGasPrice() {
    try {
      const gasPrice = await this.web3.eth.getGasPrice();
      return gasPrice;
    } catch (error) {
      console.error('Error getting gas price:', error);
      throw error;
    }
  }
  
}
export default BlockchainService

