import { useContext} from "react"
import AccessContext from "../ContextAPI/accessContext"
import {Route,Routes} from 'react-router-dom'
import Layout from "./Layouts/Layout"
import  LogIn  from "./signup-login/LogIn"
import SignUpForm from "./signup-login/SignUp"
import Home from "./other/Home"
import  Dashboard  from "./protected/Dashboard"
import  ErrorRoute  from "./error/ErrorRoute"
import CheckAuth from "./CheckAuth"


export function App(){

    return(
        <Routes>
            <Route path="/" element={<Layout />}>
                 <Route index element={<Home />} />
                
                <Route path="login" element={<LogIn />} />
                <Route path="signup" element={<SignUpForm />} />

                <Route element={<CheckAuth/>}>

                <Route path="dashboard" element={<Dashboard/>} />

                </Route>

                <Route path="*" element={<ErrorRoute />} />
            </Route>
        </Routes>
    )
}
