import { Bounce } from "react-awesome-reveal";
import { InputType } from "../types/types";

type InputNumberProps = {
  formError: boolean;
  numberOfQuestions: number;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    inputName: string
  ) => void;
};

function InputNumber({
  formError,
  numberOfQuestions,
  handleChange,
}: InputNumberProps) {
  return (
    <div className="w-full mb-4 mt-2">
      <div className="flex justify-between items-center">
        <label htmlFor="numOfQuestions" className="min-w-48">
          Number of questions
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
              ? "Please select fewer questions for this category"
              : "You must type a number"}
          </p>
        </Bounce>
      )}
    </div>
  );
}

export default InputNumber;
