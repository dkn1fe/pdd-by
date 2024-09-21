import { QuestionsList } from "./QuestionsList";
import { Timer } from "./Timer";
import { Statistic } from "./Statistic";
import { FC, useCallback, useEffect } from "react";
import { GlavsModeList } from "./GlavsModeList";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store/store";
import { handleChangeResultStatus } from "../../../app/store/biletSlice";
import success from '../../../assets/bilets/success.png';
import unsuccess from '../../../assets/bilets/unsuccess.png';

interface ResultProps {
  openResult: boolean;
  writeQuestion: number[];
  dontWriteQuestion: number[];
  result: string;
  choosedMode?: string;
  remains?: number;
  questionLength?: number;
  currentQuestion?: number;
  status?: string
  setRemains?: (num: number) => void;
}

export const Result: FC<ResultProps> = ({
  openResult,
  result,
  writeQuestion,
  dontWriteQuestion,
  choosedMode,
  remains,
  questionLength,
  currentQuestion,
  setRemains,
  status
}) => {

  const dispatch = useDispatch<AppDispatch>()

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') dispatch(handleChangeResultStatus('controlWindow'));
  }, [dispatch])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
  return (
    <div className="container flex flex-col justify-between">
      <div className="w-full m-auto bg-[#ebebeb] h-full relative flex flex-col justify-between">
        <div>
          <div className="w-full h-[50px] bg-[#cccccc]">
            <Timer openResult={openResult} />
          </div>
          {choosedMode?.slice(0, 1) !== 'Г' ? (
            <div className="w-full h-[40px] bg-[#e0e0e0] border-b border-gray-400">
              <QuestionsList />
            </div>
          ) : (
            <div className="flex justify-end h-[40px] bg-[#e0e0e0] border-b border-gray-400">
              {remains !== undefined && setRemains && (
                <GlavsModeList
                  remains={remains}
                  questionLength={questionLength ?? 0}
                  currentQuestion={currentQuestion ?? 0}
                  setRemains={setRemains}
                />
              )}
            </div>
          )}
          <div className="border-[black]">
            <div className="w-full h-[2px] bg-[#999999] mt-10"></div>
            <div className="flex mt-5 justify-center">
              <img className="h-[400px]" src={result === 'success' ? success : unsuccess} alt={result} />
            </div>
            <div className="w-full h-[2px] bg-[#999999] mt-5"></div>
          </div>
          <div className="p-6">
            <Statistic
              choosedMode={choosedMode}
              questionLength={questionLength}
              write={writeQuestion}
              unWrite={dontWriteQuestion}
            />
          </div>
          {status && status === 'control' && (
            <div className="w-full h-[40px] bg-white border-t-2 border-gray-200 shadow-inner pl-3 pt-2">
              <h3 className="text-lg text-gray-600 font-medium">
                Нажмите <span className="px-2 py-1 bg-gray-300 text-gray-800 rounded">Enter</span> чтобы продолжить
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );

}