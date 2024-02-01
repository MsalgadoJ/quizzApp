import { useEffect } from 'react';
import { QuizzActionType } from '../types/types';

function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: QuizzActionType.COUNT_DOWN });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div>
      {mins}:{seconds}
    </div>
  );
}

export default Timer;
