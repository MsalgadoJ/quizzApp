import React, { createContext, useContext, useEffect, useReducer } from "react";
import {
  Action,
  AppState,
  Question,
  QuizzActionType,
  QuizzState,
} from "../types/types";
import { SECS_PER_QUESTION, pointsTable } from "../helpers/helper";

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

type QuizzContextType = AppState | undefined;

const QuizzContext = createContext<QuizzContextType>(undefined);

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
        currentQuestion: stateQuestions ? stateQuestions[nextIndex] : undefined,
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
          ((timeLeft - 1) / (state.questions.length * SECS_PER_QUESTION)) * 283,
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

function QuizzProvider({ children }: { children: React.ReactNode }) {
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

  return (
    <QuizzContext.Provider
      value={{
        quizzState,
        questions,
        currentQuestion,
        currentIndex,
        points,
        finalUrl,
        secondsRemaining,
        circleDash,
      }}
    >
      {children}
    </QuizzContext.Provider>
  );
}

function useQuizz() {
  const context = useContext(QuizzContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");
  return context;
}

export { QuizzProvider, useQuizz };
