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
import { GlavsModeList } from "./GlavsModeList";
import { clearQuestions, onHandleActiveQuestion, handleChangeResultStatus } from "../../../app/store/biletSlice";
import { ControlWindow } from "../../control-window/index";

export const Bilet = () => {
    const { choosedMode,
        writeQuestions,
        dontWriteQuestions,
        questions,
        activeQuestions,
        choosedBilet,
        resultStatus,
        yoursUnWriteAnswers
    } = useSelector((state: RootState) => state.biletSlice);
    const [openResult, setOpenResult] = useState(false);
    const [resultType, setResultType] = useState('');
    const [remainsQuestion, setRemainsQuestion] = useState(0);
    const [questionsForBilet, setQuestionForBilet] = useState<any[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const status = window.location.pathname.slice(1)
    console.log(questionsForBilet)


    useEffect(() => {
        dispatch(onGetQuestions());
        dispatch(handleChangeResultStatus(''))
    }, [dispatch]);

    useEffect(() => {
        if (choosedMode && questions.length > 0) {
            setOpenResult(false);
            setQuestionForBilet(onGetBilet(choosedMode, questions, choosedBilet));
            dispatch(handleChangeResultStatus(''))
            dispatch(onHandleActiveQuestion(0));
            dispatch(clearQuestions());
        }
    }, [choosedMode, questions, choosedBilet, dispatch]);

    useEffect(() => {
        const filteredWriteQuestions = writeQuestions.filter(q => q !== undefined && q !== null);
        const filteredDontWriteQuestions = dontWriteQuestions.filter(q => q !== undefined && q !== null);

        if (filteredWriteQuestions.length === 9 && filteredDontWriteQuestions.length === 1) {
            setOpenResult(true);
            setResultType('success');
        }
        if (filteredWriteQuestions.length === 10) {
            setOpenResult(true);
            setResultType('success');
        }
        if (filteredDontWriteQuestions.length === 2) {
            setOpenResult(true);
            setResultType('unsuccess');
        }
        if (choosedMode.slice(0, 1) === 'Г' && remainsQuestion === 0 && writeQuestions.length >= 1) {
            setOpenResult(true)
        }
    }, [writeQuestions, dontWriteQuestions, remainsQuestion, choosedMode]);

    return (
        <div className="container">
            <div className="w-full m-auto pt-20 h-[80%]">
                {!openResult && (
                    <>
                        <div className="w-full h-[50px] bg-[#cccccc]">
                            <Timer openResult={openResult} />
                        </div>
                        {choosedMode.slice(0, 1) !== 'Г' ? (
                            <div className="w-full h-[40px] bg-[#e0e0e0] border-b border-gray-400">
                                <QuestionsList />
                            </div>
                        ) : (
                            <div className="flex justify-end h-[40px] bg-[#e0e0e0] border-b border-gray-400">
                                <GlavsModeList remains={remainsQuestion} setRemains={setRemainsQuestion} questionLength={questionsForBilet.length} currentQuestion={activeQuestions} />
                            </div>
                        )}

                        <div className="w-full overflowY-auto h-[625px] bg-[white]">
                            <Questions status={status} questions={questionsForBilet} />
                        </div>
                        <div className="w-full h-[50px] bg-gray-200">
                            <Keyboard />
                        </div>
                    </>
                )}
                {openResult && (
                    <>
                        {status === 'training' && (
                            <Result
                                result={resultType}
                                writeQuestion={writeQuestions}
                                dontWriteQuestion={dontWriteQuestions}
                                openResult={openResult}
                            />
                        )}
                        {choosedMode.length <= 8 && remainsQuestion === 0 && (
                            <Result
                                choosedMode={choosedMode}
                                result="success"
                                writeQuestion={writeQuestions}
                                dontWriteQuestion={dontWriteQuestions}
                                openResult={true}
                                remains={remainsQuestion}
                                currentQuestion={activeQuestions}
                                questionLength={writeQuestions.length}
                                setRemains={setRemainsQuestion}
                            />
                        )}
                        {resultStatus !== 'controlWindow' && status === 'control' && (
                            <Result
                                choosedMode={choosedMode}
                                result={resultType}
                                status={status}
                                writeQuestion={writeQuestions}
                                dontWriteQuestion={dontWriteQuestions}
                                openResult={true}
                            />
                        )}
                        {status === 'control' && resultStatus === 'controlWindow' && yoursUnWriteAnswers.length !== 0 &&  (
                            <>
                                <ControlWindow yoursUnWriteAnswers={yoursUnWriteAnswers} questions={questionsForBilet} choosedBilet={choosedBilet} mode={choosedMode} writeQuestions={writeQuestions} unWriteQuestions={dontWriteQuestions} />
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
