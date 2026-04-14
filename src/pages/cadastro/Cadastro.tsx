import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import type Usuario from "../../models/Usuario";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";
import { ToastAlerta } from "../../util/ToastAlerta";
import imgcadastro from "../../assets/img/imgcadastro.png"
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { cadastrarUsuario } from "../../services/Service";


function Cadastro() {

    // Objeto responsável por redirecionar o usuário para uma outra rota
    const navigate = useNavigate();

    // Estado para controlar o Loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Estado para confirmar a senha digitada pelo usuário
    const [confirmarSenha, setConfirmarSenha] = useState<string>("");

    // Estado usuario para armazenar os dados do usuário que será cadastrado
    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: ""
    })

    const emailValido = usuario.usuario?.includes('@') && usuario.usuario?.includes('.')
    const senhasIguais = usuario.senha === confirmarSenha

    // Função de atualização do estado usuario
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    // Função de atualização do estado confirmarSenha
    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    // Função para enviar os dados para o Backend (Submit)
    async function cadastrarNovoUsuario(e: SyntheticEvent<HTMLFormElement>) {

        e.preventDefault();

        setIsLoading(true);

        if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {

            try {

                await cadastrarUsuario('/usuarios/cadastrar', usuario, setUsuario);

                ToastAlerta('Usuário Cadastrado com sucesso!', 'sucesso');

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                ToastAlerta('Erro ao cadastrar o usuário!', 'erro');
            }

        } else {
            ToastAlerta('Dados do usuário estão inconsistentes!', 'erro');
            setUsuario({
                ...usuario,
                senha: ''
            });
            setConfirmarSenha('');
        }

        setIsLoading(false)
    }

    function retornar() {
        navigate("/")
    }

    // useEffect que vai controlar o redirecionamento para a página de logina
    // caso o cadastro seja bem sucedido
    useEffect(() => {
        if (usuario.id !== 0) {
            retornar()
        }
    }, [usuario])

    console.log(JSON.stringify(usuario));
    console.log(confirmarSenha);

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-[#0F172A]">

                <div
                    className="hidden lg:block bg-cover bg-center"
                    style={{ backgroundImage: `url(${imgcadastro})` }}
                />

                <div className="flex justify-center items-center px-6">

                    <motion.form
                        onSubmit={cadastrarNovoUsuario}

                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}

                        className="w-full max-w-md flex flex-col gap-4 
                            bg-white/5 backdrop-blur-lg border border-white/10 
                            rounded-2xl p-6 shadow-md text-pink-100"
                    >

                        <h2 className="text-4xl text-center font-bold 
                            bg-linear-to-t from-pink-300 to-pink-500 
                            bg-clip-text text-transparent">
                            Cadastrar
                        </h2>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-gray-400">Nome</label>
                            <input
                                type="text"
                                name="nome"
                                value={usuario.nome}
                                onChange={atualizarEstado}
                                placeholder="Digite seu nome"
                                className="border border-pink-400 rounded-lg px-2 py-2 
                                    bg-transparent text-pink-100 outline-none
                                    focus:border-pink-500 focus:shadow-[0_0_10px_rgba(255,111,145,0.3)]"
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

                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-gray-400">E-mail</label>
                            <input
                                type="text"
                                name="usuario"
                                value={usuario.usuario}
                                onChange={atualizarEstado}
                                placeholder="Digite seu email"
                                className="border border-pink-400 rounded-lg px-2 py-2 
                                    bg-transparent text-pink-100 outline-none
                                    focus:border-pink-500 focus:shadow-[0_0_10px_rgba(255,111,145,0.3)]"
                            />

                            {usuario.usuario?.length > 0 && !emailValido && (
                                <span className="text-red-400 text-xs flex items-center gap-2">
                                    <FaExclamationTriangle size={16} /> Digite um e-mail válido
                                </span>
                            )}

                            {emailValido && (
                                <span className="text-green-400 text-xs flex items-center gap-2">
                                    <FaCheck size={16} /> E-mail válido
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-gray-400">Foto</label>
                            <input
                                type="text"
                                name="foto"
                                value={usuario.foto}
                                onChange={atualizarEstado}
                                placeholder="URL da sua foto"
                                className="border border-pink-400 rounded-lg px-2 py-2 
                                    bg-transparent text-pink-100 outline-none
                                    focus:border-pink-500 focus:shadow-[0_0_10px_rgba(255,111,145,0.3)]"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-gray-400">Senha</label>
                            <input
                                type="password"
                                name="senha"
                                value={usuario.senha}
                                onChange={atualizarEstado}
                                placeholder="Digite sua senha"
                                className="border border-pink-400 rounded-lg px-2 py-2 
                                    bg-transparent text-pink-100 outline-none
                                    focus:border-pink-500 focus:shadow-[0_0_10px_rgba(255,111,145,0.3)]"
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

                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-gray-400">Confirmar Senha</label>
                            <input
                                type="password"
                                value={confirmarSenha}
                                onChange={handleConfirmarSenha}
                                placeholder="Confirme sua senha"
                                className="border border-pink-400 rounded-lg px-2 py-2 
                                    bg-transparent text-pink-100 outline-none
                                    focus:border-pink-500 focus:shadow-[0_0_10px_rgba(255,111,145,0.3)]"
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

                        <div className="flex gap-4 mt-2">

                            <button
                                type="button"
                                onClick={retornar}
                                className="w-1/2 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
                            >
                                Cancelar
                            </button>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}

                                className="w-1/2 py-2 rounded-lg 
                                    bg-linear-to-r from-pink-500 to-pink-400 
                                    hover:from-pink-400 hover:to-pink-500 
                                    text-white font-semibold flex justify-center items-center"
                            >
                                {isLoading ? (
                                    <ClipLoader color="#fff" size={20} />
                                ) : (
                                    "Cadastrar"
                                )}
                            </motion.button>
                        </div>
                    </motion.form>
                </div>
            </div>
        </>
    )
}

export default Cadastro