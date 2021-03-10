import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// Componentes
import Iniciar from './components/auth/Iniciar';
import RutaPrivada from './components/rutas/RutaPrivada';
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
                <Route exact path="/" component={RutaPrivada}/>
                
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