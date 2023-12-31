import { useParams,useNavigate } from "react-router-dom"
import { createIndividualTodoApi, retieveIndividualTodoFromRESTAPI } from "./api/TodoApiService"
import { updateIndividualTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import { Formik,Form ,Field, ErrorMessage} from "formik"
import {moment} from "moment"

function TodoComponent(){

    const {id} = useParams()
    const authContext = useAuth()
    const username = authContext.username
    const [description,setDescription] = useState('')
    const [targetDate,setTargetDate] = useState('')
    const navigate = useNavigate()

    useEffect(
        ()=>retrieveIndTodo(),[id]
    )

    function retrieveIndTodo(){
        if(id!==-1){
            retieveIndividualTodoFromRESTAPI(username,id)
            .then(
                response => {
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
            })
            .catch(error=>console.log(error))
        }
    }

    function onSubmit(values){
        console.log(values)
        const todo = {
            id:id,
            username:username,
            description:values.description,
            targetDate:values.targetDate,
            done:false
        }

        //console.log(todo)

        if(id===-1){
            createIndividualTodoApi(username,todo)
            .then(response=>{
                navigate('/todos')
            })
            .catch(error=>console.log(error))
        }else{
            updateIndividualTodoApi(username,id,todo)
            .then(response=>{
                navigate('/todos')
            })
            .catch(error=>console.log(error))
        }

        
    }
    function validate(values){
        let errors = {
            // description : 'Enter a Valid Description',
            // targetDate : 'Enter a Valid Target Date'
        }
        if(values.description.length<5){
            errors.description = 'Enter atleast 5 characters'
        }
        if(values.targetDate===null || values.targetDate===''){
            errors.description = 'Enter a valid Target Date'
        }
        return errors
    }

    return(
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik initialValues={{description,targetDate}}
                    enableReinitialize={true}
                    onSubmit = {onSubmit}
                    validate = {validate}
                    validateOnChange = {false}
                    validateOnBlur = {false}
                >
                    {
                        (props)=>(
                            <Form >
                            <ErrorMessage 
                                name="description"
                                component="div"
                                className="alert alert-warning"
                            />
                            <ErrorMessage 
                                name="targetDate"
                                component="div"
                                className="alert alert-warning"
                            />
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description"/>
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate"/>
                                </fieldset>
                                <div>
                                    <button type="submit" className="btn btn-success m-4">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}
export default TodoComponent