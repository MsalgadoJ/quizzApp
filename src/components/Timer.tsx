import { useState, useEffect, useRef } from 'react';
import { QuizzActionType } from '../types/types';

function Timer({ dispatch, secondsRemaining, circleDash }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeLimit = useRef(secondsRemaining)

  useEffect(() => {
    const id = setInterval(function() {
      dispatch({ type: QuizzActionType.COUNT_DOWN })
    }, 1000);
    return () => clearInterval(id);
    
  }, [dispatch]);

  return (
<div className={`base-timer relative h-[100px] w-[100px] py-1 px-1 rounded-full bg-orange-100 shadow-lg`}>
  <svg className="base-timer__svg -scale-x-100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g className="base-timer__circle fill-orange-100 stroke-none drop-shadow-lg">
      <circle className="base-timer__path-elapsed stroke-[4px] stroke-orange-50" cx="50" cy="50" r="45" />
      <path
        id="base-timer-path-remaining"
        strokeDasharray={`${Math.floor(circleDash)} 283`}
        // strokeDasharray={`100 283`}
        className={`base-timer__path-remaining stroke-[7px] stroke-[linecap]-round transition-all duration-1000 ease-linear ${secondsRemaining > (timeLimit.current/2) ? 'stroke-purple-600' : (secondsRemaining > 5 ? 'stroke-orange-500' : 'stroke-red-600 animate-pulse')} rotate-90 origin-center 0`}
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span className={`absolute top-0 left-0 h-[100px] w-[100px] flex items-center justify-center ${secondsRemaining < 5 &&'animate-pulse'}`}>
    {mins<10 && '0'}
    {mins}:{seconds < 10 && '0'}
    {seconds}
  </span>
</div>
  );
}

export default Timer;
