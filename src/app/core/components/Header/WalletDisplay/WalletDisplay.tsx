import type { ReactNode } from "react";

import WalletInfo from "./WalletInfo";
import { useConnectedUser } from "@/app/core/hooks/useConnectedUser";
import { useDisconnect } from "wagmi";
import ConnectWallet from "../../ConnectWallet";

export function Container({ children }: { children: ReactNode }) {
  return (
    <section className="hover: relative hidden flex-col items-end justify-center gap-2 md:flex h-10">
      {children}
    </section>
  );
}

function WalletDisplay() {
  const { user } = useConnectedUser();
  const { disconnectAsync } = useDisconnect();

  return (
    <Container>
      {(() => {
        switch (user) {
          case null:
            return <ConnectWallet />;
          case "loading":
            return "loading";
          default:
            return (
              <WalletInfo
                accountAddress={user.address}
                chainString={user.chain.name}
                handleDisconnect={() => disconnectAsync()}
              />
            );
        }
      })()}
    </Container>
  );
}

export default WalletDisplay;
