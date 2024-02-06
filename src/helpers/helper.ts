import { Option, PointsTable, QuizzState } from "../types/types";
import { translations } from "./translations";

export const BASE_URL = "https://opentdb.com/";

export const SECS_PER_QUESTION = 20;

export function createOptions(
  wrongAnswers: string[],
  correctAnswer: string,
  randomNumber: number
) {
  if (wrongAnswers.length > 1) {
    if (wrongAnswers.indexOf(correctAnswer) === -1) {
      wrongAnswers.splice(randomNumber, 0, correctAnswer);
      return wrongAnswers;
    }
    return wrongAnswers;
  } else {
    return ["True", "False"];
  }
}

export const pointsTable: PointsTable = {
  easy: 1,
  medium: 2,
  hard: 3,
};

export const difficultyOptions = {
  en: ["Any Difficulty", "Easy", "Medium", "Hard"],
  es: ["Cualquier dificultad", "Fácil", "Medio", "Difícil"],
};

export const typeOptions = ["Any Type", "Multiple Choice", "True/False"];

export function getFinalUrl(
  catSelected: string,
  difSelected: string,
  tpSelected: string,
  numberOfQuestions: number,
  categories: any,
  lang: string
): string {
  const category =
    catSelected.indexOf("Any Category") === -1 ||
    catSelected.indexOf("Cualquier") === -1
      ? `&category=${categories.find((category: Option) => category.name === catSelected)?.id}`
      : "";

  const difficulty =
    difSelected === "Any Difficulty" || difSelected === "Cualquier dificultad"
      ? ""
      : `&difficulty=${lang === "en" ? difSelected.toLocaleLowerCase() : translations.en.home.difficultyOptions[translations.es.home.difficultyOptions.indexOf(difSelected)].toLowerCase()}`;

  const type =
    tpSelected === "Any Type" || tpSelected === "Cualquier tipo"
      ? ""
      : `&type=${lang === "en" ? (tpSelected.indexOf("True") === -1 ? "multiple" : "boolean") : translations.en.home.TypeOptions[translations.es.home.TypeOptions.indexOf(tpSelected)].indexOf("True") === -1 ? "multiple" : "boolean"}`;

  const finalUrl = `${BASE_URL}api.php?amount=${numberOfQuestions}${category}${difficulty}${type}`;
  return finalUrl;
}

export function getClassString(quizzState: string) {
  let base = "h-screen ";
  if (quizzState === QuizzState.LOADING) {
    base +=
      "flex justify-center items-center bg-bg-quizz-sm bg-cover sm:bg-bg-quizz-lg sm:bg-cover xl:bg-bg-quizz-xl opacity-90";
  } else if (quizzState === QuizzState.FINISHED) {
    base +=
      "flex justify-center items-center bg-bg-final-sm bg-cover sm:bg-bg-final-lg lg:bg-bg-final-xl";
  } else if (quizzState === QuizzState.PENDING) {
    base += "bg-bg-start-sm bg-cover sm:bg-bg-start-xl";
  } else if (quizzState === QuizzState.STARTED) {
    base +=
      "bg-bg-quizz-sm bg-cover sm:bg-bg-quizz-lg sm:bg-cover xl:bg-bg-quizz-xl";
  }
  return base;
}

export function getFinalMessage(maxPoints: number, points: number) {
  switch (true) {
    case points < maxPoints / 3:
      return {
        img: "/girl.png",
        alt: "What was that?",
        message: "What was that? 🤨",
        right: "98",
      };
    case points >= maxPoints / 3 && points < (2 / 3) * maxPoints:
      return {
        img: "/okay.png",
        alt: "ok",
        message: "You can do better 😅",
        right: "114",
      };
    case points >= (2 / 3) * maxPoints && points < maxPoints:
      return {
        img: "/good-job.png",
        alt: "good job badge",
        message: "That was great 😄",
        right: "101",
      };
    case points === maxPoints:
      return {
        img: "/clap.png",
        alt: "clap",
        message: "You are a genius!! 🥳",
        right: "98",
      };
    default:
      throw new Error("Incorrect value");
  }
}

export function getAnswerStyles(
  answer: string,
  hasAnswered: boolean,
  correctAnswer: string
) {
  return hasAnswered
    ? answer === correctAnswer
      ? "bg-emerald-600 border-2 border-emerald-950 text-emerald-100 "
      : "bg-neutral-300 border-2 border-stone-900 text-neutral-600 opacity-65 "
    : "bg-orange-50 border-2 border-zinc-900";
}
export const getHover = (hasAnswered: boolean) =>
  !hasAnswered
    ? "hover:bg-violet-200 hover:text-violet-900 hover:-translate-y-px hover:border-orange-50 active:translate-y-px"
    : "";
