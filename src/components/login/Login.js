import {useState} from 'react'
import axios from 'axios'
import { NavLink,useNavigate } from "react-router-dom";

function Login(){

    const [username, setUsername] =useState('');
    const [password, setPassword] =useState('');
    const navigate = useNavigate();
    const post = (url) => {
        
        axios.post(url, {'username':username, 'password':password})
        .then(function(response){
            navigate('/perfil')
            localStorage.setItem('token', response.data['token']);
            localStorage.setItem('id_user', response.data['user_id']);
        })
        .catch(function(error){
            console.log(error);
            if(error.response.data.non_field_errors != null){
                document.getElementById('warning').textContent = error.response.data.non_field_errors[0];
            }else{
                document.getElementById('warning').textContent = "Username or password are empty";
            }
        });
    }

    
    return(
        <div>
            <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <p id='warning'></p>
            <button onClick={ () => post('http://localhost:8000/api/v1/login')}>Login</button>
            <p>No tienes una cuenta? <NavLink to='/register'>Crea una</NavLink></p>
        </div>
    )
    
}
export default Login;