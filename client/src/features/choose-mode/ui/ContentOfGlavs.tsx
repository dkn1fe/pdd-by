import { FC } from "react"
import { allGlavsMods } from "../../../shared/utils/modes"

interface ContentOfGlavsProps{
   activeMode:number
}

export const ContentOfGlavs:FC<ContentOfGlavsProps> = ({activeMode}) => {
    return (
        <div className="w-[500px] mt-20 h-[300px] bg-white">
            <h3 className="pl-3 text-lg mt-1">Содержание главы</h3>
            <div className="w-[480px] ml-2 h-[260px] bg-[green] flex flex-col items-center justify-between">
                <div className="flex-grow flex items-center justify-center">
                    <h3 className="text-lg text-center text-white font-bold uppercase">" {allGlavsMods[activeMode - 1].label} "</h3>
                </div>

                <div className="mb-4">
                    <h3 className="text-xl uppercase text-yellow-200">
                        Количество Задач: <span className="text-white text-xl pl-2">{allGlavsMods[activeMode - 1].tasks}</span>
                    </h3>
                </div>
            </div>
        </div>
    )
}