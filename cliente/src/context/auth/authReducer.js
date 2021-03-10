import {

    REGISTRO_EXITOSO,
    REGISTRO_FALLIDO,
    INICIO_EXITOSO,
    INICIO_FALLIDO,
    CERRAR_SESION,
    SERVIDOR_NULL,
    OBTENER_USUARIO,
    CAMBIAR_FOTO

} from '../../types';

const Reducer = (state,action) => {

    switch (action.type) {
        case REGISTRO_EXITOSO:
        case REGISTRO_FALLIDO:
        case INICIO_FALLIDO:
            localStorage.removeItem('token');

            return {
                ...state,
                respuestaServidor: action.payload,
                autenticado: null,
                usuario: null
            }

        case INICIO_EXITOSO:
            const { token, usuario } = action.payload.datos;
            
            // Mete el token en el local storage
            localStorage.setItem('token', token);
            
            return {
                ...state,
                usuario,
                respuestaServidor: action.payload,
                autenticado: true
            }
            
        case CERRAR_SESION:
            
            localStorage.removeItem('token');
            return {
                ...state,
                autenticado: null,
                usuario: null,
                respuestaServidor: null
            }
        case OBTENER_USUARIO:
            return {
                ...state,
                autenticado: true,
               
                usuario: action.payload
            }
        case SERVIDOR_NULL:
            return {
                ...state,
                respuestaServidor: null
            }
        case CAMBIAR_FOTO:
            return {
                ...state,
                respuestaServidor: action.payload
            }
        default:
            return state
    }
}

export default Reducer;