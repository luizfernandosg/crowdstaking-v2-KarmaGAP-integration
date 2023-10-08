import type { ReactNode } from "react";
// import { useModal } from "../../hooks/useModal";

function FooterNavContainer({ children }: { children: ReactNode }) {
  return (
    <nav className="flex w-full flex-col items-center justify-between gap-6 sm:w-auto md:gap-10 md:px-4">
      {children}
    </nav>
  );
}

export default function FooterNav() {
  // const { dispatch: dispatchModal } = useModal();

  function handleDisclaimerClick() {
    // dispatchModal({
    //   type: "SET_MODAL",
    //   payload: { type: "DISCLAIMER", title: "Disclaimer" },
    // });
  }

  return (
    <FooterNavContainer>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:flex-row md:gap-6 lg:flex">
        <div className="md:w-1/2">
          <a href="http://breadchain.xyz" className="hover:underline">
            homepage
          </a>
        </div>
        <div className="md:w-1/2">
          <a href="https://twitter.com/breadchain_" className="hover:underline">
            twitter
          </a>
        </div>
        <a href="https://cryptoleftists.xyz" className="hover:underline">
          <div className="flex flex-row items-center gap-4">discord</div>
        </a>
        <a href="https://github.com/BreadchainCoop" className="hover:underline">
          <div className="flex flex-row items-center gap-4">github</div>
        </a>
        <a href="https://guild.xyz/breadchain" className="hover:underline">
          <div className="flex flex-row items-center gap-4">guild</div>
        </a>
        <button
          type="button"
          onClick={handleDisclaimerClick}
          className="hover:underline"
        >
          <div className="flex flex-row items-center">disclaimer</div>
        </button>
      </div>
    </FooterNavContainer>
  );
}
