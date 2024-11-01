import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  color?: string;
  radius?: string;
  width?: string;
}

const getButtonColor = (color: string) => {
  switch (color) {
    case "gray":
      return "bg-gray-50 text-blue-700 border-blue-700 hover:bg-gray-300";
    case "indigo":
      return "bg-indigo-500 text-white border-blue-700 hover:bg-indigo-900";
    case "grayBlack":
      return "bg-gray-100 text-black border-transparent hover:bg-gray-300";
  }
};

const getButtonRadius = (radius: string) => {
  switch (radius) {
    case "roundedMedium":
      return "rounded-xl";
    case "roundedFull":
      return "rounded-full";
  }
};

const getButtonWidth = (width: string) => {
  switch (width) {
    case "full":
      return "w-full";
    case "fit":
      return "w-fit";
  }
};

export function Button(props: ButtonProps) {
  const {
    children,
    color = "gray",
    radius = "roundedMedium",
    width = "fit",
    ...rest
  } = props;

  return (
    <>
      <button
        className={`${getButtonColor(color)} ${getButtonRadius(
          radius
        )} ${getButtonWidth(
          width
        )} p-4 my-3 gap-3 border flex flex-row justify-between items-center `}
        {...rest}
      >
        {children}
      </button>
    </>
  );
}
