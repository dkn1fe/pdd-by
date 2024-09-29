import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store/store";
import { FC, useEffect, useState, useCallback } from "react";
import { onHandleWriteQuestions, onHandleDontWriteQuestions, handleChangeYourAnswer } from "../../../app/store/biletSlice";
import { getLastOrFirst } from "../../../shared/utils/utils";
import { QuestionType } from "../../../entities/questionType/QuestionType";
import { HelpForBilet } from "./HelpForBilet";

interface QuestionsProps {
  questions: QuestionType[];
  status: string;
  toolsForBilet: { showAnswer: boolean, isOpenHelpForBilet: boolean };
  setToolsForBilet: (state: { showAnswer: boolean, isOpenHelpForBilet: boolean }) => void;
}

export const Questions: FC<QuestionsProps> = ({ questions, status, toolsForBilet, setToolsForBilet }) => {
  const { activeQuestions, writeQuestions, dontWriteQuestions, statusQuestions, choosedMode } = useSelector((state: RootState) => state.biletSlice);
  const [activeAnswer, setActiveAnswer] = useState('');
  const [isResultDisplayed, setIsResultDisplayed] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  if (choosedMode.slice(0, 1) !== 'Г') {
    questions[10] = questions[0];
  }

  const currentQuestion = questions[activeQuestions];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key;

      if ((toolsForBilet.isOpenHelpForBilet && key !== 'Backspace') || (toolsForBilet.showAnswer && key !== 'Enter')) {
        return;
      }

      if (!isResultDisplayed) {
        if (key >= '1' && key <= currentQuestion?.options.length.toString()) {
          setActiveAnswer(key);
          setToolsForBilet({ ...toolsForBilet, showAnswer: false });
        } else if (key === 'Backspace') {
          setActiveAnswer('');
          setToolsForBilet({ showAnswer: false, isOpenHelpForBilet: false });
        } else if (key === 'Enter' && activeAnswer !== '') {
          setToolsForBilet({ showAnswer: true, isOpenHelpForBilet: false });

          if (status === 'training' || status === 'allGlavsTrain') {
            if (Number(activeAnswer) === currentQuestion.answer) {
              setIsResultDisplayed(true);
              dispatch(onHandleWriteQuestions(activeQuestions));
            } else {
              setIsResultDisplayed(true);
            }
          } else {
            setIsResultDisplayed(true);
            if (Number(activeAnswer) === currentQuestion.answer) {
              dispatch(onHandleWriteQuestions(activeQuestions));
            } else {
              dispatch(onHandleDontWriteQuestions(activeQuestions));
              dispatch(handleChangeYourAnswer(activeAnswer));
            }
          }
        } else if (key === 'X' || key === 'x' || key === 'х' || key === 'Х') {
          setToolsForBilet({ ...toolsForBilet, isOpenHelpForBilet: true });
        }
      } else {
        if (key === 'Enter') {
          if ((status === 'training' || status === 'allGlavsTrain') && Number(activeAnswer) !== currentQuestion.answer) {
            setIsResultDisplayed(false);
            setActiveAnswer('');
            setToolsForBilet({ ...toolsForBilet, showAnswer: false });
          } else {
            setIsResultDisplayed(false);
            setActiveAnswer('');
            setToolsForBilet({ ...toolsForBilet, showAnswer: false });
            getLastOrFirst(questions, activeQuestions, writeQuestions, dontWriteQuestions, dispatch);
          }
        }
      }
    },
    [activeAnswer, isResultDisplayed, activeQuestions, questions, writeQuestions, dontWriteQuestions, choosedMode, status, toolsForBilet.showAnswer, toolsForBilet.isOpenHelpForBilet]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleOptionClick = (index: number) => {
    if (!toolsForBilet.showAnswer && !toolsForBilet.isOpenHelpForBilet) {
      setActiveAnswer(index.toString() + 1);
    }
  };

  return (
    <>
      {statusQuestions === 'idle' && (
        <>
          <div className="relative p-3 h-[100px] pt-5 border-b border-gray-400">
            <h3 className="text-xl">{currentQuestion?.question}</h3>
          </div>

          {toolsForBilet.isOpenHelpForBilet && (
            <HelpForBilet activeQuestion={activeQuestions} questions={questions} />
          )}

          {currentQuestion?.image && (
            <div className="flex gap-5 p-2">
              <div className="relative pl-5">
                <img
                  src={currentQuestion?.image}
                  alt="question illustration"
                  className="max-w-full h-[340px]"
                />
              </div>
              <div className="border-l border-gray-300" />
              <div className="w-1/2 p-3">
                <ol className="list-decimal pl-5">
                  {currentQuestion?.options?.map((item, index) => (
                    <li key={index + 1} className={`mb-1 cursor-pointer ${activeAnswer === index.toString() + 1 ? '[text-decoration:underline]' : ''}`}>
                      <p onClick={() => handleOptionClick(index)} className="text-lg pt-2">{item}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {!currentQuestion?.image && (
            <div className="relative border-b border-gray-400 p-3 flex gap-2">
              <div className="w-[400px] h-[340px] bg-white relative">
                <div className="absolute left-3 inset-0 bg-gradient-to-t from-gray-400 to-transparent opacity-40"></div>
                <h3 className="text-2xl text-black opacity-80 z-10 flex justify-center items-center h-full">Вопрос без картинки</h3>
              </div>
              <div className="p-3">
                <ol className="list-decimal pl-5">
                  {currentQuestion?.options?.map((item, index) => (
                    <li key={index + 1} className={`mb-1 cursor-pointer text-black text-lg ${activeAnswer === index.toString() + 1 ? '[text-decoration:underline]' : ''}`}>
                      <p onClick={() => handleOptionClick(index)} className="text-lg pt-2">{item}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          <div
            className={`flex justify-center mt-5 py-5 relative ${toolsForBilet.showAnswer
              ? Number(activeAnswer) === currentQuestion.answer
                ? 'bg-[#89cc92]'
                : 'bg-[#eb8989]'
              : 'bg-white'
              }`}
          >
            <div className="text-center">
              <h2 className="text-2xl">
                ВАШ ОТВЕТ: <span className="pl-2">{activeAnswer}</span>
              </h2>
              {toolsForBilet.showAnswer && (
                <>
                  <span className="text-5xl text-white font-bold mt-2 block">
                    {Number(activeAnswer) === currentQuestion.answer
                      ? 'ПРАВИЛЬНО'
                      : 'НЕПРАВИЛЬНО'}
                  </span>
                  <button
                    className="absolute -top-[50px] left-[43%] mt-3 bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                    onClick={() => {
                      setIsResultDisplayed(false);
                      setActiveAnswer('');
                      setToolsForBilet({ ...toolsForBilet, showAnswer: false });
                      getLastOrFirst(questions, activeQuestions, writeQuestions, dontWriteQuestions, dispatch);
                    }}
                  >
                    Продолжить [Enter]
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
