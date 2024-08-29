import { LoadingAdvice } from '../features/loading-advice/index'
import { Footer } from '../widgets/footer/Footer'

export const ChoosePage = () => {
    return (
        <>
          <LoadingAdvice/>
          <footer className='absolute bottom-0 w-full'>
            <Footer/>
          </footer>
        </>
    )
}