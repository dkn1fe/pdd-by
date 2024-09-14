import { useSelector } from "react-redux";
import { onHandleActiveQuestion } from "../../app/store/biletSlice";
import { AppDispatch, RootState } from "../../app/store/store";

export const getLastOrFirst = (
    questions: any[],
    activeQuestion: number,
    writeQuestions: number[],
    dontWriteQuestions: number[],
    dispatch: AppDispatch
) => {
    let nextQuestion = activeQuestion + 1;
    let prevQuestion = activeQuestion - 1;
    let questionsArray = [...writeQuestions, ...dontWriteQuestions]; 
    let numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 
    let resultArray: number[] = [];

    resultArray = numberArray.filter(item => !questionsArray.includes(item));

    while (nextQuestion < questions.length) {
        if (!writeQuestions.includes(nextQuestion) && !dontWriteQuestions.includes(nextQuestion)) {
            dispatch(onHandleActiveQuestion(nextQuestion));
            return;
        }
        nextQuestion++;
    }

    while (prevQuestion >= 0) {
        if (!writeQuestions.includes(prevQuestion) && !dontWriteQuestions.includes(prevQuestion)) {
            dispatch(onHandleActiveQuestion(prevQuestion));
            return;
        }
        prevQuestion--;
    }

    if (activeQuestion >= questions.length || resultArray.length > 0) {
        dispatch(onHandleActiveQuestion(resultArray[0]));
    }
};


export const onGetBilet = (mode: string, questions: any[]) => { 
    let filteredQuestions = [];
    switch (true) {
        case mode.slice(0, 1) === 'Г': 
            filteredQuestions = questions.filter(item => item.glava === mode); 
            return filteredQuestions;

        case mode === 'Тренировка по случайному билету' || mode === 'Контроль по случайному билету':
            filteredQuestions = [...questions]
                .sort(() => Math.random() - 0.5) 
                .slice(0, 10)                   
                .sort((a, b) => a.id - b.id);   
            return filteredQuestions;

        default:
            return [];
    }
}
