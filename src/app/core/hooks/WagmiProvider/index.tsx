import type { ReactNode } from "react";
import { WagmiConfig } from "wagmi";

// import { devConfig } from "./devConfig";
import { testConfig } from "./testConfig";
// import { prodConfig } from "./prodConfig";

// export type IViteMode = "production" | "development" | "testing" | undefined;

// const env = process.env.MODE;

// if (env === undefined) throw new Error("NODE_ENV not set!");

// const config = env === "development" ? testConfig : prodConfig;
const config = testConfig;

export default function WagmiProvider({ children }: { children: ReactNode }) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
