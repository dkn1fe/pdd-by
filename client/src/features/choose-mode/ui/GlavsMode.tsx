import { useEffect, useRef, FC, WheelEvent } from "react";
import { allGlavsMods } from "../../../shared/utils/modes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store/store";
import { useNavigate } from "react-router-dom";
import { handleChooseMode } from "../../../app/store/biletSlice";

interface GlavsModeProps {
    activeMode: number,
    setActiveMode: (num: number) => void
}

export const GlavsMode: FC<GlavsModeProps> = ({ activeMode, setActiveMode }) => {
    const dispatch = useDispatch<AppDispatch>();
    const modesElem = useRef<{ [key: number]: HTMLDivElement | null }>({});
    const navigate = useNavigate();

    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleKeyPress = (event: { key: string }) => {
        if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S' || event.key === 'ы' || event.key === 'Ы') {
            setActiveMode(Math.min(activeMode + 1, allGlavsMods.length));
        }
        if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W' || event.key === 'Ц' || event.key === 'ц') {
            setActiveMode(Math.max(activeMode - 1, 1));
        }
        if (event.key === 'Enter') {
            const selectedItem = allGlavsMods.find(item => item.id === activeMode);
            if (selectedItem) {
                dispatch(handleChooseMode(selectedItem.title));
                navigate('/allGlavsTrain');
            }
        }
    };

    const handleWheel = (event: WheelEvent) => {
        if (event.deltaY > 0) {
            setActiveMode(Math.min(activeMode + 1, allGlavsMods.length));
        } else {
            setActiveMode(Math.max(activeMode - 1, 1));
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        const activeElement = document.querySelector(`#glav-${activeMode}`);

        if (container && activeElement) {
            const containerRect = container.getBoundingClientRect();
            const activeRect = activeElement.getBoundingClientRect();

            if (activeRect.bottom > containerRect.bottom) {
                container.scrollTop += activeRect.bottom - containerRect.bottom;
            }

            if (activeRect.top < containerRect.top) {
                container.scrollTop -= containerRect.top - activeRect.top;
            }
        }
    }, [activeMode]);

    useEffect(() => {
        if (modesElem.current[activeMode]) {
            modesElem.current[activeMode]?.focus();
        }
    }, [activeMode]);

    return (
        <>
            <div className="ml-2 w-[385px] h-[94.5%] mt-2 bg-[#0578cc]">
                <div
                    ref={containerRef}
                    className="h-full focus:outline-none"
                    style={{
                        overflow: 'hidden',
                    }}
                    onKeyDown={handleKeyPress}
                    onClick={() => modesElem.current[activeMode]?.focus()} 
                    onWheel={handleWheel}
                >
                    {allGlavsMods.map(item => (
                        <div
                            ref={el => modesElem.current[item.id] = el}
                            onClick={() => setActiveMode(item.id)}
                            key={item.id}
                            tabIndex={0}
                            autoFocus = {item.id === 1}
                            id={`glav-${item.id}`}
                            className={`flex flex-col justify-center pl-16 pt-4 mx-5 cursor-pointer 
              ${activeMode === item.id ? 'bg-white bg-opacity-50 focus:outline-none h-[45px] text-center pb-3 relative top-2' : 'w-full'}`}>
                            <h3 className={`text-left text-2xl uppercase ${activeMode === item.id ? 'text-black' : 'text-white'}`}>
                                {item.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
