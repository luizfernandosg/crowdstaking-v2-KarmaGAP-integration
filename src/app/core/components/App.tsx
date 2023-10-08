import type { ReactNode } from "react";

// import SubgraphProvider from "./hooks/graphProvider";

import Footer from "./Footer";
import Header from "./Header";
import { ModalProvider, useModal } from "../hooks/useModal";
import Modal from "./Modal";
import { TransactionDisplayProvider } from "../hooks/useTransactionDisplay";
import { ToastProvider, useToast } from "../hooks/useToast";
import { ConnectedUserProvider } from "../hooks/useConnectedUser";
import WagmiProvider from "../hooks/WagmiProvider";

import "@/styles/index.css";
import "@/shims";
import { AnimatePresence } from "framer-motion";
import Toast from "./Toast";

function App({
  children,
  currentPath,
}: {
  children: ReactNode;
  currentPath: string;
}) {
  return (
    <WagmiProvider>
      <ConnectedUserProvider>
        <TransactionDisplayProvider>
          <ModalProvider>
            <ToastProvider>
              <Layout currentPath={currentPath}>{children}</Layout>
            </ToastProvider>
          </ModalProvider>
        </TransactionDisplayProvider>
      </ConnectedUserProvider>
    </WagmiProvider>
  );
}

function Layout({
  children,
  currentPath,
}: {
  children: ReactNode;
  currentPath: string;
}) {
  const { state: modal } = useModal();
  const { state: toast } = useToast();

  return (
    <>
      <AnimatePresence
        //  initial={false}
        mode="wait"
        // onExitComplete={() => null}
      >
        {modal && (
          <Modal type={modal.type} title={modal.title} status={modal.status} />
        )}
      </AnimatePresence>
      <AnimatePresence
        //  initial={false}
        mode="wait"
        // onExitComplete={() => null}
      >
        {toast && <Toast type={toast.type} message={toast.message} />}
      </AnimatePresence>
      <div className="flex min-h-screen flex-col">
        <Header currentPath={currentPath} />
        {children}
        <Footer />
      </div>
    </>
  );
}

export default App;
