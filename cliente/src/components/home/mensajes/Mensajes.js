import React, { useContext, useState, useEffect} from 'react';
import backArrow from '../../../backArrow.svg';

import chatsContext from '../../../context/chats/chatsContext';
import mensajesContext from '../../../context/mensajesTexto/mensajesContext';

import Mensaje from './Mensaje';

const Mensajes = ({otroUsuario,setOtroUsuario, socket}) => {
    
    const { mensajes ,CrearMensaje, obtenerMensajes, mensajesNull } = useContext(mensajesContext);
    const [nuevoMensaje, setNuevoMensaje] = useState('');
   

    const {nombre, apellido, foto, _id} = otroUsuario;
     
    const { setChatActualNull, chatActual } = useContext(chatsContext);

    useEffect(() =>  {

        
        if(!chatActual) return;
       
        obtenerMensajes(chatActual[0]._id);
        scrollDown();

    }, [chatActual]);

    
    const scrollDown = () => {
        const contenedor = document.querySelector('.contenedor-mensajes');
        contenedor.scroll(0, contenedor.scrollHeight);
    
    }   

    const volver = () =>{

        if(window.screen.width < 768){
            const pantalla = document.querySelector('.home');
            setChatActualNull();
            setOtroUsuario(null);
            mensajesNull();
            pantalla.classList.toggle('translate');
            
        }

    }

    const handleChange = e => {
        setNuevoMensaje(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        // Validar que el mensaje no este vacio
        if(nuevoMensaje.trim().length === 0) return;
        
        CrearMensaje(chatActual[0]._id, nuevoMensaje);
        socket.emit('nuevo mensaje', _id, chatActual[0]._id);
        setNuevoMensaje('');
        scrollDown();
       
    }
    
    

    socket.on('obtener mensajes', idChat => {
        
        if(chatActual[0]._id == idChat){

            obtenerMensajes(chatActual[0]._id);
            scrollDown();
        
        }
    
    });

    

    return (
        <main className="mensajes">

            

            <header>
                <div className="contenedor">
                    {

                        window.screen.width < 768 ?
                        (   <button
                                type="button"
                                className="btn-simple"
                                onClick={volver}
                            >
                                <img src={backArrow} alt="back arrow" />
                            </button>
                        ) :null

                    }
                    
                    <div>
                        <img src={foto} alt={nombre} />
                        <h3>{nombre} {apellido}</h3>
                    </div>
                </div>
            </header>
            <div className="contenedor">
                <div className="contenedor-mensajes">
                    
                    {
                        mensajes ? 
                            mensajes.map(mensaje => (
                                <Mensaje 
                                    key={mensaje._id}
                                    datos={mensaje}
                                />
                            ))
                        : null
                    }
                    
                </div>

                <form
                    onSubmit={handleSubmit}
                >
                    <input 
                        type="text"
                        className="campo-form"
                        name="mensaje"
                        placeholder="Ingrese mensaje aquí.."
                        autoComplete="off"
                        value={nuevoMensaje}
                        onChange={handleChange}
                    />
                    <input 
                        type="submit"
                        value="Enviar"
                        className="btn btn-primary btn-inline-block"
                        
                    />
                </form>
            </div>
    
        </main>
    );
}
 
export default Mensajes;