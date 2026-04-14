import { Dropdown } from "../../../common/Dropdown";

type DateDropdownProps = {
  className?: string;
};

export const DateDropdown = ({ className }: DateDropdownProps) => {
  return <Dropdown className={className}></Dropdown>;
};
