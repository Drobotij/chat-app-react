import React, {useContext, useEffect} from 'react';
import Chat from './Chat';
import NuevoChat from './NuevoChat';
import chatsContext from '../../../context/chats/chatsContext';
import authContext from '../../../context/auth/authContext';
import msgIcon from '../../../msg.svg';

const Chats = () => {

    const authContextContent = useContext(authContext);
    const { usuario, cerrarSesion, cambiarFoto } = authContextContent;
    
    const { chats, obtenerChats, respuestaServidor} = useContext(chatsContext)
    
    const { nombre, apellido, foto } = usuario;

    useEffect(() => {
        
        obtenerChats();
        
    }, [respuestaServidor])

    
     // Cambiar foto perfil
     const handleChangeFoto = e =>{

        const foto = document.querySelector('#foto');
        const extPermitidas = /(.jpg|.JPG|.png|.PNG|.jpeg|.JPEG)$/i;

        // Chekea que sea archivo jpg o png
        if(!extPermitidas.test(foto.value)) {
            
            foto.value = '';

            return;
        }

        let formData = new FormData();
        formData.append('foto', foto.files[0]);

        // Cambia la foto
        cambiarFoto(formData);
        window.location.reload();
    }

    const handleCerrarSesion = ()=> {
        cerrarSesion();
        window.location.reload();
    }

  

    return (
        <aside className="chats">
            <div className="contenedor">
                
                <div className="info-usuario">

                    <div className="foto-perfil-contenedor">
                        <div className="foto-perfil">
                            <img id="fotoPerfil" src={foto} alt={`${nombre} ${apellido}`}/>
                        </div>
                        <div className="cambiar-foto">
                            <input 
                                type="file" 
                                onChange={handleChangeFoto}
                                id="foto"
                            />
                            <p className="btn boton-chat">Cambiar foto</p>
                        </div>

                    </div>
                    
                    
                    <div className="datos-perfil">

                        <h4>{`${nombre} ${apellido}`}</h4>

                        <button
                            type="button"
                            className="btn btn-primary btn-inline-block"
                            onClick={handleCerrarSesion}
                        >
                            Cerrar sesion
                        </button>
                    </div>
                </div>

                <NuevoChat />
                {chats
                    ? 
                    chats.map(chat => (

                        <Chat 
                            key={chat._id}
                            chat={chat}
                            
                        />

                    ))
                    :
                    (<div className="no-chat">
                        <img src={msgIcon} alt="msg" />
                        <p>No tiene ningun chat. Comienza buscando a una persona en el campo de arriba</p>
                    </div>
                    )
                }
            </div>
        </aside>
    );
}
 
export default Chats;