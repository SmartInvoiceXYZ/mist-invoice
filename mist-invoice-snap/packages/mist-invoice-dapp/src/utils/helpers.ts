import { getAddress } from '@ethersproject/address';
import { Contract, Interface } from 'ethers';

import {
  Chain,
  ChainId,
  chainIds,
  explorerUrls,
  graphUrls,
  hexChainIds,
  invoiceFactory,
  IPFS_ENDPOINT,
  nativeSymbols,
  networkLabels,
  networkNames,
  resolverInfo,
  resolvers,
  rpcUrls,
  wrappedNativeToken,
} from '.';

export const getDateString = (timeInSec: `${number}` | number) => {
  const timeInSecNum =
    typeof timeInSec === 'number' ? timeInSec : parseInt(timeInSec);
  if (timeInSecNum !== 0) {
    const date = new Date(timeInSecNum ? timeInSecNum * 1000 : 0);
    const ye = new Intl.DateTimeFormat('en', {
      year: 'numeric',
    }).format(date);
    const mo = new Intl.DateTimeFormat('en', {
      month: 'long',
    }).format(date);
    const da = new Intl.DateTimeFormat('en', {
      day: '2-digit',
    }).format(date);
    return `${mo} ${da}, ${ye}`;
  } else {
    return 'Not provided';
  }
};
// returns the checksummed address if the address is valid, otherwise returns false
export const isAddress = (value: string) => {
  try {
    return getAddress(value).toLowerCase();
  } catch {
    return false;
  }
};

export const getNetworkName = (chainId: ChainId) =>
  networkNames[chainId] || 'Unknown Chain';

export const getGraphUrl = (chainId: ChainId) =>
  graphUrls[chainId] || graphUrls[4];

export const getExplorerUrl = (chainId: ChainId) =>
  explorerUrls[chainId] || explorerUrls[4];

export const getRpcUrl = (chainId: ChainId) => rpcUrls[chainId] || rpcUrls[4];

export const getResolvers = (chainId: ChainId) =>
  resolvers[chainId] || resolvers[4];

export const getResolverInfo = (chainId: ChainId, resolver: string) =>
  (resolverInfo[chainId] || resolverInfo[4])[resolver];

export const getTokens = (
  chainId: ChainId,
  allTokens: Record<ChainId, Record<string, TokenData>>,
) => allTokens[chainId] || allTokens[4];

export const getTokenInfo = (
  chainId: ChainId,
  token: string,
  tokenData: Record<ChainId, Record<string, TokenData>>,
) => {
  console.log('getTokenInfo', chainId, token, tokenData);
  const unknownToken = {
    decimals: 18,
    symbol: 'UNKNOWN',
  } as TokenData;
  if (tokenData) {
    const tokens = tokenData[chainId] || tokenData[4];
    return tokens ? tokens[token] : unknownToken;
  } else return unknownToken;
};

export const getWrappedNativeToken = (chainId: ChainId) =>
  wrappedNativeToken[chainId] || wrappedNativeToken[4];

export const getNativeTokenSymbol = (chainId: ChainId) =>
  nativeSymbols[chainId] || nativeSymbols[4];

export const getInvoiceFactoryAddress = (chainId: ChainId) =>
  invoiceFactory[chainId] || invoiceFactory[4];

export const getTxLink = (chainId: ChainId, hash: string) =>
  `${getExplorerUrl(chainId)}/tx/${hash}`;

export const getAddressLink = (chainId: ChainId, hash: string) =>
  `${getExplorerUrl(chainId)}/address/${hash}`;

// bytes58 QmNLei78zWmzUdbeRB3CiUfAizWUrbeeZh5K1rhAQKCh51
// is the same as
// bytes64 12200000000000000000000000000000000000000000000000000000000000000000
// which means an all zeros bytes32 was input on the contract
export const getIpfsLink = (hash: string) =>
  hash === 'QmNLei78zWmzUdbeRB3CiUfAizWUrbeeZh5K1rhAQKCh51'
    ? ''
    : `${IPFS_ENDPOINT}/ipfs/${hash}`;

export const getAccountString = (account: string) => {
  const len = account.length;
  return `0x${account.substr(2, 3).toUpperCase()}...${account
    .substr(len - 3, len - 1)
    .toUpperCase()}`;
};

export const isKnownResolver = (chainId: ChainId, resolver: string) =>
  getResolvers(chainId).indexOf(resolver.toLowerCase()) !== -1;

