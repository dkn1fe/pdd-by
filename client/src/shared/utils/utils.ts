import { onHandleActiveQuestion } from "../../app/store/biletSlice";
import { AppDispatch, } from "../../app/store/store";

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


export const onGetBilet = (mode: string, questions: any[], choosedBilet: number) => {
    let filteredQuestions = [];
    switch (true) {
        case mode === 'Глава 1-6':
            filteredQuestions = [...questions]
                .filter(item => {
                    const glavaNumber = parseInt(item.glava.replace(/\D/g, ''));
                    return glavaNumber >= 1 && glavaNumber <= 6;
                });
            return filteredQuestions; 

        case mode === 'Главы 7-13, Приложение 1':
            filteredQuestions = [...questions]
                .filter(item => {
                    const glavaNumber = parseInt(item.glava.replace(/\D/g, ''));
                    return glavaNumber >= 7 && glavaNumber <= 13;
                });
            return filteredQuestions; 

        case mode === 'Главы 8-12 и 19':
            filteredQuestions = [...questions]
                .filter(item => {
                    const glavaNumber = parseInt(item.glava.replace(/\D/g, ''));
                    return (glavaNumber >= 8 && glavaNumber <= 12) || glavaNumber === 19;
                });
            return filteredQuestions; 

        case mode === 'Главы 14-18, 20-25':
            filteredQuestions = [...questions]
                .filter(item => {
                    const glavaNumber = parseInt(item.glava.replace(/\D/g, ''));
                    return (glavaNumber >= 14 && glavaNumber <= 18) || (glavaNumber >= 20 && glavaNumber <= 25);
                });
            return filteredQuestions;

        case mode === 'Глава 26, Приложение 4, 5':
            filteredQuestions = [...questions]
                .filter(item => {
                    const glavaNumber = parseInt(item.glava.replace(/\D/g, ''));
                    return glavaNumber === 26;
                });
            return filteredQuestions; 

        case mode.slice(0, 1) === 'Г':
            filteredQuestions = questions.filter(item => item.glava === mode);
            return filteredQuestions; 

        case mode === 'Тренировка по случайному билету' || mode === 'Контроль по случайному билету':
            filteredQuestions = [...questions]
                .sort(() => Math.random() - 0.5)
                .slice(0, 10)
                .sort((a, b) => a.id - b.id);
            return filteredQuestions; 

        case mode === 'Тренировка по билету N' || mode === 'Контроль по билету N':
            filteredQuestions = questions.filter(item => item.ticket_number === choosedBilet);
            return filteredQuestions;

        default:
            return [];
    }
};

