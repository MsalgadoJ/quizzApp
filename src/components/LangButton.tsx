import { useQuizz } from "../contexts/QuizzContext";
import { Lang } from "../types/types";

interface ILangButtonProps {
  label: string;
  langProp: Lang;
  handleLangChange: (langProp: Lang) => void;
}

function LangButton({ label, langProp, handleLangChange }: ILangButtonProps) {
  const { state } = useQuizz();
  const { lang } = state;

  const selectedLanguage = "scale-150";

  return (
    <button
      className={`text-2xl transition-transform ${lang === langProp ? selectedLanguage : ""}`}
      onClick={() => handleLangChange(langProp)}
    >
      {label}
    </button>
  );
}

export default LangButton;
