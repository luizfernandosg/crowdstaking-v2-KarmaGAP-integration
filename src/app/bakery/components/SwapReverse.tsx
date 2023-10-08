type TProps = {
  onClick: () => void;
};

function SwapReverse({ onClick }: TProps) {
  return (
    <button
      type="button"
      className="absolute top-1/2 transform  -translate-y-1/2  inline-block rounded-full bg-breadgray-og-dark p-3 text-neutral-600 hover:text-neutral-500 border-4 border-breadgray-burnt"
      onClick={onClick}
    >
      <svg className="h-7 w-7" fill="none" viewBox="0 0 123 105">
        <path className="fill-current" d="M37 0h50v60H37z" />
        <path
          className="fill-current "
          d="M61.5 105 8.24 45H114.76L61.5 105Z"
        />
      </svg>
    </button>
  );
}

export default SwapReverse;
