import { useState, useEffect, useReducer } from 'react';
import {
  Question,
  QuizzState,
  QuizzActionType,
  Action,
  AppState,
  CategoryOption,
} from './types/types';
import {
  createOptions,
  difficultyOptions,
  typeOptions,
  pointsTable,
} from './helpers/helper';
import { decode } from 'he';

function App() {
  const BASE_URL = 'https://opentdb.com/';

  const initialState: AppState = {
    quizzState: QuizzState.PENDING,
    questions: [],
    randomNumber: 0,
    currentQuestion: undefined,
    currentIndex: 0,
    hasAnswered: false,
    points: 0,
    message: 'Enter your answer 😄',
  };

  function reducer(state: AppState, action: Action) {
    const { type, payload } = action;
    switch (type) {
      case QuizzActionType.START:
        return {
          ...state,
          quizzState: QuizzState.LOADING,
        };
      case QuizzActionType.FETCHED_DATA:
        const questions = payload as Question[];
        return {
          ...state,
          questions,
          currentQuestion: questions.length > 0 ? questions[0] : undefined,
          quizzState: QuizzState.STARTED,
        };
      case QuizzActionType.NEXT_QUESTION:
        const nextIndex = state.currentIndex + 1;
        return {
          ...state,
          currentQuestion: state.questions
            ? state.questions[nextIndex]
            : undefined,
          currentIndex: nextIndex,
          hasAnswered: false,
          message: 'Enter your answer 😄',
          randomNumber: Math.floor(Math.random() * 4),
        };
      case QuizzActionType.NEW_ANSWER:
        const currentQuestion = state.currentQuestion as Question;
        const isCorrect = payload === currentQuestion.correct_answer;

        return {
          ...state,
          hasAnswered: true,
          quizzState:
            state.currentIndex + 1 === state.questions?.length
              ? QuizzState.FINISHED
              : state.quizzState,
          message: isCorrect
            ? 'Correct!!! 🥳'
            : '❌ Better try with the next one 😕',
          points: state.points + pointsTable[currentQuestion.difficulty],
        };
      default:
        throw new Error('Action unknown');
    }
  }

  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>('Any Category');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(
    difficultyOptions[0],
  );
  const [selectedType, setSelectedType] = useState<string>('Any Type');
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

  const [
    {
      quizzState,
      questions,
      randomNumber,
      currentQuestion,
      currentIndex,
      hasAnswered,
      points,
      message,
    },
    dispatch,
  ] = useReducer<(state: AppState, action: Action) => AppState>(
    reducer,
    initialState,
  );

  const maxPoints = questions.reduce(
    (maxPoints: number, question: Question) =>
      maxPoints + pointsTable[question.difficulty],
    0,
  );

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
    async function fetchQuestions() {
      // https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple
      const category =
        selectedCategory.indexOf('Any Category') === -1
          ? `&category=${categories.find((category) => category.name === selectedCategory)?.id}`
          : '';
      console.log('category', category);

      const difficulty =
        selectedDifficulty === 'Any Difficulty'
          ? ''
          : `&difficulty=${selectedDifficulty.toLocaleLowerCase()}`;
      console.log('difficulty', difficulty);

      const type =
        selectedType === 'Any Type'
          ? ''
          : `&type=${selectedType.indexOf('True') === -1 ? 'multiple' : 'boolean'}`;

      console.log('type', type);

      const finalUrl = `${BASE_URL}api.php?amount=${numberOfQuestions}${category}${difficulty}${type}`;
      console.log(finalUrl);
      try {
        const res = await fetch(finalUrl);
        const data = await res.json();
        dispatch({ type: QuizzActionType.FETCHED_DATA, payload: data.results });
      } catch (err) {
        console.error(err);
      }
    }

    if (quizzState === 'loading' && questions.length === 0) {
      fetchQuestions();
    }
  }, [quizzState, questions]);

  function handleSelectCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(e.target);
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

  async function handleStart() {
    dispatch({ type: QuizzActionType.START });
  }

  const handleAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetElement = e.target as HTMLButtonElement;
    dispatch({
      type: QuizzActionType.NEW_ANSWER,
      payload: targetElement.innerText || targetElement.value,
    });
  };

  const handleNext = () => {
    dispatch({ type: QuizzActionType.NEXT_QUESTION });
  };

  return (
    <div className="bg-bg-mobile h-screen bg-cover px-4 py-4">
      <h1 className="text-3xl font-bold underline">
        Welcome to the quizz app!
      </h1>
      <div>
        {quizzState === 'pending' && (
          <div>
            <p>Please, select preffered options to start the game 😎</p>
            <label htmlFor="numOfQuestions">Enter number of questions</label>
            <input
              type="number"
              id="numOfQuestions"
              value={numberOfQuestions}
              onChange={handleNumberOfQuestions}
            />
            <label htmlFor="options">Choose your preferred category:</label>
            <select
              name="category"
              id="options"
              value={selectedCategory}
              onChange={handleSelectCategory}
            >
              {categories &&
                categories.map((category) => {
                  return <option key={category.id}>{category.name}</option>;
                })}
            </select>
            <label htmlFor="difficulty">Choose your level of difficulty:</label>
            <select
              name="difficulty"
              id="difficulty"
              value={selectedDifficulty}
              onChange={handleSelectDifficulty}
            >
              {difficultyOptions &&
                difficultyOptions.map((difficulty, i) => {
                  return <option key={i + difficulty}>{difficulty}</option>;
                })}
            </select>
            <label htmlFor="type">Choose preferred type of questions:</label>
            <select
              name="type"
              id="type"
              value={selectedType}
              onChange={handleSelectType}
            >
              {typeOptions &&
                typeOptions.map((type, i) => {
                  return <option key={i + type}>{type}</option>;
                })}
            </select>
            <button onClick={() => handleStart()}>start</button>
            <p></p>
          </div>
        )}
        {quizzState === 'loading' && 'Retrieving....'}
        {quizzState === 'started' && (
          <div>
            <div>
              <p>{message}</p>
              <span>Points: {points}</span>
              <p>
                Question: {currentIndex + 1}/{questions.length}
              </p>
            </div>
            <h1>{currentQuestion ? decode(currentQuestion.question) : ''}</h1>
            <div>
              {currentQuestion &&
                createOptions(
                  currentQuestion.incorrect_answers,
                  currentQuestion.correct_answer,
                  randomNumber,
                )?.map((answer) => {
                  return (
                    <button
                      disabled={hasAnswered}
                      key={answer}
                      onClick={(e) => handleAnswer(e)}
                    >
                      {decode(answer)}
                    </button>
                  );
                })}
            </div>
            <div>
              <button disabled={!hasAnswered} onClick={() => handleNext()}>
                Next
              </button>
            </div>
          </div>
        )}
        {quizzState === 'finished' && (
          <div>
            <p>Total points: {points}</p>
            <p>{points < maxPoints / 3 ? 'What was that? 🤨' : null}</p>
            <p>
              {points >= maxPoints / 3 && points < (2 / 3) * maxPoints
                ? 'You can do better 😅'
                : null}
            </p>
            <p>
              {points >= (2 / 3) * maxPoints && points < maxPoints
                ? 'That was good 😄'
                : null}
            </p>
            <p>{points === maxPoints ? 'You are a genius!! 🥳' : null}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
