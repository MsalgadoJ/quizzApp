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
