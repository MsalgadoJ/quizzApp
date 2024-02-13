import { useEffect, useState } from "react";
import { fetchCategoryCount, fetchTotalCount } from "../services/countService";
import { translations } from "../helpers/translations";

export function useFormError(
  numberOfQuestions: number,
  categoryId: number,
  difficultyId: number,
  username: string
) {
  const [numberError, setNumberError] = useState(false);
  const [nameError, setNameError] = useState({ count: 0, isError: false });
  useEffect(() => {
    console.log("vengo a ver si hay errores");
    setNumberError(false);

    const fetchData = async () => {
      console.log("numberOfQuestions", numberOfQuestions);
      if (isNaN(numberOfQuestions) || numberOfQuestions === 0) {
        console.log("error 1");
        setNumberError(true);
      }
      if (categoryId !== 0) {
        const data = await fetchCategoryCount(categoryId);

        if (difficultyId !== 0) {
          numberOfQuestions >
            data.category_question_count[
              `total_${translations.en.home.difficultyOptions[difficultyId].toLocaleLowerCase()}_question_count`
            ] && setNumberError(true);
        } else if (categoryId !== 0) {
          console.log("error 2");
          numberOfQuestions >
            data.category_question_count.total_question_count &&
            setNumberError(true);
        }
      } else {
        const data = await fetchTotalCount();
        numberOfQuestions > data && setNumberError(true);
        console.log(data);
      }
    };
    fetchData();
  }, [categoryId, numberOfQuestions, difficultyId]);

  useEffect(() => {
    console.log("nameError", nameError);
    setNameError({ count: 0, isError: false });
    // console.log("error name =====>");
    // if (!username && nameError.count > 0) {
    //   console.log("lo hacemos true");
    //   setNameError(true);
    // }
  }, [username]);

  return { numberError, nameError, setNameError };
}
