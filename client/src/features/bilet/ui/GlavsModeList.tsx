import { FC, useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store/store";
import { onHandleActiveQuestion } from "../../../app/store/biletSlice";

interface GlavsModeListProps {
    questionLength: number;
    currentQuestion: number;
    setRemains:(num:number) => void
    remains:number
}

export const GlavsModeList: FC<GlavsModeListProps> = ({ questionLength, currentQuestion,remains,setRemains}) => {
    
    const dispatch = useDispatch<AppDispatch>();
    const { writeQuestions, dontWriteQuestions } = useSelector((state: RootState) => state.biletSlice);
    const questionElems = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
    setRemains(questionLength - writeQuestions.length);
    }, [questionLength, writeQuestions, dontWriteQuestions]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        let nextQuestion = currentQuestion;

        if (event.key === 'ArrowRight') {
            nextQuestion = currentQuestion + 1;
            while (nextQuestion <= questionLength && (writeQuestions.includes(nextQuestion - 1) || dontWriteQuestions.includes(nextQuestion - 1))) {
                nextQuestion++;
            }
        } else if (event.key === 'ArrowLeft') {
            nextQuestion = currentQuestion - 1;
            while (nextQuestion >= 1 && (writeQuestions.includes(nextQuestion - 1) || dontWriteQuestions.includes(nextQuestion - 1))) {
                nextQuestion--;
            }
        }

        if (nextQuestion >= 1 && nextQuestion <= questionLength && nextQuestion !== currentQuestion) {
            dispatch(onHandleActiveQuestion(nextQuestion - 1));
        }
    };

    useEffect(() => {
        if (currentQuestion >= 0 && currentQuestion < questionLength) {
            questionElems.current[currentQuestion]?.focus();
        }
    }, [currentQuestion, questionLength]);

    return (
        <div className="flex text-lg items-center gap-5">
            <p className="font-meduim">Текущий Вопрос / Осталось Вопросов / Всего</p>
            
            <div
            className="w-[100px] h-[30px] mt-1 mr-3 bg-gray-200 border border-black"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            autoFocus
        >
            <div className="flex gap-1 text-lg items-center justify-center">
                <h3>{currentQuestion} /</h3>
                <h3>{remains} /</h3>
                <h3>{questionLength}</h3>
            </div>
        </div>
        </div>

    );
};
