import { Link } from 'react-router-dom'
import type Postagem from '../../../models/Postagem'

interface CardPostagemProps {
    postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagemProps) {
    return (
        <div className='border-pink-400 border 
            flex flex-col rounded-lg overflow-hidden justify-between'>
                
            <div className="">
                <div className="flex w-full bg-pink-600 py-2 px-4 items-center gap-4">
                    <img src={postagem.usuario?.foto}
                        className='h-12 rounded-full' alt={postagem.usuario?.nome} />
                    <h3 className='text-lg font-bold text-center uppercase'>
                        {postagem.usuario?.nome}
                    </h3>
                </div>
                <div className='p-4 bg-[#0F172A] text-pink-100'>
                    <h4 className='text-lg font-semibold uppercase text-pink-500'>{postagem.titulo}</h4>
                    <p>{postagem.texto}</p>
                    <p>Tema: {postagem.tema?.descricao}</p>
                    <p>{new Intl.DateTimeFormat("pt-BR", {
                        dateStyle: 'full',
                        timeStyle: 'medium',
                    }).format(new Date(postagem.data))}</p>
                </div>
            </div>
            <div className="flex">
                <Link to={`/editarpostagem/${postagem.id}`} className='w-full text-white bg-[#0F172A] border 
                    border-pink-400 hover:bg-pink-600 flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>
                <Link to='' className='text-white bg-[#0F172A] border border-pink-400
                    hover:bg-red-700 w-full flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardPostagem