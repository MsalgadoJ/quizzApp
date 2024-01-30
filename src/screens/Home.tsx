import { useState, useEffect } from 'react';

import Select from '../components/Select';
import { CategoryOption } from '../types/types';
import {
  difficultyOptions,
  typeOptions,
  getFinalUrl,
  BASE_URL,
} from '../helpers/helper';

// export interface IHomeProps {}

export function Home({ handleStart }) {
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>('Any Category');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(
    difficultyOptions[0],
  );
  const [selectedType, setSelectedType] = useState<string>('Any Type');
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch(`${BASE_URL}api_category.php`);
      const data = await res.json();
      setCategories([
        { id: 0, name: 'Any Category' },
        ...data.trivia_categories,
      ]);
      try {
      } catch (err) {
        console.error(err);
      }
    }
    fetchCategories();
  }, []);

  // handlers
  function handleSelectCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedCategory(e.target.value);
  }

  function handleSelectDifficulty(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedDifficulty(e.target.value);
  }
  function handleSelectType(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedType(e.target.value);
  }

  function handleNumberOfQuestions(e: React.ChangeEvent<HTMLInputElement>) {
    setNumberOfQuestions(parseFloat(e.target.value));
  }

  return (
    <div className="bg-bg-mobile bg-cover grid h-screen grid-rows-[auto_1fr_auto] w-full animate-home">
      <div className="w-5/6 m-auto mt-10 flex flex-col items-center">
        <picture className="w-1/2 sm:w-60">
          <img src="quiz.png" alt="" />
        </picture>
        <h1 className="text-3xl font-bold text-center mt-5">
          Welcome to QuizzyMind
        </h1>
        <p className="text-center mt-6 mb-10">
          Please, select preferred options to start the game 😎
        </p>
      </div>

      <div className="overflow-auto sm:max-w-1/2">
        <div className="flex flex-col justify-center items-center w-5/6 m-auto sm:max-w-[500px]">
          <div className="w-full ">
            <div className="w-full flex items-center gap-2 mb-4">
              <label htmlFor="numOfQuestions" className="min-w-48">
                Number of questions
              </label>
              <div className="">
                <input
                  className="w-full rounded-lg border border-stone-200 px-4 py-1 text-sm"
                  type="number"
                  id="numOfQuestions"
                  value={numberOfQuestions}
                  onChange={handleNumberOfQuestions}
                />
              </div>
            </div>
            <Select
              name="category"
              labelText="Choose your preferred category:"
              selectedValue={selectedCategory}
              handleSelect={handleSelectCategory}
              options={categories}
            />
            <Select
              name="difficulty"
              labelText="Choose your level of difficulty:"
              selectedValue={selectedDifficulty}
              handleSelect={handleSelectDifficulty}
              options={difficultyOptions}
            />
            <Select
              name="type"
              labelText="Choose preferred type of questions:"
              selectedValue={selectedType}
              handleSelect={handleSelectType}
              options={typeOptions}
            />
          </div>
        </div>
      </div>
      <div className="w-5/6 m-auto sm:max-w-[500px]">
        <button
          className="w-full mb-4 uppercase inline-block rounded-full bg-orange-50 border-2 border-zinc-900 font-semibold text-zinc-900 tracking-wide px-4 py-2.5"
          onClick={() =>
            handleStart(
              getFinalUrl(
                selectedCategory,
                selectedDifficulty,
                selectedType,
                numberOfQuestions,
                categories,
              ),
            )
          }
        >
          get started
        </button>
      </div>
    </div>
  );
}
