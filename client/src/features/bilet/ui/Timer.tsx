import { useEffect, FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";
import { time } from "console";

interface TimerProps {
    openResult: boolean;
    status: string;
    timeWithExitExam: { time: number; exit: boolean };
    setTimeWithExitExam: (state: { time: number; exit: boolean }) => void;
}

export const Timer: FC<TimerProps> = ({ openResult, status, timeWithExitExam, setTimeWithExitExam }) => {
    const { choosedMode } = useSelector((state: RootState) => state.biletSlice);

    useEffect(() => {
        if (!openResult) {
            const timer = setInterval(() => {
                setTimeWithExitExam((prevState: { time: number; }) => ({
                    ...prevState,
                    time: prevState?.time > 0 ? prevState.time - 1 : 0
                }));
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [openResult, setTimeWithExitExam]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')} : ${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="relative flex items-center pt-1 justify-between px-4">
            <h3 className="text-lg">{choosedMode}</h3>
            <div className="flex flex-1 justify-center items-center space-x-4">
                <div className="w-[80px] h-[35px] bg-white flex items-center justify-center text-lg border border-solid border-black">
                    {status && status.slice(0, 1) === 't'
                        ? '- - : --'
                        : formatTime(timeWithExitExam?.time || 0)}
                </div>
            </div>
            <div className="text-left">
                {timeWithExitExam && !timeWithExitExam.exit && (
                <button
                    className="bg-gray-100 bg-gradient-to-t from-gray-200 to-transparent border border-solid border-black text-black py-1 px-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    onClick={() => setTimeWithExitExam({ ...timeWithExitExam, exit: true })}
                >
                    Завершить экзамен
                </button>
                )}
            </div>
        </div>
    );
};
