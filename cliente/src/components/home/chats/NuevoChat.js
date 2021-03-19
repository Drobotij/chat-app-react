import React, {useState, useEffect, useContext} from 'react';

import clienteAxios from '../../../config/axios';
import chatsContext from '../../../context/chats/chatsContext';

const NuevoChat = () => {

    const [usuario, setUsuario] = useState({
        busqueda: ''
    })

    const { crearChat } = useContext(chatsContext);

    const [resultados, setResultados] = useState([]);
    const [noResult, setNoResult] = useState(false);
    const { busqueda } = usuario;
    
    useEffect(() => {
        if(busqueda !== ''){
            buscarUsuarios(usuario)
        }
    },[busqueda]);

   

    const buscarUsuarios = async usuario => {

        try {
            
            const respuesta = await clienteAxios.get('/chats/buscarUsuarios', { params: usuario });
            console.log(respuesta.data)
            setNoResult(false);
            setResultados(respuesta.data.datos.usuarios);
            

        } catch (error) {
            console.log(error.response);
            setResultados([]);
            setNoResult(true);
            
        }

    };

    const handleChange = e => {
        setUsuario({
            ...usuario,
            busqueda: e.target.value
        })
        
    };

    const agregarChat = id => {
        
        crearChat(id);
        setUsuario({
            busqueda: ''
        })
    }

    return (
        <form
            onSubmit={e => e.preventDefault()}
            className="agregar-chat"
        >
            <input 
                placeholder="Nuevo chat"
                type="text"
                className="campo-form"
                name="busqueda"
                autoComplete="off"
                onChange={handleChange}
                value={busqueda}
            />
            {
                busqueda !== '' ?

                    <div className="resultados-busqueda">
                        <div className="contenedor">
                            {
                            
                                noResult ?
                                
                                    (<div className="no-resultados">
                                        <p>No hay resultados</p>
                                    </div>)

                                : 
                                    resultados.length !== 0 ? 
                                    resultados.map(resultado => (
                                        <button
                                            className="btn boton-chat"
                                            onClick={() => agregarChat(resultado._id)}
                                        >   
                                        <div className="foto-perfil" >
                                            <img src={resultado.foto} alt={`${resultado.nombre} ${resultado.apellido}`} />
                                        </div>
                                        
                                            <h4 className="texto-instruccion">{resultado.nombreUsuario}</h4>
                                            
                                        </button>
                                    ))
                                :null

                            }
                        </div>
                    </div>

                : null
            }
            
        </form>
    );
}
 
export default NuevoChat;

