import { Link } from 'react-router-dom'
import type Postagem from '../../../models/Postagem'
import { BsPencil } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'

interface CardPostagemProps {
    postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagemProps) {

    return (
        <div className="bg-[#1E293B] rounded-2xl overflow-hidden shadow-md 
        hover:shadow-pink-500/10 transition h-full flex flex-col">

            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                <img
                    src={postagem.usuario?.foto}
                    className="h-10 w-10 rounded-full object-cover"
                    alt={postagem.usuario?.nome}
                />

                <div className="flex flex-col">
                    <h3 className="text-sm font-semibold text-white">
                        {postagem.usuario?.nome}
                    </h3>
                    <span className="text-xs text-gray-400">
                        {new Intl.DateTimeFormat("pt-BR", {
                            dateStyle: "medium",
                            timeStyle: "short",
                        }).format(new Date(postagem.data))}
                    </span>
                </div>
            </div>

            <div className="p-4 text-pink-100 flex flex-col flex-1 gap-2">

                <h4 className="text-lg font-bold text-pink-400 h-12 line-clamp-2">
                    {postagem.titulo}
                </h4>

                <p className="text-gray-300 h-20 line-clamp-3">
                    {postagem.texto}
                </p>

                <span className="text-xs text-pink-300 bg-pink-500/10 px-2 py-1 rounded-full w-fit">
                    #{postagem.tema?.descricao}
                </span>
            </div>

            <div className="flex justify-end items-center px-4 py-3 border-t border-white/10 text-sm">
                <div className="flex gap-3">
                    <Link to={`/editarpostagem/${postagem.id}`} className="hover:text-yellow-400 text-pink-300">
                        <BsPencil size={20} />
                    </Link>

                    <Link to="" className="hover:text-red-500 text-pink-300">
                        <FaTrash size={20} />
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default CardPostagem