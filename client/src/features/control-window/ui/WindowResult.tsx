import { FC } from "react"

interface WindowResultProps{
    writeQuestions:number,
    unWriteQuestions:number,
    mode:string
}

export const WindowResult:FC<WindowResultProps> = ({writeQuestions,unWriteQuestions,mode}) => {
    return (
        <div className="pt-5">
            <h3 className="text-center text-[red] uppercase text-xl font-medium">Ошибки, допущенные во время решения билета</h3>
            <div className="max-w-[800px] m-auto pt-8">
                <div className="flex justify-between items-center">
                    <p><span className="font-bold">Режим:</span><span className="ml-3 text-lg">{mode}</span></p>
                    <div className="flex flex-col">
                        <p className="text-lg">Правильных ответов:<span className="ml-3 text-[green]">{writeQuestions}</span></p>
                        <p className="text-lg">Неправильных ответов:<span className="ml-3 text-[red]">{unWriteQuestions}</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}