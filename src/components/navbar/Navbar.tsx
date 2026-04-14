import { useState, useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { ToastAlerta } from "../../util/ToastAlerta";
import { FaCircleUser } from "react-icons/fa6";

function Navbar() {
    const navigate = useNavigate();
    const { handleLogout, usuario } = useContext(AuthContext);
    const [menuAberto, setMenuAberto] = useState(false);

    function logout() {
        handleLogout();
        ToastAlerta("O usuário foi deslogado com sucesso!", "sucesso");
        navigate("/");
    }

    const linkClasses = "hover:text-pink-400 hover:drop-shadow-lg hover:drop-shadow-pink-300 transition-colors duration-150";

    let component: ReactNode;

    if (usuario.token !== "") {
        component = (
            <div className="fixed w-full z-50 px-4 mt-3">
                <div className="flex items-center justify-between max-w-6xl mx-auto px-6 py-3
                    rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-sm shadow-pink-300">

                    <Link to="/home" className="text-4xl font-bold font-serif leading-tight bg-linear-to-t
                        from-pink-300 to-pink-500 bg-clip-text text-transparent hover:scale-102
                        transition-transform duration-90">
                        Dev Diaries
                    </Link>

                    <div className="hidden md:flex items-center gap-6 text-pink-100">
                        <Link to="/home" className={`text-base ${linkClasses}`}>Home</Link>
                        <Link to="/postagens" className={`text-base ${linkClasses}`}>Postagens</Link>
                        <Link to="/temas" className={`text-base ${linkClasses}`}>Temas</Link>
                        <Link to="/cadastrartema" className={`text-base ${linkClasses}`}>Novo Tema</Link>
                        <Link to="/perfil" className={`text-base flex items-center gap-2 ${linkClasses}`}>
                            <FaCircleUser size={22} />Perfil
                        </Link>
                        <Link to="" onClick={logout} className={`text-base flex items-center gap-2 ${linkClasses}`}>
                            <FiLogOut size={22} />Logout
                        </Link>
                    </div>

                    <button
                        className="md:hidden text-pink-100 hover:text-pink-400 transition-colors duration-150"
                        onClick={() => setMenuAberto(!menuAberto)}
                        aria-label="Abrir menu"
                    >
                        {menuAberto ? <FiX size={28} /> : <FiMenu size={28} />}
                    </button>
                </div>

                {menuAberto && (
                    <div className="md:hidden mt-2 max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4
                        rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-sm shadow-pink-300
                        text-pink-100">
                        <Link to="/home" onClick={() => setMenuAberto(false)} className={`text-xl ${linkClasses}`}>Home</Link>
                        <Link to="/postagens" onClick={() => setMenuAberto(false)} className={`text-xl ${linkClasses}`}>Postagens</Link>
                        <Link to="/temas" onClick={() => setMenuAberto(false)} className={`text-xl ${linkClasses}`}>Temas</Link>
                        <Link to="/cadastrartema" onClick={() => setMenuAberto(false)} className={`text-xl ${linkClasses}`}>Novo Tema</Link>
                        <Link to="/perfil" onClick={() => setMenuAberto(false)} className={`text-xl flex items-center gap-2 ${linkClasses}`}>
                            <FaCircleUser size={26} />Perfil
                        </Link>
                        <Link to="" onClick={() => { logout(); setMenuAberto(false); }} className={`text-xl flex items-center gap-2 ${linkClasses}`}>
                            <FiLogOut size={22} />Logout
                        </Link>
                    </div>
                )}
            </div>
        );
    }

    return <>{component}</>;
}

export default Navbar;
