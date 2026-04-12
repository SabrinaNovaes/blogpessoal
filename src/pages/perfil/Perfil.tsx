/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { BsPencil } from "react-icons/bs";
import { ToastAlerta } from "../../util/ToastAlerta";
import type Postagem from "../../models/Postagem";
import { buscar } from "../../services/Service";
import CardPostagem from "../../components/postagem/cardpostagem/CardPostagem";

function Perfil() {
    const navigate = useNavigate();

    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

    const [postagens, setPostagens] = useState<Postagem[]>([]);

    const minhasPostagens = postagens.filter(
        (post) => post.usuario?.id === usuario.id
    );

    async function buscarPostagens() {
        try {
            await buscar("/postagens", setPostagens, {
                headers: {
                    Authorization: token,
                },
            });
        } catch (error) {
            ToastAlerta("Erro ao buscar postagens", "erro");
        }
    }

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", "erro");
            navigate("/");
        } else {
            buscarPostagens();
        }
    }, [token]);

    return (
        <div className="flex justify-center px-4 bg-[#0F172A] min-h-screen pt-32">
            <div className="w-full max-w-3xl rounded-2xl overflow-hidden">

                <div className="relative">
                    <img
                        className="w-full h-60 object-cover"
                        src="https://i.imgur.com/ZZFAmzo.jpg"
                        alt="Capa do Perfil"
                    />

                    <div className="absolute inset-0 bg-[#0F172A]/40"></div>
                </div>

                <div className="flex justify-center">
                    <img
                        className="rounded-full w-40 h-40 object-cover -mt-20 border-4 border-pink-500 shadow-lg z-10"
                        src={usuario.foto}
                        alt={`Foto de ${usuario.nome}`}
                    />
                </div>

                <div
                    className="mt-6 bg-white/5 backdrop-blur-lg border border-white/10 
                    rounded-2xl p-6 text-center text-pink-100 shadow-md"
                >
                    <h2 className="text-2xl font-bold text-pink-400 mb-2">
                        {usuario.nome}
                    </h2>

                    <p className="text-gray-400 mb-6">{usuario.usuario}</p>

                    <Link to={`/atualizarusuario`}>
                        <button
                            className="bg-linear-to-r from-pink-500 to-pink-400 
                            hover:from-pink-400 hover:to-pink-500 
                            text-white font-semibold px-6 py-3 rounded-xl 
                            shadow-md hover:shadow-pink-500/30 
                            transition-all duration-300 
                            ease-in-out hover:scale-105 flex items-center justify-center gap-2 mx-auto"
                        >
                            <BsPencil size={20} /> Editar Perfil
                        </button>
                    </Link>
                </div>
                <div className="flex flex-col justify-between mt-10">

                    <h3 className="text-2xl font-bold text-pink-400 mb-6 text-center">
                        Minhas Postagens
                    </h3>

                    {minhasPostagens.length === 0 ? (
                        <p className="text-center text-gray-400">
                            Você ainda não fez nenhuma postagem 😢
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {minhasPostagens.map((postagem) => (
                                <CardPostagem key={postagem.id} postagem={postagem} />
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Perfil;
