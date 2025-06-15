import { useInputsValueStore } from "../../../shared/store/useInputsValueStore";
import { VisualizationListItem } from "./VisualizationListItem";
import { useSelectItems } from "../hooks/useSelectItems";

export const VisualizationList = () => {
  const { first, second } = useInputsValueStore();
  const { getIsChoosen, handleClick, getIsInSearch, getIsHovered } =
    useSelectItems({
      first,
      second,
    });
  if (!first || !second) return null;

  return (
    <div className="w-full h-[500px] border border-gray-400 rounded-2xl flex flex-col justify-center items-center gap-10 px-5">
      <div className="flex flex-col gap-3">
        <h3 className="header-4">Первичное значение</h3>
        <ul className="flex flex-row gap-1 flex-wrap">
          {first.split("").map((letter, index) => {
            return (
              <VisualizationListItem
                key={index}
                letter={letter}
                onClick={() =>
                  handleClick({ value: letter, index, arrayIndex: 0 })
                }
                isChosen={getIsChoosen({ value: letter, index, arrayIndex: 0 })}
                isInSearch={getIsInSearch({
                  value: letter,
                  index,
                  arrayIndex: 0,
                })}
                isHovered={getIsHovered({
                  value: letter,
                  index,
                  arrayIndex: 0,
                })}
              />
            );
          })}
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="header-4">Вторичное значение</h3>
        <ul className="flex flex-row gap-1 flex-wrap">
          {second.split("").map((letter, index) => {
            return (
              <VisualizationListItem
                key={index}
                letter={letter}
                isNotMatch={second[index] !== first[index]}
                onClick={() =>
                  handleClick({ value: letter, index, arrayIndex: 1 })
                }
                isChosen={getIsChoosen({ value: letter, index, arrayIndex: 1 })}
                isInSearch={getIsInSearch({
                  value: letter,
                  index,
                  arrayIndex: 1,
                })}
                isHovered={getIsHovered({
                  value: letter,
                  index,
                  arrayIndex: 1,
                })}
              />
            );
          })}
        </ul>
      </div>
      <div></div>
    </div>
  );
};
