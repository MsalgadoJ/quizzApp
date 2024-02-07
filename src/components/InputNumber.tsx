import { Bounce } from "react-awesome-reveal";
import { InputType, Lang } from "../types/types";
import { translations } from "../helpers/translations";

type InputNumberProps = {
  labelText: string;
  formError: boolean;
  numberOfQuestions: number;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    inputName: string
  ) => void;
  lang: Lang;
};

function InputNumber({
  labelText,
  formError,
  numberOfQuestions,
  handleChange,
  lang,
}: InputNumberProps) {
  return (
    <div className="w-full mb-4 mt-2">
      <div className="flex justify-between items-center">
        <label htmlFor="numOfQuestions" className="min-w-48">
          {labelText}
        </label>
        <div className="flex flex-col gap-2">
          <input
            className="w-full rounded-lg border-2 border-violet-200 px-4 py-1 text-sm focus:bg-amber-200 focus:outline-none focus:ring focus:ring-violet-900 shadow-md"
            type="number"
            id="numOfQuestions"
            value={numberOfQuestions}
            onChange={(e) => handleChange(e, InputType.NUMBER)}
          />
        </div>
      </div>
      {formError && (
        <Bounce>
          <p className="mt-2 text-sm text-red-600">
            {numberOfQuestions > 0
              ? translations[lang].home.formError1
              : translations[lang].home.formError2}
          </p>
        </Bounce>
      )}
    </div>
  );
}

export default InputNumber;
