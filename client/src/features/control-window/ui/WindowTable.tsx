import { FC, useCallback, useEffect, useState } from "react";

interface WindowTableProps {
    unWriteQuestions: number[];
    choosedBilet: number;
    questions: any[];
    yoursUnWriteAnswers: number[];
}

export const WindowTable: FC<WindowTableProps> = ({ questions, unWriteQuestions, choosedBilet, yoursUnWriteAnswers }) => {

    const [isActiveIndex,setIsActiveIndex] = useState(1)
    console.log(isActiveIndex)
     
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'ArrowDown' &&  isActiveIndex < 2) setIsActiveIndex(isActiveIndex => isActiveIndex + 1)
        if (e.key === 'ArrowUp'   && isActiveIndex > 1) setIsActiveIndex(isActiveIndex => isActiveIndex - 1)
    }, [isActiveIndex])

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
                        <tr autoFocus onClick={() => setIsActiveIndex(id)} key={id} className={`bg-white ${isActiveIndex === id ? 'bg-blue-400' : ''}`}>
                            <td className="border p-2 text-center">{bilet}</td>
                            <td className="border p-2 text-center">{numberTask}</td>
                            <td className="border p-2 text-center">{yourAnswer}</td>
                            <td className="border p-2 text-center">{rightAnswer}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
