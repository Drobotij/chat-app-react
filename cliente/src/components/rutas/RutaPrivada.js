import React, { useContext, useEffect } from 'react';
import authContext from '../../context/auth/authContext';
import Home from '../home/Home';
import Registro from '../auth/Registro';

const RutaPrivada = props => {
    
    const { autenticado, obtenerUsuario } = useContext(authContext);
    
    useEffect(() => {

        if(!autenticado) {
            obtenerUsuario();
        }

    }, []);

    const Componente = autenticado ? (<Home {...props}/>) : (<Registro {...props} />)
    
    return ( 

        Componente
 
    );
}
 
export default RutaPrivada;
