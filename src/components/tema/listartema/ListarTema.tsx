/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import CardTema from "../cardtema/CardTema"
import { useContext, useEffect, useState } from "react";
import type Tema from "../../../models/Tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { SyncLoader } from "react-spinners";
import { motion } from "framer-motion";
import { ToastAlerta } from "../../../util/ToastAlerta";

function ListaTemas() {

    // Objeto responsável por redirecionar o usuário para uma outra rota
    const navigate = useNavigate();

    // Estado para controlar o Loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Estado que irá receber todos os temas persistidos no Backend
    const [temas, setTemas] = useState<Tema[]>([]);

    // Acessa o token do usuário autenticado
    const { usuario, handleLogout } = useContext(AuthContext);

    // Cria um objeto para armazenar o token
    const token = usuario.token;

    // Cria um useEffect para monitorar o token
    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'erro');
            navigate('/')
        }
    }, [token])

    // Cria um useEffect para inicializar a função buscarTemas
    useEffect(() => {
        buscarTemas();
    }, [temas.length])

    // Função para buscar todos os temas no backend
    async function buscarTemas() {
        try {

            setIsLoading(true);

            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            });

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <section className="bg-[#0F172A] text-pink-100 min-h-screen pt-32">

                {isLoading && (
                    <div className="flex justify-center items-center w-full py-20">
                        <SyncLoader color="#FF6F91" size={32} />
                    </div>
                )}

                <div className="max-w-6xl mx-auto px-4">

                    {!isLoading && temas.length === 0 && (
                        <span className="block text-pink-500 text-2xl md:text-3xl text-center py-20">
                            Nenhum Tema foi encontrado!
                        </span>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {temas.map((tema, index) => (
                            <motion.div
                                key={tema.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: index * 0.08,
                                    duration: 0.4
                                }}>
                                <CardTema tema={tema} />
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>
        </>
    )
}
export default ListaTemas;