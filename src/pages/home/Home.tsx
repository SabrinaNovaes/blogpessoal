import blogpessoal from "../../assets/img/blogpessoalimg.png";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <section
            className="bg-pink-400 flex justify-center items-center">
            <article
                className="container grid grid-cols-2 text-white">

                {/* py - padding vertical px padding horizontal pb - padding bottom pt - padding top */}
                <div
                    className="flex flex-col justify-center items-center gap-4 py-4">

                    <h2
                        className="font-serif text-4xl font-bold">
                        Seja Bem-Vinda(o)!
                    </h2>
                    <p
                        className="text-xl text-center">
                        Esse é o Blog da Brina, onde você pode compartilhar
                        suas ideias, pensamentos e experiências com o mundo.
                        Aqui, você pode criar e publicar seus próprios posts.
                        O Blog da Brina é o lugar perfeito para você.
                        Junte-se a nós e comece a compartilhar suas histórias!
                    </p>

                    <div
                        className="flex justify-around gap-4">

                        <div
                            className="rounded border-white border-solid border-2 py-2 px-4 cursor-pointer">
                            Nova Postagem
                        </div>
                    </div>
                </div>

                <figure
                    className="flex justify-center">
                    <motion.img
                        src={blogpessoal}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        alt="Imagem Página Home"
                        className="w-2/3"/>
                </figure>
            </article>
        </section>
    )
}
