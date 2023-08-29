import {useEffect, useState} from "react";
import { useNavigate} from "react-router-dom"
import {retieveTodoFromRESTAPI} from "./api/TodoApiService"
import {deleteTodoApi} from "./api/TodoApiService"
import {useAuth} from "./security/AuthContext"

function ListTodosComponent(){
    const today = new Date();
    const targetDate = new Date(today.getFullYear()+12,today.getMonth(),today.getDay())
    const [todos,setTodos] = useState([]);
    const [message,setMessage]=useState(null)
    const authContext = useAuth()
    const username = authContext.username
    const navigate = useNavigate()
    
    /*const todos = [
        
        {id:1,description:'Learn Java',done:false,targetDate:targetDate},
        {id:2,description:'Learn Javascript',done:false,targetDate:targetDate},
        {id:3,description:'Learn SpringBoot',done:false,targetDate:targetDate},
        {id:4,description:'Learn AWS',done:false,targetDate:targetDate}
        
    ]*/

    useEffect(
        ()=>refreshTodos(),[]
    )

    function refreshTodos(){

        retieveTodoFromRESTAPI(username)
        .then(
            response=>{
                setTodos(response.data)
            }
        )
        .catch(
            error=>console.log(error)
        )
        .finally(
            ()=>console.log("cleanup")
        )
    }   
    
    function deleteTodo(id){
        console.log("Delete Clicked: "+id)
        deleteTodoApi(username,id)
        .then(
            ()=>{
                setMessage(`Deletion of Todo with id : ${id} successfull`)
                refreshTodos()
            }
        )
        .catch(error=>console.log(error))
    }

    function updateTodo(id){
        console.log("Update Clicked: "+id)
        navigate(`/todo/${id}`)
    }
    function addNewTodo(){
        console.log("Add Clicked")
        navigate(`/todo/-1`)
    }

    

    return(
        <div className="container">
            <h1>Things you want to do!</h1>
            <br/>
            {message && <div className="alert alert-warning">{message}</div>}
            <br/>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Done?</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo=>(
                                <tr key={todo.id}>
                                
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                    <td><button className="btn btn-danger" 
                                    onClick={()=>deleteTodo(todo.id)}>Delete</button></td>
                                    <td><button className="btn btn-warning" 
                                    onClick={()=>updateTodo(todo.id)}>Update</button></td>
                                </tr>
                            )
                        )
                    }
                        
                    </tbody>
                </table>
                <div>
                    <button className="btn btn-success m-4" onClick={addNewTodo}>Create Todo</button>
                </div>
            </div>
        </div>
    )
}

export default ListTodosComponent;