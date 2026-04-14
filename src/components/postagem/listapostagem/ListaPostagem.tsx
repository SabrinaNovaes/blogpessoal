/* eslint-disable @typescript-eslint/no-explicit-any */
import { SyncLoader } from "react-spinners";
import CardPostagem from "../cardpostagem/CardPostagem";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import { motion } from "framer-motion";
import { ToastAlerta } from "../../../util/ToastAlerta";
import ModalPostagem from "../modalpostagem/ModalPostagem";

function ListaPostagens() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [postagens, setPostagens] = useState<Postagem[]>([])

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'erro')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarPostagens()
    }, [postagens.length])

    async function buscarPostagens() {
        try {

            setIsLoading(true)

            await buscar('/postagens', setPostagens, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <section className="bg-[#0F172A] text-pink-100 pt-32 min-h-screen">

                {isLoading && (
                    <div className="flex justify-center items-center w-full py-20">
                        <SyncLoader color="#FF6F91" size={20} />
                    </div>
                )}

                <div className="flex justify-center w-full px-4">

                    <div className="w-full max-w-2xl flex flex-col gap-6">

                        {!isLoading && postagens.length === 0 && (
                            <span className="flex w-full jutify-between items-center gap-4 m-auto text-4xl
                            text-center font-bold bg-linear-to-t from-pink-300 to-pink-500 
                            bg-clip-text text-transparent md:text-3xl py-20">
                                Nenhuma Postagem foi encontrada!
                            </span>
                        )}

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="w-full flex justify-between items-center px-6 py-4"
                        >
                            <h1 className="text-4xl font-extrabold p-2
                            bg-linear-to-r from-pink-400 via-pink-300 to-pink-500 
                            bg-clip-text text-transparent drop-shadow-sm">Posts</h1>

                            <ModalPostagem />
                        </motion.div>

                        {[...postagens]
                            .sort((a, b) =>
                                new Date(b.data).getTime() - new Date(a.data).getTime()
                            )
                            .map((postagem, index) => (
                                <motion.div
                                    key={postagem.id}

                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: index * 0.08,
                                        duration: 0.4
                                    }}

                                    whileHover={{ y: -4 }}

                                    className="w-full"
                                >
                                <CardPostagem postagem={postagem} />
                            </motion.div>
                        ))}

                    </div>
                </div>
            </section>
        </>
    );
}

export default ListaPostagens;