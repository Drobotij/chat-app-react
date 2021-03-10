import { 

    MENSAJE_NULL,
    MENSAJE_ON
} from '../../types';

const reducer = (state, action) => {
    switch (action.type) {
        case MENSAJE_ON:
            return {
                mensaje: action.payload
            }
        case MENSAJE_NULL: 
            return {
                mensaje: null
            }
        default:
            return state
    }
}

export default reducer;