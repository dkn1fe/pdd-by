import { Keyboard } from "./Keyboard"


export const HelpKeyboard = () => {
    return (
        <div className="max-w-[500px] m-auto mt-10">
            <div className="w-full h-[100px] bg-white p-2 shadow-xl">
              <Keyboard/>
            </div>
        </div>
    )
}