import { testDataEn, testDataEs } from "../helpers/translations";
import { Lang } from "../types/types";

export async function fetchCategories(lang: Lang) {
  try {
    if (lang === "en") {
      return await [{ id: 0, name: "Any Category" }, ...testDataEn];
    } else {
      return await [{ id: 0, name: "Cualquier categoría" }, ...testDataEs];
    }
  } catch (err) {
    console.error(err);
  }
}
