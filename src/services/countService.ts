import { BASE_URL } from "../helpers/helper";

export async function fetchTotalCount() {
  const res = await fetch(`${BASE_URL}api_count_global.php`);
  const data = await res.json();
  return data.overall.total_num_of_questions;
}

export async function fetchCategoryCount(categoryId: number) {
  const res = await fetch(`${BASE_URL}api_count.php?category=${categoryId}`);
  return await res.json();
}
