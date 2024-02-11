export async function fetchQuestions(finalUrl: string) {
  try {
    const res = await fetch(finalUrl);
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}
