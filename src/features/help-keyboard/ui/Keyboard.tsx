import { useEffect, useRef, useState } from "react"

export const Keyboard = () => {

    const [active, setActive] = useState(true)
    let intervalActive = useRef(null)

    useEffect(() => {
        if (active) {
            intervalActive = setInterval(() => {
                setActive(false)
            }, 1500)
        }

         if(!active){
            intervalActive = setInterval(() => {
                setActive(true)
            },300)
         }


        return () => {
            clearInterval(intervalActive)
        }
    }, [active])

    return (
        <div className="w-full h-[85px] bg-[red]">
            <div className="flex justify-center pt-7 gap-5 items-center">
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
        </div>
    )
}