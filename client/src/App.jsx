import {BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Homepage from "./pages/Homepage"

function App() {

  return <>
    <Navbar />
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />}/>
    </Routes>
  </BrowserRouter>
  </>
}

export default App
