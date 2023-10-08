import type { UseTokenBalanceResult } from "../hooks/useTokenBalance";
import Icon from "./Icon";
import TokenBalance from "./TokenBalance";
import {
  PanelBalance,
  ToPanelContainer,
  PanelContent,
  PanelHeader,
} from "./TokenDisplay";

interface IProps {
  inputValue: string;
  balanceReadings: UseTokenBalanceResult;
  tokenType: "DAI" | "BREAD";
}
function ToPanel({ inputValue, balanceReadings, tokenType }: IProps) {
  return (
    <ToPanelContainer>
      <PanelHeader>
        <PanelBalance>
          <TokenBalance readings={balanceReadings} />
        </PanelBalance>
      </PanelHeader>
      <PanelContent>
        <span className="w-0 flex-auto truncate overflow-ellipsis bg-breadgray-og-dark text-lg sm:text-3xl font-medium">
          {inputValue || "00.00"}
        </span>
        <Icon type={tokenType} />
        <span className="ml-4 w-20 pt-0.5 text-xl font-medium">
          {tokenType}
        </span>
      </PanelContent>
    </ToPanelContainer>
  );
}

export default ToPanel;
