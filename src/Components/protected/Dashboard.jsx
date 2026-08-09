
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

    
    
    <main className={DashboardCss.dashboard}>
    <ArtefactContext.Provider value={{artefact,changeArtefact}}>
        
    <nav className={DashboardCss.navbar} >

    <Navigator />

    </nav >

    <div className={DashboardCss.container}>
        
        <Outlet />




    </div>






    </ArtefactContext.Provider>
    </main>

   

   


    

    
    </>
)


}

export default ArtefactContext