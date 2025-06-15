import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface InputsValue {
  first: string;
  second: string;
  setFirst: (value: string) => void;
  setSecond: (value: string) => void;
}

export const useInputsValueStore = create<InputsValue>()(
  devtools(
    immer((set) => ({
      first: "",
      second: "",
      setFirst: (value) => set({ first: value }),
      setSecond: (value) => set({ second: value }),
    }))
  )
);
