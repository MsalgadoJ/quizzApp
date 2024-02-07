export type PointsTable = {
  [key: string]: number;
};

export interface Question {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export enum QuizzState {
  PENDING = "pending",
  LOADING = "loading",
  STARTED = "started",
  FINISHED = "finished",
}

export enum InputType {
  CATEGORY = "category",
  DIFFICULTY = "difficulty",
  TYPE = "type",
  NUMBER = "number",
}

export enum QuizzActionType {
  START = "start",
  FETCHED_DATA = "fetchedData",
  NEXT_QUESTION = "nextQuestion",
  NEW_ANSWER = "newAnswer",
  RESTART = "restart",
  COUNT_DOWN = "countDown",
}

export interface Action {
  type: QuizzActionType;
  payload?: Question[] | string | boolean;
}

export interface AppState {
  quizzState: QuizzState;
  questions: Question[];
  currentQuestion?: Question;
  currentIndex: number;
  points: number;
  finalUrl: string;
  secondsRemaining: number;
  circleDash: number;
}

export type Option = {
  id: number;
  name: string;
};

export type HomeKeys =
  | "inputLabel"
  | "difficultyLabel"
  | "difficultyOptions"
  | "typeLabel"
  | "typeOptions";

export type Lang = "es" | "en";
