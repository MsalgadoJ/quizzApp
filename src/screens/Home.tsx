import { useState, useEffect, ChangeEvent } from 'react';

import Select from '../components/Select';
import { CategoryOption, InputType } from '../types/types';
import {
  difficultyOptions,
  typeOptions,
  getFinalUrl,
  BASE_URL,
} from '../helpers/helper';

import { Slide, Fade, Bounce } from 'react-awesome-reveal';

interface IHomeProps {
  handleStart: (finalUrl: string) => void
}

export function Home({ handleStart }: IHomeProps) {

  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>('Any Category');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(
    difficultyOptions[0],
  );
  const [selectedType, setSelectedType] = useState<string>('Any Type');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [formError, setFormError] = useState(false)

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

  useEffect(() => {
    setFormError(false)
    const categoryId = categories.find(categories => categories.name === selectedCategory)?.id

    async function fetchCategoryCount () {
      const res = await fetch(`${BASE_URL}api_count.php?category=${categoryId}`);
      return await res.json();
    }

    const fetchData = async () => {
      if(Number.isNaN(numberOfQuestions) || numberOfQuestions === 0) {
        setFormError(true)
      }
      if(categoryId && selectedCategory) {
        const data = await fetchCategoryCount()
        if(selectedDifficulty !== difficultyOptions[0]) {
          numberOfQuestions > data.category_question_count[`total_${selectedDifficulty.toLocaleLowerCase()}_question_count`] && setFormError(true)
        } else if(categoryId !== 0) {
          numberOfQuestions >data.category_question_count.total_question_count && setFormError(true)
        }
      }
    }
    fetchData()
  }, [selectedCategory, numberOfQuestions, selectedDifficulty])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, inputName: string) {
    switch(true) {
      case inputName === InputType.NUMBER:
        return setNumberOfQuestions(parseFloat(e.target.value))

      case inputName === InputType.CATEGORY:
        return setSelectedCategory(e.target.value)

      case inputName === InputType.DIFFICULTY:
        return setSelectedDifficulty(e.target.value)

      case inputName === InputType.TYPE:
        return setSelectedType(e.target.value)

      default:
        throw new Error('type unknown')
    }
  }

  const finalUrl = getFinalUrl(selectedCategory, selectedDifficulty, selectedType, numberOfQuestions, categories)

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

      <div className="overflow-y-auto overflow-x-hidden sm:max-w-1/2">
        <div className="flex flex-col justify-center items-center w-5/6 mb-4 m-auto sm:max-w-[500px]">
          <div className="w-full ">
            <Slide direction="right">
              <div className="w-full mb-4 mt-2">
                <div className='flex justify-between items-center'>
                <label htmlFor="numOfQuestions" className="min-w-48">
                  Number of questions
                </label>
                <div className="flex flex-col gap-2">
                  <input
                    className="w-full rounded-lg border-2 border-violet-200 px-4 py-1 text-sm focus:bg-amber-200 focus:outline-none focus:ring focus:ring-violet-900 shadow-md"
                    type="number"
                    id="numOfQuestions"
                    value={numberOfQuestions}
                    onChange={(e) => handleChange(e, InputType.NUMBER)}
                  />
                </div>
                </div>
                {formError && (
                  <Bounce>
                <p className='mt-2 text-sm text-red-600'>{numberOfQuestions > 0 ? 'Please select fewer questions for this category' : 'You must type a number'}</p></Bounce>                )}
              </div>
              <Select
                name="category"
                labelText="Choose your preferred category:"
                selectedValue={selectedCategory}
                handleSelect={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, InputType.CATEGORY)}
                options={categories}
              />
              <Select
                name="difficulty"
                labelText="Choose your level of difficulty:"
                selectedValue={selectedDifficulty}
                handleSelect={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, InputType.DIFFICULTY)}
                options={difficultyOptions}
              />
              <Select
                name="type"
                labelText="Choose preferred type of questions:"
                selectedValue={selectedType}
                handleSelect={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, InputType.TYPE)}
                options={typeOptions}
              />
            </Slide>
          </div>
        </div>
      </div>
      <div className="w-5/6 m-auto sm:max-w-[500px] mb-3">
        <Fade delay={500}>
          <button
            className="w-full mb-4 uppercase inline-block rounded-full bg-orange-50 border-2 border-zinc-900 font-semibold text-zinc-900 tracking-wide transition-colors duration-40 hover:bg-amber-500  hover:border-orange-50 hover:-translate-y-px active:translate-y-px focus:bg-amber-500 focus:outline-none focus:ring focus:ring-amber-500 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 animate-float"
            onClick={() =>
              handleStart(finalUrl)
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleStart(finalUrl)
              }
            }}
            disabled={formError}
          >
            get started
          </button>
        </Fade>
      </div>
    </div>
  );
}
