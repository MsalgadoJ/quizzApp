import { useEffect, useReducer } from "react"

function App() {

  interface Question {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }

  enum QuizzState {
    PENDING = 'pending',
    LOADING = 'loading',
    STARTED = 'started',
    FINISHED = 'finished'
  }

  enum quizzActionType {
    START = 'start',
    FETCHED_DATA = 'fetchedData'
  }


  interface Action {
    type: quizzActionType,
    payload: Question[]
  }


  interface AppState {
    quizzState: QuizzState,
    questions: Question[] | [],
    randomNumber: number,
    currentQuestion?: Question | null,
    currentIndex: number,
    hasAnswered: boolean,
    points: number,
    message: string
  }

  type PointsTable = {
    [key: string]: number;
  };


  const pointsTable: PointsTable = {
    easy: 1,
    medium: 2,
    hard: 3
  }

  const initialState: AppState = {
    quizzState: QuizzState.PENDING,
    questions: [],
    randomNumber: 0,
    currentQuestion: null,
    currentIndex: 0,
    hasAnswered: false,
    points: 0,
    message: 'Enter your answer 😄'
  }

  function reducer(state: AppState, action: Action) {
    switch (action.type) {
      case quizzActionType.START:
        return {
          ...state,
          quizzState: QuizzState.LOADING
        };
      case quizzActionType.FETCHED_DATA: 
      return {
        ...state,
        questions: action.payload,
        currentQuestion: action.payload[0],
        quizzState: QuizzState.FINISHED
      }
      default:
        throw new Error("Action unknown")
    }
  }

  // const [quizzState, setQuizzState] = useState<QuizzState>('pending')
  // const [questions, setQuestions] = useState<Question[]>([])
  // const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 4))
  // const [currentQuestion, setCurrentQuestion] = useState(null)
  // const [currentIndex, setCurrentIndex] = useState(0)
  // const [hasAnswered, setHasAnswered] = useState(false)
  // const [points, setPoints] = useState(0)
  // const [message, setMessage] = useState()

  const [
    {quizzState, questions, randomNumber, currentQuestion, currentIndex, hasAnswered, points, message}, 
    dispatch] = useReducer(reducer, initialState)


  const maxPoints = questions.reduce((maxPoints, question) => maxPoints + pointsTable[question.difficulty], 0)
  console.log('maxPoints', maxPoints)
  console.log('tercio', maxPoints / 3)
  console.log('2/3', (2 / 3) * maxPoints)

  useEffect(() => {
    console.log('corremos el useEffect')
    async function fetchQuestions() {
      try {
        const res = await fetch("https://opentdb.com/api.php?amount=10")
        const data = await res.json()
        dispatch({type: quizzActionType.FETCHED_DATA, payload: data.results})
      } catch(err) {
        console.error(err)
      }
    }

    if(quizzState === 'loading' && questions.length === 0) {
      console.log(' ****** buscamos las preguntas ****** ')
      fetchQuestions()
    }

  },[quizzState, questions])


  function createOptions(wrongAnswers: string[], correctAnswer: string) {
    console.log('randomNumber', randomNumber)
    if(wrongAnswers.length > 1) {
      if(wrongAnswers.indexOf(correctAnswer) === -1) {
        wrongAnswers.splice(randomNumber, 0, correctAnswer);
        return wrongAnswers
      }
      return wrongAnswers
    } else {
      return ["True", "False"]
    } 
  }

  const handleStart = async () => {
    dispatch({type: quizzActionType.START})
  }

  const handleAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    setHasAnswered(true)
    const targetElement = e.target as HTMLButtonElement
    if (targetElement.innerText === currentQuestion.correct_answer) {
      setMessage("Correct!!! 🥳")
      setPoints(points => points + pointsTable[currentQuestion.difficulty])
    } else {
      setMessage('❌ Better try with the next one 😕')
    }
    if(currentIndex + 1 === questions.length) {
      setQuizzState('finished')
    }
  }

  const handleNext = () => {
    setCurrentQuestion(questions[currentIndex + 1])
    setCurrentIndex(currentIndex => currentIndex + 1)
    setHasAnswered(false)
    setMessage('Enter your answer 😄')
    setRandomNumber(Math.floor(Math.random() * 4))
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Welcome to the quizz app!
      </h1>
      <div>
        { quizzState === 'pending' && (
          <div>
            <p>Please, select your options to start the game 😎</p>
            <button onClick={() => handleStart()}>start</button>
          </div>
        )}
        { quizzState === 'loading' && 'Retrieving....' }
        { quizzState === 'started' && (
            <div>
              <div>
                <p>{message}</p><span>Points: {points}</span>
                <p>Question: {currentIndex+1}/{questions.length}</p>
              </div>
              <h1>{currentQuestion.question}</h1>
              <div>
                {     
                  createOptions(currentQuestion.incorrect_answers, currentQuestion.correct_answer)?.map((answer) => {
                    return (
                        <button disabled={hasAnswered} key={answer} onClick={(e) => handleAnswer(e)}>{answer}</button>
                    )
                  })
                }
              </div>
              <div>
                <button disabled={!hasAnswered} onClick={() => handleNext()}>Next</button>
              </div>
            </div>
          ) }
        {
          quizzState === 'finished' && (
            <div>
              <p>Total points: {points}</p>
              <p>{points < maxPoints / 3 ? 'What was that? 🤨' : null}</p>
              <p>{points >= maxPoints / 3 && points < (2 / 3) * maxPoints ? 'You can do better 😅' : null}</p>
              <p>{points >= (2 / 3) * maxPoints && points < maxPoints ? 'That was good 😄' : null}</p>
              <p>{points === maxPoints ? 'You are a genius!! 🥳' : null}</p>
            </div>
          )
        }
      </div>
    </>
  )
}

export default App
