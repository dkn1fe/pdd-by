import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../app/store/store"
import { useNavigate } from "react-router-dom"
import { handleChooseMode } from "../../../app/store/biletSlice"

export const Keyboard = () => {
    const { choosedMode} = useSelector((state: RootState) => state.biletSlice)
    const [active, setActive] = useState(true)
    const intervalActive = useRef<NodeJS.Timeout | null>(null) 
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                navigate('/')
                dispatch(handleChooseMode('Выберите режим')) 
            }
        }

        window.addEventListener('keydown', handleKeydown)

        return () => {
            window.removeEventListener('keydown', handleKeydown)
        }
    }, [dispatch, navigate])

    useEffect(() => {
        if (active) {
            intervalActive.current = setInterval(() => {
                setActive(false)
            }, 1500)
        } else {
            intervalActive.current = setInterval(() => {
                setActive(true)
            }, 300)
        }

        return () => {
            if (intervalActive.current) {
                clearInterval(intervalActive.current)
            }
        }
    }, [active])

    return (
        <div className="w-full h-[85px] bg-[red]">
            <div className={`flex justify-center ${choosedMode.slice(0, 1) === 'Т' || choosedMode.slice(0,1) === 'К' ? 'pt-4' : 'pt-7'} gap-5 items-center`}>
                <div className="flex gap-5 items-center">
                    <span className={`font-bold text-xl text-white ${!active && 'opacity-0'}`}>↑↓</span>
                    <span className="text-white">-</span>
                    <span className="text-white">ВЫБРАТЬ;</span>
                </div>
                <div className="flex gap-5 items-center">
                    <span className={`font-bold text-xl text-white ${!active && 'opacity-0'}`}>ENTER</span>
                    <span className="text-white">-</span>
                    <span className="text-white">ПРИНЯТЬ;</span>
                </div>
            </div>
            {(choosedMode.slice(0, 1) === 'Т' || choosedMode.slice(0,1) === 'К') && (
                <div className="flex items-center -pt-4 gap-5 justify-center">
                    <span className={`font-bold text-2xl text-white ${!active && 'opacity-0'}`}>ESC</span>
                    <span className="text-white">-</span>
                    <span className="text-white">ВЕРНУТЬСЯ НАЗАД</span>
                </div>
            )}
        </div>
    )
}
