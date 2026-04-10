import Popup from 'reactjs-popup'
import FormPostagem from '../formpostagem/FormPostagem'
import { BsPencil } from 'react-icons/bs'

function ModalPostagem() {
    return (
        <>
            <Popup trigger={
                <button className="flex rounded-lg p-5 gap-2 justify-center border-2 border-pink-500
                    w-40 h-10 text-center items-center cursor-pointer hover:transition-transform
                    duration-90 hover:scale-102 bg-linear-to-t from-pink-600 to-pink-800">Novo Post<BsPencil size={22} /></button>
            }
                modal contentStyle={{

                }}>
                <FormPostagem />
            </Popup>
        </>
    )
}

export default ModalPostagem