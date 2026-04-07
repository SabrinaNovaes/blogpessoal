import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"
import { Link } from "react-router-dom"

function Footer() {

    const data = new Date().getFullYear()

    return (
        <>
            <footer className="fixed w-full py-4 bg-[#0F172A] text-pink-100">
                <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-lg border border-white/10 shadow-sm shadow-pink-300">
                    <p className="md:text-base">Blog Dev | © Copyright {data} </p>
                    <p className="text-sm">Conecte-se Comigo nas Redes Sociais!</p>
                    <div className="flex pt-2 gap-4">
                        <Link to="" className=" hover:text-pink-400 hover:border-pink-400 
                        hover:drop-shadow-lg hover:drop-shadow-pink-300"><LinkedinLogoIcon size={32} /></Link>
                        <Link to="" className=" hover:text-pink-400 hover:border-pink-400 
                        hover:drop-shadow-lg hover:drop-shadow-pink-300"><GithubLogoIcon size={32} /></Link>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