export const getResolverString = (chainId: ChainId, resolver: string) => {
  const info = getResolverInfo(chainId, resolver);
  return info ? info.name : getAccountString(resolver);
};

export const logError = (error: any) => {
  // eslint-disable-next-line no-console
  console.error(error);
};

export const logDebug = (msg: any) => {
  if (process.env.NEXT_PUBLIC_DEBUG_LOGS === 'true') {
    // eslint-disable-next-line no-console
    console.debug(msg);
  }
};

export const copyToClipboard = (value: string) => {
  const tempInput = document.createElement('input');
  tempInput.value = value;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
};

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/;

export const isValidURL = (str: string) => {
  return !!URL_REGEX.test(str);
};

const BASE32_REGEX = /^[a-zA-Z2-7]+=*$/;
const BASE58_REGEX = /^[1-9A-HJ-NP-Za-km-z]+=*$/;

export const isValidCID = (hash: string) => {
  return (
    (hash.length === 59 &&
      hash.startsWith('bafy') &&
      !!BASE32_REGEX.test(hash)) ||
    (hash.length === 46 && hash.startsWith('Qm') && !!BASE58_REGEX.test(hash))
  );
};

export const getCID = async () => {
  return 'QmNLei78zWmzUdbeRB3CiUfAizWUrbeeZh5K1rhAQKCh51'; // TODO: replace with actual CID
};

export const isValidLink = (url: string) => {
  if (!url) return false;
  if (url.startsWith('ipfs://')) {
    return isValidCID(url.slice(7));
  }
  return isValidURL(url);
};

export const getChainId = (network: Chain) =>
  chainIds[network] || chainIds.rinkeby;

export const getHexChainId = (network: Chain) =>
  hexChainIds[network] || hexChainIds.rinkeby;

export const isChainId = (chainId: number): chainId is ChainId =>
  chainId in chainIds;

export const getNetworkLabel = (chainId?: number) =>
  chainId && isChainId(chainId) ? networkLabels[chainId] : 'unknown';

export const verify = async (ethersProvider: any, address: string) => {
  const abi = new Interface(['function verify() external']);
  const contract = new Contract(address, abi, ethersProvider.getSigner());
  return contract.verify();
};

export type TokenData = {
  tokenContract: string;
  decimals: number;
  symbol: string;
  image: string;
};

export const formatTokenData = (object: any) => {
  console.log('formatTokenData', object);
  const tokenObject = {} as Record<ChainId, Record<string, TokenData>>;

  for (const [key, value] of Object.entries(object)) {
    const tokenDetails = {} as Record<string, TokenData>;

    for (const { tokenContract, decimals, symbol, image } of Object.values(
      value as TokenData[],
    )) {
      tokenDetails[tokenContract.toLowerCase()] = {
        tokenContract: tokenContract,
        decimals: decimals,
        symbol: symbol,
        image: image,
      };
    }
    tokenObject[Number(key) as ChainId] = tokenDetails;
  }

  return tokenObject;
};

export const formatTokens = (
  object: Record<string, Record<string, TokenData>>,
) => {
  const tokenObject = {} as Record<string, string[]>;
  for (const [key, value] of Object.entries(object)) {
    const tokenArray = [];
    for (const tokenAddress of Object.keys(value)) {
      tokenArray.push(tokenAddress);
    }
    tokenObject[key] = tokenArray;
  }

  return tokenObject;
};

export const calculateResolutionFeePercentage = (resolutionRate: string) => {
  const feePercentage = 1 / parseInt(resolutionRate);

  return feePercentage;
};

// export const getTokenSymbol = (token: string, chainId: string, tokenData) => {
//   return tokenData[chainId][token].symbol;
// };

export const dateTimeToDate = (dateTime: string) => {
  return dateTime.split(',')[0];
};

export const getAgreementLink = (projectAgreement: any) => {
  const address = projectAgreement[projectAgreement.length - 1].src;
  if (projectAgreement[projectAgreement.length - 1].type === 'ipfs') {
    // address.substring(7) removes ipfs:// from the beginning of the src string
    const hash = address.substring(7);
    const link = IPFS_ENDPOINT + '/ipfs/' + hash;
    return link;
  } else {
    return address;
  }
};

export const formatDate = (date: string | number | Date) => {
  const d = new Date(date);

  let month = `${d.getUTCMonth() + 1}`;
  if (month.length < 2) month = `0${month}`;

  let day = `${d.getUTCDate()}`;
  if (day.length < 2) day = `0${day}`;

  const year = d.getUTCFullYear();

  return [year, month, day].join('-');
};
