import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store/store";
import { FC, useEffect, useState, useCallback } from "react";
import { onHandleWriteQuestions, onHandleDontWriteQuestions } from "../../../app/store/biletSlice";
import { getLastOrFirst } from "../../../shared/utils/utils";

interface QuestionsProps {
    questions: any[];
}

export const Questions: FC<QuestionsProps> = ({ questions }) => {
    const { activeQuestions, writeQuestions, dontWriteQuestions, statusQuestions, choosedMode } = useSelector((state: RootState) => state.biletSlice);
    const [activeAnswer, setActiveAnswer] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);
    const [isResultDisplayed, setIsResultDisplayed] = useState(false);
    const dispatch = useDispatch<AppDispatch>();


    if (choosedMode.slice(0, 1) !== 'Г') {
        questions[10] = questions[0]
    }


    const currentQuestion = questions[activeQuestions];

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        const key = e.key;
    
        if (!isResultDisplayed) {
            if (key >= '1' && key <= currentQuestion?.options.length.toString()) {
                setActiveAnswer(key);
                setShowAnswer(false);
            } else if (key === 'Backspace') {
                setActiveAnswer('');
                setShowAnswer(false);
            } else if (key === 'Enter' && activeAnswer !== '') {
                setShowAnswer(true);
    
                if (choosedMode.slice(0, 1) === 'Г') {
                    if (Number(activeAnswer) === currentQuestion.answer) {
                        setIsResultDisplayed(true);
                        dispatch(onHandleWriteQuestions(activeQuestions));
                    } else {
                        setShowAnswer(true);
                    }
                } else {
                    setIsResultDisplayed(true);
                    if (Number(activeAnswer) === currentQuestion.answer) {
                        dispatch(onHandleWriteQuestions(activeQuestions));
                    } else {
                        dispatch(onHandleDontWriteQuestions(activeQuestions));
                    }
                }
            }
        } else {
            if (key === 'Enter') {
                setIsResultDisplayed(false);
                setActiveAnswer('');
                setShowAnswer(false);
                getLastOrFirst(questions, activeQuestions, writeQuestions, dontWriteQuestions, dispatch);
            }
        }
    }, [activeAnswer, isResultDisplayed, activeQuestions, questions, writeQuestions, dontWriteQuestions, choosedMode]);
    

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <>
            {statusQuestions === 'idle' && (
                <>
                    <div className="p-3 h-[100px] pt-5 border-b border-gray-400">
                        <h3 className="text-xl">{currentQuestion?.question}</h3>
                    </div>

                    {currentQuestion?.image && (
                        <div className="flex gap-5 p-2">
                            <div className="relative pl-5">
                                <img src={currentQuestion?.image} alt="question illustration" className="max-w-full max-h-[400px] object-cover" />
                            </div>
                            <div className="border-l border-gray-300" />
                            <div className="w-1/2 p-3">
                                <ol className="list-decimal pl-5">
                                    {currentQuestion?.options?.map((item, index) => (
                                        <li key={index + 1} className="mb-1">
                                            <p className="text-lg pt-2">{item}</p>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    )}

                    {!currentQuestion?.image && (
                        <div className="p-3 border-b border-gray-400">
                            <ol className="list-decimal pl-5">
                                {currentQuestion?.options?.map((item, index) => (
                                    <li key={index + 1} className="mb-1">
                                        <p className="text-lg">{item}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    )}

                    <div className={`flex justify-center mt-5 py-5 relative ${showAnswer ? (Number(activeAnswer) === currentQuestion.answer ? 'bg-[#89cc92]' : 'bg-[#eb8989]') : 'bg-white'}`}>
                        <div className="text-center">
                            <h2 className="text-2xl">ВАШ ОТВЕТ: <span className="pl-2">{activeAnswer}</span></h2>
                            {showAnswer && (
                                <>
                                    <span className="text-5xl text-white font-bold mt-2 block">
                                        {Number(activeAnswer) === currentQuestion.answer ? 'ПРАВИЛЬНО' : 'НЕПРАВИЛЬНО'}
                                    </span>
                                    <button
                                        className="absolute -top-[50px] left-[43%] mt-3 bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                                        onClick={() => {
                                            setIsResultDisplayed(false);
                                            setActiveAnswer('');
                                            setShowAnswer(false);
                                            getLastOrFirst(questions, activeQuestions, writeQuestions, dontWriteQuestions, dispatch);
                                        }}
                                    >
                                        Продолжить [Enter]
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    )
};
