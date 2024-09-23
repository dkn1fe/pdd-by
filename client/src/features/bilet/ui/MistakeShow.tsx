import { FC } from "react";

interface MistakeShowProps {
  rightAnswer: number;
  yourAnswer: number;
}

export const MistakeShow: FC<MistakeShowProps> = ({ rightAnswer, yourAnswer }) => {
  return (
    <div className="flex justify-center mt-16 py-5 relative bg-[#eb8989]">
      <div className="absolute left-2 top-[100px] transform -translate-y-1/2 flex flex-col space-y-6">
        <div className="flex items-center">
          <div className="relative w-[50px] h-[35px] bg-white rounded shadow-lg flex justify-center items-center">
            <span className="text-lg font-bold text-gray-800">Enter</span>
            <div className="absolute inset-0 rounded border-2 border-gray-300"></div>
          </div>
          <span className="text-lg font-semibold ml-2">Продолжить</span>
        </div>

        <div className="flex items-center">
          <div className="relative w-[50px] h-[35px] bg-white rounded shadow-lg flex justify-center items-center">
            <span className="text-xl font-bold text-gray-800">X</span>
            <div className="absolute inset-0 rounded border-2 border-gray-300"></div>
          </div>
          <span className="text-lg font-semibold ml-2">Пояснение к задаче</span>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl">
          ВАШ ОТВЕТ: <span className="pl-2">{yourAnswer}</span>
        </h2>
        <>
          <span className="text-5xl text-white font-bold mt-2 block">
            НЕПРАВИЛЬНО
          </span>
          <button
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
          >
            Продолжить [Enter]
          </button>
          <div className="text-xl uppercase font-medium mt-4">
            Правильный ответ: {rightAnswer}
          </div>
        </>
      </div>
    </div>
  );
};
