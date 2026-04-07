import blogpessoal from "../../assets/img/blogpessoalimg.png";
import { motion } from "framer-motion";
import { FaPenNib } from "react-icons/fa";

export default function Home() {
    return (
        <section
            className="bg-[#0F172A] flex justify-center items-center">
            <article
                className="container grid grid-cols-1 md:grid-cols-2 text-pink-100 mt-25">

                {/* py - padding vertical px padding horizontal pb - padding bottom pt - padding top */}

                <figure
                    className="flex justify-center items-center py-4 md:pb-0 order-first md:order-last bg-none">
                    <motion.img
                        src={blogpessoal}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        alt="Imagem Página Home"
                        className="drop-shadow-lg drop-shadow-pink-400 w-5/4" />
                </figure> 

                <div
                    className="flex flex-col gap-4 items-center justify-center py-4 text-center md:text-left order-last md:order-first">
                    <h2 className="font-serif text-3xl md:text-7xl font-bold leading-tight mx-auto px-4 
                        bg-linear-to-t from-pink-300 to-pink-500 bg-clip-text text-transparent">
                        Seja Bem-Vinda(o)!
                    </h2>
                    <p
                        className="text-center text-base md:text-xl">
                        Esse é o Dev Diaries, onde você pode compartilhar
                        suas ideias, pensamentos e experiências com o mundo.
                        Junte-se a nós e comece a compartilhar suas histórias!
                    </p>

                    <div
                        className="flex justify-center gap-4">

                        <button type="button"
                            className="flex items-center gap-2 h-13 rounded-lg bg-linear-to-t from-pink-500 to-pink-800  text-white
                                border-pink-900 border-solid border py-2 px-4 cursor-pointer hover:scale-102 transition-transform
                                duration-100 hover:shadow-md shadow-pink-300">
                            <FaPenNib size={20} />Novo Post
                        </button>
                    </div>
                </div>
            </article>
        </section>
    )
}
