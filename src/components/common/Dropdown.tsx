type DropdownProps = {
  children: React.ReactNode;
};

export const Dropdown = ({ children }: DropdownProps) => {
  return (
    <div className="flex h-[403px] w-[max(50%,425px)] justify-center rounded-4xl bg-white px-8 py-4 text-sm drop-shadow-[0_2px_6px_rgba(0,0,0,0.14)]">
      {children}
    </div>
  );
};
