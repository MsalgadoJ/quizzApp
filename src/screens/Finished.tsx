import { Question } from '../types/types';
import { pointsTable } from '../helpers/helper';
import { Flip, Zoom } from 'react-awesome-reveal';

// export interface IFinishedProps {}

// export default function Finished(props: IFinishedProps) {
export default function Finished({ points, questions, handleRestart }) {
  const maxPoints = questions.reduce(
    (maxPoints: number, question: Question) =>
      maxPoints + pointsTable[question.difficulty],
    0,
  );

  function getFinalMessage(maxPoints: number, points: number) {
    switch (true) {
      case points < maxPoints / 3:
        return {
          img: '/girl.png',
          alt: 'What was that?',
          message: 'What was that? 🤨',
          right: '98',
        };
      case points >= maxPoints / 3 && points < (2 / 3) * maxPoints:
        return {
          img: '/okay.png',
          alt: 'ok',
          message: 'You can do better 😅',
          right: '114',
        };
      case points >= (2 / 3) * maxPoints && points < maxPoints:
        return {
          img: '/good-job.png',
          alt: 'good job badge',
          message: 'That was great 😄',
          right: '101',
        };
      case points === maxPoints:
        return {
          img: '/clap.png',
          alt: 'clap',
          message: 'You are a genius!! 🥳',
          right: '98',
        };
      default:
        throw new Error('Incorrect value');
    }
  }

  const finalMessage = getFinalMessage(maxPoints, points);
  console.log(finalMessage);

  console.log(getFinalMessage(maxPoints, points));
  return (
    <div className="max-w-[300px]">
      <Zoom>
        <div className="bg-sky-400 border-2 border-zinc-900 rounded-lg min-h-[300px] min-w-[300px] relative flex flex-col justify-center items-center mb-20 ">
          <picture
            className={`absolute top-[-51px] right-[${finalMessage.right}px] w-[100px]`}
          >
            <img src={finalMessage.img} alt={finalMessage.alt} />
          </picture>
          <p className="mb-4">Your final score is:</p>
          <Flip delay={600}>
            <div className="w-[100px] h-[100px] rounded-full border-2 border-orange-50 bg-violet-900 py-4 px-4 text-orange-50 flex justify-center items-center mb-4">
              <p className="text-4xl">{points}</p>
            </div>
          </Flip>
          <p>{finalMessage.message}</p>
          <picture className="absolute bottom-[4px] right-[237px] w-[50px]">
            <img src="color-star.png" alt="sparkle" className="-scale-x-[1]" />
          </picture>
          <picture className="absolute bottom-[4px] left-[237px] w-[50px]">
            <img src="color-star.png" alt="sparkle" />
          </picture>
        </div>
      </Zoom>
      <div>
        <button
          className="w-full mb-4 uppercase inline-block rounded-full  bg-violet-900 border-2 border-orange-50 font-semibold text-orange-50 hover:-translate-y-px active:translate-y-px tracking-wide px-4 py-2.5 animate-pulse"
          onClick={() => handleRestart()}
        >
          try again
        </button>
      </div>
    </div>
  );
}

// TO-DO: agregar otro color a la animación del botón
