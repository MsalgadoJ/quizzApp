import { useState, useEffect, ChangeEvent } from "react";

import Select from "../components/Select";
import { InputType, Option, Lang, QuizzActionType } from "../types/types";
import {
  BASE_URL,
  findCat,
  getCatId,
  getIndex,
  getTranslation,
} from "../helpers/helper";

import { Slide } from "react-awesome-reveal";
import Button from "../components/Button";
import InputNumber from "../components/InputNumber";
import { testDataEn, testDataEs, translations } from "../helpers/translations";
import { useQuizz } from "../contexts/QuizzContext";
import LangButton from "../components/LangButton";

export function Home() {
  const { state, dispatch } = useQuizz();

  const { lang } = state;
  const [categories, setCategories] = useState<Option[]>([]);
  const [EScategories, setESCategories] = useState<Option[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Option>({
    id: 0,
    name: "Any Category",
  });
  const [selectedDifficulty, setSelectedDifficulty] = useState<Option>({
    id: 0,
    name: "Any Difficulty",
  });
  const [selectedType, setSelectedType] = useState<Option>({
    id: 0,
    name: "Any Type",
  });
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [formError, setFormError] = useState(false);

  useEffect(() => {
    setFormError(false);

    async function fetchCategoryCount() {
      const res = await fetch(
        `${BASE_URL}api_count.php?category=${selectedCategory.id}`
      );
      return await res.json();
    }

    const fetchData = async () => {
      if (Number.isNaN(numberOfQuestions) || numberOfQuestions === 0) {
        setFormError(true);
      }
      if (selectedCategory.id !== 0) {
        const data = await fetchCategoryCount();
        console.log(data);
        if (selectedDifficulty.id !== 0) {
          numberOfQuestions >
            data.category_question_count[
              `total_${translations.en.home.difficultyOptions[selectedDifficulty.id].toLocaleLowerCase()}_question_count`
            ] && setFormError(true);
        } else if (selectedCategory.id !== 0) {
          numberOfQuestions >
            data.category_question_count.total_question_count &&
            setFormError(true);
        }
      }
    };

    fetchData();
  }, [selectedCategory, numberOfQuestions, selectedDifficulty]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        if (lang === "en") {
          setCategories([{ id: 0, name: "Any Category" }, ...testDataEn]);
        } else {
          setESCategories([
            { id: 0, name: "Cualquier categoría" },
            ...testDataEs,
          ]);
          if (selectedCategory.id !== 0) {
            const translateCategory = findCat(testDataEs, selectedCategory.id);
            translateCategory && setSelectedCategory(translateCategory);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    if (categories.length === 0 || EScategories.length === 0) {
      console.log("hago un fetch");
      fetchCategories();
    }
  }, [lang]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    inputName: string
  ) {
    switch (true) {
      case inputName === InputType.NUMBER:
        return setNumberOfQuestions(parseFloat(e.target.value));

      case inputName === InputType.CATEGORY:
        const catId =
          lang === "en"
            ? getCatId(categories, e.target.value)
            : getCatId(EScategories, e.target.value);
        return setSelectedCategory({ id: catId, name: e.target.value });

      case inputName === InputType.DIFFICULTY:
        const indexD = getIndex(e.target.value, "difficultyOptions", lang);
        return setSelectedDifficulty({ id: indexD, name: e.target.value });

      case inputName === InputType.TYPE:
        const indexT = getIndex(e.target.value, "typeOptions", lang);
        return setSelectedType({ id: indexT, name: e.target.value });

      default:
        throw new Error("type unknown");
    }
  }

  function handleLangChange(lang: Lang) {
    if (
      selectedCategory.id === 0 &&
      selectedDifficulty.id === 0 &&
      selectedType.id === 0
    ) {
      dispatch({ type: QuizzActionType.CHANGE_LANG, payload: lang });
    } else {
      if (EScategories.length !== 0) {
        const translateCategory =
          lang === "es"
            ? findCat(EScategories, selectedCategory.id)
            : findCat(categories, selectedCategory.id);

        translateCategory && setSelectedCategory(translateCategory);
      }
      const translateDifficulty = getTranslation(
        lang,
        "difficultyOptions",
        selectedDifficulty.id
      );
      setSelectedDifficulty({
        ...selectedDifficulty,
        name: translateDifficulty,
      });

      const translateType = getTranslation(
        lang,
        "typeOptions",
        selectedType.id
      );
      setSelectedType({
        ...selectedType,
        name: translateType,
      });
      dispatch({ type: QuizzActionType.CHANGE_LANG, payload: lang });
    }
  }

  return (
    <div className="grid min-h-screen grid-rows-[auto_auto_1fr_auto] w-full animate-home">
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
                formError={formError}
                numberOfQuestions={numberOfQuestions}
                handleChange={handleChange}
                lang={lang}
              />
              <Select
                name="category"
                labelText={`${translations[lang].home.categoryLabel}:`}
                selectedValue={selectedCategory.name}
                handleSelect={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, InputType.CATEGORY)
                }
                options={lang === "en" ? categories : EScategories}
              />
              <Select
                name="difficulty"
                labelText={`${translations[lang].home.difficultyLabel}:`}
                selectedValue={selectedDifficulty.name}
                handleSelect={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, InputType.DIFFICULTY)
                }
                options={translations[lang].home.difficultyOptions}
              />
              <Select
                name="type"
                labelText={`${translations[lang].home.typeLabel}:`}
                selectedValue={selectedType.name}
                handleSelect={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, InputType.TYPE)
                }
                options={translations[lang].home.typeOptions}
              />
            </Slide>
          </div>
        </div>
      </div>
      <Button
        numberOfQuestions={numberOfQuestions}
        selectedCategory={selectedCategory}
        selectedDifficulty={selectedDifficulty}
        selectedType={selectedType}
        formError={formError}
      />
    </div>
  );
}
