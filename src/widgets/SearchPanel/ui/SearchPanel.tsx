import { Button, Input, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useSearchPanel } from "../hook/useSearchPanel";
import { useInputsValueStore } from "../../../shared/store/useInputsValueStore";
const { Search } = Input;

export const SearchPanel = () => {
  const { isOpen, handleSearch, handleClose } = useSearchPanel();
  const { first, second } = useInputsValueStore();

  const onSearch = (value: string) => {
    handleSearch(value);

    const countMatches = (str: string, substr: string) =>
      substr ? str.split(substr).length - 1 : 0;

    const firstMatches = countMatches(first, value);
    const secondMatches = countMatches(second, value);
    const totalMatches = firstMatches + secondMatches;

    if (!totalMatches) {
      message.error("Ничего не найдено");
      return;
    }

    const messages = [
      firstMatches && `Найдено ${firstMatches} совпадений в первом значении`,
      secondMatches && `Найдено ${secondMatches} совпадений во втором значении`,
    ].filter(Boolean);

    message.success(messages.join(" и "));
  };

  return (
    isOpen && (
      <div className="w-full py-5 px-5 border border-gray-400 rounded-2xl flex flex-col justify-center items-center gap-10">
        <div className="flex justify-between w-full">
          <div className="w-full flex">
            <h3 className="header-4 text-primary">Поиск</h3>
          </div>
          <Button
            type="default"
            shape="circle"
            icon={<CloseOutlined />}
            className="w-10 h-10 flex items-center justify-center"
            onClick={handleClose}
          />
        </div>
        <Search
          placeholder="Введите строку для поиска"
          enterButton="Найти"
          size="large"
          onSearch={onSearch}
        ></Search>
      </div>
    )
  );
};
