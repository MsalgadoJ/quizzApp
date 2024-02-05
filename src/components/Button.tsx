import { Fade } from "react-awesome-reveal";
import { Action, QuizzActionType, QuizzState } from "../types/types";
import { Dispatch } from "react";

interface PropsButton {
  dispatch: Dispatch<Action>;
  finalUrl?: string;
  formError?: boolean;
  quizzState: QuizzState;
}

function Button({ quizzState, dispatch, finalUrl, formError }: PropsButton) {
  const base = `w-full mb-4 uppercase inline-block rounded-full font-semibold tracking-wide px-4 py-2.5 hover:-translate-y-px active:translate-y-px`;
  return (
    <>
      {quizzState === QuizzState.PENDING && (
        <div className="w-5/6 m-auto sm:max-w-[500px] mb-3">
          <Fade delay={500}>
            <button
              className={`${base} bg-orange-50 border-2 border-zinc-900 text-zinc-900 transition-colors duration-40 hover:bg-amber-500  hover:border-orange-50 focus:bg-amber-500 focus:outline-none focus:ring focus:ring-amber-500 focus:ring-offset-2 disabled:cursor-not-allowed  animate-float`}
              onClick={() =>
                dispatch({ type: QuizzActionType.START, payload: finalUrl })
              }
              disabled={formError}
            >
              get started
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
            try again
          </button>
        </div>
      )}
    </>
  );
}

export default Button;
