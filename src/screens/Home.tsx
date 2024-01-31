import { useState, useEffect } from 'react';

import Select from '../components/Select';
import { CategoryOption } from '../types/types';
import {
  difficultyOptions,
  typeOptions,
  getFinalUrl,
  BASE_URL,
} from '../helpers/helper';

import { Slide, Fade } from 'react-awesome-reveal';

// export interface IHomeProps {}

export function Home({ handleStart }) {
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>('Any Category');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(
    difficultyOptions[0],
  );
  const [selectedType, setSelectedType] = useState<string>('Any Type');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);

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
    <div className="grid h-screen grid-rows-[auto_1fr_auto] w-full animate-home">
      <div className="w-5/6 m-auto mt-10 flex flex-col items-center">
        <picture className="w-32 sm:w-36">
          <Slide direction="down">
            <img src="quiz-logo.png" alt="" />
          </Slide>
        </picture>
        <Slide direction="left">
          <h1 className="text-2xl font-bold text-center mt-5 sm:text-3xl">
            Welcome to <br /> QuizzyMind
          </h1>
        </Slide>
        <p className="text-center mt-6 mb-5 animate-pulseOnce">
          Select preferred options to start the game 😎
        </p>
      </div>

      <div className="overflow-auto sm:max-w-1/2">
        <div className="flex flex-col justify-center items-center w-5/6 mb-4 m-auto sm:max-w-[500px]">
          <div className="w-full ">
            <Fade>
              <div className="w-full flex justify-between items-center gap-2 mb-4 mt-2">
                <label htmlFor="numOfQuestions" className="min-w-48">
                  Number of questions
                </label>
                <div className="">
                  <input
                    className="w-full rounded-lg border border-stone-200 px-4 py-1 text-sm focus:bg-amber-200 focus:outline-none focus:ring focus:ring-violet-900"
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
            </Fade>
          </div>
        </div>
      </div>
      <div className="w-5/6 m-auto sm:max-w-[500px] mb-3">
        <Fade delay={500}>
          <button
            className="w-full mb-4 uppercase inline-block rounded-full bg-orange-50 border-2 border-zinc-900 font-semibold text-zinc-900 tracking-wide transition-colors duration-40 hover:bg-amber-500  hover:border-orange-50 hover:-translate-y-px active:translate-y-px focus:bg-amber-500 focus:outline-none focus:ring focus:ring-amber-500 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 animate-float"
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
        </Fade>
      </div>
    </div>
  );
}
