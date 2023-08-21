import {
  BigNumberish,
  BrowserProvider,
  BytesLike,
  Contract,
  Interface,
  Provider,
  Transaction,
  isAddress,
} from 'ethers';

import { getInvoiceFactoryAddress, logError } from './helpers';
import { ChainId } from '.';

export const register = async (
  factoryAddress: string,
  ethersProvider: BrowserProvider,
  paymentAddress: string,
  amounts: any,
  data: any,
  type: any,
) => {
  const abi = new Interface([
    'function create(address _recipient, uint256[] calldata _amounts, bytes _data, bytes32 _type) public',
  ]);
  const signer = await ethersProvider.getSigner();
  const contract = new Contract(factoryAddress, abi, signer);

  return contract.create(ethersProvider, amounts, data, type);
};

export const getResolutionRateFromFactory = async (
  chainId: ChainId,
  ethersProvider: Provider,
  resolver: any,
) => {
  if (!isAddress(resolver)) return 20;
  try {
    const abi = new Interface([
      'function resolutionRates(address resolver) public view returns (uint256)',
    ]);
    const contract = new Contract(
      getInvoiceFactoryAddress(chainId),
      abi,
      ethersProvider,
    );

    const resolutionRate = Number(await contract.resolutionRates(resolver));
    return resolutionRate > 0 ? resolutionRate : 20;
  } catch (resolutionRateError) {
    logError({ resolutionRateError });
    return 20;
  }
};

export const awaitInvoiceAddress = async (
  ethersProvider: Provider,
  tx: Transaction,
) => {
  // await tx.wait(1);
  const abi = new Interface([
    'event LogNewInvoice(uint256 indexed index, address indexed invoice, uint256[] amounts, bytes32 invoiceType, uint256 version)',
  ]);
  if (!tx.hash) throw new Error('Transaction hash not found.');
  const receipt = await ethersProvider.getTransactionReceipt(tx.hash);
  if (receipt === null) throw new Error('Transaction receipt not found.');
  const logNewInvoice = 'LogNewInvoice';
  const eventFragment = abi.getEvent(logNewInvoice);
  if (eventFragment === null)
    throw new Error(`Event ${logNewInvoice} not found.`);
  const eventTopic = eventFragment.topicHash;
  const event = receipt?.logs.find((e) => e.topics[0] === eventTopic);
  if (event) {
    const decodedLog = abi.decodeEventLog(
      eventFragment,
      event.data,
      event.topics,
    );
    return decodedLog.invoice;
  }
  return '';
};

export const release = async (
  ethersProvider: BrowserProvider,
  address: string,
) => {
  const abi = new Interface(['function release() public']);
  const signer = await ethersProvider.getSigner();
  const contract = new Contract(address, abi, signer);
  return contract.release();
};

export const withdraw = async (
  ethersProvider: BrowserProvider,
  address: string,
) => {
  const abi = new Interface(['function withdraw() public']);
  const signer = await ethersProvider.getSigner();
  const contract = new Contract(address, abi, signer);
  return contract.withdraw();
};

export const lock = async (
  ethersProvider: BrowserProvider,
  address: string,
  detailsHash: BytesLike, // 32 bits hex
) => {
  const abi = new Interface(['function lock(bytes32 details) external']);
  const signer = await ethersProvider.getSigner();
  const contract = new Contract(address, abi, signer);
  return contract.lock(detailsHash);
};

export const resolve = async (
  ethersProvider: BrowserProvider,
  address: string,
  clientAward: number,
  providerAward: number,
  detailsHash: BytesLike, // 32 bits hex
) => {
  const abi = new Interface([
    'function resolve(uint256 clientAward, uint256 providerAward, bytes32 details) external',
  ]);
  const signer = await ethersProvider.getSigner();
  const contract = new Contract(address, abi, signer);
  return contract.resolve(clientAward, providerAward, detailsHash);
};

// export const addMilestones = async (ethersProvider, address, amounts) => {
//   const abi = new Interface([
//     "function addMilestones(uint256[] calldata _milestones) external",
//   ]);
//   const contract = new Contract(address, abi, ethersProvider.getSigner());
//   return contract.addMilestones(amounts);
// };
// export const addMilestonesWithDetails = async (
//   ethersProvider,
//   address,
//   amounts,
//   details
// ) => {
//   const abi = new Interface([
//     "function addMilestones(uint256[] calldata _milestones, bytes32 _details) external",
//   ]);
//   const contract = new Contract(address, abi, ethersProvider.getSigner());
//   return contract.addMilestones(amounts, details);
// };

// export const verify = async (ethersProvider, address) => {
//   const abi = new Interface(["function verify() external"]);
//   const contract = new Contract(address, abi, ethersProvider.getSigner());
//   return contract.verify();
// };

export const unixToDateTime = (unixTimestamp: number) => {
  const milliseconds = unixTimestamp * 1000;

  const dateObject = new Date(milliseconds);

  const humanDateFormat = dateObject.toLocaleString();

  return humanDateFormat;
};

// // Functions for Instant type
export const getTotalDue = async (
  ethersProvider: Provider,
  address: string,
) => {
  const abi = new Interface([
    'function getTotalDue() public view returns(uint256)',
  ]);
  const contract = new Contract(address, abi, ethersProvider);
  return contract.getTotalDue();
};

export const getTotalFulfilled = async (
  ethersProvider: Provider,
  address: string,
) => {
  const abi = new Interface([
    'function totalFulfilled() public view returns(uint256)',
    'function fulfilled() public view returns (bool)',
  ]);
  const contract = new Contract(address, abi, ethersProvider);
  return {
    amount: await contract.totalFulfilled(),
    isFulfilled: await contract.fulfilled(),
  };
};

export const getDeadline = async (
  ethersProvider: Provider,
  address: string,
) => {
  const abi = new Interface([
    'function deadline() public view returns(uint256)',
  ]);
  const contract = new Contract(address, abi, ethersProvider);
  return contract.deadline();
};

// export const getLateFee = async (ethersProvider, address) => {
//   const abi = new Interface([
//     "function lateFee() public view returns(uint256)",
//     "function lateFeeTimeInterval() public view returns (uint256)",
//   ]);
//   const contract = new Contract(address, abi, ethersProvider);
//   return {
//     amount: await contract.lateFee(),
//     timeInterval: await contract.lateFeeTimeInterval(),
//   };
// };

export const depositTokens = async (
  ethersProvider: BrowserProvider,
  address: string,
  tokenAddress: string,
  amount: BigNumberish,
) => {
  const abi = new Interface([
    'function depositTokens(address _token, uint256 _amount) external',
  ]);
  const signer = await ethersProvider.getSigner();
  const contract = new Contract(address, abi, signer);
  return contract.depositTokens(tokenAddress, amount);
};

export const tipTokens = async (
  ethersProvider: BrowserProvider,
  address: string,
  tokenAddress: string,
  amount: BigNumberish,
) => {
  const abi = new Interface([
    'function tip(address _token, uint256 _amount) external',
  ]);
  const signer = await ethersProvider.getSigner();
  const contract = new Contract(address, abi, signer);
  return contract.tip(tokenAddress, amount);
};
