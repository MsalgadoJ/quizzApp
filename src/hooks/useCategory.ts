import { useEffect, useState } from "react";
// import { testDataEs } from "../helpers/translations";
import { fetchCategories } from "../services/categoriesService";
import { Lang, Option } from "../types/types";
// import { findCat } from "../helpers/helper";

export function useCategory(lang: Lang) {
  const [categories, setCategories] = useState<Option[]>([]);
  const [EScategories, setESCategories] = useState<Option[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategories(lang);
      if (lang === "en") {
        setCategories(fetchedCategories);
      } else {
        setESCategories(fetchedCategories);
      }
    };

    if (categories.length === 0 || EScategories.length === 0) {
      console.log("hago un fetch");
      getCategories();
    }
  }, [lang]);

  return { categories, EScategories };
}
