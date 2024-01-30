type Option = {
  id: number;
  name: string;
};

interface ISelectProps {
  name: string;
  labelText: string;
  selectedValue: string | Option;
  handleSelect: any;
  options: Option[] | string[];
}

// const Select: React.FunctionComponent<ISelectProps> = (props) => {
const Select: React.FunctionComponent<ISelectProps> = ({
  name,
  labelText,
  selectedValue,
  handleSelect,
  options,
}) => {
  const getKey = (option: Option, i: number) => option.id ?? i + option;
  const getText = (option) => option.name ?? option;

  return (
    <div className="flex flex-col mb-4 gap-2 w-full">
      <label htmlFor={name}>{labelText}</label>
      <select
        className="rounded-lg border border-stone-200 px-4 py-1 text-s"
        name={name}
        id={name}
        value={selectedValue}
        onChange={handleSelect}
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
