import Select from "../components/Select";
import { Slide } from "react-awesome-reveal";
import Button from "../components/Button";
import InputNumber from "../components/InputNumber";
import { translations } from "../helpers/translations";
import { useQuizz } from "../contexts/QuizzContext";
import LangButton from "../components/LangButton";
import { useCategory } from "../hooks/useCategory";
import { useQuizzParams } from "../hooks/useQuizzParams";
import { useFormError } from "../hooks/useFormError";
import Checkbox from "../components/Checkbox";
import { InputType } from "../types/types";

export function Home() {
  const { state } = useQuizz();
  const { lang } = state;

  const { categories, EScategories } = useCategory(lang);

  const {
    numberOfQuestions,
    selectedCategory,
    selectedDifficulty,
    selectedType,
    setQuizzParam,
    handleLangChange,
    username,
    rankingModeIsChecked,
    dispatchAction,
  } = useQuizzParams(categories, EScategories);

  const { numberError, nameError, setNameError } = useFormError(
    numberOfQuestions,
    selectedCategory.id,
    selectedDifficulty.id,
    username
  );

  return (
    <div className="grid min-h-screen grid-rows-[auto_auto_1fr_auto_auto] w-full animate-home">
      <div className="flex justify-end gap-2 pt-4 mr-4">
        <LangButton
          label={"🇬🇧"}
          langProp="en"
          handleLangChange={handleLangChange}
        />
        <LangButton
          label={"🇪🇸"}
          langProp="es"
          handleLangChange={handleLangChange}
        />
      </div>
      <div className="w-5/6 m-auto mt-10 flex flex-col items-center">
        <picture className="w-32 sm:w-36">
          <Slide direction="down">
            <img src="quiz-logo.png" alt="quizzMind-logo" />
          </Slide>
        </picture>
        <Slide direction="left">
          <h1
            className="text-2xl font-bold text-center mt-5 sm:text-3xl"
            dangerouslySetInnerHTML={{
              __html: translations[lang].home.welcome,
            }}
          />
        </Slide>
        <p className="text-center mt-6 mb-5 animate-pulseOnce">
          {translations[lang].home.instruction}
        </p>
      </div>
      <div className="overflow-y-auto overflow-x-hidden sm:max-w-1/2">
        <div className="flex flex-col justify-center items-center w-5/6 mb-4 m-auto sm:max-w-[500px]">
          <div className="w-full ">
            <Slide direction="right">
              <InputNumber
                labelText={translations[lang].home.inputLabel}
                numberError={numberError}
                nameError={nameError}
                inputValue={numberOfQuestions}
                handleChange={setQuizzParam}
                lang={lang}
                rankingModeIsChecked={rankingModeIsChecked}
                type={InputType.NUMBER}
              />
              <Select
                name={InputType.CATEGORY}
                labelText={`${translations[lang].home.categoryLabel}:`}
                selectedValue={selectedCategory.name}
                handleSelect={setQuizzParam}
                options={lang === "en" ? categories : EScategories}
                rankingModeIsChecked={rankingModeIsChecked}
              />
              <Select
                name={InputType.DIFFICULTY}
                labelText={`${translations[lang].home.difficultyLabel}:`}
                selectedValue={selectedDifficulty.name}
                handleSelect={setQuizzParam}
                options={translations[lang].home.difficultyOptions}
              />
              <Select
                name={InputType.TYPE}
                labelText={`${translations[lang].home.typeLabel}:`}
                selectedValue={selectedType.name}
                handleSelect={setQuizzParam}
                options={translations[lang].home.typeOptions}
                rankingModeIsChecked={rankingModeIsChecked}
              />
            </Slide>
          </div>
        </div>
      </div>
      <div className="w-5/6 mb-4 m-auto sm:max-w-[500px] flex flex-col justify-items-center items-center">
        <InputNumber
          labelText="Enter your name"
          numberError={numberError}
          nameError={nameError}
          inputValue={username}
          handleChange={setQuizzParam}
          lang={lang}
          rankingModeIsChecked={rankingModeIsChecked}
          type={InputType.NAME}
        />
        <Checkbox
          rankingModeIsChecked={rankingModeIsChecked}
          dispatchAction={dispatchAction}
        />
      </div>
      <Button
        numberOfQuestions={numberOfQuestions}
        selectedCategory={selectedCategory}
        selectedDifficulty={selectedDifficulty}
        selectedType={selectedType}
        numberError={numberError}
        username={username}
        setNameError={setNameError}
        nameError={nameError}
      />
    </div>
  );
}
