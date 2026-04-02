import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface GuestFilter {
  adult: number;
  kids: number;
  infant: number;
  pets: number;
}

export default function GuestFilterSelectPopover() {
  const [guestFilter, setGuestFilter] = useState<GuestFilter>({
    adult: 0,
    kids: 0,
    infant: 0,
    pets: 0,
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Title</PopoverTitle>
          <PopoverDescription>Description text here.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}
