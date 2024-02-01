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
  PENDING = 'pending',
  LOADING = 'loading',
  STARTED = 'started',
  FINISHED = 'finished',
}

export enum QuizzActionType {
  START = 'start',
  FETCHED_DATA = 'fetchedData',
  NEXT_QUESTION = 'nextQuestion',
  NEW_ANSWER = 'newAnswer',
  RESTART = 'restart',
  COUNT_DOWN = 'countDown',
}

export interface Action {
  type: QuizzActionType;
  payload?: Question[] | string;
}

export interface AppState {
  quizzState: QuizzState;
  questions: Question[];
  randomNumber: number;
  currentQuestion?: Question;
  currentIndex: number;
  hasAnswered: boolean;
  points: number;
  message: string;
  finalUrl: string;
  secondsRemaining: number;
}

export interface CategoryOption {
  id: number;
  name: string;
}
