import { FC } from "react"


interface StatisticProps {
    write: number[],
    unWrite: number[]
    choosedMode?:string | undefined
    questionLength?:number
}

export const Statistic: FC<StatisticProps> = ({ write, unWrite,choosedMode,questionLength}) => {
    return (
        <div className="flex mt-10 flex-col">
            <div className="border-b w-[300px] py-2 border-black">
                <h3 className="text-xl [letter-spacing:5px]">СТАТИСТИКА:</h3>
            </div>
            <div className="flex mt-3 gap-5">
                <div className="flex text-lg flex-col">
                    <h3>Количество задач:</h3>
                    <h3>Количество правильных ответов:</h3>
                    <h3>Количество неправильных ответов:</h3>
                </div>
                <div className="flex text-lg flex-col">
                    <span>{choosedMode && choosedMode.slice(0,1) === 'Г' ? questionLength : 10}</span>
                    <span className="text-[green]">{write.length}</span>
                    <span className="text-[red]">{unWrite.length}</span>
                </div>
            </div>
        </div>

    )
}