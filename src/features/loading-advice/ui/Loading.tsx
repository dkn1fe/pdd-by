import { useEffect, useRef } from "react"
import Typed from "typed.js"

export const Loading = () => {
    const el = useRef(null)

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ['Загрузка данных приложения...'],
            typeSpeed: 50,
            showCursor: false
        })
        return () => {
            typed.destroy()
        }
    }, [])


    return (
        <div className="w-full p-3 h-20 bg-[#e7e7e7]">
            <h3 ref={el} className="text-xl pt-3 text-center"></h3>
        </div>
    )
}