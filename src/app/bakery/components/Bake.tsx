import { type ReactNode, Suspense, lazy } from "react";

import Elipsis from "@/modules/core/components/Elipsis";
import { useConnectedUser } from "@/modules/core/hooks/useConnectedUser";
import ConnectWallet from "@modules/core/components/ConnectWallet";
import SiteTitle from "@modules/core/components/SiteTitle";
import UnsupportedNetwork from "@/modules/bakery/components/UnsupportedNetwork";

const Swap = lazy(() => import("./Swap"));

function BakeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteTitle />
      <div className="m-auto flex w-full max-w-[425px] flex-col items-center px-3 pb-16 sm:max-w-[490px] sm:px-4 md:px-6">
        {children}
      </div>
    </>
  );
}

export function Bake() {
  const { user } = useConnectedUser();

  if (user === "loading") {
    return <>loading...</>;
  }

  if (!user) {
    return (
      <BakeLayout>
        <ConnectWallet />
      </BakeLayout>
    );
  }

  if (user.chain.unsupported)
    return (
      <BakeLayout>
        <UnsupportedNetwork />
      </BakeLayout>
    );

  if (!user.config) throw new Error(`Missing chain config!`);

  return (
    <BakeLayout>
      <Suspense
        fallback={
          <p className="pt-16">
            loading
            <Elipsis />
          </p>
        }
      >
        <Swap chainConfig={user.config} accountAddress={user.address} />
      </Suspense>
    </BakeLayout>
  );
}

export default Bake;
