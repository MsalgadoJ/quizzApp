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
    currentQuestion: undefined,
    currentIndex: 0,
    points: 0,
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

      case QuizzActionType.NEW_ANSWER:
        const currentQuestion = state.currentQuestion as Question;
        const answer = payload as boolean;

        return {
          ...state,
          points: answer
            ? state.points + pointsTable[currentQuestion.difficulty]
            : state.points,
        };

      case QuizzActionType.NEXT_QUESTION:
        const nextIndex = state.currentIndex + 1;
        const stateQuestions = state.questions;
        return {
          ...state,
          currentQuestion: stateQuestions
            ? stateQuestions[nextIndex]
            : undefined,
          currentIndex: nextIndex,
          quizzState:
            state.currentIndex + 1 === stateQuestions?.length
              ? QuizzState.FINISHED
              : state.quizzState,
        };
      case QuizzActionType.COUNT_DOWN:
        const timeLeft = state.secondsRemaining;
        return {
          ...state,
          secondsRemaining: timeLeft - 1,
          circleDash:
            ((timeLeft - 1) / (state.questions.length * SECS_PER_QUESTION)) *
            283,
          quizzState: timeLeft === 0 ? QuizzState.FINISHED : state.quizzState,
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
      currentQuestion,
      currentIndex,
      points,
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

  const className = getClassString(quizzState);

  return (
    <div className={className}>
      <>
        {quizzState === QuizzState.PENDING && (
          <Home dispatch={dispatch} quizzState={quizzState} />
        )}
        {quizzState === QuizzState.LOADING && <Loader />}
        {quizzState === QuizzState.STARTED && (
          <Quizz
            points={points}
            currentIndex={currentIndex}
            questions={questions}
            currentQuestion={currentQuestion}
            secondsRemaining={secondsRemaining}
            circleDash={circleDash}
            dispatch={dispatch}
          />
        )}
        {quizzState === QuizzState.FINISHED && (
          <Finished
            points={points}
            questions={questions}
            dispatch={dispatch}
            quizzState={quizzState}
          />
        )}
      </>
    </div>
  );
}

export default App;
