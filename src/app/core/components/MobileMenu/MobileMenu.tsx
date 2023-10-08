import clsx from "clsx";

import MobileNavigation from "./MobileNavigation";
import MobileWalletDisplay from "./MobileWalletDisplay";

import Overlay from "../Overlay";

interface IProps {
  isOpen: boolean;
  handleNavToggle: () => void;
}

export function MobileMenu({ isOpen, handleNavToggle }: IProps) {
  return (
    <>
      <Overlay closeMenu={() => handleNavToggle()} isOpen={isOpen} />
      <section
        className={clsx(
          "fixed right-0 top-0 z-20 flex h-screen w-auto transform flex-col gap-12  bg-breadgray-charcoal px-4 pl-12 pt-24 transition-transform md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <MobileWalletDisplay />
        <nav className="flex flex-col gap-4 text-right">
          <a
            // isCurrentPage={location.pathname === "/"}
            href="/"
            onClick={() => handleNavToggle()}
          >
            Bake
          </a>
          <a
            // isCurrentPage={location.pathname === "/about"}
            href="/about"
            onClick={() => handleNavToggle()}
          >
            About
          </a>
          <a
            // isCurrentPage={location.pathname === "/faq"}
            href="/faq"
            onClick={() => handleNavToggle()}
          >
            FAQ
          </a>
          {/* <a
        isCurrentPage={location.pathname === '/dashboard'}
        href="/dashboard"
      >
        Dashboard
      </a> */}
          <a href="https://breadchain.mirror.xyz/">Blog</a>
        </nav>
      </section>
    </>
  );
}
export default MobileMenu;
