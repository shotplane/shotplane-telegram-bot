import Web3 from "web3";

class MainContract {
  web3: Web3;

  constructor(providerUrl: string) {
    this.web3 = new Web3(new Web3.providers.WebsocketProvider(providerUrl))
  }

  getContract = ({ address, abi }: { address: string; abi: any }) => {
    return new this.web3.eth.Contract(abi, address);
  };

  onEvents = async ({ name, abi, address, callback }) => {
    try {
      console.log(`Connect Blockchain Event - ${name}`);
      const contract = this.getContract({
        abi, address
      });
      this.web3.eth.net
        .isListening()
        .then((data) => {
          // console.log("data", data);
          contract.events.allEvents(async (error: Error, data) => {
            // console.log("Connect server url", data);
            if (error) {
              console.log("===> error", error.message);
            }
            await callback(data);
          });
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (error) {
      console.log("SmartContractHelper onEvents error", error);
    }
  };
}

export default MainContract;
