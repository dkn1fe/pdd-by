import { FC, useEffect, useRef } from 'react';
import loading from '../../../entities/loading-advice/loading.png';
import { Advice } from './Advice';
import { Loading } from './Loading';

interface LoadingAdviceProps {
    setIsOpen: (open: boolean) => void;
}

export const LoadingAdvice: FC<LoadingAdviceProps> = ({ setIsOpen }) => {
    let intervalOpen = useRef<NodeJS.Timeout | null>(null); 

    useEffect(() => {
        intervalOpen.current = setTimeout(() => {
            setIsOpen(false);
        }, 4000);

        return () => {
            if (intervalOpen.current) {
                clearTimeout(intervalOpen.current);
            }
        };
    }, [setIsOpen]); 

    return (
        <>
            <div className="max-w-[800px] shadow-2xl m-auto">
                <div className="flex flex-col justify-center items-center mt-32">
                    <div className="relative">
                        <img
                            src={loading}
                            className="h-[400px] object-cover"
                            alt="Loading advice"
                        />
                        <div className="absolute top-4 right-5 text-white text-right p-2 rounded">
                            <div className="text-4xl font-bold">ПДД - 2024</div>
                            <div className="text-[18px]">Учебная компьютерная программа</div>
                        </div>
                    </div>
                    <Loading />
                    <Advice />
                </div>
            </div>
        </>
    );
};
