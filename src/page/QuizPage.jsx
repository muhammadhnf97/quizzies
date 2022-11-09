import React from "react"
import ButtonAnswer from "../components/ButtonAnswer"


export default function QuizPage(props){
    console.log(props.playerAnswer)
    const showQuestion = props.question.map(data=>{
        const styleChecked = {
            backgroundColor: data.playerAnswer === data.correctAnswer ? "#AEC670" : "#EF8A84"
        }
        const style ={
            backgroundColor:"white"
        }
        return (
            <div className="border-b mb-2 pb-2">
            {/* <div dangerouslySetInnerHTML = {data.question} /> */}
            <div dangerouslySetInnerHTML={{__html: data.question}} />
            <div style={props.isChecked ? styleChecked : style} className="md:px-2 rounded-md">
                <ButtonAnswer 
                id={data.id}
                data={data}
                answerQuestion={props.answerQuestion}
                isChecked={props.isChecked}
                playerAnswer={data.playerAnswer}
                correctAnswer={data.correctAnswer}   //INI FUNCTION ANSWER QUESTION
            />
            </div>
            </div>
        )
    })

    return (
        <div className="w-full h-full px-3 md:px-8 py-3">
            <h1 className="font-bold text-3xl bg-gradient-to-r from-[#B1B2FF] to-[#FF9494] w-fit bg-clip-text text-transparent drop-shadow mb-5">Quizzies</h1>
            {showQuestion}
            <div className="text-center flex justify-between text-lg ">
            <div className="self-center flex-1 md:flex-none">Your correct answer {props.AnswerIsCorrect}/5</div>
            {props.isComplete && <button onClick={props.clickCheckIt} className="md:flex-none flex-1 px-2 py-1 bg-[#AAC4FF] rounded-md font-bold text-2xl my-3">Check it !</button>}
            {props.isChecked && <button onClick={props.clickRestart} className="md:flex-none flex-1 px-2 py-1 bg-[#AAC4FF] rounded-md font-bold text-2xl my-3">Start New Question</button>}
            </div>
        </div>
    )
}