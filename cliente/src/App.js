import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// Componentes
import Iniciar from './components/auth/Iniciar';
import Registrarse from './components/auth/Registro';
import RutaPrivada from './components/rutas/RutaPrivada';
import Home from './components/home/Home';

// Cnfig de headers
import authToken from './config/tokenAuth'

// States
import MensajeState from './context/mensajes/mensajesState';
import AuthState from './context/auth/authState';
import ChatsState from './context/chats/chatsState';
import MensajesTextos from './context/mensajesTexto/mensajesState';

// Revisa el token
const token = localStorage.getItem('token');

if(token){
  authToken(token);
}

function App() {
  return (
    <MensajesTextos>
      <ChatsState>
        <AuthState>
          <MensajeState>
            <Router>
              <Switch>
                <RutaPrivada exact path="/" component={Home} />
                <Route exact path="/registrarse" component={Registrarse} />
                <Route exact path="/iniciar-sesion" component={Iniciar} />
              
              </Switch>
            </Router>
          </MensajeState>
        </AuthState>
      </ChatsState>
    </MensajesTextos>

   
  );
}

export default App;

//<RutaPrivada exact path="/home" component={Home} />