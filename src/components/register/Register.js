import {useState} from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom';

function Register(){
    const navigate = useNavigate();
    const post = (url) => {
        
        axios.post(url, {'email':email, 'username':username, 'last_name':last,'first_name':first, 'password':password, 'password2':password2})
        .then(function(response){
            console.log(response.data);
            navigate('/login');
        })
        .catch(function(error){
            console.log(error);
        });
    }

    const [username, setUsername] =useState('')
    const [password, setPassword] =useState('')
    const [first,setFirst] = useState('');
    const [last,setLast] = useState('');
    const [email, setEmail] =useState('');
    const [password2,setPassword2] = useState('');
    return(
        <div>
            <input type="text" placeholder="first name" onChange={e => setFirst(e.target.value)} />
            <input type="text" placeholder="last name" onChange={e => setLast(e.target.value)} />
            <input type="text" placeholder="email" onChange={e => setEmail(e.target.value)} />
            <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <input type="password" placeholder="password 2" onChange={e => setPassword2(e.target.value)} />
            <button onClick={ () => post('http://localhost:8000/api/v1/register/usuario')}>Register</button>
            <p>Ya tienes una cuenta? <NavLink to='/login'>Inicia Sesion</NavLink></p>
        </div>
    )
    
}
export default Register;