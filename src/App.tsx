import { Home } from "./screens/Home";
import { QuizzState } from "./types/types";
import { getClassString } from "./helpers/helper";

import Loader from "./components/Loader";
import Quizz from "./screens/Quizz";
import Finished from "./screens/Finished";

import { useQuizz } from "./contexts/QuizzContext";

function App() {
  const { state, dispatch } = useQuizz();
  const {
    quizzState,
    points,
    currentIndex,
    questions,
    currentQuestion,
    secondsRemaining,
    circleDash,
  } = state;

  const className = getClassString(quizzState);

  return (
    <div className={className}>
      <>
        {quizzState === QuizzState.PENDING && (
          <Home dispatch={dispatch} quizzState={quizzState} />
        )}
        {quizzState === QuizzState.LOADING && <Loader />}
        {quizzState === QuizzState.STARTED && (
          <Quizz
            points={points}
            currentIndex={currentIndex}
            questions={questions}
            currentQuestion={currentQuestion}
            secondsRemaining={secondsRemaining}
            circleDash={circleDash}
            dispatch={dispatch}
          />
        )}
        {quizzState === QuizzState.FINISHED && (
          <Finished
            points={points}
            questions={questions}
            dispatch={dispatch}
            quizzState={quizzState}
          />
        )}
      </>
    </div>
  );
}

export default App;
