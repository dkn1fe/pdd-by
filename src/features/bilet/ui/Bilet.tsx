import { useSelector } from "react-redux";
import { Keyboard } from "./Keyboard";
import { Questions } from "./Questions";
import { QuestionsList } from "./QuestionsList";
import { Timer } from "./Timer";
import { RootState } from "../../../app/store/store";
import { useEffect, useState } from "react";
import { Result } from "./Result";


export const Bilet = () => {

    const { choosedMode, writeQuestions, dontWriteQuestions } = useSelector((state: RootState) => state.biletSlice)
    const [openResult, setOpenResult] = useState(false)
    const [resultType, setResultType] = useState('')

    useEffect(() => {
        if (writeQuestions.length === 9 && dontWriteQuestions.length === 1) {
            setOpenResult(true)
            setResultType('success')
        }
        if (writeQuestions.length === 10) {
            setOpenResult(true)
            setResultType('success')
        }
        if (dontWriteQuestions.length === 2) {
            setOpenResult(true)
            setResultType('unsuccess')
        }
    }, [writeQuestions, dontWriteQuestions])

    return (
        <div className="container">
            <div className="w-full m-auto pt-20 h-[80%]">
                {!openResult && (
                    <>
                        <div className="w-full h-[50px] bg-[#cccccc]">
                            <Timer openResult={openResult} />
                        </div>
                        <div className="w-full h-[40px]  bg-[#e0e0e0] border-b border-gray-400">
                            <QuestionsList />
                        </div>
                        <div className="w-full  overflowY-auto h-[625px] bg-[white]">
                            <Questions />
                        </div>
                        <div className="w-full h-[50px] bg-gray-200">
                            <Keyboard />
                        </div>
                    </>
                )}
                {openResult && (
                    <Result result={resultType} writeQuestion={writeQuestions} dontWriteQuestion={dontWriteQuestions} openResult={openResult} />
                )}
            </div>
        </div>
    );
};