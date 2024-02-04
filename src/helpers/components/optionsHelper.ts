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
