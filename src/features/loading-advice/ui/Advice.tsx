import { usefulAdvice } from "../../../shared/utils/useful-advice";
import { Lightbulb } from 'lucide-react';

export const Advice = () => {
    return (
        <div className="w-full bg-white p-5 shadow-lg">
            <div className="flex items-center gap-4 pt-2 max-w-[90%] m-auto">
                <Lightbulb color="#999999" size={80}/>
                <div className="flex flex-col gap-2">
                    <h3 className="text-[#999999] text-lg font-bold">ПОЛЕЗНЫЙ СОВЕТ</h3>
                    <p className="text-[14px] leading-relaxed">
                        {usefulAdvice[Math.floor(usefulAdvice.length * Math.random())]}
                    </p>
                </div>
            </div>
        </div>
    );
}
