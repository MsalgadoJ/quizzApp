import { useEffect, useState } from "react";
import { InputType, Lang, Option, QuizzActionType } from "../types/types";
import { findCat, getCatId, getIndex, getTranslation } from "../helpers/helper";
import { useQuizz } from "../contexts/QuizzContext";

export function useQuizzParams(categories: Option[], EScategories: Option[]) {
  const { state, dispatch } = useQuizz();
  const { lang } = state;

  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
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

  useEffect(() => {
    // this for updating the ui the first time we fetch spanish categories
    const categoryId = selectedCategory.id;
    if (lang === "es" && categoryId !== 0) {
      const translateCategory = findCat(EScategories, categoryId);
      translateCategory && setSelectedCategory(translateCategory);
    }
  }, [EScategories]);

  function setQuizzParam(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
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

  function handleLangChange(langProp: Lang) {
    if (
      selectedCategory.id === 0 &&
      selectedDifficulty.id === 0 &&
      selectedType.id === 0
    ) {
      dispatch({ type: QuizzActionType.CHANGE_LANG, payload: langProp });
    } else {
      if (EScategories.length !== 0) {
        const translateCategory =
          langProp === "es"
            ? findCat(EScategories, selectedCategory.id)
            : findCat(categories, selectedCategory.id);

        translateCategory && setSelectedCategory(translateCategory);
      }

      const translateDifficulty = getTranslation(
        langProp,
        "difficultyOptions",
        selectedDifficulty.id
      );
      setSelectedDifficulty({
        ...selectedDifficulty,
        name: translateDifficulty,
      });

      const translateType = getTranslation(
        langProp,
        "typeOptions",
        selectedType.id
      );
      setSelectedType({
        ...selectedType,
        name: translateType,
      });
      dispatch({ type: QuizzActionType.CHANGE_LANG, payload: langProp });
    }
  }

  return {
    numberOfQuestions,
    selectedCategory,
    selectedDifficulty,
    selectedType,
    setSelectedCategory,
    setQuizzParam,
    handleLangChange,
  };
}
