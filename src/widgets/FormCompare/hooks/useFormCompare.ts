import { type FormInstance } from "antd";
import { useInputsValueStore } from "../../../shared/store/useInputsValueStore";
import { useState } from "react";

export const useFormCompare = (form: FormInstance) => {
  const { setFirst, setSecond } = useInputsValueStore();
  const pattern = /^[ARNDCEQGHILKMFPSTWYV-]*$/i;
  const [errorLengthMessage, setErrorLengthMessage] = useState<string | null>(
    null
  );

  const rules = [
    {
      required: true,
      message: "Поле обязательно для заполнения",
    },
    {
      pattern,
      message: "Допустимы символы: A,R,N,D,C,E,Q,G,H,I,L,K,M,F,P,S,T,W,Y,V, -",
    },
    () => ({
      validator() {
        if (errorLengthMessage) {
          setErrorLengthMessage(null);
        }
        return Promise.resolve();
      },
    }),
  ];

  const getLaterLength = (value: string) => {
    const count = value.split("").filter((letter) => letter !== "-").length;
    return count;
  };

  const handleSubmit = () => {
    const { firstValue, secondValue } = form.getFieldsValue();
    if (getLaterLength(firstValue) !== getLaterLength(secondValue)) {
      setErrorLengthMessage("Длины последовательностей должны быть равны");
    } else {
      setFirst(firstValue);
      setSecond(secondValue);
      setErrorLengthMessage(null);
    }
  };

  return { rules, handleSubmit, errorLengthMessage };
};
