import { useEffect, useReducer } from 'react';

import { Home } from './screens/home';
import {
  Question,
  QuizzState,
  QuizzActionType,
  Action,
  AppState,
} from './types/types';
import { createOptions, pointsTable } from './helpers/helper';
import { decode } from 'he';

function App() {
  const initialState: AppState = {
    quizzState: QuizzState.PENDING,
    questions: [],
    randomNumber: 0,
    currentQuestion: undefined,
    currentIndex: 0,
    hasAnswered: false,
    points: 0,
    message: 'Enter your answer 😄',
    finalUrl: '',
  };

  function reducer(state: AppState, action: Action) {
    const { type, payload } = action;
    switch (type) {
      case QuizzActionType.START:
        const url = payload as string;
        return {
          ...state,
          quizzState: QuizzState.LOADING,
          finalUrl: url,
        };
      case QuizzActionType.FETCHED_DATA:
        const questions = payload as Question[];
        return {
          ...state,
          questions,
          currentQuestion: questions.length > 0 ? questions[0] : undefined,
          quizzState: QuizzState.STARTED,
        };
      case QuizzActionType.NEXT_QUESTION:
        const nextIndex = state.currentIndex + 1;
        return {
          ...state,
          currentQuestion: state.questions
            ? state.questions[nextIndex]
            : undefined,
          currentIndex: nextIndex,
          hasAnswered: false,
          message: 'Enter your answer 😄',
          randomNumber: Math.floor(Math.random() * 4),
        };
      case QuizzActionType.NEW_ANSWER:
        const currentQuestion = state.currentQuestion as Question;
        const isCorrect = payload === currentQuestion.correct_answer;

        return {
          ...state,
          hasAnswered: true,
          quizzState:
            state.currentIndex + 1 === state.questions?.length
              ? QuizzState.FINISHED
              : state.quizzState,
          message: isCorrect
            ? 'Correct!!! 🥳'
            : '❌ Better try with the next one 😕',
          points: state.points + pointsTable[currentQuestion.difficulty],
        };
      default:
        throw new Error('Action unknown');
    }
  }

  const [
    {
      quizzState,
      questions,
      randomNumber,
      currentQuestion,
      currentIndex,
      hasAnswered,
      points,
      message,
      finalUrl,
    },
    dispatch,
  ] = useReducer<(state: AppState, action: Action) => AppState>(
    reducer,
    initialState,
  );

  const maxPoints = questions.reduce(
    (maxPoints: number, question: Question) =>
      maxPoints + pointsTable[question.difficulty],
    0,
  );

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(finalUrl);
        const data = await res.json();
        dispatch({ type: QuizzActionType.FETCHED_DATA, payload: data.results });
      } catch (err) {
        console.error(err);
      }
    }

    if (
      quizzState === QuizzState.LOADING &&
      finalUrl !== '' &&
      questions.length === 0
    ) {
      fetchQuestions();
    }
  }, [quizzState, questions]);

  async function handleStart(getFinalUrl: string) {
    console.log('desde APP', getFinalUrl);
    dispatch({ type: QuizzActionType.START, payload: getFinalUrl });
  }

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
    <div className="bg-bg-mobile h-screen bg-cover">
      <>
        {quizzState === QuizzState.PENDING && (
          <Home handleStart={handleStart} />
        )}
        {quizzState === QuizzState.LOADING && 'Retrieving....'}
        {quizzState === QuizzState.STARTED && (
          <div>
            <div>
              <p>{message}</p>
              <span>Points: {points}</span>
              <p>
                Question: {currentIndex + 1}/{questions.length}
              </p>
            </div>
            <h1>{currentQuestion ? decode(currentQuestion.question) : ''}</h1>
            <div>
              {currentQuestion &&
                createOptions(
                  currentQuestion.incorrect_answers,
                  currentQuestion.correct_answer,
                  randomNumber,
                )?.map((answer) => {
                  return (
                    <button
                      disabled={hasAnswered}
                      key={answer}
                      onClick={(e) => handleAnswer(e)}
                    >
                      {decode(answer)}
                    </button>
                  );
                })}
            </div>
            <div>
              <button disabled={!hasAnswered} onClick={() => handleNext()}>
                Next
              </button>
            </div>
          </div>
        )}
        {quizzState === QuizzState.FINISHED && (
          <div>
            <p>Total points: {points}</p>
            <p>{points < maxPoints / 3 ? 'What was that? 🤨' : null}</p>
            <p>
              {points >= maxPoints / 3 && points < (2 / 3) * maxPoints
                ? 'You can do better 😅'
                : null}
            </p>
            <p>
              {points >= (2 / 3) * maxPoints && points < maxPoints
                ? 'That was good 😄'
                : null}
            </p>
            <p>{points === maxPoints ? 'You are a genius!! 🥳' : null}</p>
          </div>
        )}
      </>
    </div>
  );
}

export default App;
