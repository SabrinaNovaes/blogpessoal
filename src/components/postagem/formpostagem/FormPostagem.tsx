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
            alert("Você precisa esta logado")
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

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
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
                alert("Post atualizado com sucesso")
            } catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout()
                } else {
                    alert("Erro ao atualizar post")
                }
            }
        } else {
            try {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    header: { Authorization: token, },
                })

                alert("Post Cadastrado com sucesso")
            } catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout()
                } else {
                    alert("Erro ao cadastrar post")
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    const carregandoTema = tema.descricao === ""

    return (
        <>
            <section className="w-[85vh] h-[65vh] bg-[#0F172A] font-poppins justify-center items-center m-auto
                text-center text-pink-100 rounded-3xl border-2 border-pink-600 shadow-lg shadow-pink-300">
                
                <h1 className="text-5xl font-bold font-poppins bg-linear-to-t from-pink-300 
                        to-pink-500 bg-clip-text text-transparent mt-5">
                            {id !== undefined ? "Editar Post" : "Cadastrar Post"}
                </h1>

                <form className="p-6" onSubmit={gerarNovaPostagem}>
                    <div className="grid justify-center gap p-2">
                        <label htmlFor="titulo" className="text-pink-600 font-bold text-start">Titulo do Post</label>
                        <input
                            type="text"
                            placeholder="Digite o titulo do post"
                            name="titulo"
                            value={postagem.titulo}
                            required
                            className="w-[20rem] h-[2.5rem] p-2 border-2 border-pink-400 
                                rounded-lg hover:border-pink-600"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
                    </div>
                    <div className="grid justify-center gap p-2">
                        <label htmlFor="postagem" className="text-pink-600 font-bold text-start">Post</label>
                        <input
                            type="text"
                            placeholder="Digite seu post"
                            name="postagem"
                            value={postagem.texto}
                            required
                            className="border-2 border-pink-400 w-[20rem] h-[2.5rem] p-2 
                                rounded-lg hover:border-pink-600"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
                    </div>
                    <div className="grid justify-center m-2 p-2">
                        <p className="text-pink-600 font-bold">Tema do Post</p>
                        <select
                            name="tema"
                            id="tema"
                            className="border-2 border-pink-400 w-[12rem] h-[2.5rem] p-2 
                                rounded-lg hover:border-pink-600"
                            onChange={(e) => buscarTemaPorId(e.currentTarget.value)}>

                            <option
                                value=""
                                selected
                                disabled
                                className="bg-[#0F172A]">
                                Escolha um Tema
                            </option>

                            {temas.map((tema) => (
                                <>
                                    <option
                                        value={tema.id}
                                        className="bg-[#0F172A]">
                                        {tema.descricao}
                                    </option>
                                </>
                            ))}
                        </select>
                    </div>
                    <button 
                        type="submit" 
                        className="border-2 border-pink-600 bg-pink-500 hover:bg-pink-600 cursor-pointer 
                            w-[10rem] h-[2.5rem] rounded-lg"
                        disabled={carregandoTema}>
                        {
                            isLoading ?
                                <ClipLoader
                                    color=""
                                    size={24}
                                /> :
                                <span>{id === undefined ? "Postar" : "Atualizar"}</span>
                        }
                    </button>
                </form>
            </section>
        </>
    )
}

export default FormPostagem