import { ShowMistake } from "../../bilet/ui/ShowMistake";
import { WindowResult } from "./WindowResult";
import { WindowTable } from "./WindowTable";
import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ControlWindowProps {
    writeQuestions: number[],
    unWriteQuestions: number[]
    mode:string
    choosedBilet:number
    questions:any[]
    yoursUnWriteAnswers:number[]
}

export const ControlWindow: FC<ControlWindowProps> = ({ writeQuestions, unWriteQuestions,mode,choosedBilet,questions,yoursUnWriteAnswers}) => {

    const [isOpenShowMistakeList,setIsOpenShowMistakeList] = useState({open:false,mistake:0,rightAnswer:0,yourAnswer:0})
   
    const navigate = useNavigate()

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') navigate('/')
    }, [navigate])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleKeyDown])


    return (
        <>
        {!isOpenShowMistakeList.open && (

        <div className="max-w-[1100px] relative m-auto pt-[150px]">
            <div className="w-full h-[400px] bg-gray-400 shadow-2xl flex justify-center items-center">
                <div className="m-2 bg-white h-[385px] w-full max-w-[99%]">
                    <WindowResult mode={mode} writeQuestions={writeQuestions.length} unWriteQuestions={unWriteQuestions.length} />
                </div>
            </div>
            <div className="absolute bottom-[80px] w-full">
                <WindowTable setIsOpenShowMistake = {setIsOpenShowMistakeList} yoursUnWriteAnswers={yoursUnWriteAnswers} questions={questions} choosedBilet={choosedBilet} unWriteQuestions={unWriteQuestions} />
            </div>
        </div>
        )}
        {isOpenShowMistakeList.open && (
             <ShowMistake 
             question={questions}
             mistake={isOpenShowMistakeList.mistake}
             rightAnswer={isOpenShowMistakeList.rightAnswer}
             yourAnswer={isOpenShowMistakeList.yourAnswer}
             isOpenShowMistakeList = {isOpenShowMistakeList}
             setIsOpenShowMistake = {setIsOpenShowMistakeList}
             />
        )}
        </>
    );
}    