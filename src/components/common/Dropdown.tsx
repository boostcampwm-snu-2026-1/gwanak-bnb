import { cn } from "../../utils/cn";

type DropdownProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

export const Dropdown = ({ children, ...props }: DropdownProps) => {
  return (
    <div
      className={cn(
        "flex h-100.75 w-[max(50%,425px)] justify-center rounded-4xl bg-white px-8 py-4 text-sm drop-shadow-[0_2px_6px_rgba(0,0,0,0.14)]",
        props.className,
      )}
    >
      {children}
    </div>
  );
};
