import { message } from "antd";
import {
  useSelectItemsStore,
  type ISelectItems,
} from "../../../shared/store/useSelectItemsStore";
import { useSearchState } from "../../../shared/store/useSearchState";

interface InputsValue {
  first: string;
  second: string;
}

export const useSelectItems = (props: InputsValue) => {
  const { first, second } = props;
  const {
    setFirstSelectItem,
    firstSelectItem,
    setSelectItems,
    lastSelectItem,
    setLastSelectItem,
    selectItems,
    resetSelectItems,
  } = useSelectItemsStore();

  const { search } = useSearchState();

  const getSelectItems = (
    firstSelectItem: ISelectItems,
    lastSelectItem: ISelectItems
  ) => {
    if (!firstSelectItem || !lastSelectItem) return [];
    const startIndex = Math.min(firstSelectItem.index, lastSelectItem.index);
    const endIndex = Math.max(firstSelectItem.index, lastSelectItem.index);
    const letterString = firstSelectItem.arrayIndex === 0 ? first : second;
    const formattedArray = letterString.split("").map((letter, index) => {
      return {
        index,
        value: letter,
        arrayIndex: letterString === first ? 0 : 1,
      };
    });
    return formattedArray.slice(startIndex, endIndex + 1);
  };
  const handleClick = (item: ISelectItems) => {
    if (!firstSelectItem) {
      setFirstSelectItem(item);
      message.success("Выбран первый элемент последовательности для поиска");
    } else if (!lastSelectItem) {
      setLastSelectItem(item);
      const newSelectItems = getSelectItems(firstSelectItem, item);
      setSelectItems(newSelectItems);
      navigator.clipboard.writeText(
        newSelectItems.map((s) => s.value).join("")
      );
      message.success("Последовательность скопирована в буфер обмена");
      resetSelectItems();
    } else if (firstSelectItem && lastSelectItem) {
      resetSelectItems();
    }
  };
  const getIsChoosen = (item: ISelectItems) => {
    if (!firstSelectItem && !lastSelectItem) return false;
    if (JSON.stringify(item) === JSON.stringify(firstSelectItem)) return true;
    if (
      selectItems.some(
        (s) =>
          s.index === item.index &&
          s.arrayIndex === item.arrayIndex &&
          s.value === item.value
      )
    )
      return true;
    return false;
  };

  const getIsInSearch = (item: ISelectItems) => {
    if (!search) return false;

    const letterString = item.arrayIndex === 0 ? first : second;
    const lowerLetterString = letterString.toLowerCase();
    const lowerSearch = search.toLowerCase();

    let pos = -1;
    while ((pos = lowerLetterString.indexOf(lowerSearch, pos + 1)) !== -1) {
      if (item.index >= pos && item.index < pos + lowerSearch.length) {
        return true;
      }
    }

    return false;
  };

  const getIsHovered = (item: ISelectItems) => {
    if (firstSelectItem && firstSelectItem.arrayIndex === item.arrayIndex)
      return true;
  };

  return {
    handleClick,
    getIsChoosen,
    getSelectItems,
    getIsInSearch,
    getIsHovered,
  };
};
