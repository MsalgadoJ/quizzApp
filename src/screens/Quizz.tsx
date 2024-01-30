import Button from '../components/Button';
import { createOptions } from '../helpers/helper';
import { QuizzActionType } from '../types/types';

import { decode } from 'he';

// export interface IQuizzProps {}

// export default function Quizz(props: IQuizzProps) {
export default function Quizz({
  message,
  points,
  currentIndex,
  questions,
  currentQuestion,
  randomNumber,
  hasAnswered,
  dispatch,
}) {
  const handleAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetElement = e.target as HTMLButtonElement;
    dispatch({
      type: QuizzActionType.NEW_ANSWER,
      payload: targetElement.innerText || targetElement.value,
    });
  };

  const handleNext = () => {
    dispatch({ type: QuizzActionType.NEXT_QUESTION });
  };

  return (
    <div className="h-screen bg-bg-mobile-quizz bg-cover">
      <div className="w-5/6 sm:max-w-[500px] flex flex-col item-center m-auto">
        <div className="mt-10 mb-5 text-center">
          <p>
            Question {currentIndex + 1} of {questions.length}
          </p>
        </div>
        <div className="bg-orange-50 border border-zinc-900 rounded-lg py-1 px-4 min-h-[100px] flex justify-center items-center text-center relative">
          <h2>{currentQuestion ? decode(currentQuestion.question) : ''}</h2>
          <picture className="absolute bottom-[-18px] right-[-22px] w-16">
            <img src="/doubts.png" alt="" />
          </picture>
        </div>
        <div className="mt-10 mb-5 text-center">
          <progress
            className="w-full"
            value={currentIndex + 1}
            max={questions.length}
          />
          <p>{message}</p>
          <span>Points: {points}</span>
        </div>
        <div className="flex flex-col gap-4">
          {currentQuestion &&
            createOptions(
              currentQuestion.incorrect_answers,
              currentQuestion.correct_answer,
              randomNumber,
            )?.map((answer) => {
              return (
                <Button
                  hasAnswered={hasAnswered}
                  answer={answer}
                  handleAnswer={handleAnswer}
                  correctAnswer={currentQuestion.correct_answer}
                />
              );
            })}
        </div>
        <div className="mt-8 flex justify-end">
          <button
            className="rounded-lg bg-amber-500 border-2 border-zinc-900 py-2 px-5 uppercase"
            disabled={!hasAnswered}
            onClick={() => handleNext()}
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
}
