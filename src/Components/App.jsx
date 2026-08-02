import { useContext} from "react"
import AccessContext from "../ContextAPI/accessContext"
import {Route,Routes} from 'react-router-dom'
import Layout from "./Layouts/Layout"
import  LogIn  from "./signup-login/LogIn"
import SignUpForm from "./signup-login/SignUp"
import Home from "./other/Home/Home"
import  {Dashboard}  from "./protected/Dashboard"
import  ErrorRoute  from "./error/ErrorRoute"
import CheckAuth from "./CheckAuth"
import ProfilePage from "./other/ProfilePage"
import { GlobalSearch } from "./other/GlobalSearch"
import Workshop from "./other/Workshop"
import Upload from "./protected/Upload"

export function App(){

    return(
        <Routes>
            <Route path="/" element={<Layout />}>

                 <Route index element={<Home />} />
                 <Route path="search" element={<GlobalSearch />} />

                <Route path="login" element={<LogIn />} />
                <Route path="signup" element={<SignUpForm />} />

                <Route path="profile/:username" element={<ProfilePage />} />
 
                {/* <Route element={<CheckAuth/>}> */}
                <Route path="home/upload" element={<Upload />} />
                <Route path="workshop/:artefactId" element={<Workshop />} />
                <Route path="home/dashboard" element={<Dashboard/>} />

                {/* </Route> */}

                <Route path="*" element={<ErrorRoute />} />
            </Route>
        </Routes>
    )
}
