import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface IUseSearchState {
  search: string;
  setSearch: (value: string) => void;
  resetSearch: () => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const useSearchState = create<IUseSearchState>()(
  devtools(
    immer((set) => ({
      search: "",
      setSearch: (value: string) => set({ search: value }),
      resetSearch: () => set({ search: "" }),
      isOpen: false,
      setIsOpen: (value: boolean) => set({ isOpen: value }),
    }))
  )
);
