import React, { useContext, useEffect, useState, lazy, Suspense } from 'react';
import Chats from './chats/Chats';
//import Mensajes from './mensajes/Mensajes';
import msg from '../../msg.svg';
import chatsContext from '../../context/chats/chatsContext';
import io from 'socket.io-client';
import authContext from '../../context/auth/authContext';

const Mensajes = lazy(() => import('./mensajes/Mensajes'));

const Home = () => {

    const { chatActual, obtenerDatosOtroUsuario } = useContext(chatsContext);
    const [ otroUsuario, setOtroUsuario ] = useState(null)
    const { usuario } = useContext(authContext);
    const [ socket, setSocket ] = useState(io("http://localhost:4000/"))

    useEffect( async () => {
        
        if(!chatActual) return;
        var result = await obtenerDatosOtroUsuario(chatActual[0]._id);
        setOtroUsuario(result);
        
    }, [chatActual]);

    useEffect(() => {
        socket.emit('nuevo usuario', usuario._id);    
    }, []);
    

    return ( 
        <div className='home'>
            <Chats />
            <Suspense fallback={
                <div className="no-chat-seleccionado">
                    <p>Cargando..</p>
                </div>
            }>
                {
                    otroUsuario ? 
                        (
                            <Mensajes 
                                otroUsuario={otroUsuario}
                                setOtroUsuario={setOtroUsuario}
                                socket={socket}
                            />
                        )
                    :   (

                            <main className="mensajes">

                                <div className="no-chat-seleccionado">
                                    <img src={msg} alt="No chat" />
                                    <p>Seleccione un chat</p>
                                </div>
                        
                            </main>

                        )
                }
            </Suspense>
        </div>

    );
}
 
export default Home;