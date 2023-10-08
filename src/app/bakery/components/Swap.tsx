import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";

import type { ChainConfiguration } from "@/config";

// import Button from '../Button';
import ApproveContract from "./ApproveContract";
import BakeOrBurn from "./BakeOrBurn/BakeOrBurn";
import CheckingApproval from "./CheckingApproval";
import FromPanel from "./FromPanel";
import SwapReverse from "./SwapReverse";
import ToPanel from "./ToPanel";
import Transaction from "./Transaction";
import { sanitizeInputValue } from "./swapUtils";
import { useToast } from "@/app/core/hooks/useToast";
import { useTransactionDisplay } from "@/app/core/hooks/useTransactionDisplay";
import { useTokenBalance } from "../hooks/useTokenBalance";
import { useTokenAllowance } from "../hooks/useTokenAllowance";
import NativeBalance from "./NativeBalance";
import { TUserConnected } from "@/app/core/hooks/useConnectedUser";

interface ISwapState {
  mode: "BAKE" | "BURN";
  value: string;
  isContractApproved: null | boolean;
}

const initialSwapState: ISwapState = {
  mode: "BAKE",
  value: "",
  isContractApproved: null,
};

interface IProps {
  user: TUserConnected;
}

function SwapUI({ user }: IProps) {
  const [swapState, setSwapState] = useState<ISwapState>(initialSwapState);

  const { DAI, BREAD } = user.config;

  const { state: transactionDisplay, dispatch: dispatchTransactionDisplay } =
    useTransactionDisplay();
  const { dispatch: dispatchToast } = useToast();

  const breadBalanceReadings = useTokenBalance(BREAD.address, user.address);
  const daiBalanceReadings = useTokenBalance(DAI.address, user.address);

  const {
    value: daiAllowanceValue,
    status: daiAllowanceStatus,
    error: daiAllowanceError,
  } = useTokenAllowance(DAI.address, user.address, BREAD.address);

  const resetSwapState = () => {
    setSwapState(initialSwapState);
  };

  const clearInputValue = () => {
    setSwapState((state) => ({ ...state, value: "" }));
  };

  // useEffect(() => {
  //   resetSwapState();
  // }, [chainConfig.NETWORK_STRING]);

  useEffect(() => {
    if (daiAllowanceError) {
      dispatchToast({
        type: "SET_TOAST",
        payload: {
          type: "ERROR",
          message: "Failed to check contract approval",
        },
      });
      return;
    }

    if (daiAllowanceValue) {
      setSwapState((state) => ({
        ...state,
        isContractApproved: parseFloat(daiAllowanceValue) > 0,
      }));
    }
  }, [daiAllowanceStatus, daiAllowanceValue, daiAllowanceError, dispatchToast]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (transactionDisplay && transactionDisplay.status !== "PENDING") {
      dispatchTransactionDisplay({ type: "CLEAR" });
    }
    const { value } = event.target;

    const sanitizedValue = sanitizeInputValue(value);
    setSwapState({
      ...swapState,
      value: sanitizedValue,
    });
  };

  const handleSwapReverse = () => {
    setSwapState((state) => ({
      ...state,
      mode: state.mode === "BAKE" ? "BURN" : "BAKE",
    }));
  };

  const handleBalanceClick = (value: string) => {
    setSwapState((state) => ({
      ...state,
      value,
    }));
  };

  return (
    <>
      <div className="w-full relative rounded border-4 bg-breadgray-og-dark border-breadgray-burnt flex flex-col items-center">
        <FromPanel
          inputValue={swapState.value}
          balanceReadings={
            swapState.mode === "BAKE"
              ? daiBalanceReadings
              : breadBalanceReadings
          }
          tokenType={swapState.mode === "BAKE" ? "DAI" : "BREAD"}
          handleBalanceClick={handleBalanceClick}
          handleInputChange={handleInputChange}
        />
        <SwapReverse onClick={handleSwapReverse} />
        <ToPanel
          inputValue={swapState.value}
          balanceReadings={
            swapState.mode === "BAKE"
              ? breadBalanceReadings
              : daiBalanceReadings
          }
          tokenType={swapState.mode === "BAKE" ? "BREAD" : "DAI"}
        />
      </div>
      <div className="w-full px-4 pt-8 pb-12 text-xs text-neutral-300">
        Matic Balance <NativeBalance address={user.address} />
      </div>
      {daiAllowanceStatus === "loading" && <CheckingApproval />}
      {daiAllowanceStatus === "success" &&
        (() => {
          if (swapState.isContractApproved === true) {
            return (
              <BakeOrBurn
                mode={swapState.mode}
                value={swapState.value}
                balanceReadings={
                  swapState.mode === "BAKE"
                    ? daiBalanceReadings
                    : breadBalanceReadings
                }
                accountAddress={user.address}
                chainConfig={user.config}
                clearInputValue={clearInputValue}
              />
            );
          }
          return <ApproveContract chainConfig={user.config} />;
        })()}

      {transactionDisplay && (
        <Transaction
          status={transactionDisplay.status}
          hash={transactionDisplay.hash}
          user={user}
        />
      )}
    </>
  );
}

export default SwapUI;
