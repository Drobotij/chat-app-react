import React, {useContext, useEffect, useState} from 'react';
import chatsContext from '../../../context/chats/chatsContext';


const Chat = ({chat}) => {

    const { setChatActual, obtenerDatosOtroUsuario } = useContext(chatsContext)
    const [segundoUsuario, setSegundoUsuario] = useState(null);

    useEffect(async () => {

        var segundoUsuario = await obtenerDatosOtroUsuario(chat._id);
        setSegundoUsuario(segundoUsuario);
    
    },[]);
    
    const verChat = () =>{

        setChatActual(chat._id);

        if(window.screen.width < 768){

            const pantalla = document.querySelector('.home');

            pantalla.classList.toggle('translate');
            
        }

    }

    return (
        <button
                type="button"
                className="btn boton-chat"
                onClick={verChat}
            >
                {

                    segundoUsuario ? 
                        (   <>
                            <div className="foto-perfil">
                                <img src={segundoUsuario.foto} alt={`${segundoUsuario.nombre} ${segundoUsuario.apellido}`} />
                            </div>
                            <div className="datos-perfil">
                                <h4>{`${segundoUsuario.nombre} ${segundoUsuario.apellido}`}</h4>
                                
                            </div>
                            </>
                        )
                    : 
                    (
                        <div>
                            <p>Cargando...</p>
                        </div>
                    )

                }
                 
            </button>
    );
}
 
export default Chat;

