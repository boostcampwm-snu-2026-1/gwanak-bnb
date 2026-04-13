import { useEffect } from "react";

type UseOutsideClickOptions = {
  ref: React.RefObject<HTMLElement | null>;
  callback: () => void;
  isOpen: boolean;
};

export const useOutsideClick = ({
  ref,
  callback,
  isOpen,
}: UseOutsideClickOptions) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: Event) => {
      const target = e.target;

      if (!(target instanceof Node)) return;

      if (ref.current && !ref.current.contains(target)) {
        callback();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        callback();
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, callback, isOpen]);
};
