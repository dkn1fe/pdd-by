import { FC } from "react";

interface MistakeShowProps {
  rightAnswer: number;
  yourAnswer: number;
}

export const MistakeShow: FC<MistakeShowProps> = ({ rightAnswer, yourAnswer }) => {
  return (
    <div className="flex justify-center mt-5 py-5 relative bg-[#eb8989]">
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
          <div className="text-xl uppercase  font-medium mt-4">
            Правильный ответ: {rightAnswer}
          </div>
        </>
      </div>
    </div>
  );
};
