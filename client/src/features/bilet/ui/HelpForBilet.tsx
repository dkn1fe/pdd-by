import { FC } from "react";
import { HelpBiletText } from "./HelpBiletText";
import light from '../../../assets/bilets/light.svg'

interface HelpForBiletProps {
  activeQuestion: number;
  questions: any[];
  status?: string
}

export const HelpForBilet: FC<HelpForBiletProps> = ({ activeQuestion, questions, status }) => {
  return (
    <div className={`absolute z-10 -bottom-30  h-[875px] shadow-lg ${status === 'showMistake' ? 'w-[100%]' : 'w-[82.5%]'}`}>
      <div className="flex flex-col h-[60%]">
        <div className="h-[50px] bg-red-500 text-left  p-2 shadow-md">
          <h3 className="text-white font-bold uppercase tracking-wider">Пояснение к задаче</h3>
        </div>

        <div className="h-full w-full bg-white overflow-auto pt-5 shadow-inner px-6">
          <HelpBiletText activeQuestion={activeQuestion} questions={questions} />
        </div>

        <div className="h-[50px] bg-red-500 text-left flex items-center p-2 shadow-md">
          <img className="w-[50px]" src={light} />
          <h3 className="text-white">
            Нажмите на клавишу
            <span className="text-xl mx-3 uppercase text-white font-bold tracking-widest">BackSpace</span>
            что-бы продолжить
          </h3>
        </div>
      </div>
    </div>
  );
};
