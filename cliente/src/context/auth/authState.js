import React, {useReducer} from 'react';

import authReducer from './authReducer';
import AuthContext from './authContext';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import {

    REGISTRO_EXITOSO,
    REGISTRO_FALLIDO,
    INICIO_EXITOSO,
    INICIO_FALLIDO,
    SERVIDOR_NULL,
    CERRAR_SESION,
    OBTENER_USUARIO,
    CAMBIAR_FOTO

} from '../../types';

const AuthState = props => {

    const initialState = {
    
        usuario: null,
        autenticado: null,
        respuestaServidor: null
    
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    
    // Crea usuario
    const crearUsuario = async usuario => {
        try {
            
            const respuesta = await clienteAxios.post('/usuarios', usuario);
            
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })
           
        } catch (error) {
            
            dispatch({
                type: REGISTRO_FALLIDO,
                payload: error.response.data
            })
        }
        servidorNull();

    };

    // Inicia sesion
    const iniciarSesion = async usuario => {
        try {
            
            const respuesta = await clienteAxios.post('/usuarios/autenticarUsuario', usuario);
            

            dispatch({
                type: INICIO_EXITOSO,
                payload: respuesta.data
            })

            obtenerUsuario();

        } catch (error) {
            console.log(error.response.data);
            dispatch({
                type: INICIO_FALLIDO,
                payload: error.response.data
            })
        }
        servidorNull();
    }

    const servidorNull = () =>{
        //setTimeout(() => {
            dispatch({
                type: SERVIDOR_NULL
            }) 
         //}, 1000);
    }

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    const cambiarFoto = async foto => {
        console.log(foto);
        try {
            const respuesta = await clienteAxios.put('/usuarios/cambiarFoto', foto , {headers: {'Content-Type' : 'multipar/form-data'}});
            console.log(respuesta.data);

            dispatch({
                type: CAMBIAR_FOTO,
                payload: respuesta.data
            })

            obtenerUsuario();
        } catch (error) {
            console.log(error.response);
        }


    }

    const obtenerUsuario = async () =>{

        try {
        
            const token = localStorage.getItem('token');
            if(token) {
                // Funcion para enviar el token por headers
                tokenAuth(token);
            }

            const respuesta = await clienteAxios.get(`/usuarios`);

            
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.datos.usuario
            })

        } catch (error) {
            console.log(error.response.data);
            dispatch({
                type: INICIO_FALLIDO,
                payload: null
            })
        }
        
    } 

    return (
        <AuthContext.Provider
            value={{
                usuario: state.usuario,
                respuestaServidor: state.respuestaServidor,
                autenticado: state.autenticado,
                crearUsuario,
                iniciarSesion,
                cerrarSesion,
                obtenerUsuario,
                cambiarFoto
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
 
export default AuthState;