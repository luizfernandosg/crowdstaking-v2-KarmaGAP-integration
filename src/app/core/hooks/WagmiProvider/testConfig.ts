import { configureChains, createConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import { hardhat } from "wagmi/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

/* eslint-disable-next-line */
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [{ ...hardhat, id: 31337 }],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: "http://localhost:8545",
        webSocket: "ws://localhost:8545",
      }),
    }),
  ]
);

export const testConfig = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient,
});
