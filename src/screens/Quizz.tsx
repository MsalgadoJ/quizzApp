import { useState } from "react";
import Options from "../components/Options";
import { QuizzActionType } from "../types/types";
import { Zoom, Fade } from "react-awesome-reveal";

import { decode } from "he";
import Timer from "../components/Timer";
import NextButton from "../components/NextButton";
import { useQuizz } from "../contexts/QuizzContext";

export default function Quizz() {
  const { state, dispatch } = useQuizz();
  const { points, currentIndex, questions, currentQuestion } = state;

  const [message, setMessage] = useState("Enter your answer 😄");
  const [hasAnswered, setHasAnswered] = useState(false);
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 4)
  );

  function handleAnswer(
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) {
    setHasAnswered(true);

    const targetElement = e.target as HTMLButtonElement;
    const isCorrect =
      targetElement.innerText === currentQuestion?.correct_answer;

    isCorrect ? setMessage("/confetti.png") : setMessage("/warning.png");

    dispatch({
      type: QuizzActionType.NEW_ANSWER,
      payload: isCorrect,
    });
  }

  function handleNext() {
    setHasAnswered(false);
    setMessage("Enter your answer 😄");
    setRandomNumber(Math.floor(Math.random() * 4));
    dispatch({ type: QuizzActionType.NEXT_QUESTION });
  }

  return (
    <>
      <div className="h-screen w-5/6 sm:max-w-[500px] flex flex-col item-center justify-center m-auto">
        <div className="mb-5 text-center">
          <p className="mb-4">
            Question {currentIndex + 1} of {questions.length}
          </p>
          <progress
            className="w-full shadow-lg "
            value={currentIndex + 1}
            max={questions.length}
          />
        </div>
        <div className="bg-orange-50 border-2 border-zinc-900 rounded-lg py-1 px-4 min-h-[100px] flex justify-center items-center text-center relative shadow-lg">
          <Fade>
            <h2>{currentQuestion ? decode(currentQuestion.question) : ""}</h2>
          </Fade>
          <picture className="absolute bottom-[-31px] right-[-26px] w-16">
            {!hasAnswered || message !== "/confetti.png" ? (
              <img src="/doubts.png" alt="doubt" className="animate-float" />
            ) : (
              <img src="/correct.png" alt="correct" className="animate-float" />
            )}
          </picture>
        </div>
        <div className="flex justify-between items-center mt-10 mb-7 text-center min-h-[50px] max-h-[50px]">
          {hasAnswered ? (
            <picture className={`w-16`}>
              <Zoom duration={200}>
                <img
                  src={message}
                  alt={
                    message.indexOf("conf") !== -1
                      ? "correct answer"
                      : "wrong answer"
                  }
                />
              </Zoom>
            </picture>
          ) : (
            <Fade>
              <p>{message}</p>
            </Fade>
          )}
          <span
            className={`text-sm uppercase ease-out ${message.indexOf("confetti") !== -1 ? "animate-score" : ""}`}
          >
            Points: {points}
          </span>
        </div>
        <Fade>
          <Options
            hasAnswered={hasAnswered}
            correctAnswer={currentQuestion?.correct_answer}
            incorrectAnswers={currentQuestion?.incorrect_answers}
            randomNumber={randomNumber}
            handleAnswer={handleAnswer}
          />
        </Fade>
        <div className="mt-8 flex justify-between items-center">
          <Timer />
          <NextButton hasAnswered={hasAnswered} handleNext={handleNext} />
        </div>
      </div>
    </>
  );
}
