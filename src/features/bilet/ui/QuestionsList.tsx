import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store/store";
import { onHandleActiveQuestion } from "../../../app/store/biletSlice";
import { RootState } from "../../../app/store/store";

export const QuestionsList = () => {
    const { activeQuestions, writeQuestions, dontWriteQuestions } = useSelector((state: RootState) => state.biletSlice);
    const dispatch = useDispatch<AppDispatch>();
    const questionElems = useRef<(HTMLDivElement | null)[]>([]);

    const handleActiveQuestion = (event: React.KeyboardEvent<HTMLDivElement>) => {
        let nextQuestion:number = activeQuestions;

        if (event.key === 'ArrowRight') {
            nextQuestion = activeQuestions + 1;
            while (nextQuestion <= 10 && (writeQuestions.includes(nextQuestion) || dontWriteQuestions.includes(nextQuestion))) {
                nextQuestion++;
            }
        } else if (event.key === 'ArrowLeft') {
            nextQuestion = activeQuestions - 1;
            while (nextQuestion >= 1 && (writeQuestions.includes(nextQuestion) || dontWriteQuestions.includes(nextQuestion))) {
                nextQuestion--;
            }
        }

        if (nextQuestion >= 1 && nextQuestion <= 10 && nextQuestion !== activeQuestions) {
            dispatch(onHandleActiveQuestion(nextQuestion));
        }
    };

    const handleClickActiveQuestion = (item: number) => {
        if (!writeQuestions.includes(item) && !dontWriteQuestions.includes(item)) {
            dispatch(onHandleActiveQuestion(item));
        }
    };

    useEffect(() => {
        if (activeQuestions > 10 || activeQuestions < 1) {
            dispatch(onHandleActiveQuestion(1));
        }
    }, [activeQuestions, dispatch]);

    useEffect(() => {
        if (activeQuestions >= 1 && activeQuestions <= 10) {
            questionElems.current[activeQuestions]?.focus();
        }
    }, [activeQuestions]);

    return (
        <div className="flex justify-center gap-2 items-center" onKeyDown={handleActiveQuestion} tabIndex={0}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <div 
                    onClick={() => handleClickActiveQuestion(item)}
                    ref={el => (questionElems.current[item] = el)}
                    key={item}
                    className={`w-[50px] h-[40px] cursor-pointer bg-[#E9E9E9] border focus:outline-none border-black ${
                        writeQuestions.includes(item) ? 'bg-[green] text-white' : '' || dontWriteQuestions.includes(item) ? 'bg-[red] text-white' : ''
                    } ${item === activeQuestions ? 'bg-blue-300' : ''}`}>
                    <div className="flex justify-center items-center">
                        <p className="text-2xl pt-1">{item}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
