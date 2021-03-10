import React, { useReducer } from 'react';

import {
    OBTENER_CHATS,
    AGREGAR_CHAT,
    CHAT_ACTUAL,
    ERROR_CHAT,
    
    CHAT_NULL
} from '../../types';


import chatsReducer from './chatsReducer';
import ChatsContext from './chatsContext';


import clienteAxios from '../../config/axios';

const ChatsState = props => {
    

    const initialState = {
        chats: null,
        chatActual: null,
        respuestaServidor: null,
        segundoUsuario: null
    }

    const [state, dispatch] = useReducer(chatsReducer, initialState);
    
    const crearChat = async segundoUsuario => {
        try {
            
            const respuesta = await clienteAxios.post('/chats', { segundoUsuario });
            console.log(respuesta);

            dispatch({
                type: AGREGAR_CHAT,
                payload: respuesta.data
            })

            obtenerChats();

        } catch (error) {
            console.log(error.response);
            dispatch({
                type: ERROR_CHAT,
                payload: error.response
            })
        }
    };

    const obtenerChats = async () => {
        try {
            
            const respuesta = await clienteAxios.get('/chats');
            
            dispatch({
                type: OBTENER_CHATS,
                payload: respuesta.data.datos.chats
            })

        } catch (error) {

            console.log(error.response);
            dispatch({
                type: ERROR_CHAT,
                payload: error.response
            })

        }
    }

    const obtenerDatosOtroUsuario = async idChat => {
        try {
            
            const respuesta = await clienteAxios.get(`/chats/obtenerParticipantes/${idChat}`);
            return respuesta.data;
            /*dispatch({
                type: SEGUNDO_USUARIO,
                payload: respuesta.data
            })*/

        } catch (error) {
            console.log(error.response);
            /*dispatch({
                type: ERROR_CHAT,
                payload: error.response
            })*/

        }
    }

    const setChatActual = idChad => {
        dispatch({
            type: CHAT_ACTUAL,
            payload: idChad
        })
    };
    const setChatActualNull = () => {
        dispatch({
            type: CHAT_NULL
        })
    }

    return ( 


        <ChatsContext.Provider
            value={{
                
                chats: state.chats,
                segundoUsuario: state.segundoUsuario,
                chatActual: state.chatActual,
                crearChat,
                obtenerChats,
                setChatActual,
                obtenerDatosOtroUsuario,
                setChatActualNull
                
            }}
        >
            {props.children}
        </ChatsContext.Provider>

     );
}
 
export default ChatsState;