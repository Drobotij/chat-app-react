import React, {useReducer} from 'react';

import mensajeReducer from './mensajesReducer';
import MensajeContext from './mensajesContext';

import {

    MENSAJE_NULL,
    MENSAJE_ON

} from '../../types';

const MensajeState = props => {
    
    const initialState = {

        mensaje: null
    }

    const [state, dispatch] = useReducer(mensajeReducer, initialState);

    const mostrarMensaje = mensaje => {
        dispatch({
            type: MENSAJE_ON,
            payload: mensaje
        })

        setTimeout(() => {
            dispatch({
                type: MENSAJE_NULL
            });
        }, 10000);
    }

    const mensajeNull = () => {
        dispatch({
            type: MENSAJE_NULL
        });
    }

    return (
        <MensajeContext.Provider
            value={{
                mensaje: state.mensaje,
                mostrarMensaje,
                mensajeNull
                
            }}
        >
            {props.children}
        </MensajeContext.Provider>
    );
}
 
export default MensajeState;