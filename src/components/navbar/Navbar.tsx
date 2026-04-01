import { SignOutIcon, UserCircleIcon } from "@phosphor-icons/react"

function Navbar() {
    return (
        <>
            <div>
                <nav className="flex justify-between items-center py-4 px-8 bg-gradient-to-b from-pink-900 to-pink-600 text-white">
                    <a href="#" className="font-serif text-3xl hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.8)] hover:text-pink-200">Blog da Brina</a>
                    <div className="font-flex px-4 gap-4 text-1xl items-center">
                        <div className="decoration-none flex gap-4">
                            <a href="#" className="hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.8)] hover:text-pink-200 ">Postagens</a>
                            <a href="#" className="hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.8)] hover:text-pink-200">Temas</a>
                            <a href="#" className="hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.8)] hover:text-pink-200">Cadastrar Temas</a>
                            <a href="#" className="hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.8)] hover:text-pink-950"><UserCircleIcon size={30}/></a>
                            <a href="#" className="hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.8)] hover:text-pink-950"><SignOutIcon size={30} /></a>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar
