import Popup from 'reactjs-popup'
import FormTema from '../formtema/FormTema.tsx'
import { GrAddCircle } from 'react-icons/gr'

function ModalTema() {
    return (
        <>
            <Popup trigger={
                <button
                    className="bg-linear-to-r from-pink-500 to-pink-400 
                    hover:from-pink-400 hover:to-pink-500 text-white font-semi bold px-6 py-3 rounded-xl 
                    shadow-md hover:shadow-pink-500/30 transition-all duration-300 
                    ease-in-out hover:scale-105 flex items-center justify-center gap-2" >
                            <GrAddCircle size={20} /> Tema
                </button>
            }
                modal contentStyle={{ 
                }}>
                <FormTema/>
            </Popup>
        </>
    )
}

export default ModalTema