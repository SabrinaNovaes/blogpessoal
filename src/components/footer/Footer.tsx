import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"

function Footer() {

    const data = new Date().getFullYear()

    return (
        <>
            <footer className="bg-gradient-to-t from-pink-900 to-pink-600 text-white py-4">
                <div className="flex flex-col justify-center items-center">
                    <p className="md:text-base">Blog da Brina | © Copyright {data} </p>
                    <p className="text-sm">Conecte-se Comigo nas Redes Sociais!</p>
                    <div className="flex pt-2 gap-4">
                        <a href="#" className="hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.8)] hover:text-pink-950"><LinkedinLogoIcon size={32} /></a>
                        <a href="#" className="hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.8)] hover:text-pink-950"><GithubLogoIcon size={32} /></a>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
