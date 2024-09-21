import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "../../../app/store/store"
import { handleChooseBilet } from "../../../app/store/biletSlice"

export const ModalBilet = () => {
    const {choosedMode} = useSelector((state:RootState)=> state.biletSlice)
    console.log(choosedMode)
    const [bilet, setBilet] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const handleChange = (e: any) => {
        if (!isNaN(e.target.value) && e.target.value.length === 1) {
            setBilet(e.target.value)
        }
    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Backspace') {
            setBilet('')
        }
        if (e.key === 'Enter'){
            if(choosedMode.slice(0,1) === 'Т'){
                navigate('/training') 
            }
            else{
                navigate('/control')
            }
            dispatch(handleChooseBilet(bilet))
        }
    }

    useEffect(() => {
        inputRef.current?.focus()
        
        const handleFocusLoss = () => {
            inputRef.current?.focus()
        }

        window.addEventListener('blur', handleFocusLoss)
        return () => {
            window.removeEventListener('blur', handleFocusLoss)
        }
    }, [])

    return (
        <div className="absolute top-[30%] left-[45%]">
            <div className="w-[350px] h-[88px] bg-white flex flex-col items-center justify-center">
                <div className="w-[335px] h-[78px] bg-[green] flex justify-center items-center">
                    <div className="flex items-center">
                        <h3 className="text-lg uppercase text-white font-bold">
                            Введите номер билета:<span className="ml-2 text-yellow-500">{bilet}</span>
                        </h3>
                        <input
                            ref={inputRef} 
                            autoFocus
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent border-none focus:outline-none ml-2 opacity-0 w-[40px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
