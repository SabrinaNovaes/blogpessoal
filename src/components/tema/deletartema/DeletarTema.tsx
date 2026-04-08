/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";

function DeletarTema() {

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
            alert('Você precisa estar logado!');
            navigate('/')
        }
    }, [token])

    // Cria um useEffect para monitorar o id (rota)
    useEffect(() => {
        if (id !== undefined) {
            buscarTemaPorId();
        }
    }, [id])

    function retornar() {
        navigate('/temas');
    }

    async function deletarTema() {

        setIsLoading(true);

        try {

            await deletar(`/temas/${id}`, {
                headers: { Authorization: token }
            });

            alert('Tema deletado com sucesso!')

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            }
        }

        setIsLoading(false);
        retornar()

    }

    return (
        <div className='container w-1/3 mx-auto bg-[#0F172A] text-pink-100'>
            <h1 className='text-4xl text-center text-pink-500 pt-40 mb-8'>Deletar Tema</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o tema a seguir?
            </p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header
                    className='py-2 px-6 bg-pink-600 text-white font-bold text-2xl text-center font-poppins'>
                    Tema
                </header>
                <p className='p-8 text-3xl bg-white/10 backdrop-blur-lg border border-white/10 h-full'>{tema.descricao}</p>
                <div className="flex">
                    <button
                        className='bg-[#0F172A] hover:bg-pink-600  text-pink-100
                    cursor-pointer w-full py-2'
                        onClick={retornar}
                    >
                        Não
                    </button>
                    <button
                        className='w-full text-pink-100 cursor-pointer bg-[#0F172A] hover:bg-red-700'
                        onClick={deletarTema}
                    >
                        {
                            isLoading ?
                                <ClipLoader
                                    color="#ffffff"
                                    size={24}
                                />
                                :
                                <span>Sim</span>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeletarTema