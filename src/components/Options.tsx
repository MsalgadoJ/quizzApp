import { decode } from "he";
import { createOptions } from "../helpers/helper";
import { getAnswerStyles, getHover } from "../helpers/helper";

interface ButtonProps {
  hasAnswered: boolean;
  handleAnswer: (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  correctAnswer?: string;
  incorrectAnswers?: string[];
  randomNumber: number;
}

const Options: React.FunctionComponent<ButtonProps> = ({
  hasAnswered,
  handleAnswer,
  correctAnswer,
  incorrectAnswers,
  randomNumber,
}) => {
  return (
    <div className="flex flex-col gap-4 min-h-[224px]">
      {incorrectAnswers &&
        createOptions(
          incorrectAnswers,
          correctAnswer as string,
          randomNumber
        )?.map((answer) => {
          return (
            <button
              className={`w-full inline-block rounded-full font-semibold transition-colors duration-40 ${getHover(hasAnswered)} focus:outline-none focus:ring focus:ring-orange-100 py-2 ${correctAnswer && getAnswerStyles(answer, hasAnswered, correctAnswer)}`}
              disabled={hasAnswered}
              key={answer}
              onClick={(e) => {
                handleAnswer(e);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleAnswer(e);
                }
              }}
            >
              {decode(answer)}
            </button>
          );
        })}
    </div>
  );
};

export default Options;
