import { Bounce } from "react-awesome-reveal";
import { InputType, Lang } from "../types/types";
import { translations } from "../helpers/translations";

type InputNumberProps = {
  labelText: string;
  formError: boolean;
  inputValue: number | string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    inputName: string
  ) => void;
  lang: Lang;
  isChecked: boolean;
  type: InputType;
};

function InputNumber({
  labelText,
  formError,
  inputValue,
  handleChange,
  lang,
  isChecked,
  type,
}: InputNumberProps) {
  function getError(inputValue: string | number, lang: Lang) {
    if (inputValue === "text") {
      return "must type your name";
    } else if (inputValue === "number") {
      return +inputValue > 0
        ? translations[lang].home.formError1
        : translations[lang].home.formError2;
    }
  }

  // todo transitions to name input
  function getStyle(type: string, isChecked: boolean) {
    if (type === "text" && !isChecked) {
      return "invisible";
    } else {
      return "";
    }
  }
  return (
    <div className={`w-full mb-4 mt-2 ${getStyle(type, isChecked)}`}>
      <div className="flex justify-between items-center">
        <label htmlFor="numOfQuestions" className="min-w-48">
          {labelText}
        </label>
        <div className="flex flex-col gap-2">
          <input
            className={`w-full rounded-lg border-2 border-violet-200 px-4 py-1 text-sm focus:bg-amber-200 focus:outline-none focus:ring focus:ring-violet-900 shadow-md ${isChecked && type === "number" ? "opacity-60" : ""}`}
            type={type}
            id="numOfQuestions"
            value={inputValue}
            onChange={(e) => handleChange(e, type)}
            disabled={type === "number" ? isChecked : !isChecked}
          />
        </div>
      </div>
      {formError && (
        <Bounce>
          <p className="mt-2 text-sm text-red-600">
            {getError(inputValue, lang)}
          </p>
        </Bounce>
      )}
    </div>
  );
}

export default InputNumber;
