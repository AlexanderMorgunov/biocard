// useSelectItems.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface ISelectItems {
  index: number;
  value: string;
  arrayIndex: number;
}

interface IUseSelectItemsStore {
  selectItems: ISelectItems[];
  setSelectItems: (value: ISelectItems[] | []) => void;
  addSelectItem: (value: ISelectItems) => void;
  firstSelectItem: ISelectItems | null;
  setFirstSelectItem: (value: ISelectItems | null) => void;
  lastSelectItem: ISelectItems | null;
  setLastSelectItem: (value: ISelectItems | null) => void;
  resetSelectItems: () => void;
}

export const useSelectItemsStore = create<IUseSelectItemsStore>()(
  devtools(
    immer((set) => ({
      selectItems: [],
      setSelectItems: (value) => set({ selectItems: value }),
      addSelectItem: (value) =>
        set((state) => ({ selectItems: [...state.selectItems, value] })),
      firstSelectItem: null,
      setFirstSelectItem: (value) => set({ firstSelectItem: value }),
      lastSelectItem: null,
      setLastSelectItem: (value) => set({ lastSelectItem: value }),
      resetSelectItems: () => {
        set({ selectItems: [] });
        set({ firstSelectItem: null });
        set({ lastSelectItem: null });
      },
    }))
  )
);
