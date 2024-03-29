import { Question } from "../types/types";
import { pointsTable, getFinalMessage } from "../helpers/helper";
import { Flip, Zoom } from "react-awesome-reveal";
import Button from "../components/Button";
import { useQuizz } from "../contexts/QuizzContext";
import { translations } from "../helpers/translations";

export default function Finished() {
  const { state } = useQuizz();

  const { questions, points, lang } = state;

  const maxPoints = questions.reduce(
    (maxPoints: number, question: Question) =>
      maxPoints + pointsTable[question.difficulty],
    0
  );

  const finalMessage = getFinalMessage(maxPoints, points, lang);

  return (
    <div className="max-w-[300px]">
      <Zoom>
        <div className="bg-sky-400 border-2 border-zinc-900 rounded-lg min-h-[300px] min-w-[300px] relative flex flex-col justify-center items-center mb-20 ">
          <picture
            className={`absolute top-[-51px] right-[${finalMessage.right}px] w-[100px]`}
          >
            <img src={finalMessage.img} alt={finalMessage.alt} />
          </picture>
          <p className="mb-4">{translations[lang].finish.score}</p>
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
      <Button />
    </div>
  );
}
