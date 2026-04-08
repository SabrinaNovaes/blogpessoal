import { Link } from 'react-router-dom'
import type Tema from '../../../models/Tema'

interface CardTemaProps {
  tema: Tema
}

function CardTema({ tema }: CardTemaProps) {
  return (
    <div className='border border-pink-400 flex flex-col rounded-2xl overflow-hidden justify-between text-pink-100'>
      <header className='py-2 px-6 bg-pink-600 font-poppins font-bold text-2xl text-center'>
        Tema
      </header>
      <p className='p-8 text-3xl bg-white/10 backdrop-blur-lg border border-white/10 h-full'>{tema.descricao}</p>

      <div className="flex">
        <Link to={`/editartema/${tema.id}`}
          className='w-full bg-[#0F172A] hover:bg-pink-600  text-pink-100
                      cursor-pointer flex items-center justify-center py-2'>
          <button>Editar</button>
        </Link>

        <Link to={`/deletartema/${tema.id}`}
          className='text-pink-100 cursor-pointer bg-[#0F172A] hover:bg-red-700 w-full 
                  items-center justify-center py-2 text-center'>
          <button>Deletar</button>
        </Link>
      </div>

    </div>
  )
}

export default CardTema