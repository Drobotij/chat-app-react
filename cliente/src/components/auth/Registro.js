import React, {useContext, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import authImg from '../../chats.png';
import authContext from '../../context/auth/authContext';
import mensajeContext from '../../context/mensajes/mensajesContext';

const Registro = () => {

    const {  crearUsuario, respuestaServidor } = useContext(authContext);
    
    const { mensaje, mensajeNull, mostrarMensaje } = useContext(mensajeContext);
    const [usuario, setUsuario] = useState({
        
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        confirmar: '',
        nombreUsuario: ''
        
    });

    const {nombre, apellido, email, password, confirmar, nombreUsuario} = usuario;

    // Setea el mensaje a null
    useEffect(() => {

        if(!mensaje) return;

        if(mensaje.tipo === 'exito'){
            // Redirecciona a iniciar sesion
            setTimeout(() => {

                window.location.href = 'http://localhost:3000/iniciar-sesion';
                
            }, 3000);
            
        }

    }, [mensaje])

    // Cuando esta almacenada la respuesta del servidor
    useEffect(() => {
    
        if(respuestaServidor !== null) {
            mostrarMensaje(respuestaServidor);
        }else{
            setTimeout(() => {

                mensajeNull();
                
            }, 2900);
            
        }
    
    }, [respuestaServidor]);

    const handleSubmit = e =>{

        e.preventDefault();

        crearUsuario(usuario);
        
    }

    const handleInput = e =>{
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <Header />
                <div className="display-flex seccion contenedor">
                    <div className="imagen-auth">
                        <img src={authImg} alt="yea" />
                    </div>
                    <div className="contenedor-flex">
                        <h2 className="texto-centrado">Registrate <br></br>!Es gratis¡</h2>
                        <form
                            onSubmit={handleSubmit}
                        >
                            <input 
                                type="text"
                                name="nombre"
                                placeholder="Nombre"
                                className="campo-form"
                                onChange={handleInput}
                                value={nombre}
                            />
                            <input 
                                type="text"
                                name="apellido"
                                placeholder="Apellido"
                                className="campo-form"
                                onChange={handleInput}
                                value={apellido}
                            />
                            <input 
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="campo-form"
                                onChange={handleInput}
                                value={email}
                            />
                            <input 
                                type="text"
                                name="nombreUsuario"
                                placeholder="Nombre de usurio"
                                className="campo-form"
                                onChange={handleInput}
                                value={nombreUsuario}
                            />
                            <input 
                                type="password"
                                name="password"
                                placeholder="Contraseña"
                                className="campo-form"
                                onChange={handleInput}
                                value={password}
                            />
                            <input 
                                type="password"
                                name="confirmar"
                                placeholder="Confirmar contraseña"
                                className="campo-form"
                                onChange={handleInput}
                                value={confirmar}
                            />
                            <input 
                                type="submit"
                                value="Registrarse"
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
                            <p>¿Ya tienes una cuenta? <Link to="/iniciar-sesion">Iniciar sesion</Link></p>
                        </div>
                    </div>
                </div>
            <Footer />
        </> 
    );
}
 
export default Registro;