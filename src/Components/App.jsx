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
import Preview from "./other/ArtefactPreview"
import Artefact from "../reusable-components/Dashboard-components/ArtefactsDisplay"

export function App(){

    return(
        <Routes>
            <Route path="/" element={<Layout />}>

                 <Route index element={<Home />} />
               

                <Route path="login" element={<LogIn />} />
                <Route path="signup" element={<SignUpForm />} />

                <Route path="profile/:username" element={<ProfilePage />} />
 
                <Route element={<CheckAuth/>}> 
                <Route path="home/upload" element={<Upload />} />
                <Route path="home/workshop/:artefactId" element={<Workshop />} />

                <Route path="home/dashboard" element={<Dashboard/>}>

                <Route path={"artefacts"} element={<Artefact />} />
                <Route path={"search"}  element={<GlobalSearch />} />
                <Route path={"settings"} element={<Artefact />} />

                </Route>

                <Route path="home/preview" element={<Preview />} />

                 </Route> 

                <Route path="*" element={<ErrorRoute />} />
            </Route>
        </Routes>
    )
}
