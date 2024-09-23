import { ChooseMode } from "../features/choose-mode"
import { Footer } from "../widgets/footer/Footer"
import { trainBiletMods } from "../shared/utils/modes"
import { HelpKeyboard } from "../features/help-keyboard"
import { useSelector } from "react-redux"
import { RootState } from "../app/store/store"

export const GlavsPage = () => {
  const {choosedMode} = useSelector((state:RootState)=> state.biletSlice)
    return (
        <>
        <ChooseMode title={choosedMode} modes={trainBiletMods}/>
        <HelpKeyboard/>
         <footer className='absolute bottom-0 w-full'>
            <Footer/>
          </footer>
        </>
    )
}