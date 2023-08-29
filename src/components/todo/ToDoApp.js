import LoginComponent from "../todo/LoginComponent";
import WelcomeComponent from "../todo/WelcomeComponent";
import { BrowserRouter,Route,Routes,Navigate} from "react-router-dom";
import ErrorComponent from "../todo/ErrorComponent";
import ListTodosComponent from "../todo/ListTodosComponent";
import TodoComponent from "../todo/TodoComponent";
import FooterComponent from "../todo/FooterComponent";
import HeaderComponent from "../todo/HeaderComponent";
import LogoutComponent from "../todo/LogoutComponent";
import AuthProvider, { useAuth } from "./security/AuthContext";


function ToDoApp(){


    function AuthenticatedRoute({children}){
        const authContext = useAuth()
        if(authContext.isAuthenticated){
            return children
        }else{
            return <Navigate to="/"></Navigate>
        }
    }

    return(
        <div className="ToDoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent/>  
                    <Routes>
                        <Route path='/' element={<LoginComponent/>}></Route>
                        <Route path='/login' element={<LoginComponent/>}></Route>

                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent/>
                            </AuthenticatedRoute>
                        }>
                        </Route>
                        <Route path='/todos' element={
                            <AuthenticatedRoute>
                                <ListTodosComponent/>
                            </AuthenticatedRoute>
                        }></Route>

                        <Route path='/todo/:id' element={
                            <AuthenticatedRoute>
                                <TodoComponent/>
                            </AuthenticatedRoute>
                        }></Route>

                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent/>
                            </AuthenticatedRoute>
                        }></Route>

                        <Route path='*' element={<ErrorComponent/>}></Route>
                    </Routes>
                    <FooterComponent/>
                </BrowserRouter>
            </AuthProvider>
            
        </div>
    )
}

export default ToDoApp;