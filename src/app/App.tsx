import { Route, Routes } from "react-router-dom"
import { ChoosePage } from "../pages/ChoosePage"
import { Bilet } from "../features/bilet/index"
import { LoadingAdvice } from '../features/loading-advice/index'
import { GlavsPage } from "../pages/GlavsPage"
import { useState } from "react"
import { Footer } from "../widgets/footer/Footer"


export const App = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="flex-1">
      {isOpen && (
        <>
        <LoadingAdvice setIsOpen={setIsOpen} />
        <div className="absolute w-full bottom-0">
        <Footer/>
        </div>
        </>
      )}
      {!isOpen && (
        <Routes>
          <Route path='/' element={<ChoosePage />} />
          <Route path='/temBilet' element={<GlavsPage />} />
          <Route path="/training" element={<Bilet />} />
        </Routes>
      )}

    </div>
  )
}

