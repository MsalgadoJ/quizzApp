import { useEffect, useReducer } from "react";

import { Home } from "./screens/Home";
import {
  Question,
  QuizzState,
  QuizzActionType,
  Action,
  AppState,
} from "./types/types";
import {
  pointsTable,
  getClassString,
  SECS_PER_QUESTION,
} from "./helpers/helper";

import Loader from "./components/Loader";
import Quizz from "./screens/Quizz";
import Finished from "./screens/Finished";

function App() {
  const initialState: AppState = {
    quizzState: QuizzState.PENDING,
    questions: [],
    randomNumber: 0,
    currentQuestion: undefined,
    currentIndex: 0,
    hasAnswered: false,
    points: 0,
    message: "Enter your answer 😄",
    finalUrl: "",
    secondsRemaining: 0,
    circleDash: 283,
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
          secondsRemaining: questions.length * SECS_PER_QUESTION,
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
          message: "Enter your answer 😄",
          randomNumber: Math.floor(Math.random() * 4),
          quizzState:
            state.currentIndex + 1 === state.questions?.length
              ? QuizzState.FINISHED
              : state.quizzState,
        };
      case QuizzActionType.NEW_ANSWER:
        const currentQuestion = state.currentQuestion as Question;
        const isCorrect = payload === currentQuestion.correct_answer;

        return {
          ...state,
          hasAnswered: true,
          message: isCorrect ? "/confetti.png" : "/warning.png",
          points: isCorrect
            ? state.points + pointsTable[currentQuestion.difficulty]
            : state.points,
        };
      case QuizzActionType.COUNT_DOWN:
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
          circleDash:
            (state.secondsRemaining /
              (state.questions.length * SECS_PER_QUESTION)) *
            283,
          quizzState:
            state.secondsRemaining === 0
              ? QuizzState.FINISHED
              : state.quizzState,
        };
      case QuizzActionType.RESTART:
        return {
          ...initialState,
        };
      default:
        throw new Error("Action unknown");
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
      secondsRemaining,
      circleDash,
    },
    dispatch,
  ] = useReducer<(state: AppState, action: Action) => AppState>(
    reducer,
    initialState
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
      finalUrl !== "" &&
      questions.length === 0
    ) {
      fetchQuestions();
    }
  }, [quizzState, questions]);

  async function handleStart(getFinalUrl: string) {
    dispatch({ type: QuizzActionType.START, payload: getFinalUrl });
  }

  function handleRestart() {
    dispatch({ type: QuizzActionType.RESTART });
  }

  const className = getClassString(quizzState);

  return (
    <div className={className}>
      <>
        {quizzState === QuizzState.PENDING && (
          <Home handleStart={handleStart} />
        )}
        {quizzState === QuizzState.LOADING && <Loader />}
        {quizzState === QuizzState.STARTED && (
          <Quizz
            message={message}
            points={points}
            currentIndex={currentIndex}
            questions={questions}
            currentQuestion={currentQuestion}
            randomNumber={randomNumber}
            hasAnswered={hasAnswered}
            secondsRemaining={secondsRemaining}
            circleDash={circleDash}
            dispatch={dispatch}
          />
        )}
        {quizzState === QuizzState.FINISHED && (
          <Finished
            points={points}
            questions={questions}
            handleRestart={handleRestart}
          />
        )}
      </>
    </div>
  );
}

export default App;
