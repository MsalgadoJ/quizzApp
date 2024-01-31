import { decode } from 'he';

// interface ButtonProps {}

// const Button: React.FunctionComponent<ButtonProps> = (props) => {
const Button = ({ hasAnswered, answer, handleAnswer, correctAnswer }) => {
  console.log(answer);
  console.log('correct', correctAnswer);
  const isCorrect = hasAnswered
    ? answer === correctAnswer
      ? 'bg-emerald-600 border-2 border-emerald-950 text-emerald-100 '
      : 'bg-neutral-300 border-2 border-stone-900 text-neutral-600 opacity-65 '
    : 'bg-orange-50 border-2 border-zinc-900';
  const hover = !hasAnswered
    ? 'hover:bg-violet-200 hover:text-violet-900 hover:-translate-y-px hover:border-orange-50 active:translate-y-px'
    : '';
  return (
    <button
      className={`w-full inline-block rounded-full font-semibold transition-colors duration-40 ${hover} focus:outline-none focus:ring focus:ring-orange-100 py-2 ${isCorrect}`}
      disabled={hasAnswered}
      key={answer}
      onClick={(e) => {
        handleAnswer(e);
      }}
    >
      {decode(answer)}
    </button>
  );
};

export default Button;
