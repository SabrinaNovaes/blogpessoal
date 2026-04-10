import blogpessoal from "../../assets/img/blogpessoalimg.png";
import { motion } from "framer-motion";
import ListaPostagem from "../../components/postagem/listapostagem/ListaPostagem";
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem";
import { BsPencil } from "react-icons/bs";

export default function Home() {
    return (
        <>
            <section
                className="flex justify-center items-center pt-45">
                <article
                    className="container grid grid-cols-1 md:grid-cols-2 text-pink-100">

                    {/* py - padding vertical px padding horizontal pb - padding bottom pt - padding top */}

                    <figure
                        className="flex justify-center items-center md:pb-0 order-first md:order-last bg-none">
                        <motion.img
                            src={blogpessoal}
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            alt="Imagem Página Home"
                            className="drop-shadow-lg drop-shadow-pink-400 w-5/4" />
                    </figure>

                    <div
                        className="flex flex-col gap-4 items-center justify-center py-4 text-center md:text-left order-last md:order-first">
                        <h2 className="font-serif text-5xl md:text-6xl font-bold leading-tight mx-auto px-4 
                        bg-linear-to-t from-pink-300 to-pink-500 bg-clip-text text-transparent">
                            Seja Bem-Vinda(o)!
                        </h2>
                        <p
                            className="text-center text-base md:text-xl">
                            Esse é o Dev Diaries, onde você pode compartilhar
                            suas ideias, pensamentos e experiências com o mundo.
                            Junte-se a nós e comece a compartilhar suas histórias!
                        </p>

                        <div className="flex justify-center gap-4">
                            <ModalPostagem />
                        </div>
                    </div>
                </article>
            </section>
            <div className="max-w-5xl mx-auto my-12 px-4">
                <div className="h-0.5 bg-linear-to-r from-transparent via-pink-400 to-transparent ">
                </div>
            </div>
            <h1 className="flex items-center justify-center text-3xl md:text-4xl font-bold 
                        bg-linear-to-t from-pink-300 to-pink-500 bg-clip-text text-transparent gap-6">
                            Feed<BsPencil size={30} className="text-pink-400"/></h1>
            <ListaPostagem />
        </>
    )
}
