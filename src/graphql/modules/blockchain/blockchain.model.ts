export enum ContractParamNames {
    seedSaleContract = "seedSaleContract",
    privateSaleContract = "privateSaleContract",
    withdrawContract = "withdrawContract",
    confirmWithdrawContract = "confirmWithdrawContract",
    depositContract = "depositContract",
  }
  
  export type SMEventType = {
    removed: false;
    logIndex: number;
    transactionIndex: number;
    transactionHash: string;
    blockHash: string;
    blockNumber: number;
    address: string;
    id: string;
    returnValues: any;
    event: string;
    signature: string;
    raw: {
      data: string;
      topics: string[];
    };
  };
  