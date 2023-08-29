import { createContext, useContext, useState } from "react";
import {executeJWTAuthenticationService} from "../api/AuthenticationApiService"
import { apiClient } from "../api/ApiClient";

//Create a context
export const AuthContext = createContext()
export const useAuth  = () =>useContext(AuthContext)

//export the context created to be shared with other components of the project
function AuthProvider({children}){

    //Put some state in the message
    const [isAuthenticated,setAuthenticated] = useState(false);
    const [username,setUsername] = useState(null)
    const [token,setToken] = useState(null)

    /*
        function login(username,password){
            if(username==='Ajinkya' && password==='12345'){
                setAuthenticated(true)
                setUsername(username)
                return true
                
            }else{
                setAuthenticated(false)
                setUsername(null)
                return false
            }
        }
    */

    /*
        async function login(username,password){

            const basicToken = 'Basic ' + window.btoa(username + ":" + password)

            try{
                const response = await executeBasicAuthenticationService(basicToken)
            
                if(response.status===200){
                    setAuthenticated(true)
                    setUsername(username)
                    setToken(basicToken)

                    apiClient.interceptors.request.use(
                        (config) =>{
                            console.log('Intercepting and Adding Token')
                            config.headers.Authorization=basicToken
                            return config
                        }
                    )

                    return true
                    
                }else{
                    logout()
                    return false
                }
            }catch(error){
            logout()
                return false
            }
        }
    */

        async function login(username,password){
    
            try{
                const response = await executeJWTAuthenticationService(username,password)
                const JwtToken = 'Bearer '+ response.data.token
                if(response.status===200){
                    setAuthenticated(true)
                    setUsername(username)
                    setToken(JwtToken)
    
                    apiClient.interceptors.request.use(
                        (config) =>{
                            console.log('Intercepting and Adding Token')
                            config.headers.Authorization=JwtToken
                            return config
                        }
                    )
    
                    return true
                    
                }else{
                    logout()
                    return false
                }
            }catch(error){
               logout()
                return false
            }
        }


    function logout(){
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }

    return(
       <AuthContext.Provider value={{isAuthenticated,login,logout,username,token}}>
            {children}
       </AuthContext.Provider>
    )
}

export default AuthProvider;