import { useEffect } from "react";
import { useSearchState } from "../../../shared/store/useSearchState";

export const useSearchPanel = () => {
  const { setIsOpen, isOpen, setSearch, resetSearch } = useSearchState();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === "f" || e.key === "а")) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleClose = () => {
    setIsOpen(false);
    resetSearch();
  };

  return {
    isOpen,
    handleSearch,
    handleClose,
  };
};
