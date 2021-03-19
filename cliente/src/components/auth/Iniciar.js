import React, {useEffect, useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import authImg from '../../chats.png'
import authContext from '../../context/auth/authContext';
import mensajeContext from '../../context/mensajes/mensajesContext';

const Iniciar = props => {
   
    const {respuestaServidor, iniciarSesion} = useContext(authContext);

    const {mensaje, mensajeNull, mostrarMensaje} = useContext(mensajeContext);

    const [usuario, setUsuario] = useState({
    
        email: '',
        password: ''
    
    })

    useEffect(() => {

        if(mensaje === null) return;

        if(mensaje.tipo === 'exito'){
            // Redirecciona al home
            setTimeout(() => {

                props.history.push('/');
                mensajeNull();
            }, 3000);
            
        }

    }, [mensaje])

    useEffect(() => {
        if(respuestaServidor === null){
            mensajeNull();
        }
    }, [])

    // Cuando esta almacenada la respuesta del servidor
    useEffect(() => {
    
        if(respuestaServidor !== null) {
            mostrarMensaje(respuestaServidor);
        }
    
    }, [respuestaServidor]);


    const {email, password} = usuario;

    const handleChange = e => {if(respuestaServidor === null){
        mensajeNull();
    }
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        iniciarSesion(usuario);
    }

    return (

        <>
            <Header />
            <div className="display-flex seccion contenedor">
                <div className="imagen-auth">
                    <img src={authImg} alt="yea" />
                </div>
                <div className="contenedor-flex">

                    <h2 className="texto-centrado">Iniciar sesion</h2>
                    <form
                        onSubmit={handleSubmit}
                    >
                        <input 
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="campo-form"
                            onChange={handleChange}
                            value={email}
                        />
                        <input 
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            className="campo-form"
                            onChange={handleChange}
                            value={password}
                        />
                        
                        <input 
                            type="submit"
                            value="Iniciar sesion"
                            className="btn btn-primary"
                        />
                    </form>
                    {mensaje !== null
                    
                        ?   (<div className={`alerta ${mensaje.tipo}`}>
                                 <ul>
                                    {mensaje.detalles.map(detalle => (
                                    
                                        <li>{detalle.msg}</li>
                                        
                                    ))}
                                </ul>
                            </div>)
                        : null 
                    
                    }
                    <div className="seccion-chica">
                        <p>¿No tienes una cuenta? <Link to="/registrarse">Registrarse</Link></p>
                    </div>
                </div>
                </div>
            <Footer />
        </> 
    );
}
 
export default Iniciar;