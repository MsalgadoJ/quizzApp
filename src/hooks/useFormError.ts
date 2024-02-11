import { useEffect, useState } from "react";
import { fetchCategoryCount, fetchTotalCount } from "../services/countService";
import { translations } from "../helpers/translations";

export function useFormError(
  numberOfQuestions: number,
  categoryId: number,
  difficultyId: number
) {
  const [formError, setFormError] = useState(false);
  console.log();
  useEffect(() => {
    console.log("vengo a ver si hay errores");
    setFormError(false);

    const fetchData = async () => {
      if (Number.isNaN(numberOfQuestions) || numberOfQuestions === 0) {
        console.log("error 1");
        setFormError(true);
      }
      if (categoryId !== 0) {
        const data = await fetchCategoryCount(categoryId);

        if (difficultyId !== 0) {
          numberOfQuestions >
            data.category_question_count[
              `total_${translations.en.home.difficultyOptions[difficultyId].toLocaleLowerCase()}_question_count`
            ] && setFormError(true);
        } else if (categoryId !== 0) {
          console.log("error 2");
          numberOfQuestions >
            data.category_question_count.total_question_count &&
            setFormError(true);
        }
      } else {
        const data = await fetchTotalCount();
        numberOfQuestions > data && setFormError(true);
        console.log(data);
      }
    };
    fetchData();
  }, [categoryId, numberOfQuestions, difficultyId]);

  return { formError };
}
