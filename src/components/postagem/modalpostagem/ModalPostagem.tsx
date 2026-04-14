import Popup from 'reactjs-popup'
import FormPostagem from '../formpostagem/FormPostagem'
import { GrAddCircle } from 'react-icons/gr'

function ModalPostagem() {
    return (
        <>
            <Popup trigger={
                <button
                    className="bg-linear-to-r from-pink-500 to-pink-400 
                    hover:from-pink-400 hover:to-pink-500 text-white font-semi bold px-6 py-3 rounded-xl 
                    shadow-md hover:shadow-pink-500/30 transition-all duration-300 
                    ease-in-out hover:scale-105 flex items-center justify-center gap-2" >
                            <GrAddCircle size={20} />Novo Post
                </button>
            }
                modal contentStyle={{ 
                }}>
                <FormPostagem />
            </Popup>
        </>
    )
}

export default ModalPostagem