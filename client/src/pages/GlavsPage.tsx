import { ChooseMode } from "../features/choose-mode"
import { Footer } from "../widgets/footer/Footer"
import { trainBiletMods } from "../shared/utils/modes"
import { HelpKeyboard } from "../features/help-keyboard"

export const GlavsPage = () => {
    return (
        <>
        <ChooseMode title='Тренировка по тематическим билетам' modes={trainBiletMods}/>
        <HelpKeyboard/>
         <footer className='absolute bottom-0 w-full'>
            <Footer/>
          </footer>
        </>
    )
}