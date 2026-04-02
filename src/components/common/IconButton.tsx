import { type ComponentPropsWithRef } from "react";

type IconButtonProps = ComponentPropsWithRef<"button"> & {
  children: React.ReactNode;
};

export const IconButton = ({ children, ...props }: IconButtonProps) => {
  return (
    <button
      className="rounded-full bg-gray-400 hover:cursor-pointer hover:bg-gray-400 disabled:cursor-not-allowed"
      {...props}
    >
      {children}
    </button>
  );
};
