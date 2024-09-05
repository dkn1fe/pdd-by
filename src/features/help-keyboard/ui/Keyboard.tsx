import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../app/store/store"
import { useNavigate } from "react-router-dom"
import { handleChooseMode } from "../../../app/store/biletSlice"

export const Keyboard = () => {
    const { choosedMode } = useSelector((state: RootState) => state.biletSlice)
    const [active, setActive] = useState(true)
    let intervalActive = useRef(null)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    
 


    window.addEventListener('keydown',(e)=>{
       if(e.key === 'Escape'){
         navigate('/')
         dispatch(handleChooseMode(''))
       }
    })

    useEffect(() => {
        if (active) {
            intervalActive = setInterval(() => {
                setActive(false)
            }, 1500)
        }

        if (!active) {
            intervalActive = setInterval(() => {
                setActive(true)
            }, 300)
        }


        return () => {
            clearInterval(intervalActive)
        }
    }, [active])

    return (
        <div className="w-full h-[85px] bg-[red]">
            <div className={`flex justify-center ${choosedMode.slice(0,1) === 'Т' && 'pt-4'} pt-7 gap-5 items-center`}>
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
            {choosedMode.slice(0, 1) === 'Т' && (
                <div className="flex items-center pt-1 gap-5 justify-center">
                    <span className={`font-bold text-2xl text-white ${!active && 'opacity-0'}`}>ESC</span>
                    <span className="text-white">-</span>
                    <span className="text-white">НАЗАД</span>
                </div>
            )}
        </div>
    )
}