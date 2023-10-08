import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { type Chain, useAccount, useNetwork } from "wagmi";
import config, { type ChainConfiguration } from "@/config";

export type TConnectedUserState =
  | null
  | {
      address: `0x${string}`;
      config: ChainConfiguration | null;
      chain: Chain & {
        unsupported?: boolean | undefined;
      };
    }
  | "loading";

const ConnectedUserContext = createContext<{
  user: TConnectedUserState | null;
}>({ user: "loading" });

interface IConnectedUserProviderProps {
  children: ReactNode;
}

function ConnectedUserProvider({ children }: IConnectedUserProviderProps) {
  const [user, setUser] = useState<TConnectedUserState>("loading");
  const {
    isConnected,
    connector: activeConnector,
    address: accountAddress,
    status,
  } = useAccount();
  const { chain: activeChain } = useNetwork();

  useEffect(() => {
    const configuration =
      activeChain?.id && config[activeChain.id] ? config[activeChain.id] : null;

    if (activeConnector && activeChain && accountAddress && isConnected) {
      setUser({
        address: accountAddress,
        config: configuration,
        chain: activeChain,
      });
    } else if (status === "disconnected") {
      setUser(null);
    }
  }, [isConnected, activeConnector, accountAddress, activeChain, status]);

  const value = useMemo(() => ({ user }), [user]);

  return (
    <ConnectedUserContext.Provider value={value}>
      {children}
    </ConnectedUserContext.Provider>
  );
}

const useConnectedUser = () => {
  const context = useContext(ConnectedUserContext);
  if (context === undefined) {
    throw new Error(
      "useConnectedUser must be used within a ConnectedUserProvider"
    );
  }
  return context;
};

export { ConnectedUserProvider, useConnectedUser };
