import Home from "./pages/home/Home"
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Cadastro from "./pages/cadastro/Cadastro"
import Login from "./pages/login/Login"

function App() {

  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
