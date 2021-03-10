import React, {useContext} from 'react';
import authContext from '../../../context/auth/authContext';

const Mensaje = ({datos}) => {

    const { usuario } = useContext(authContext);

    const { idUsuario, fecha, hora, contenido } = datos;

    var tipo, justify;
    if(idUsuario === usuario._id){
        tipo = 'mensaje-yo';
        justify = 'justify';
    }else {
        tipo = 'mensaje-otro';
        justify = null;
    }

    



    return ( 
        <div className={justify}>
            <div className={`${tipo} mensaje`}>
                <p className="contenido-mensaje">{contenido}</p>
                <p className="detalles-mensaje">{fecha} {hora}</p>
            </div>
        </div>

    );

}
 
export default Mensaje;