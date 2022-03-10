import axios from "axios";
import { useNavigate } from "react-router-dom";


function Profile(){

    let navigate = useNavigate();
    let userId = localStorage.getItem('id_user');
    let token = localStorage.getItem('token');

    let usernameResponse, first_nameResponse, last_nameResponse, emailResponse, imagen;

    const post_imagen = (url) =>{
        let data = new FormData();
        data.append('id_user',userId);
        data.append('imagen', document.getElementById('imagenInput').files[0]);
        axios.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            }
        }).then((response) => {
            imagen = "http://localhost:8000" + response.data.imagen;
            document.getElementById('imagenPerfil').src = imagen;
        }).catch((error)=>{
            // console.log(error.response.data);
            if(error.response.data === "No permitido"){
                imagen_put();
                
            }
        });  
    }

    const imagen_put = () =>{
        let data = new FormData();
        data.append('imagen',document.getElementById('imagenInput').files[0]);
        axios.put("http://localhost:8000/api/v1/perfil/imagen/"+userId,data, {
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            imagen = "http://localhost:8000" + response.data.imagen;
            document.getElementById('imagenPerfil').src = imagen;
        }).catch((error)=>{
            console.log("No se cambio");
        });
    }

    let eliminar_imagen = (url) =>{
        axios.delete(url,{headers:{
            'Authorization': 'Token ' + token,
        }}).then((response)=>{
            imagen = "https://i.pinimg.com/236x/2b/da/51/2bda51ca60cc3b5daaa8e062eb880430.jpg";
            document.getElementById('imagenPerfil').src = imagen;
        }).catch((error)=>{
            // console.log(error.response.data);
            alert("No se elimino la imagen");
        });
    }

    const modificar_datos = (url) =>{
        let data = {
            username : document.getElementById('username').value,
            last_name : document.getElementById('lastname').value,
            first_name: document.getElementById('firstname').value,
            email : document.getElementById('email').value
        }
        if(data.username === ""){
            data.username = usernameResponse; 
        }
        if(data.first_name === ""){
            data.first_name = first_nameResponse;
        }
        if(data.last_name === ""){
            data.last_name = last_nameResponse;
        }
        if(data.email === ""){
            data.email = emailResponse;
        }

        axios.put(url, data, {headers:{
            'Authorization': 'Token ' + token,
        }}).then((response)=>{
            window.location.reload();
        }).catch((error) => {
            console.log(error.response.data);
        })
    }

    window.onload = function mostrar_datos() {
        axios.get("http://localhost:8000/api/v1/perfil/imagen/"+userId,{
            headers:{
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            if(response.data.imagen != null){
                imagen = "http://localhost:8000" + response.data.imagen;
                document.getElementById('imagenPerfil').src = imagen;
            }else{
                imagen = "https://i.pinimg.com/236x/2b/da/51/2bda51ca60cc3b5daaa8e062eb880430.jpg";
                document.getElementById('imagenPerfil').src = imagen;
            }
        }).catch((error)=>{
            imagen = "https://i.pinimg.com/236x/2b/da/51/2bda51ca60cc3b5daaa8e062eb880430.jpg";
            document.getElementById('imagenPerfil').src = imagen;
        });

        axios.get("http://localhost:8000/api/v1/perfil/usuario/"+userId,{
            headers:{
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            usernameResponse = response.data.username;
            first_nameResponse = response.data.first_name;
            last_nameResponse = response.data.last_name;
            emailResponse = response.data.email;
            document.getElementById("firstname").placeholder = first_nameResponse;
            document.getElementById("lastname").placeholder = last_nameResponse;
            document.getElementById("email").placeholder = emailResponse;
            document.getElementById("username").placeholder = usernameResponse;
        }).catch((error)=>{
            // console.log(error.response.data);
        });
    }

    const cerrar_sesion = () =>{
        localStorage.clear();
        navigate("/");
    }

    return(
        <div className="container2">
            <div>
                <img alt="Imagen" height="20%" width="20%" src="" id="imagenPerfil"></img>
                <div id="vista"></div>
                <input accept="image/*" type="file" id="imagenInput"></input>
                <button onClick={ ()=>{ post_imagen("http://localhost:8000/api/v1/perfil/imagen")}}>Cambiar Imagen</button>
                <button onClick={ ()=>{ eliminar_imagen("http://localhost:8000/api/v1/perfil/imagen/"+userId)}}>Eliminar Imagen</button>
            </div>
            <div>
                <p>First Name: </p><input id="firstname" ></input>
                <p>Last Name: </p><input id="lastname"></input>
                <p>Username: </p><input id="username"></input>
                <p>Email: </p><input id="email"></input>
                
            </div>
            <div>
                <button onClick={() => {modificar_datos("http://localhost:8000/api/v1/perfil/usuario/"+userId)}}>Cambiar Perfil</button>
            </div>
            <div>
                <button onClick={ ()=>{ cerrar_sesion()}}>Cerrar Sesion</button>
            </div>

        </div>
    );
}

export default Profile;