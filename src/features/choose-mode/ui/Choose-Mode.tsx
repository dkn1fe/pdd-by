import { Modes } from "./Modes"

export const ChooseMode = () => {
    return (
        <div className="max-w-[600px] m-auto pt-24">
            <div className="w-full h-[483px] bg-white p-2 shadow-2xl">
                <h3 className="pl-2">Выберите режим</h3>
                <Modes />
            </div>
        </div>
    )
}
