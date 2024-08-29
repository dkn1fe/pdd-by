import { ChooseMode } from '../features/choose-mode/index'
import { LoadingAdvice } from '../features/loading-advice/index'
import { HelpKeyboard } from '../features/help-keyboard/index'
import { Footer } from '../widgets/footer/Footer'

export const ChoosePage = () => {
    return (
        <>
          <LoadingAdvice/>
          <ChooseMode/>
          <HelpKeyboard/>
          <footer className='absolute bottom-0 w-full'>
            <Footer/>
          </footer>
        </>
    )
}