import Button from '../components/Button';
import { createOptions } from '../helpers/helper';
import { QuizzActionType } from '../types/types';
import { Zoom, Fade } from 'react-awesome-reveal';

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

  // fix sm bg
  // check behavior with some asnwers that are not set as correct when they are

  const handleNext = () => {
    dispatch({ type: QuizzActionType.NEXT_QUESTION });
  };

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
            <h2>{currentQuestion ? decode(currentQuestion.question) : ''}</h2>
          </Fade>
          <picture className="absolute bottom-[-31px] right-[-26px] w-16">
            <img src="/doubts.png" alt="doubt" className="animate-float" />
          </picture>
        </div>
        <div className="flex justify-between items-center mt-10 mb-7 text-center min-h-[50px] max-h-[50px]">
          {hasAnswered ? (
            <picture className={`w-16`}>
              <Zoom duration={200}>
                <img src={message} alt="" />
              </Zoom>
            </picture>
          ) : (
            <p>{message}</p>
          )}
          <span
            className={`text-sm uppercase ease-out ${message.indexOf('confetti') !== -1 ? 'animate-score' : ''}`}
          >
            Points: {points}
          </span>
        </div>
        <div className="flex flex-col gap-4 min-h-[224px]">
          {currentQuestion &&
            createOptions(
              currentQuestion.incorrect_answers,
              currentQuestion.correct_answer,
              randomNumber,
            )?.map((answer) => {
              return (
                <Fade>
                  <Button
                    hasAnswered={hasAnswered}
                    answer={answer}
                    handleAnswer={handleAnswer}
                    correctAnswer={currentQuestion.correct_answer}
                  />
                </Fade>
              );
            })}
        </div>
        <div className="mt-8 flex justify-end">
          <button
            className={`rounded-lg bg-amber-500 border-2 border-zinc-900 py-2 px-5 uppercase  ${hasAnswered ? 'animate-pulse transition-colors duration-40 hover:bg-orange-200 hover:-translate-y-px active:translate-y-px' : ''}`}
            disabled={!hasAnswered}
            onClick={() => handleNext()}
          >
            next
          </button>
        </div>
      </div>
    </>
  );
}
