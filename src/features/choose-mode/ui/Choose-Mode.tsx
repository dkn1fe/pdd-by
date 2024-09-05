import { FC } from "react"
import { Modes } from "./Modes"

interface ChooseModeProps{
     modes:any[],
     title:string
}

export const ChooseMode:FC<ChooseModeProps> = ({modes,title}) => {
    return (
        <div className="max-w-[600px] m-auto pt-24">
            <div className="w-full h-[483px] bg-white p-2 shadow-2xl">
                <h3 className="pl-2">{title}</h3>
                <Modes modes={modes} title = {title}/>
            </div>
        </div>
    )
}
