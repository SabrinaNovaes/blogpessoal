import { Link } from 'react-router-dom'
import type Tema from '../../../models/Tema'
import { BsPencil } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'

interface CardTemaProps {
  tema: Tema
}

function CardTema({ tema }: CardTemaProps) {
  return (
    <div className="bg-[#1E293B] rounded-2xl overflow-hidden shadow-md hover:shadow-pink-500/10
    transition flex flex-col justify-between">

      <div className="px-4 py-3 border-b border-white/10">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
          Tema
        </h3>
      </div>

      <div className="p-4 flex-1 flex items-center justify-center">
        <span className="text-lg font-bold text-pink-400 text-center">
          #{tema.descricao}
        </span>
      </div>

      <div className="flex justify-between items-center px-4 py-3 border-t border-white/10 text-sm">

        <Link to={`/editartema/${tema.id}`} className="hover:text-yellow-400 text-pink-300">
            <BsPencil size={20} />
        </Link>

        <Link to={`/deletartema/${tema.id}`} className="hover:text-red-500 text-pink-300">
            <FaTrash size={20} />
        </Link>

      </div>

    </div>
  )
}

export default CardTema