import { useContext, useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type UsuarioLogin from "../../models/UsuarioLogin";
import { AuthContext } from "../../contexts/AuthContext";
import { ClipLoader } from "react-spinners";


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
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center bg-[#0F172A]">
                <form className="flex justify-center items-center flex-col w-1/2 gap-4 text-pink-100"
                    onSubmit={login}
                >
                    <h2 className="bg-linear-to-t from-pink-300 to-pink-500 bg-clip-text text-transparent 
                        font-serif font-bold text-5xl leading-tight">Entrar</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario" className="px-1">Usuário</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className="border-2 border-pink-400 rounded-lg h-10 p-2 hover:border-pink-300
                            hover:shadow-sm shadow-pink-300"
                            value={usuarioLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="senha" className="px-1">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="border-2 border-pink-400 rounded-lg h-10 p-2 hover:border-pink-400 hover:shadow-sm shadow-pink-300"
                            value={usuarioLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <button
                        type='submit'
                        className="rounded-lg bg-pink-600 hover:bg-pink-800to-pink-800  text-pink-100
                                border-pink-900 border-solid border px-4 cursor-pointer w-1/2 py-2">
                        {
                            isLoading ?

                                <ClipLoader
                                    color="#ffffff"
                                    size={24}
                                />

                                :

                                <span>Entrar</span>

                        }
                    </button>

                    <hr className="border-slate-800 w-full" />
                    <p>Ainda não tem uma conta?{' '}<Link to="/cadastro" className="text-pink-500 hover:underline">
                    Cadastre-se</Link></p>
                </form>
                <div className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat 
                    w-full min-h-screen bg-cover bg-center">
                </div>
            </div>
        </>
    );
}

export default Login;