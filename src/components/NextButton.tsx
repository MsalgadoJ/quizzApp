interface NextButtonProps {
  hasAnswered: boolean;
  handleNext: () => void;
}

function NextButton({ hasAnswered, handleNext }: NextButtonProps) {
  return (
    <div>
      <button
        className={`rounded-lg bg-amber-500 border-2 border-zinc-900 py-2 px-5 uppercase  ${hasAnswered ? "animate-pulse transition-colors duration-40 hover:bg-orange-200 hover:-translate-y-px active:translate-y-px " : "shadow-lg"}`}
        disabled={!hasAnswered}
        onClick={() => handleNext()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleNext();
          }
        }}
      >
        next
      </button>
    </div>
  );
}

export default NextButton;
