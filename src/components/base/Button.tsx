import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  color?: string;
}

const getButtonColor = (color: string) => {
  switch (color) {
    case "gray":
      return "bg-gray-50 text-blue-700 hover:bg-gray-300";
    case "indigo":
      return "bg-indigo-500 text-white hover:bg-indigo-900";
  }
};

export function Button(props: ButtonProps) {
  const { children, color = "gray", ...rest } = props;

  return (
    <>
      <button
        className={`${getButtonColor(
          color
        )} p-4 my-3 border border-blue-700 rounded-xl flex flex-row justify-between items-center w-full`}
        {...rest}
      >
        {children}
      </button>
    </>
  );
}
