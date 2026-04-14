/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ChangeEvent, type SyntheticEvent, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../contexts/AuthContext"
import type Usuario from "../../models/Usuario"
import { atualizar, buscar } from "../../services/Service"
import { ToastAlerta } from "../../util/ToastAlerta"
import { FaCheck, FaExclamationTriangle } from "react-icons/fa"


function AtualizarPerfil() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [user, setUser] = useState<Usuario>({} as Usuario)
    const [confirmarSenha, setConfirmarSenha] = useState<string>("")

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    const id: string = usuario.id.toString()

    const senhasIguais = usuario.senha === confirmarSenha

    async function buscarUsuarioPorId() {
        try {
            await buscar(`/usuarios/${id}`, setUser, {
                headers: {
                    Authorization: token,
                },
            })

            setUser((user) => ({ ...user, senha: "" }))
            setConfirmarSenha("")

        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout()
            } else {
                ToastAlerta("Usuário não encontrado!", "erro")
                retornar()
            }
        }
    }

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", "erro")
            navigate("/")
        }
    }, [token])

    useEffect(() => {
        setUser({} as Usuario)
        setConfirmarSenha("")
        setIsLoading(false)
    }, [])

    useEffect(() => {
        if (id !== undefined) {
            buscarUsuarioPorId()
        }
    }, [id])

    function retornar() {
        navigate("/perfil")
    }

    function sucesso() {
        handleLogout()
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    async function atualizarUsuario(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (confirmarSenha === user.senha && user.senha.length >= 8) {
            try {
                await atualizar(`/usuarios/atualizar`, user, setUser, {
                    headers: {
                        Authorization: token,
                    },
                })
                ToastAlerta("Usuário atualizado! Efetue o Login Novamente!", "sucesso")
                sucesso()
            } catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout()
                } else {
                    ToastAlerta("Erro ao atualizar o usuário!", "erro")
                    retornar()
                }
            }
        } else {
            ToastAlerta("Dados inconsistentes. Verifique as informações do usuário.", "erro")
            setUser({ ...user, senha: "" })
            setConfirmarSenha("")
        }

        setIsLoading(false)
    }

    return (
        <div className="min-h-screen bg-[#0F172A] py-12 px-4 pt-32">
            <div className="max-w-6xl mx-auto">

                <div className="rounded-2xl overflow-hidden border border-white/10 
                    bg-white/5 backdrop-blur-lg shadow-lg">

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]">

                        <div className="p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10">

                            <img
                                src={user.foto}
                                alt={user.nome}
                                className="w-40 h-40 object-cover rounded-full border-4 border-pink-400 shadow-md"
                            />

                            <h2 className="text-pink-400 text-2xl font-bold mt-6 text-center">
                                {user.nome}
                            </h2>

                            <p className="text-gray-400 text-sm mt-2">
                                {user.usuario}
                            </p>

                        </div>

                        <div className="p-6 md:p-10 text-pink-100">

                            <h1 className="text-3xl md:text-4xl text-center mb-6 font-bold text-pink-400">
                                Editar Perfil
                            </h1>

                            <form onSubmit={atualizarUsuario} className="space-y-4">

                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm text-gray-400">Nome</label>
                                    <input
                                        type="text"
                                        name="nome"
                                        value={user.nome || ""}
                                        onChange={atualizarEstado}
                                        className="border border-pink-400 rounded-lg px-2 py-2 
                                    bg-transparent text-pink-100 outline-none 
                                    focus:border-pink-500 focus:shadow-[0_0_10px_rgba(255,111,145,0.3)]"
                                        required
                                    />
                                    {usuario.nome?.length > 0 && usuario.nome?.length < 3 && (
                                        <span className="text-red-400 text-xs flex items-center gap-2">
                                            <FaExclamationTriangle size={16} />
                                            O campo deve conter no mínimo 3 caracteres ({usuario.nome.length}/3)
                                        </span>
                                    )}

                                    {usuario.nome?.length >= 5 && (
                                        <span className="text-green-400 text-xs flex items-center gap-2">
                                            <FaCheck size={16} />
                                            {usuario.nome.length} caracteres
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm text-gray-400">Usuário</label>
                                    <input
                                        type="email"
                                        value={user.usuario || ""}
                                        disabled
                                        className="opacity-60 cursor-not-allowed"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm text-gray-400">Foto</label>
                                    <input
                                        type="url"
                                        name="foto"
                                        value={user.foto || ""}
                                        onChange={atualizarEstado}
                                        className="border border-pink-400 rounded-lg px-2 py-2 
                                    bg-transparent text-pink-100 outline-none 
                                    focus:border-pink-500 focus:shadow-[0_0_10px_rgba(255,111,145,0.3)]"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm text-gray-400">Senha</label>
                                    <input
                                        type="password"
                                        name="senha"
                                        value={user.senha || ""}
                                        onChange={atualizarEstado}
                                        className="border border-pink-400 rounded-lg px-2 py-2 
                                    bg-transparent text-pink-100 outline-none 
                                    focus:border-pink-500 focus:shadow-[0_0_10px_rgba(255,111,145,0.3)]2"
                                        required
                                        minLength={8}
                                    />
                                    {usuario.senha?.length > 0 && usuario.senha?.length < 8 && (
                                        <span className="text-red-400 text-xs flex items-center gap-2">
                                            <FaExclamationTriangle size={16} />
                                            O campo deve conter no mínimo 8 caracteres ({usuario.senha.length}/8)
                                        </span>
                                    )}

                                    {usuario.senha?.length >= 5 && (
                                        <span className="text-green-400 text-xs flex items-center gap-2">
                                            <FaCheck size={16} />
                                            {usuario.senha.length} caracteres
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm text-gray-400">Confirmar Senha</label>
                                    <input
                                        type="password"
                                        value={confirmarSenha}
                                        onChange={handleConfirmarSenha}
                                        className="border border-pink-400 rounded-lg px-2 py-2 
                                            bg-transparent text-pink-100 outline-none 
                                            focus:border-pink-500 focus:shadow-[0_0_10px_rgba(255,111,145,0.3)] "
                                        required
                                        minLength={8}
                                    />
                                    {confirmarSenha.length > 0 && !senhasIguais && (
                                <span className="text-red-400 text-xs flex items-center gap-2">
                                    <FaExclamationTriangle size={16} />
                                    As senhas não coincidem
                                </span>
                            )}

                            {confirmarSenha.length > 0 && senhasIguais && (
                                <span className="text-green-400 text-xs flex items-center gap-2">
                                    <FaCheck size={16} />
                                    As senhas coincidem
                                </span>
                            )}
                                </div>

                                <div className="flex gap-4 pt-4">

                                    <button
                                        type="button"
                                        onClick={retornar}
                                        className="w-1/2 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition"
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-1/2 py-2 rounded-lg
                                            bg-linear-to-r from-pink-500 to-pink-400 
                                            hover:from-pink-400 hover:to-pink-500 
                                            text-white font-semibold 
                                            ransition flex justify-center items-center"
                                    >
                                        {isLoading ? (
                                            <ClipLoader color="#ffffff" size={20} />
                                        ) : (
                                            "Atualizar"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AtualizarPerfil