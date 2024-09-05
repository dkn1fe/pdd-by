import { QuestionsList } from "./QuestionsList";
import { Timer } from "./Timer";
import { Statistic } from "./Statistic";
import { FC } from "react";
import success from '../../../assets/bilets/success.png';
import unsuccess from '../../../assets/bilets/unsuccess.png';

interface ResultProps {
  openResult: boolean;
  writeQuestion: number[];
  dontWriteQuestion: number[];
  result: string;
}

export const Result: FC<ResultProps> = ({ openResult, result, writeQuestion, dontWriteQuestion }) => {
  return (
    <div className="container">
      <div className="w-full m-auto bg-[#ebebeb] h-[80%]">
        <div className="w-full h-[50px] bg-[#cccccc]">
          <Timer openResult={openResult} />
        </div>
        <div className="w-full h-[40px] bg-[#e0e0e0] border-b border-gray-400">
          <QuestionsList />
        </div>
        <div className="border-[black]">
          <div className="w-full h-[2px] bg-[#999999] mt-10"></div>
          <div className="flex mt-5 justify-center">
            <img className="h-[400px]" src={result === 'success' ? success : unsuccess} alt={result} />
          </div>
          <div className="w-full h-[2px] bg-[#999999] mt-5"></div>
        </div>
        <div className="p-10">
          <Statistic write={writeQuestion} unWrite={dontWriteQuestion} />
        </div>
      </div>
    </div>
  );
};
