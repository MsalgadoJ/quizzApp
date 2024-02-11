import { Home } from "./screens/Home";
import { QuizzState } from "./types/types";
import { getClassString } from "./helpers/helper";

import Loader from "./components/Loader";
import Quizz from "./screens/Quizz";
import Finished from "./screens/Finished";

import { useQuizz } from "./contexts/QuizzContext";

function App() {
  const { state } = useQuizz();
  const { quizzState } = state;

  const className = getClassString(quizzState);

  return (
    <div className={className}>
      <>
        {quizzState === QuizzState.PENDING && <Home />}
        {quizzState === QuizzState.LOADING && <Loader />}
        {quizzState === QuizzState.STARTED && <Quizz />}
        {quizzState === QuizzState.FINISHED && <Finished />}
      </>
    </div>
  );
}

export default App;
