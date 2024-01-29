import { PointsTable } from '../types/types';

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

export const BASE_URL = 'https://opentdb.com/';

export function getFinalUrl(
  catSelected: string,
  difSelected: string,
  tpSelected: string,
  numberOfQuestions: number,
  categories: any,
): string {
  const category =
    catSelected.indexOf('Any Category') === -1
      ? `&category=${categories.find((category) => category.name === catSelected)?.id}`
      : '';
  console.log('category', category);

  const difficulty =
    difSelected === 'Any Difficulty'
      ? ''
      : `&difficulty=${difSelected.toLocaleLowerCase()}`;
  console.log('difficulty', difficulty);

  const type =
    tpSelected === 'Any Type'
      ? ''
      : `&type=${tpSelected.indexOf('True') === -1 ? 'multiple' : 'boolean'}`;

  console.log('type', type);

  const finalUrl = `${BASE_URL}api.php?amount=${numberOfQuestions}${category}${difficulty}${type}`;
  console.log('******', finalUrl);

  return finalUrl;
}
