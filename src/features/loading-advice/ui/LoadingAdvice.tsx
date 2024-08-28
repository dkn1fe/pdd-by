import { useEffect, useRef, useState } from 'react';
import loading from '../../../entities/loading-advice/loading.png';
import { Advice } from './Advice';
import { Loading } from './Loading';

export const LoadingAdvice = () => {
    const [isOpen, setIsOpen] = useState(true)
    let intervalOpen = useRef<any>(null);


    useEffect(() => {

        intervalOpen = setTimeout(() => {
            setIsOpen(false)
        }, 4000)
        return () => {
            clearInterval(intervalOpen)
        }
    }, [])

    return (
        <>
            {isOpen &&
                <div className="max-w-[800px] m-auto">
                    <div className="flex flex-col justify-center items-center pt-32">
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
            }
        </>
    );
}
