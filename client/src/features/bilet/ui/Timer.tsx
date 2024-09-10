import { useState, useEffect, FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";

interface TimerProps {
    openResult: boolean
}

export const Timer: FC<TimerProps> = ({ openResult }) => {
    const { choosedMode } = useSelector((state: RootState) => state.biletSlice);
    const [time, setTime] = useState(15 * 60);

    useEffect(() => {
        if (!openResult) {
            const timer = setInterval(() => {
                setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000);

            return () => clearInterval(timer);
        }

    }, []);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')} : ${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <div className="relative flex items-center">
                <h3 className="pt-2 pl-2 absolute left-0 text-lg">{choosedMode}</h3>
                <div className="w-full flex justify-center">
                    <div className="w-[80px] h-[30px] mt-3 bg-white flex items-center justify-center text-lg border border-gray-400">
                        {choosedMode.slice(0, 1) === 'Т' ? '- - : --' : formatTime(time)}
                    </div>
                </div>
            </div>
        </>
    );
};
