import { decode } from 'he';

// interface ButtonProps {}

// const Button: React.FunctionComponent<ButtonProps> = (props) => {
const Button = ({ hasAnswered, answer, handleAnswer, correctAnswer }) => {
  console.log(answer);
  console.log('correct', correctAnswer);
  const isCorrect = hasAnswered
    ? answer === correctAnswer
      ? 'bg-violet-900 border-orange-50 text-orange-50 animate-pulse'
      : 'bg-red-300 border-stone-400 text-neutral-600'
    : '';

  const handleCorrect = (e) => {
    return e.target.innerText === correctAnswer
      ? console.log('yei')
      : console.log('noooooo');
  };

  return (
    <button
      className={`w-full inline-block rounded-full bg-orange-50 border-2 border-zinc-900 font-semibold py-2 ${isCorrect}`}
      disabled={hasAnswered}
      key={answer}
      onClick={(e) => {
        handleAnswer(e);
        handleCorrect(e);
      }}
    >
      {decode(answer)}
    </button>
  );
};

export default Button;
