import {
  HomeKeys,
  Lang,
  Option,
  PointsTable,
  QuizzState,
} from "../types/types";
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

export function getIndex(value: string, prop: HomeKeys, lang: Lang) {
  return translations[lang].home[prop].indexOf(value);
}

export function getTranslation(
  lang: "es" | "en",
  prop: HomeKeys,
  index: number
) {
  return translations[lang].home[prop][index];
}

export function getCatId(array: Option[], value: string) {
  return array.find((category: Option) => category.name === value)!.id;
}

export function findCat(array: Option[], value: number) {
  return array.find((cat) => cat.id === value);
}

export function getFinalUrl(
  numberOfQuestions: number,
  catSelected: Option,
  difSelected: Option,
  tpSelected: Option
): string {
  console.log(catSelected);
  console.log(difSelected);
  console.log(tpSelected);
  const category = catSelected.id === 0 ? "" : `&category=${catSelected.id}`;

  const difficulty =
    difSelected.id === 0
      ? ""
      : `&difficulty=${translations.en.home.difficultyOptions[difSelected.id].toLowerCase()}`;

  const type =
    tpSelected.id === 0
      ? ""
      : `&type=${translations.en.home.typeOptions[tpSelected.id].indexOf("True") !== -1 ? "boolean" : "multiple"}`;

  const finalUrl = `${BASE_URL}api.php?amount=${numberOfQuestions}${category}${difficulty}${type}`;
  return finalUrl;
}

export function getClassString(quizzState: string) {
  let base = "min-h-screen ";
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

export function getFinalMessage(maxPoints: number, points: number, lang: Lang) {
  switch (true) {
    case points < maxPoints / 3:
      return {
        img: "/girl.png",
        alt: "What was that?",
        message: translations[lang].finish.msg1,
        right: "98",
      };
    case points >= maxPoints / 3 && points < (2 / 3) * maxPoints:
      return {
        img: "/okay.png",
        alt: "ok",
        message: translations[lang].finish.msg2,
        right: "114",
      };
    case points >= (2 / 3) * maxPoints && points < maxPoints:
      return {
        img: "/good-job.png",
        alt: "good job badge",
        message: translations[lang].finish.msg3,
        right: "101",
      };
    case points === maxPoints:
      return {
        img: "/clap.png",
        alt: "clap",
        message: translations[lang].finish.msg4,
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
