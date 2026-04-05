import { type ComponentPropsWithRef } from "react";

type IconButtonProps = ComponentPropsWithRef<"button"> & {
  children: React.ReactNode;
};

export const IconButton = ({ children, ...props }: IconButtonProps) => {
  return (
    <button
      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f2f2f2] text-sm text-[rgb(34,34,34)] hover:cursor-pointer enabled:hover:bg-[#dddddd] disabled:cursor-not-allowed disabled:text-[#c1c1c1] [&_svg]:size-4"
      {...props}
    >
      {children}
    </button>
  );
};
