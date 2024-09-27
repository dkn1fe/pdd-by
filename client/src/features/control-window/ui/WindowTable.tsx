import { FC, useCallback, useEffect, useState } from "react";

interface WindowTableProps {
    unWriteQuestions: number[];
    choosedBilet: number;
    questions: any[];
    yoursUnWriteAnswers: number[];
    setIsOpenShowMistake: (state: { open: boolean; mistake: number; rightAnswer: number; yourAnswer: number }) => void;

}

export const WindowTable: FC<WindowTableProps> = ({ questions, unWriteQuestions, choosedBilet, yoursUnWriteAnswers, setIsOpenShowMistake }) => {

    const [isActiveIndex, setIsActiveIndex] = useState(1)

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'ArrowDown' && isActiveIndex < 2) setIsActiveIndex(isActiveIndex => isActiveIndex + 1)
        if (e.key === 'ArrowUp' && isActiveIndex > 1) setIsActiveIndex(isActiveIndex => isActiveIndex - 1)
        if (e.key === 'Enter' && isActiveIndex === 1) setIsOpenShowMistake({ open: true, mistake: unWriteQuestions[0], yourAnswer: yoursUnWriteAnswers[0], rightAnswer: questions[unWriteQuestions[0]]?.answer })
        if (e.key === 'Enter' && isActiveIndex === 2) setIsOpenShowMistake({ open: true, mistake: unWriteQuestions[1], yourAnswer: yoursUnWriteAnswers[1], rightAnswer: questions[unWriteQuestions[1]]?.answer })
    }, [isActiveIndex, setIsOpenShowMistake])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleKeyDown])

    const windowTableList = [
        { id: 1, bilet: choosedBilet === 0 ? '-' : choosedBilet, numberTask: unWriteQuestions[0], yourAnswer: yoursUnWriteAnswers[0], rightAnswer: questions[unWriteQuestions[0]]?.answer },
        { id: 2, bilet: choosedBilet === 0 ? '-' : choosedBilet, numberTask: unWriteQuestions[1], yourAnswer: yoursUnWriteAnswers[1], rightAnswer: questions[unWriteQuestions[1]]?.answer }
    ];

    return (
        <div className="max-w-[1000px] m-auto">
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-300">
                        <th className="border p-2">Номер билета</th>
                        <th className="border p-2">Номер задачи</th>
                        <th className="border p-2">Ваш ответ</th>
                        <th className="border p-2">Правильный ответ</th>
                    </tr>
                </thead>
                <tbody>
                    {windowTableList.map(({ id, bilet, numberTask, yourAnswer, rightAnswer }) => (
                        <tr autoFocus onClick={() => setIsActiveIndex(id)} key={id} className={`${isActiveIndex === id ? 'bg-green-300' : ''}`}>
                            <td className="border p-2 text-center">{bilet ?? '-'}</td>
                            <td className="border p-2 text-center">{numberTask ?? '-'}</td>
                            <td className="border p-2 text-center">{yourAnswer ?? '-'}</td>
                            <td className="border p-2 text-center">{rightAnswer ?? '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
