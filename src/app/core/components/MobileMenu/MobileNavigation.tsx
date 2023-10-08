interface IProps {
  handleNavToggle: () => void;
}

function MobileNavigation({ handleNavToggle }: IProps) {
  return (
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
      {/* <NavLink
        isCurrentPage={location.pathname === '/dashboard'}
        to="/dashboard"
      >
        Dashboard
      </NavLink> */}
      <a href="https://breadchain.mirror.xyz/">Blog</a>
    </nav>
  );
}
export default MobileNavigation;
