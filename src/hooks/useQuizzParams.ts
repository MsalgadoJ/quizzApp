import { useEffect, useReducer } from "react";
import {
  InputType,
  Lang,
  Option,
  QuizzActionType,
  QuizzParamsAction,
  QuizzParamsActionType,
  QuizzParamsState,
  payloadChangeParamType,
  payloadTranslateType,
} from "../types/types";
import { findCat, getCatId, getIndex, getTranslation } from "../helpers/helper";
import { useQuizz } from "../contexts/QuizzContext";

const initialState: QuizzParamsState = {
  numberOfQuestions: 1,
  selectedCategory: {
    id: 0,
    name: "Any Category",
  },
  selectedDifficulty: {
    id: 0,
    name: "Any Difficulty",
  },
  selectedType: { id: 0, name: "Any Type" },
  username: "",
  rankingModeIsChecked: false,
};

function reducer(state: QuizzParamsState, action: QuizzParamsAction) {
  const { type, payload } = action;
  switch (type) {
    case QuizzParamsActionType.TOGGLE_RANKING_MODE:
      return {
        ...state,
        rankingModeIsChecked: !state.rankingModeIsChecked,
      };
    case QuizzParamsActionType.SELECT_RANKING_MODE:
      return {
        ...state,
        numberOfQuestions: 10,
        selectedCategory: { id: 9, name: "General Knowledge" },
        selectedType: { id: 1, name: "Multiple Choice" },
      };
    case QuizzParamsActionType.TRANSLATE_PARAMS:
      const translatePayload = payload as payloadTranslateType;
      const { langProp, EScategories, categories } = translatePayload;
      // get translations before updating the state
      const translateCategory =
        langProp === "es" && EScategories?.length !== 0
          ? findCat(EScategories, state.selectedCategory.id)
          : findCat(categories, state.selectedCategory.id);
      const translateDifficulty = getTranslation(
        langProp,
        "difficultyOptions",
        state.selectedDifficulty.id
      );
      const translateType = getTranslation(
        langProp,
        "typeOptions",
        state.selectedType.id
      );
      return {
        ...state,
        selectedCategory: translateCategory!,
        selectedDifficulty: {
          ...state.selectedDifficulty,
          name: translateDifficulty,
        },
        selectedType: {
          ...state.selectedType,
          name: translateType,
        },
      };
    case QuizzParamsActionType.SET_PARAM:
      const { e, inputName, lang } = payload as payloadChangeParamType;
      if (inputName === InputType.NUMBER) {
        return {
          ...state,
          numberOfQuestions: parseFloat(e.target.value),
        };
      }
      if (inputName === InputType.CATEGORY) {
        const catId =
          lang === "en"
            ? getCatId(categories, e.target.value)
            : getCatId(EScategories, e.target.value);
        return {
          ...state,
          selectedCategory: { id: catId, name: e.target.value },
        };
      }
      if (inputName === InputType.DIFFICULTY) {
        const index = getIndex(e.target.value, "difficultyOptions", lang);
        return {
          ...state,
          selectedDifficulty: { id: index, name: e.target.value },
        };
      }
      if (inputName === InputType.TYPE) {
        const index = getIndex(e.target.value, "typeOptions", lang);
        return {
          ...state,
          selectedType: { id: index, name: e.target.value },
        };
      }
      if (inputName === InputType.NAME) {
        return {
          ...state,
          username: e.target.value,
        };
      }
      return {
        ...state,
      };
  }
}

export function useQuizzParams(categories: Option[], EScategories: Option[]) {
  const { state, dispatch } = useQuizz();
  const { lang } = state;

  const [
    {
      numberOfQuestions,
      selectedCategory,
      selectedDifficulty,
      selectedType,
      username,
      rankingModeIsChecked,
    },
    dispatchAction,
  ] = useReducer<
    (state: QuizzParamsState, action: QuizzParamsAction) => QuizzParamsState
  >(reducer, initialState);

  // useEffect(() => {
  //   // this for updating the ui the first time we fetch spanish categories
  //   const categoryId = selectedCategory.id;
  //   if (lang === "es" && categoryId !== 0) {
  //     const translateCategory = findCat(EScategories, categoryId);
  //     translateCategory && setSelectedCategory(translateCategory);
  //   }
  // }, [EScategories]);

  useEffect(() => {
    if (rankingModeIsChecked) {
      dispatchAction({ type: QuizzParamsActionType.SELECT_RANKING_MODE });
    }
  }, [rankingModeIsChecked]);

  function setQuizzParam(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    inputName: InputType
  ) {
    dispatchAction({
      type: QuizzParamsActionType.SET_PARAM,
      payload: { e, inputName, lang, EScategories, categories },
    });
  }

  function handleLangChange(langProp: Lang) {
    if (
      selectedCategory.id === 0 &&
      selectedDifficulty.id === 0 &&
      selectedType.id === 0
    ) {
      dispatch({ type: QuizzActionType.CHANGE_LANG, payload: langProp });
    } else {
      dispatchAction({
        type: QuizzParamsActionType.TRANSLATE_PARAMS,
        payload: { langProp, EScategories, categories },
      });
      dispatch({ type: QuizzActionType.CHANGE_LANG, payload: langProp });
    }
  }

  return {
    numberOfQuestions,
    selectedCategory,
    selectedDifficulty,
    selectedType,
    username,
    setQuizzParam,
    handleLangChange,
    rankingModeIsChecked,
    dispatchAction,
  };
}
