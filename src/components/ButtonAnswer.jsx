import React from "react"

export default function ButtonAnswer(props){
    const answers = props.data.showAnswer.map(answer=>{
        const style = {
            borderColor: answer === props.data.playerAnswer ? "#68904D" : "#75735f",
            backgroundColor : answer === props.data.playerAnswer ? "#e9f0c0" : "white",
        }
        return (
            <button disabled={props.isChecked ? true : false} style={style} onClick={()=>props.answerQuestion(answer, props.id)} key={answer} className="w-32 md:w-fit hover:bg-sky-200 rounded-md mr-2 px-2 p-1 my-1 font-semibold border-2 text-sm md:text-base">{answer}</button>
        )
    })

    let trueFalse
    if (props.isChecked) {
        if(props.playerAnswer === props.correctAnswer){
            trueFalse = <p className="self-center">✔</p>
        } else {
            trueFalse = <p className="self-center">❌</p>
        }
    }

    return (
        <div className="md:flex grid grid-cols-2 justify-items-center">
        {answers} {trueFalse}
        </div>
    )
    
}