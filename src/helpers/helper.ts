import { Option, PointsTable, QuizzState } from '../types/types';

export const BASE_URL = 'https://opentdb.com/';

export const SECS_PER_QUESTION = 20;

export function createOptions(
  wrongAnswers: string[],
  correctAnswer: string,
  randomNumber: number,
) {
  if (wrongAnswers.length > 1) {
    if (wrongAnswers.indexOf(correctAnswer) === -1) {
      wrongAnswers.splice(randomNumber, 0, correctAnswer);
      return wrongAnswers;
    }
    return wrongAnswers;
  } else {
    return ['True', 'False'];
  }
}

export const pointsTable: PointsTable = {
  easy: 1,
  medium: 2,
  hard: 3,
};

export const difficultyOptions = ['Any Difficulty', 'Easy', 'Medium', 'Hard'];

export const typeOptions = ['Any Type', 'Multiple Choice', 'True/False'];

export function getFinalUrl(
  catSelected: string,
  difSelected: string,
  tpSelected: string,
  numberOfQuestions: number,
  categories: any,
): string {
  const category =
    catSelected.indexOf('Any Category') === -1
      ? `&category=${categories.find((category: Option) => category.name === catSelected)?.id}`
      : '';

  const difficulty =
    difSelected === 'Any Difficulty'
      ? ''
      : `&difficulty=${difSelected.toLocaleLowerCase()}`;

  const type =
    tpSelected === 'Any Type'
      ? ''
      : `&type=${tpSelected.indexOf('True') === -1 ? 'multiple' : 'boolean'}`;

  const finalUrl = `${BASE_URL}api.php?amount=${numberOfQuestions}${category}${difficulty}${type}`;
  return finalUrl;
}

export function getClassString(quizzState: string) {
  let base = 'h-screen ';
  if (quizzState === QuizzState.LOADING) {
    base +=
      'flex justify-center items-center bg-bg-quizz-sm bg-cover sm:bg-bg-quizz-lg sm:bg-cover xl:bg-bg-quizz-xl opacity-90';
  } else if (quizzState === QuizzState.FINISHED) {
    base +=
      'flex justify-center items-center bg-bg-final-sm bg-cover sm:bg-bg-final-lg lg:bg-bg-final-xl';
  } else if (quizzState === QuizzState.PENDING) {
    base += 'bg-bg-start-sm bg-cover sm:bg-bg-start-xl';
  } else if (quizzState === QuizzState.STARTED) {
    base +=
      'bg-bg-quizz-sm bg-cover sm:bg-bg-quizz-lg sm:bg-cover xl:bg-bg-quizz-xl';
  }
  return base;
}
