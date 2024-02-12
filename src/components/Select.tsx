import { Option } from "../types/types";

interface ISelectProps {
  name: string;
  labelText: string;
  selectedValue: string;
  handleSelect: (
    e: React.ChangeEvent<HTMLSelectElement>,
    inputName: string
  ) => void;
  options: Option[] | string[];
  isChecked?: boolean;
}

const Select: React.FunctionComponent<ISelectProps> = ({
  name,
  labelText,
  selectedValue,
  handleSelect,
  options,
  isChecked,
}) => {
  const getKey = (option: Option | string, i: number) => {
    if (typeof option === "string") {
      return i + option;
    }
    return option.id;
  };

  const getText = (option: Option | string) => {
    if (typeof option === "string") {
      return option;
    }
    return option.name;
  };

  return (
    <div className="flex flex-col mb-4 gap-2 w-full">
      <label htmlFor={name}>{labelText}</label>
      <select
        className={`rounded-lg bg-arrow bg-[length:24px_24px] bg-no-repeat bg-[center_right_10px] appearance-none border-2 border-violet-200 px-4 py-1 text-sm focus:bg-amber-200 focus:outline-none focus:ring focus:ring-violet-900 focus:ring-offset-2 ${isChecked ? "opacity-60" : ""}`}
        name={name}
        id={name}
        value={selectedValue}
        onChange={(e) => handleSelect(e, name)}
        disabled={isChecked}
      >
        {options &&
          options.map((option, i) => {
            return <option key={getKey(option, i)}>{getText(option)}</option>;
          })}
      </select>
    </div>
  );
};

export default Select;
