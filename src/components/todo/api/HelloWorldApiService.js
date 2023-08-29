import { apiClient } from "../api/ApiClient";

// function retieveHelloWorldBean(){
//     return axios.get('http://localhost:8080/hello-world-bean')
// }


export const retieveHelloWorldBeanPathVariable = 
(username,token) => apiClient.get(`/hello-world-bean/path-variable/${username}`
    // ,{
    //     headers:{
    //         Authorization: token
    //     }
    // }
);

