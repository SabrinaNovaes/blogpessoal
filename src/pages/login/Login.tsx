import { useContext, useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type UsuarioLogin from "../../models/UsuarioLogin";
import { AuthContext } from "../../contexts/AuthContext";
import { ClipLoader } from "react-spinners";
import imglogin from "../../assets/img/imglogin.png"
import { motion } from "framer-motion";


function Login() {

    // Objeto responsável por redirecionar o usuário para uma outra rota
    const navigate = useNavigate();

    // Estado usuario, que vai guardar os dados do usuário que será autenticado
    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);

    // Consumo do Contexto AuthContext 
    // usamos a desestruturação para selecionar apenas o que precisamos
    const { usuario, handleLogin, isLoading } = useContext(AuthContext);

    useEffect(() => {
        if (usuario.token !== "") {
            navigate("/home")
        }
    }, [usuario])

    // Função de atualização do estado usuario
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        handleLogin(usuarioLogin);
    }

    console.log(JSON.stringify(usuarioLogin));

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-[#0F172A]">

                <div className="flex justify-center items-center px-6">

                    <motion.form
                        onSubmit={login}

                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}

                        className="w-full max-w-md flex flex-col gap-5 
                            bg-white/5 backdrop-blur-lg border border-white/10 
                            rounded-2xl p-6 shadow-md text-pink-100"
                    >

                        <h2 className="text-4xl text-center font-bold 
                            bg-linear-to-t from-pink-300 to-pink-500 
                            bg-clip-text text-transparent">
                            Entrar
                        </h2>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-gray-400">E-mail</label>
                            <input
                                type="text"
                                name="usuario"
                                value={usuarioLogin.usuario}
                                onChange={atualizarEstado}
                                placeholder="Digite seu email"
                                className="border border-pink-400 rounded-lg px-2 py-2 
                                    bg-transparent outline-none text-pink-100
                                    focus:border-pink-500 focus:shadow-[0_0_10px_rgba(255,111,145,0.3)]"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-gray-400">Senha</label>
                            <input
                                type="password"
                                name="senha"
                                value={usuarioLogin.senha}
                                onChange={atualizarEstado}
                                placeholder="Digite sua senha"
                                className="border border-pink-400 rounded-lg px-2 py-2 
                                    bg-transparent outline-none text-pink-100
                                    focus:border-pink-500 focus:shadow-[0_0_10px_rgba(255,111,145,0.3)]"
                            />
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}

                            className="mt-2 py-2 rounded-lg 
                                bg-linear-to-r from-pink-500 to-pink-400 
                                hover:from-pink-400 hover:to-pink-500 
                                text-white font-semibold flex justify-center items-center"
                        >
                            {isLoading ? (
                                <ClipLoader color="#fff" size={20} />
                            ) : (
                                "Entrar"
                            )}
                        </motion.button>

                        <div className="flex items-center gap-2 my-2">
                            <div className="flex-1 h-px bg-white/10"></div>
                            <span className="text-xs text-gray-500">ou</span>
                            <div className="flex-1 h-px bg-white/10"></div>
                        </div>

                        <p className="text-sm text-center text-gray-400">
                            Ainda não tem uma conta?{" "}
                            <Link to="/cadastro" className="text-pink-400 hover:underline">
                                Cadastre-se
                            </Link>
                        </p>

                    </motion.form>
                </div>

                <div
                    className="hidden lg:block bg-cover bg-center"
                    style={{ backgroundImage: `url(${imglogin})` }}
                />

            </div>
        </>
    );
}

export default Login;