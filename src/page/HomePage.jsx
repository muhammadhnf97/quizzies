import React from "react"

export default function HomePage(props){
    return(
        <div className="w-full h-full flex flex-col text-center justify-center my-32">
            <h1 className="font-bold text-3xl bg-gradient-to-r from-[#B1B2FF] to-[#FF9494] w-fit mx-auto bg-clip-text text-transparent drop-shadow">Quizzies</h1>
            <p className="font-semibold text-lg">Just a trivia around you</p>
            <button onClick={props.btnStart} className="w-52 h-12 mx-auto rounded-md shadow-md bg-[#AAC4FF] hover:bg-[#B1B2FF] my-10"><span className="font-bold text-xl">Start !</span></button>
        </div>
    )
}