import { ChooseMode } from '../features/choose-mode/index'
import { LoadingAdvice } from '../features/loading-advice/index'
import { HelpKeyboard } from '../features/help-keyboard/index'
import { Footer } from '../widgets/footer/Footer'
import { modes } from "../shared/utils/modes";


export const ChoosePage = () => {
    return (
        <>
          <LoadingAdvice/>
          <ChooseMode title='Выберите режим' modes={modes}/>
          <HelpKeyboard/>
          <footer className='absolute bottom-0 w-full'>
            <Footer/>
          </footer>
        </>
    )
}