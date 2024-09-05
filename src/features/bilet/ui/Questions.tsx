import { useDispatch, useSelector } from "react-redux";
import { questions } from "../../../shared/utils/questions";
import { AppDispatch, RootState } from "../../../app/store/store";
import { useEffect, useState } from "react";
import { onHandleWriteQuestions, onHandleDontWriteQuestions } from "../../../app/store/biletSlice";
import { getLastOrFirst } from "../../../shared/utils/utils";

export const Questions = () => {
    const { activeQuestions, writeQuestions, dontWriteQuestions } = useSelector((state: RootState) => state.biletSlice);
    const [activeAnswer, setActiveAnswer] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);
    const [isResultDisplayed, setIsResultDisplayed] = useState(false);
    questions[10] = questions[0]

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key;

            if (!isResultDisplayed) {
                if (key >= '1' && key <= questions[activeQuestions].options.length) {
                    setActiveAnswer(key);
                    setShowAnswer(false);
                } else if (key === 'Backspace') {
                    setActiveAnswer('');
                    setShowAnswer(false);
                } else if (key === 'Enter' && activeAnswer !== '') {
                    setShowAnswer(true);
                    setIsResultDisplayed(true);
                    if (Number(activeAnswer) === questions[activeQuestions].answer) {
                        dispatch(onHandleWriteQuestions(activeQuestions));
                    }
                    else {
                        dispatch(onHandleDontWriteQuestions(activeQuestions))
                    }
                }
            } else {
                if (key === 'Enter') {
                    setIsResultDisplayed(false);
                    setActiveAnswer('');
                    setShowAnswer(false);
                    getLastOrFirst(questions, activeQuestions, writeQuestions, dontWriteQuestions,dispatch)
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeAnswer, isResultDisplayed, activeQuestions, writeQuestions, dontWriteQuestions]);

    return (
        <>
            <div className="p-3 h-[100px] pt-5 border-b border-gray-400">
                <h3 className="text-xl">{questions[activeQuestions].question}</h3>
            </div>

            {questions[activeQuestions].img && (
                <div className="flex gap-5 p-2">
                    <div className="relative pl-5">
                        <img src={questions[activeQuestions].img} alt="question illustration" className="max-w-full max-h-[400px] object-cover" />
                    </div>
                    <div className="border-l border-gray-300" />
                    <div className="w-1/2 p-3">
                        <ol className="list-decimal pl-5">
                            {questions[activeQuestions].options.map((item, index) => (
                                <li key={index + 1} className="mb-1">
                                    <p className="text-lg pt-2">{item}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            )}

            {!questions[activeQuestions].img && (
                <div className="p-3 border-b border-gray-400">
                    <ol className="list-decimal pl-5">
                        {questions[activeQuestions].options.map((item, index) => (
                            <li key={index + 1} className="mb-1">
                                <p className="text-lg">{item}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            )}

            <div className={`flex justify-center mt-5 py-5 relative ${showAnswer ? (Number(activeAnswer) === questions[activeQuestions].answer ? 'bg-[#89cc92]' : 'bg-[#eb8989]') : 'bg-white'}`}>
                <div className="text-center">
                    <h2 className="text-2xl">ВАШ ОТВЕТ: <span className="pl-2">{activeAnswer}</span></h2>
                    {showAnswer && (
                        <>
                            <span className="text-5xl text-white font-bold mt-2 block">
                                {Number(activeAnswer) === questions[activeQuestions].answer ? 'ПРАВИЛЬНО' : 'НЕПРАВИЛЬНО'}
                            </span>
                            <button
                                className="absolute -top-[50px] left-[43%] mt-3 bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                                onClick={() => {
                                    setIsResultDisplayed(false);
                                    setActiveAnswer('');
                                    setShowAnswer(false);
                                    getLastOrFirst(questions, activeQuestions, writeQuestions, dontWriteQuestions,dispatch)
                                }}
                            >
                                Продолжить [Enter]
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
