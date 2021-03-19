import React, { useContext, useEffect } from 'react';
import { Route, Redirect} from 'react-router-dom';
import authContext from '../../context/auth/authContext';



const RutaPrivada = ({component: Component, props}) => {
    
    const { autenticado, obtenerUsuario  } = useContext(authContext);

    useEffect( () => {
        obtenerUsuario();
        // eslint-disable-next-line
    }, [])

    return ( 
        <Route {...props} render={props => !autenticado ? (
            <Redirect to="/iniciar-sesion" />
        ) : (
            <Component {...props} />
        )} />
    );
}
 
export default RutaPrivada;
