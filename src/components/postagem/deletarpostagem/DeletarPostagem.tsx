/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { motion } from 'framer-motion'
import { AuthContext } from '../../../contexts/AuthContext'
import type Postagem from '../../../models/Postagem'
import { buscar, deletar } from '../../../services/Service'
import { ToastAlerta } from '../../../util/ToastAlerta'

function DeletarPostagem() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    const { id } = useParams<{ id: string }>()
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token },
            })
        } catch (error: any) {
            if (error.toString().includes('401')) handleLogout()
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', 'info')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) buscarPorId(id)
    }, [id])

    async function deletarPostagem() {
        setIsLoading(true)
        try {
            await deletar(`/postagens/${id}`, {
                headers: { Authorization: token },
            })
            ToastAlerta('Postagem apagada com sucesso', 'sucesso')
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao deletar a postagem.', 'erro')
            }
        }
        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate('/postagens')
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
                    Deletar Post
                </h1>

                <p className="text-center text-gray-400 text-sm mb-5">
                    Tem certeza que deseja apagar esta postagem?
                </p>

                <div className="bg-pink-500/5 border border-pink-400/20 rounded-xl p-4 mb-6">
                    <h2 className="text-lg font-semibold text-pink-400 mb-2">
                        {postagem.titulo}
                    </h2>
                    <p className="text-gray-300 text-sm">
                        {postagem.texto}
                    </p>
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
                        onClick={deletarPostagem}
                        className="w-full py-2 rounded-lg bg-linear-to-r 
                            from-pink-500 to-pink-400 hover:from-pink-400 
                            hover:to-pink-500 text-white font-semibold 
                            flex justify-center items-center"
                    >
                        {isLoading ? <ClipLoader color="#fff" size={20} /> : 'Deletar'}
                    </motion.button>
                </div>
            </motion.div>
        </section>
    )
}

export default DeletarPostagem