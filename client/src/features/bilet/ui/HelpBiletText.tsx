import { FC } from "react"
import book from '../../../assets/bilets/book.svg'

interface HelpBiletTextProps {
    activeQuestion: number,
    questions: any[]
}

export const HelpBiletText: FC<HelpBiletTextProps> = ({ activeQuestion, questions }) => {
    return (
        <div className="flex">
            <img className="w-[50px]" src = {book}/>
            <div className="text-center m-auto text-lg px-4">
                <p>{questions && questions[activeQuestion]?.answer_tip}</p>
            </div>
        </div>
    )
}