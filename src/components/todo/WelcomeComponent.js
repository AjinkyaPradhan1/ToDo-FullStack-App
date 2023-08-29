import {useParams,Link} from "react-router-dom"
import { useState } from "react"
import {retieveHelloWorldBeanPathVariable} from "../todo/api/HelloWorldApiService"
import {useAuth} from "../todo/security/AuthContext"

function WelcomeComponent(){

    const {username}= useParams()
    const [message,setMessage] = useState(null)
    const authContext = useAuth()

    function callHelloRestAPI(){

        console.log("called")

        // retieveHelloWorldBean()
        // .then(
        //     (response)=>successFullResponse(response)
        // )
        // .catch(
        //     (error)=>errorResponse(error)
        // )
        // .finally(
        //     ()=>console.log("cleanup")
        // )

        
        retieveHelloWorldBeanPathVariable('Ajinkya',authContext.token)
        .then(
            (response)=>successFullResponse(response)
        )
        .catch(
            (error)=>errorResponse(error)
        )
        .finally(
            ()=>console.log("cleanup")
        )
        

        
    }
    function successFullResponse(response){
        console.log(response)
        setMessage(response.data.message)
    }
    function errorResponse(error){
        console.log(error)
    }

    return(
        <div className="welcome">
            <h1>Welcome {username}</h1>
                <br/>
            <div>
                Your Todos <Link to="/todos">Click Here</Link>
            </div>
                <br/>
            <div>   
                <button className="btn btn-success m-6" onClick={callHelloRestAPI}>Call Hello World REST API</button>
            </div>
            <div className="text-info">{message}</div>
            
        </div>
    )
}

export default WelcomeComponent;