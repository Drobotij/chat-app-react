import React, { useReducer } from 'react';
import MensajesContext from './mensajesContext';
import mensajeReducer from './mensajesReducer';

import { OBTENER_MENSAJES ,MENSAJES_NULL } from '../../types';

// CLiente axios
import clienteAxios from '../../config/axios';

const MensajesState = props => {
    
    const initialState = {
    
        mensajes: null
    
    };

    const [state, dispatch] = useReducer(mensajeReducer, initialState)


    const obtenerMensajes = async idChat => {

        try {
            
            const respuesta = await clienteAxios.get(`/mensajes/${idChat}`);
            
            dispatch({
                type: OBTENER_MENSAJES,
                payload: respuesta.data
            })

        } catch (error) {
            console.log(error.response);
        }

    }

    const mensajesNull = () => {
        dispatch({
            types: MENSAJES_NULL
        })
    }

    const CrearMensaje = async (idChat,contenido) => {
        
        try {
            
            await clienteAxios.post('/mensajes', { idChat, contenido } );
            
            obtenerMensajes(idChat);

        } catch (error) {
            console.log(error.response);
        }

    };

    

    return ( 
        <MensajesContext.Provider

            value={{
                mensajes: state.mensajes,
                CrearMensaje,
                obtenerMensajes,
                mensajesNull
            }}
        
        >
            {props.children}
        </MensajesContext.Provider>

    );
}
 
export default MensajesState;