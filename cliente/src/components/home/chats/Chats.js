import React, {useContext, useEffect, useState} from 'react';
import Chat from './Chat';
import NuevoChat from './NuevoChat';
import chatsContext from '../../../context/chats/chatsContext';
import authContext from '../../../context/auth/authContext';
import msgIcon from '../../../msg.svg';


const Chats = props => {

    const authContextContent = useContext(authContext);

    const { servidorNull, usuario, cerrarSesion, cambiarFoto, respuestaServidor } = authContextContent;
    
    const { chats, obtenerChats} = useContext(chatsContext);
    
    const { nombre, apellido, foto } = usuario;

    const [verAlerta, setverAlerta] = useState(null);

    useEffect(() => {
        
       
        if(respuestaServidor) {setverAlerta(respuestaServidor)}else{setverAlerta(null)};
        obtenerChats();
        
        setTimeout(() => {
            servidorNull();
        }, 3000);
        
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
        
    }

    const handleCerrarSesion = () => {
        cerrarSesion();
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

                {verAlerta 
                    ? 
                        <div className={verAlerta.tipo}>
                                <p>{verAlerta.detalles[0].msg}</p>
                        </div>
                    :null
                } 
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