import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: "https://chat-app-react-jss.herokuapp.com/api"
})

export default clienteAxios;