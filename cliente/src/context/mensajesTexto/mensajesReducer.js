import { OBTENER_MENSAJES, MENSAJES_NULL } from '../../types';

const reducer = (state, action) => {
    switch (action.type) {
        case OBTENER_MENSAJES:
            return {
                mensajes: action.payload
            }
        case MENSAJES_NULL: 
            return {
                mensajes: null
            }
        default:
            return state
    }
}

export default reducer;