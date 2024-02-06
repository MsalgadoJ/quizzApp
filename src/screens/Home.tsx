import { useState, useEffect, ChangeEvent, Dispatch } from "react";

import Select from "../components/Select";
import { Action, CategoryOption, InputType, QuizzState } from "../types/types";
import {
  difficultyOptions,
  typeOptions,
  getFinalUrl,
  BASE_URL,
} from "../helpers/helper";

import { Slide } from "react-awesome-reveal";
import ButtonStart from "../components/Button";
import InputNumber from "../components/InputNumber";
import { translations } from "../helpers/translations";

interface IHomeProps {
  dispatch: Dispatch<Action>;
  quizzState: QuizzState;
}

const testDataEs = [
  { id: 9, name: "Conocimientos generales" },
  { id: 10, name: "Entretenimiento: libros" },
  { id: 11, name: "Entretenimiento: cine" },
  { id: 12, name: "Entretenimiento: Música" },
  { id: 13, name: "Entretenimiento: musicales y teatros" },
  { id: 14, name: "Entretenimiento: Televisión" },
  { id: 15, name: "Entretenimiento: videojuegos" },
  { id: 16, name: "Entretenimiento: juegos de mesa" },
  { id: 17, name: "Ciencia y naturaleza" },
  { id: 18, name: "Ciencia: Computadoras" },
  { id: 19, name: "Ciencias: Matemáticas" },
  { id: 20, name: "Mitología" },
  { id: 21, name: "Deportes" },
  { id: 22, name: "Geografía" },
  { id: 23, name: "Historia" },
  { id: 24, name: "Política" },
  { id: 25, name: "Arte" },
  { id: 26, name: "Famosos" },
  { id: 27, name: "animales" },
  { id: 28, name: "Vehículos" },
  { id: 29, name: "Entretenimiento: cómics" },
  { id: 30, name: "Ciencia: artilugios" },
  { id: 31, name: "Entretenimiento: anime y manga japoneses" },
  { id: 32, name: "Entretenimiento: dibujos animados y animaciones" },
];

const testDataEn = [
  { id: 9, name: "General Knowledge" },
  { id: 10, name: "Entertainment: Books" },
  { id: 11, name: "Entertainment: Film" },
  { id: 12, name: "Entertainment: Music" },
  { id: 13, name: "Entertainment: Musicals & Theatres" },
  { id: 14, name: "Entertainment: Television" },
  { id: 15, name: "Entertainment: Video Games" },
  { id: 16, name: "Entertainment: Board Games" },
  { id: 17, name: "Science & Nature" },
  { id: 18, name: "Science: Computers" },
  { id: 19, name: "Science: Mathematics" },
  { id: 20, name: "Mythology" },
  { id: 21, name: "Sports" },
  { id: 22, name: "Geography" },
  { id: 23, name: "History" },
  { id: 24, name: "Politics" },
  { id: 25, name: "Art" },
  { id: 26, name: "Celebrities" },
  { id: 27, name: "Animals" },
  { id: 28, name: "Vehicles" },
  { id: 29, name: "Entertainment: Comics" },
  { id: 30, name: "Science: Gadgets" },
  { id: 31, name: "Entertainment: Japanese Anime & Manga" },
  { id: 32, name: "Entertainment: Cartoon & Animations" },
];

export function Home({ dispatch, quizzState }: IHomeProps) {
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [EScategories, setESCategories] = useState<CategoryOption[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Any Category");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(
    difficultyOptions.en[0]
  );
  const [selectedType, setSelectedType] = useState<string>("Any Type");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [formError, setFormError] = useState(false);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    setFormError(false);
    const categoryId = categories.find(
      (categories) => categories.name === selectedCategory
    )?.id;

    async function fetchCategoryCount() {
      const res = await fetch(
        `${BASE_URL}api_count.php?category=${categoryId}`
      );
      return await res.json();
    }

    const fetchData = async () => {
      if (Number.isNaN(numberOfQuestions) || numberOfQuestions === 0) {
        setFormError(true);
      }
      if (categoryId && selectedCategory) {
        const data = await fetchCategoryCount();
        if (selectedDifficulty !== difficultyOptions[0]) {
          numberOfQuestions >
            data.category_question_count[
              `total_${selectedDifficulty.toLocaleLowerCase()}_question_count`
            ] && setFormError(true);
        } else if (categoryId !== 0) {
          numberOfQuestions >
            data.category_question_count.total_question_count &&
            setFormError(true);
        }
      }
    };
    fetchData();
  }, [selectedCategory, numberOfQuestions, selectedDifficulty]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        // const res = await fetch(`http://localhost:5000/categories/${lang}`);
        // const data = await res.json();
        // console.log(data);
        if (lang === "en") {
          setCategories([{ id: 0, name: "Any Category" }, ...testDataEn]);
        } else {
          setESCategories([
            { id: 0, name: "Cualquier categoría" },
            ...testDataEs,
          ]);
        }
      } catch (err) {
        console.error(err);
      }
    }
    if (categories.length === 0 || EScategories.length === 0) {
      console.log("hago un fetch");
      fetchCategories();
    }
  }, [lang]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    inputName: string
  ) {
    switch (true) {
      case inputName === InputType.NUMBER:
        return setNumberOfQuestions(parseFloat(e.target.value));

      case inputName === InputType.CATEGORY:
        console.log(e);
        return setSelectedCategory(e.target.value);

      case inputName === InputType.DIFFICULTY:
        return setSelectedDifficulty(e.target.value);

      case inputName === InputType.TYPE:
        return setSelectedType(e.target.value);

      default:
        throw new Error("type unknown");
    }
  }

  const finalUrl = getFinalUrl(
    selectedCategory,
    selectedDifficulty,
    selectedType,
    numberOfQuestions,
    categories,
    lang
  );
  console.log("finalUrl", finalUrl);

  return (
    <div className="grid h-screen grid-rows-[auto_auto_1fr_auto] w-full animate-home">
      <div>
        <button onClick={() => setLang("en")}>🇬🇧</button>
        <button onClick={() => setLang("es")}>🇪🇸</button>
      </div>
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
              <InputNumber
                labelText={translations[lang].home.inputLabel}
                formError={formError}
                numberOfQuestions={numberOfQuestions}
                handleChange={handleChange}
              />
              <Select
                name="category"
                labelText="Choose your preferred category:"
                selectedValue={selectedCategory}
                handleSelect={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, InputType.CATEGORY)
                }
                options={lang === "en" ? categories : EScategories}
              />
              <Select
                name="difficulty"
                labelText={`${translations[lang].home.difficultyLabel}:`}
                selectedValue={selectedDifficulty}
                handleSelect={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, InputType.DIFFICULTY)
                }
                options={translations[lang].home.difficultyOptions}
              />
              <Select
                name="type"
                labelText={`${translations[lang].home.typeLabel}:`}
                selectedValue={selectedType}
                handleSelect={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, InputType.TYPE)
                }
                options={translations[lang].home.TypeOptions}
              />
            </Slide>
          </div>
        </div>
      </div>
      <ButtonStart
        dispatch={dispatch}
        finalUrl={finalUrl}
        formError={formError}
        quizzState={quizzState}
      />
    </div>
  );
}
