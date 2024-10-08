import { FC } from "react"
import { Modes } from "./Modes"

interface ChooseModeProps{
     modes:any[],
     title:string
}

export const ChooseMode:FC<ChooseModeProps> = ({modes,title}) => {
    return (
        <div className="max-w-[600px] m-auto pt-24">
            <div className={`w-full ${title.slice(0,1) === 'Т' || title.slice(0,1) === 'К' ? 'h-[480px]' : 'h-[440px]'}  bg-white p-2 shadow-4xl`}>
                <h3 className="pl-2">{title}</h3>
                <Modes modes={modes} title = {title}/>
            </div>
        </div>
    )
}
