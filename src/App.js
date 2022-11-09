import React, {useEffect, useState} from "react"
import { nanoid } from "nanoid"
import HomePage from "./page/HomePage"
import QuizPage from "./page/QuizPage"

export default function App(){

  const [isHomePage, setIsHomePage] = useState(true)
  const [isQuizPage, setIsQuizPage] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [isNewGame, setIsNewGame] = useState(false)
  const [pullFormAPI, setPullFormAPI] = useState([])
  const [question, setQuestion] = useState([])
  const [AnswerIsCorrect, setAnswerIsCorrect] = useState(0)

  useEffect(()=>{
    fetch('https://opentdb.com/api.php?amount=5&category=27&difficulty=easy')
      .then((response) => response.json())
      .then((data) => setPullFormAPI(data.results));
  }, [isNewGame])

  function filterQuestion(){
    const filter = []
    for(let i = 0; i<pullFormAPI.length; i++){
      let answer = [...pullFormAPI[i].incorrect_answers]
      let randomNumber = Math.floor(Math.random()*answer.length)
      answer.splice(randomNumber,0, pullFormAPI[i].correct_answer)
      filter.push({
        id:nanoid(),
        question:pullFormAPI[i].question,
        correctAnswer:pullFormAPI[i].correct_answer,
        showAnswer:answer,
        playerAnswer:"",
        questionComplete:false
      })
    }
    setQuestion(filter)
  }


  function btnStart(){
    setIsHomePage(false)
    setIsQuizPage(true)
    setIsNewGame(true)
    filterQuestion()
  }


  function answerQuestion(answer, id){
    setQuestion(prevQuestion=>{
      return prevQuestion.map(data=>{
        if(data.id===id){
        return {
          ...data,
          playerAnswer:answer,
          questionComplete:true
          }
        } else {
          return {
            ...data
          }
        }
      })
    })
  }
  useEffect(()=>{
    const complete = question.every(data=>data.questionComplete)
    setIsComplete(complete)
  },[question])


  function clickCheckIt(){
    let correct = 0
    setIsComplete(false)
    setIsChecked(true)
    if(isComplete){
      for(let i = 0; i<question.length;i++){
        if(question[i].correctAnswer === question[i].playerAnswer){
          correct += 1;
        }
      }
      setAnswerIsCorrect(correct)
    }
  }

  function clickRestart(){
    setIsHomePage(true)
    setIsQuizPage(false)
    setIsChecked(false)
    setAnswerIsCorrect(0)
    setQuestion([])
    setIsNewGame(false)
    filterQuestion()
  }
  
console.log(question)
  const bgStyle = {
    backgroundImage:"url(./assets/image/bg.jpg)"
  }

  return(
    <main className="w-screen md:h-screen min-h-screen md:min-h-0 md:relative bg-cover bg-center shadow-md py-10 md:py-0 flex md:block flex-col justify-center" style={bgStyle}>
      <div className="mx-auto md:mx-0 w-4/5 md:w-2/5 max-w-5xl max-h-fit md:absolute md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 bg-white rounded-2xl shadow-md">
        {isHomePage && <HomePage btnStart={btnStart}/>}
        {isQuizPage && <QuizPage 
        question={question}
        answerQuestion={answerQuestion}
        clickCheckIt={clickCheckIt}
        clickRestart={clickRestart}
        isChecked={isChecked}
        isComplete={isComplete} 
        AnswerIsCorrect={AnswerIsCorrect}/>}
      </div>
    </main>
  )
} 