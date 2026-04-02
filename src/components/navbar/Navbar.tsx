import { SignOutIcon, UserCircleIcon } from "@phosphor-icons/react"
import { Link } from "react-router-dom"

function Navbar() {
    return (
        <>
            <div className="w-full text-white">
                <nav className="flex justify-between items-center py-4 px-8 bg-gradient-to-b from-pink-900 to-pink-600">
                    <Link to="/home" className="font-serif text-3xl hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.8)] hover:text-pink-200">Blog da Brina</Link>
                    <div className="font-flex px-4 gap-4 text-1xl items-center">
                        <div className="flex gap-4">
                            <Link to="/postagens" className="hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.8)] hover:text-pink-200 ">Postagens</Link>
                            <Link to="/temas" className="hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.8)] hover:text-pink-200">Temas</Link>
                            <Link to="/cadastrarTemas" className="hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.8)] hover:text-pink-200">Cadastrar Temas</Link>
                            <Link to="" className="hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.8)] hover:text-pink-950"><UserCircleIcon size={30}/></Link>
                            <Link to="" className="hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.8)] hover:text-pink-950"><SignOutIcon size={30} /></Link>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar
