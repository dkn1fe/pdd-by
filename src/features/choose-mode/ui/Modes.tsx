import { useEffect, useRef, useState } from "react";
import { modes } from "../../../shared/utils/modes";

export const Modes = () => {
    const [activeMode, setActiveMode] = useState(1);
    const modesElem = useRef<{ [key: number]: HTMLDivElement | null }>({}); 

    const handleKeyPress = (event: { key: string }) => {
        if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S' || event.key === 'ы' || event.key === 'Ы') {
            setActiveMode(activeMode => Math.min(activeMode + 1, modes.length));
        }
        if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W' || event.key === 'Ц' || event.key === 'ц') {
            setActiveMode(activeMode => Math.max(activeMode - 1, 1));
        }
    };
    console.log(activeMode)

    useEffect(() => {
        if (activeMode > modes.length || activeMode < 1) {
            setActiveMode(1);
        }
    }, [activeMode]);

    useEffect(() => {
        if (modesElem.current[1]) {
            modesElem.current[1]?.focus();
        }
    }, []);

    return (
        <div className="w-full h-[435px] mt-2 bg-[#0b83e5]">
            {modes.map(item => (
                <div
                    key={item.id}
                    onClick={() => setActiveMode(item.id)}
                    onKeyDown={handleKeyPress}
                    tabIndex={0}
                    autoFocus={item.id === 1} 
                    ref={el => (modesElem.current[item.id] = el)}
                    className={`flex flex-col m-auto justify-center pl-16 pt-2 mx-5 gap-5  cursor-pointer focus:outline-none 
                        ${item.id === 5 ? 'mt-10' : 'mt-2'} 
                        ${activeMode === item.id ? 'bg-white bg-opacity-50 h-[45px] text-center pb-3 relative top-2' : 'w-full'}`}
                >
                    <h3 className={`text-left text-2xl ${activeMode === item.id ? 'text-black' : 'text-white'}`}>
                        {item.title}
                    </h3>
                </div>
            ))}
        </div>
    );
};
