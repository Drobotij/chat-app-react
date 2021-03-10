import {
    OBTENER_CHATS,
    AGREGAR_CHAT,
    ERROR_CHAT,
    CHAT_ACTUAL,
    SEGUNDO_USUARIO,
    CHAT_NULL
} from '../../types';

const reducer = (state,action) => {
    switch (action.type) {
        case OBTENER_CHATS:
            return {
                ...state,
                chats: action.payload
            }
        case ERROR_CHAT:
        case AGREGAR_CHAT:
            return {
                ...state,
                respuestaServidor: action.payload
            }
        case CHAT_ACTUAL:
            return {
                ...state,
                chatActual: state.chats.filter(chat => chat._id === action.payload)
            }
        case SEGUNDO_USUARIO:
            return {
                ...state,
                segundoUsuario: action.payload
            }
        case CHAT_NULL:
            return {
                ...state,
                chatActual: null
            }
        default:
            return state
    }
}

export default reducer;