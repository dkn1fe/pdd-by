import { FC, useCallback, useEffect, useState } from "react";
import { MistakeControlWindow } from "./MistakeControlWindow";
import { QuestionsList } from "./QuestionsList";
import { Timer } from "./Timer";
import { MistakeShow } from "./MistakeShow";
import { HelpForBilet } from "./HelpForBilet";

interface ShowMistakeProps {
    question: any[],
    mistake: number,
    rightAnswer: number,
    yourAnswer: number
    setIsOpenShowMistake: (state: { open: boolean, mistake: number, rightAnswer: number, yourAnswer: number }) => void
    isOpenShowMistakeList: { open: boolean, mistake: number, rightAnswer: number, yourAnswer: number }
}

export const ShowMistake: FC<ShowMistakeProps> = ({ question, mistake, rightAnswer, yourAnswer, setIsOpenShowMistake, isOpenShowMistakeList }) => {
    const [isOpenHelpForBilet, setIsOpenHelpForBilet] = useState(false);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'X' || 'x') setIsOpenHelpForBilet(true);
        if (e.key === 'Backspace') setIsOpenHelpForBilet(false);
        if (e.key === 'Enter') setIsOpenShowMistake({ ...isOpenShowMistakeList, open: false })
    }, [isOpenHelpForBilet]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div className="container relative m-auto pt-[30px]">
            <div className="w-full relative overflowY-auto h-[715px] bg-[white]">
                <div className="w-full h-[50px] bg-[#cccccc]">
                    <Timer openResult={true} />
                </div>
                <div className="w-full h-[40px] bg-[#e0e0e0] border-b border-gray-400">
                    <QuestionsList />
                </div>
                <MistakeControlWindow question={question} mistake={mistake} />
                <MistakeShow rightAnswer={rightAnswer} yourAnswer={yourAnswer} />
                {isOpenHelpForBilet && (
                    <div className="absolute top-[190px] w-full">
                        <HelpForBilet status="showMistake" activeQuestion={mistake} questions={question} />
                    </div>
                )}
            </div>
        </div>
    );
}
