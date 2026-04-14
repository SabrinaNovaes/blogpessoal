import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"
import { useContext, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

function Footer() {

    const data = new Date().getFullYear()

    const { usuario } = useContext(AuthContext)

    let component: ReactNode

    if (usuario.token !== "") {
        component = (
            <footer className="w-full text-pink-100 pt-10 bg-[#0F172A]">
                <div className="flex flex-col justify-center items-center 
                border-t border-white/10 py-6 gap-2">
                    <p className="text-sm md:text-base text-gray-400">
                        Dev Diaries | © {data}
                    </p>
                    <p className="text-xs text-gray-500">
                        Conecte-se comigo nas redes sociais!
                    </p>
                    <div className="flex pt-2 gap-5">
                        <Link
                            to="https://www.linkedin.com/in/sabrina-novaes/" className="hover:text-pink-400 transition duration-300
                            hover:scale-110 hover:drop-shadow-lg 
                            hover:drop-shadow-pink-400">
                            <LinkedinLogoIcon size={28} />
                        </Link>

                        <Link
                            to="https://github.com/SabrinaNovaes" className="hover:text-pink-400 transition duration-300
                                hover:scale-110 hover:drop-shadow-lg 
                                hover:drop-shadow-pink-400">
                            <GithubLogoIcon size={28} />
                        </Link>
                    </div>
                </div>
            </footer>
        )
    }

    return (
        <>
            {component}
        </>
    )
}

export default Footer
