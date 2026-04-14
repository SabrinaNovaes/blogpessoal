/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext, useEffect, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";
import { ToastAlerta } from "../../../util/ToastAlerta";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";

function FormTema() {

    // Objeto responsável por redirecionar o usuário para uma outra rota
    const navigate = useNavigate();

    // Estado para controlar o Loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Estado que irá receber os dados do tema que será persistido no Backend
    const [tema, setTema] = useState<Tema>({} as Tema);

    // Acessa o token do usuário autenticado
    const { usuario, handleLogout } = useContext(AuthContext);

    // Cria um objeto para armazenar o token
    const token = usuario.token;

    // Acessar o parâmetro id da rota de edição do tema
    const { id } = useParams<{ id: string }>();

    // Função para buscar um tema pelo id no backend
    // que será atualizado no form
    async function buscarTemaPorId() {
        try {

            setIsLoading(true);

            await buscar(`/temas/${id}`, setTema, {
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

    // Cria um useEffect para monitorar o token
    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'erro');
            navigate('/')
        }
    }, [navigate, token])

    // Cria um useEffect para monitorar o id (rota)
    useEffect(() => {
        if (id !== undefined) {
            buscarTemaPorId();
        }
    }, [id])

    // Função de atualização do estado tema
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })
    }

    async function gerarNovoTema(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        try {
            if (id !== undefined) {
                await atualizar('/temas', tema, setTema, {
                    headers: { Authorization: token }
                })
                ToastAlerta('Tema atualizado com sucesso!', 'sucesso');
            } else {
                await cadastrar('/temas', tema, setTema, {
                    headers: { Authorization: token }
                })
                ToastAlerta('Tema cadastrado com sucesso!', 'sucesso');
            }
            retornar()
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao Cadastrar o Tema!', 'erro')
            }
        } finally {
            setIsLoading(false)
        }
    }

    function retornar() {
        navigate('/temas')
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-120 max-w-xl bg-[#0F172A]/95 backdrop-blur-lg border border-pink-400/20 
                        rounded-2xl p-6 shadow-xl shadow-pink-500/10 text-pink-100 m-auto">

                <h1 className="text-3xl md:text-4xl text-center mb-6 font-bold 
                        bg-linear-to-t from-pink-300 to-pink-500 bg-clip-text text-transparent">
                    {id === undefined ? "Cadastrar Tema" : "Editar Tema"}
                </h1>

                <motion.form
                    onSubmit={gerarNovoTema}
                    className="flex flex-col gap-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                >

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        className="flex flex-col gap-2 text-pink-100"
                    >
                        <label htmlFor="descricao" className="text-sm text-gray-400">
                            Descrição do Tema
                        </label>

                        <input
                            type="text"
                            id="descricao"
                            name="descricao"
                            placeholder="Ex: Frontend, Backend, DevOps..."
                            value={tema.descricao}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            className="border border-pink-400 rounded-lg px-2 py-2 
                                    bg-transparent text-pink-100 outline-none 
                                    focus:border-pink-500 focus:shadow-[0_0_10px_rgba(255,111,145,0.3)]"
                            required
                        />

                        {tema.descricao?.length > 0 && tema.descricao?.length < 5 && (
                            <span className="text-red-400 text-xs flex items-center gap-2">
                                <FaExclamationTriangle size={16}/>
                                O campo deve conter no mínimo 5 caracteres ({tema.descricao.length}/5)
                            </span>
                        )}

                        {tema.descricao?.length >= 5 && (
                            <span className="text-green-400 text-xs">
                                <FaCheck size={16} /> {tema.descricao.length} caracteres
                            </span>
                        )}
                    </motion.div>

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isLoading || !tema.descricao || tema.descricao.length < 5}
                        className="mt-4 py-3 rounded-xl 
                            bg-linear-to-r from-pink-500 to-pink-400 
                            hover:from-pink-400 hover:to-pink-500 
                            text-white font-semibold 
                            flex items-center justify-center gap-2
                            transition-all duration-300" >

                        {isLoading ? <ClipLoader color="#ffffff" size={24} /> :
                            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>}
                    </motion.button>

                </motion.form>

            </motion.div>
        </div>
    )
}

export default FormTema;