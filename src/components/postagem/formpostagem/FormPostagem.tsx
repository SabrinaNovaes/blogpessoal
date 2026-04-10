/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Postagem from "../../../models/Postagem";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";
import { ToastAlerta } from "../../../util/ToastAlerta";

function FormPostagem() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [temas, setTemas] = useState<Tema[]>([])

    const [tema, setTema] = useState<Tema>({ id: 0, descricao: "", })

    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarPostagemPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout()
            }
        }
    }

    async function buscarTemaPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout()
            }
        }
    }

    async function buscarTemas() {
        try {
            await buscar("/temas", setTemas, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa esta logado", "erro")
            navigate("/")
        }
    }, [token])

    useEffect(() => {
        buscarTemas()

        if (id !== undefined) {
            buscarPostagemPorId(id)
        }
    }, [id])

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
        })
    }, [tema])

    function atualizarEstado(e: ChangeEvent< HTMLTextAreaElement | HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario
        })
    }

    function retornar() {
        navigate("/postagens")
    }

    async function gerarNovaPostagem(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: { Authorization: token, },
                })
                ToastAlerta("Post atualizado com sucesso", "sucesso")
            } catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout()
                } else {
                    ToastAlerta("Erro ao atualizar post", "erro")
                }
            }
        } else {
            try {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    header: { Authorization: token, },
                })

                ToastAlerta("Post Cadastrado com sucesso", "sucesso")
            } catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout()
                } else {
                    ToastAlerta("Erro ao cadastrar post", "erro")
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    const carregandoTema = tema.descricao === ""

    return (
        <>
            <section className="justify-center items-center px-4 pt-32">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}

                    className="w-120 max-w-xl bg-[#0F172A]/95 backdrop-blur-lg border border-pink-400/20 
                        rounded-2xl p-6 shadow-xl shadow-pink-500/10 text-pink-100 m-auto"
                >

                    <h1 className="text-3xl md:text-4xl text-center mb-6 font-bold 
                        bg-linear-to-t from-pink-300 to-pink-500 bg-clip-text text-transparent">
                        {id !== undefined ? "Editar Post" : "Cadastrar Post"}
                    </h1>

                    <motion.form
                        onSubmit={gerarNovaPostagem}
                        className="flex flex-col gap-4"

                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: {
                                transition: { staggerChildren: 0.1 }
                            }
                        }}
                    >

                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            className="flex flex-col gap-1"
                        >
                            <label className="text-sm text-gray-400">Título do Post</label>
                            <input
                                type="text"
                                name="titulo"
                                value={postagem.titulo}
                                onChange={atualizarEstado}
                                placeholder="Digite o título do post"
                                required
                                className="border border-pink-400 rounded-lg px-2 py-2 
                                    bg-transparent text-pink-100 outline-none 
                                    focus:border-pink-500 focus:shadow-[0_0_10px_rgba(255,111,145,0.3)]"
                            />
                        </motion.div>

                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            className="flex flex-col gap-1"
                        >
                            <label className="text-sm text-gray-400">Post</label>
                            <textarea
                                name="texto"
                                value={postagem.texto}
                                onChange={atualizarEstado}
                                placeholder="Digite seu post"
                                required
                                rows={4}
                                className="border border-pink-400 rounded-lg px-2 py-2 
                                    bg-transparent text-pink-100 outline-none resize-none
                                    focus:border-pink-500 focus:shadow-[0_0_10px_rgba(255,111,145,0.3)]"
                            />
                        </motion.div>

                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            className="flex flex-col gap-1"
                        >
                            <label className="text-sm text-gray-400">Tema do Post</label>

                            <select
                                name="tema"
                                onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
                                className="border border-pink-400 rounded-lg px-2 py-2 
                                bg-[#0F172A] text-pink-100 outline-none
                                focus:border-pink-500"
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Escolha um Tema
                                </option>

                                {temas.map((tema) => (
                                    <option key={tema.id} value={tema.id}>
                                        {tema.descricao}
                                    </option>
                                ))}
                            </select>
                        </motion.div>

                        <motion.button
                            type="submit"
                            disabled={carregandoTema}

                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}

                            className="mt-4 py-2 rounded-lg 
                                bg-linear-to-r from-pink-500 to-pink-400 
                                hover:from-pink-400 hover:to-pink-500 
                                text-white font-semibold flex justify-center items-center"
                        >
                            {isLoading ? (
                                <ClipLoader color="#fff" size={20} />
                            ) : (
                                id === undefined ? "Postar" : "Atualizar"
                            )}
                        </motion.button>

                    </motion.form>

                </motion.div>
            </section>
        </>
    )
}

export default FormPostagem