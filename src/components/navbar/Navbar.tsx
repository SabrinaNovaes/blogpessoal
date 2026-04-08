import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { PiUserCircleDuotone } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";

function Navbar() {
    const navigate = useNavigate();
    const { handleLogout } = useContext(AuthContext);

    function logout() {
        handleLogout();
        alert("O usuário foi deslogado com sucesso!");
        navigate("/");
    }

    return (
        <div className="fixed w-full z-50 px-4 mt-3">
            <div className="flex items-center text-center justify-between max-w-6xl mx-auto px-6 py-3
                rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-sm shadow-pink-300">

                <Link to="/home" className="text-5xl font-bold font-serif leading-tight bg-linear-to-t from-pink-300
                    to-pink-500 bg-clip-text text-transparent hover:scale-102 transition-transform
                    duration-90">Dev Diaries
                </Link>

                <div className="flex items-center gap-6 text-pink-100">
                    <Link to="/home" className="text-xl hover:text-pink-400 hover:border-pink-400 
                        hover:drop-shadow-lg hover:drop-shadow-pink-300">Home</Link>
                    <Link to="/home" className="text-xl hover:text-pink-400 hover:border-pink-400 
                        hover:drop-shadow-lg hover:drop-shadow-pink-300">Postagens</Link>
                    <Link to="/temas" className="text-xl hover:text-pink-400 hover:border-pink-400 
                        hover:drop-shadow-lg hover:drop-shadow-pink-300">Temas</Link>
                    <Link to="/cadastrartema" className="text-xl hover:text-pink-400 hover:border-pink-400 
                        hover:drop-shadow-lg hover:drop-shadow-pink-300">Novo Tema</Link>
                    <Link to="/login" className="text-xl flex items-center gap-2 hover:text-pink-400 hover:border-pink-400 
                        hover:drop-shadow-lg hover:drop-shadow-pink-300">
                        <PiUserCircleDuotone size={30} />Login
                    </Link>
                    <Link to="" onClick={logout} className="text-xl flex items-center gap-2 hover:text-pink-400 hover:border-pink-400 
                        hover:drop-shadow-lg hover:drop-shadow-pink-300">
                        <FiLogOut size={26} />Logout
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default Navbar;
