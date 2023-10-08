import clsx from "clsx";
import { type MouseEvent, type ReactNode, useState } from "react";

interface IProps {
  /* eslint-disable-next-line no-unused-vars */
  onClick: (event: MouseEvent) => void;
  disabled?: boolean;
  children: ReactNode;
  variant?: "small" | "regular" | "large";
  fullWidth?: boolean;
  dataTest?: string;
}

const EVariants = {
  small: "px-4 py-2 text-sm",
  regular: "px-6 py-3 text-base",
  large: "px-7 py-4 text-xl sm:text-2xl",
};

function Button({
  children,
  variant = "regular",
  fullWidth = false,
  onClick,
  disabled = false,
  dataTest,
}: IProps) {
  const [mouseIsDown, setMouseIsDown] = useState(false);

  const handleMouseDown = () => {
    setMouseIsDown(true);
  };

  const handleMouseUp = () => {
    setMouseIsDown(false);
  };

  return (
    <button
      type="button"
      className={clsx(
        "hover:bg-opacity-100 disabled:bg-opacity-50 bg-opacity-85 rounded inline-block bg-breadpink-500 font-redhat font-bold  text-breadgray-white",
        EVariants[variant],
        fullWidth && "w-full",
        mouseIsDown && "translate-y-1 transform"
      )}
      onClick={onClick}
      disabled={disabled}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      data-test={dataTest || ""}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  disabled: false,
  variant: "regular",
  fullWidth: false,
  dataTest: null,
};

export default Button;
