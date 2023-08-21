export enum TransferType {
  Deposit,
  Withdrawal,
  Transfer,
}

export enum TokenStandard {
  ERC20,
  ERC721,
  ERC1155,
}

export interface TokenData {
  standard: TokenStandard;
  token: string;
  identifier: number | bigint;
  amount: number | bigint;
}

export interface ExtData {
  chainId: number;
  treeIndex: number;
  account: string;
  transferType: TransferType;
  tokenData: TokenData;
}

export interface PreCommitment {
  receiverHash: bigint;
  encryptedNote: string;
  tokenData: TokenData;
}

export interface DepositData {
  nonce: number | bigint;
  sender: string;
  preCommitments: PreCommitment[];
}

export interface EncryptedNote {
  encryptedData: string;
  encryptedSenderKey: string;
  encryptedReceiverKey: string;
}
