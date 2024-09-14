import { useDispatch, useSelector } from "react-redux";
import { Keyboard } from "./Keyboard";
import { Questions } from "./Questions";
import { QuestionsList } from "./QuestionsList";
import { Timer } from "./Timer";
import { AppDispatch, RootState } from "../../../app/store/store";
import { useEffect, useState } from "react";
import { Result } from "./Result";
import { onGetQuestions } from "../../../shared/api/questionsApi";
import { onGetBilet } from "../../../shared/utils/utils";

export const Bilet = () => {

    const { choosedMode, writeQuestions, dontWriteQuestions, questions } = useSelector((state: RootState) => state.biletSlice)
    const [openResult, setOpenResult] = useState(false)
    const [resultType, setResultType] = useState('')
    const dispatch = useDispatch<AppDispatch>()
    const [questionsForBilet, setQuestionForBilet] = useState<any[]>([])
    

    useEffect(() => {
        dispatch(onGetQuestions());
    }, [dispatch]);
    
    useEffect(() => {
        if (choosedMode && questions.length > 0) {
            setQuestionForBilet(onGetBilet(choosedMode, questions));
        }
    }, [choosedMode, questions]);
    

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
                            <Questions questions={questionsForBilet} />
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