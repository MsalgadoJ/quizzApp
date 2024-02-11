import { Fade } from "react-awesome-reveal";
import { QuizzActionType, QuizzState, Option } from "../types/types";
import { getFinalUrl } from "../helpers/helper";
import { useQuizz } from "../contexts/QuizzContext";
import { translations } from "../helpers/translations";

interface PropsButton {
  formError?: boolean;
  numberOfQuestions?: number;
  selectedCategory?: Option;
  selectedDifficulty?: Option;
  selectedType?: Option;
}

function Button({
  numberOfQuestions,
  selectedCategory,
  selectedDifficulty,
  selectedType,
  formError,
}: PropsButton) {
  const { state, dispatch } = useQuizz();
  const { quizzState, lang } = state;

  const base = `w-full mb-4 uppercase inline-block rounded-full font-semibold tracking-wide px-4 py-2.5 hover:-translate-y-px active:translate-y-px`;
  return (
    <>
      {quizzState === QuizzState.PENDING && (
        <div className="w-5/6 m-auto sm:max-w-[500px] mb-3">
          <Fade delay={500}>
            <button
              className={`${base} bg-orange-50 border-2 border-zinc-900 text-zinc-900 transition-colors duration-40 hover:bg-amber-500  hover:border-orange-50 focus:bg-amber-500 focus:outline-none focus:ring focus:ring-amber-500 focus:ring-offset-2 disabled:cursor-not-allowed  animate-float`}
              onClick={() => {
                const finalUrl = getFinalUrl(
                  numberOfQuestions!,
                  selectedCategory!,
                  selectedDifficulty!,
                  selectedType!
                );
                console.log(finalUrl);
                dispatch({ type: QuizzActionType.START, payload: finalUrl });
              }}
              disabled={formError}
            >
              {translations[lang].home.startLabel}
            </button>
          </Fade>
        </div>
      )}
      {quizzState === QuizzState.FINISHED && (
        <div>
          <button
            className={`${base} bg-violet-900 border-2 border-orange-50 transition-transform text-orange-50 animate-pulse`}
            onClick={() => dispatch({ type: QuizzActionType.RESTART })}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                dispatch({ type: QuizzActionType.RESTART });
              }
            }}
          >
            {translations[lang].finish.finishLabel}
          </button>
        </div>
      )}
    </>
  );
}

export default Button;
