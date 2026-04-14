import { Dropdown } from "../../../common/Dropdown";

type DestinationDropdownProps = {
  className?: string;
};

export const DestinationDropdown = ({
  className,
}: DestinationDropdownProps) => {
  return <Dropdown className={className}></Dropdown>;
};
