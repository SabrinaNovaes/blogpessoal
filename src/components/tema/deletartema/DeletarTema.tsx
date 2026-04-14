/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../util/ToastAlerta";
import { motion } from "framer-motion";

function DeletarTema() {

    // Objeto responsável por redirecionar o usuário para uma outra rota
    const navigate = useNavigate()

    // Estado para controlar o Loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Estado que irá receber os dados do tema que será persistido no Backend
    const [tema, setTema] = useState<Tema>({} as Tema)

    // Acessa o token do usuário autenticado
    const { usuario, handleLogout } = useContext(AuthContext)

    // Cria um objeto para armazenar o token
    const token = usuario.token

    // Acessar o parâmetro id da rota de edição do tema
    const { id } = useParams<{ id: string }>()

    // Função para buscar um tema pelo id no backend
    // que será atualizado no form
    async function buscarTemaPorId() {
        try {

            setIsLoading(true)

            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            });

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            }
        } finally {
            setIsLoading(false)
        }
    }

    // Cria um useEffect para monitorar o token
    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'erro')
            navigate('/')
        }
    }, [token])

    // Cria um useEffect para monitorar o id (rota)
    useEffect(() => {
        if (id !== undefined) {
            buscarTemaPorId()
        }
    }, [id])

    function retornar() {
        navigate('/temas')
    }

    async function deletarTema() {

        setIsLoading(true);

        try {

            await deletar(`/temas/${id}`, {
                headers: { Authorization: token }
            });

            ToastAlerta('Tema deletado com sucesso!', 'sucesso')

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }

        setIsLoading(false)
        retornar()

    }

    return (
    <section className="flex justify-center items-center px-4 pt-32">

        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}

            className="w-full max-w-md bg-[#0F172A]/95 backdrop-blur-lg border 
                border-pink-400/20 rounded-2xl p-6 shadow-xl shadow-pink-500/10 
                text-pink-100"
        >

            <h1 className="text-3xl md:text-4xl text-center mb-2 font-bold 
                bg-linear-to-t from-pink-300 to-pink-500 bg-clip-text text-transparent">
                Deletar Tema
            </h1>

            <p className="text-center text-gray-400 text-sm mb-5">
                Tem certeza que deseja apagar este tema?
            </p>

            <div className="bg-pink-500/5 border border-pink-400/20 rounded-xl p-4 mb-6">

                <h2 className="text-lg font-semibold text-pink-400 mb-2">
                    {tema.descricao}
                </h2>

            </div>

            <div className="flex gap-3">

                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}

                    onClick={retornar}

                    className="w-full py-2 rounded-lg border border-pink-400/20 
                        bg-white/5 hover:bg-white/10 text-gray-300 
                        font-semibold transition"
                >
                    Cancelar
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}

                    onClick={deletarTema}

                    className="w-full py-2 rounded-lg bg-linear-to-r 
                        from-pink-500 to-pink-400 hover:from-pink-400 
                        hover:to-pink-500 text-white font-semibold 
                        flex justify-center items-center"
                >
                    {isLoading ? (
                        <ClipLoader color="#fff" size={20} />
                    ) : (
                        'Deletar'
                    )}
                </motion.button>

            </div>

        </motion.div>
    </section>
)
}

export default DeletarTema