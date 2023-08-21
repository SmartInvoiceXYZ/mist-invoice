import { useEffect, useState } from 'react';
import {
  ChainId,
  TOKENS,
  TokenData,
  formatTokenData,
  formatTokens,
} from '../utils';

export const useFetchTokensViaIPFS = () => {
  const [tokenData, setTokenData] = useState(
    {} as Record<ChainId, Record<string, TokenData>>,
  );
  const [allTokens, setAllTokens] = useState({} as Record<string, string[]>);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchTokens = async () => {
      // const CID = await getCID();
      // const IPFS_TOKENS = IPFS_ENDPOINT + `/ipfs/${CID}`;
      setIsError(false);
      try {
        // const response = fetch(IPFS_TOKENS);
        // const fullData = (await response).json();
        const formattedData = formatTokenData(TOKENS);
        const formattedTokens = formatTokens(formattedData);

        setAllTokens(formattedTokens);
        setTokenData(formattedData);
      } catch (error) {
        setIsError(true);
      }
    };

    if (isMounted) fetchTokens();
    return () => {
      isMounted = false;
    };
  }, []);
  return [{ tokenData, isError, allTokens }];
};
