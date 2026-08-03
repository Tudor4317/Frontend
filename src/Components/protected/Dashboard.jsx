import LogOut from "../../reusable-components/GeneralUse-components/LogOut";
import PushArtefacts from "../../reusable-components/Dashboard-components/PushArtefact";
import Artefacts from "../../reusable-components/Dashboard-components/ArtefactsDisplay";
import { createContext,useState } from "react";
import DashboardCss from "./Dashboard.module.css"
import Navigator from "../../reusable-components/Dashboard-components/DashboardNav";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ArtefactContext = createContext(null)



export  function Dashboard() {
    const navigate = useNavigate()
    const [artefact,changeArtefact] = useState(null)
    

return (
    <>

    
    <ArtefactContext.Provider value={{artefact,changeArtefact}}>
    <main className={DashboardCss.dashboard}>

        
    <nav className={DashboardCss.navbar} >

    <Navigator />

    </nav >

    <div className={DashboardCss.container}>
        
        <Outlet />


        <button onClick={() => navigate("/home/upload")} className={DashboardCss.btn}>
        upload →
        </button>


    </div>






    </main>

   

   

    </ArtefactContext.Provider>

    <LogOut />

    
    </>
)


}

export default ArtefactContext