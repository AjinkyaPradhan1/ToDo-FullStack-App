import { useState } from "react";
import "../todo/ToDoApp.css"
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

function LoginComponent(){


    const[username,setUsername] = useState('Ajinkya')
    const[password,setPassword] = useState('')
    const navigate = useNavigate()
    const authContext = useAuth();
    

    function handleUsernameChange(event){
        setUsername(event.target.value)
    }
    function handlePasswordChange(event){
        setPassword(event.target.value)
    }
    async function handleSubmit(){
       if(await authContext.login(username,password)){
        navigate(`/welcome/${username}`)
       }else{
        console.log('hi')
        navigate('/login')
        setPassword('')
       }
    }


    return(
        <div className="login">
        <h1>Login Page</h1>
            <div className="LoginForm">
                <div>
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}></input>
                </div>

                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}></input>
                </div>

                <div>
                    <button type="button" className="btn btn-outline-dark m-4" name="login"onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent;