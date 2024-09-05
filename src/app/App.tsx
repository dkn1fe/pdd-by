import { Route, Routes } from "react-router-dom"
import { ChoosePage } from "../pages/ChoosePage"
import { Bilet } from "../features/bilet/index"
import { GlavsPage } from "../pages/GlavsPage"


export const App = () => {

  return (
    <div className="flex-1">
      <Routes>
        <Route path='/' element={<ChoosePage />} />
        <Route path='/temBilet' element={<GlavsPage />} />
        <Route path="/training" element={<Bilet />} />
      </Routes>
    </div>
  )
}

