import { useState } from "react"
import { GlavsMode } from "./GlavsMode"
import { ContentOfGlavs } from "./ContentOfGlavs"
import { HelpKeyboard } from "../../help-keyboard"

export const AllGlavsMode = () => {
    const [activeMode, setActiveMode] = useState(1)
    console.log(activeMode)
    return (
        <div className="max-w-[1200px] m-auto flex justify-between mt-20">
            <div className="w-[400px] h-[800px] bg-white">
                <h3 className="ml-3 mt-1 text-lg">Выберите главу</h3>
                <GlavsMode activeMode={activeMode} setActiveMode={setActiveMode} />
            </div>
            <div className="flex-col gap-20">
                <div className="flex-1 -mt-[78px] flex justify-end  items-start">
                    <ContentOfGlavs activeMode = {activeMode}/>
                </div>
                <div className="mt-[380px]">
                    <HelpKeyboard />
                </div>
            </div>
        </div>
    )
}
