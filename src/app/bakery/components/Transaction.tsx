import config from "@config";
import Elipsis from "@modules/core/components/Elipsis";
import { useToast } from "@modules/core/hooks/useToast";
import {
  useTransactionDisplay,
  type TTransactionStatus,
} from "@modules/core/hooks/useTransactionDisplay";
import { useEffect } from "react";
import { useNetwork, useWaitForTransaction } from "wagmi";

interface IProps {
  hash: `0x${string}`;
  status: TTransactionStatus;
}

function Transaction({ hash, status }: IProps) {
  const { dispatch: dispatchTransactionDisplay } = useTransactionDisplay();
  const { dispatch: dispatchToast } = useToast();
  const { chain: activeChain } = useNetwork();

  if (!activeChain) return null;

  const { data: transactionData, isError: transactionIsError } =
    useWaitForTransaction({ chainId: activeChain.id, hash });

  useEffect(() => {
    if (transactionIsError) {
      dispatchToast({
        type: "SET_TOAST",
        payload: {
          type: "ERROR",
          message: "transaction failed",
        },
      });
    }
    if (transactionData?.status === "success") {
      dispatchTransactionDisplay({ type: "SET_COMPLETE" });
    }
  }, [transactionData, transactionIsError]);

  const endpoint = config[activeChain.id];

  if (!endpoint) throw new Error("no explorer endpoint set!");

  return (
    <div className="mt-8 w-full text-xs">
      <div>
        <a
          className="break-all text-neutral-400 underline"
          target="_blank"
          rel="noopener noreferrer"
          href={`${endpoint}/tx/${hash}`}
        >
          {hash}
        </a>
      </div>
      <div className="mt-4 text-neutral-300">
        {status === "PENDING" && (
          <>
            transaction pending
            <Elipsis />
          </>
        )}
        {status === "COMPLETE" && "transaction complete!"}
      </div>
    </div>
  );
}

export default Transaction;
