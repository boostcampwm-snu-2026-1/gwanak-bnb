type DropdownProps = {
  children: React.ReactNode;
};

export const Dropdown = ({ children }: DropdownProps) => {
  return <div className="rounded-2xl bg-white shadow-2xl">{children}</div>;
};
