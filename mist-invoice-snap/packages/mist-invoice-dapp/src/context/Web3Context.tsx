import { SafeAppWeb3Modal as Web3Modal } from '@gnosis.pm/safe-apps-web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { BrowserProvider, Eip1193Provider } from 'ethers';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Web3, { EthExecutionAPI, Web3BaseProvider } from 'web3';

import { theme } from '../theme';
import { getRpcUrl, logError, ChainId, SUPPORTED_NETWORKS } from '../utils';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: getRpcUrl(1),
        4: getRpcUrl(4),
        42: getRpcUrl(42),
        100: getRpcUrl(100),
        137: getRpcUrl(137),
      },
    },
  },
};

type Web3ContextType = {
  loading: boolean;
  account?: string;
  provider?: BrowserProvider;
  chainId?: ChainId;
  connectAccount: () => Promise<void>;
  disconnect: () => Promise<void>;
};

type Web3ProviderState = {
  account?: string;
  provider?: BrowserProvider;
  chainId?: ChainId;
};

export const Web3Context = createContext<Web3ContextType>({
  loading: true,
  connectAccount: async () => {},
  disconnect: async () => {},
});
export const useWeb3 = () => useContext(Web3Context);

export const Web3ContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const [{ account, provider, chainId }, setWeb3] = useState<Web3ProviderState>(
    {},
  );
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>();

  const setWeb3Provider = async (
    prov: Web3BaseProvider<EthExecutionAPI>,
    initialCall = false,
  ) => {
    if (prov) {
      const web3Provider = new Web3(prov);
      const gotProvider = new BrowserProvider(
        web3Provider.currentProvider as Eip1193Provider,
      );
      const network = await gotProvider.getNetwork();
      const gotChainId = Number(network.chainId) as ChainId;
      if (initialCall) {
        const signer = await gotProvider.getSigner();
        const gotAccount = await signer.getAddress();
        setWeb3((_provider: Web3ProviderState) => ({
          ..._provider,
          provider: gotProvider,
          chainId: gotChainId,
          account: gotAccount,
        }));
      } else {
        setWeb3((_provider: Web3ProviderState) => ({
          ..._provider,
          provider: gotProvider,
          chainId: gotChainId,
        }));
      }
    }
  };

  useEffect(() => {
    if (chainId && SUPPORTED_NETWORKS.indexOf(chainId as ChainId) === -1) {
      // TODO show error alert that invalid network is connected
    }
  }, [chainId]);

  const connectWeb3 = useCallback(async () => {
    try {
      if (!web3Modal) return;

      setLoading(true);
      const modalProvider = await web3Modal.requestProvider();

      await setWeb3Provider(modalProvider, true);

      const isGnosisSafe = !!modalProvider.safe;

      if (!isGnosisSafe) {
        modalProvider.on('accountsChanged', (accounts: string[]) => {
          setWeb3((_provider: Web3ProviderState) => ({
            ..._provider,
            account: accounts[0],
          }));
        });
        modalProvider.on('chainChanged', () => {
          setWeb3Provider(modalProvider);
        });
      }
    } catch (web3ModalError) {
      logError({ web3ModalError });
      throw web3ModalError;
    } finally {
      setLoading(false);
    }
  }, [web3Modal]);

  const disconnect = useCallback(async () => {
    if (!web3Modal) return;
    web3Modal.clearCachedProvider();
    setWeb3({});
  }, [web3Modal]);

  useEffect(() => {
    setWeb3Modal(
      new Web3Modal({
        cacheProvider: true,
        providerOptions,
        theme: {
          background: theme.colors.background,
          border: theme.colors.transparent,
          main: theme.colors.red[500],
          secondary: theme.colors.white,
          hover: theme.colors.black30,
        },
      }),
    );
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.autoRefreshOnNetworkChange = false;
    }
    (async function load() {
      if (web3Modal?.cachedProvider) {
        connectWeb3();
      } else {
        setLoading(false);
      }
    })();
  }, [connectWeb3, web3Modal]);

  return (
    <Web3Context.Provider
      value={{
        loading,
        account,
        provider,
        chainId,
        connectAccount: connectWeb3,
        disconnect,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
