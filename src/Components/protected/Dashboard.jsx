import LogOut from "../../reusable-components/GeneralUse-components/LogOut";
import PushArtefacts from "../../reusable-components/Dashboard-components/PushArtefact";
import Artefacts from "../../reusable-components/Dashboard-components/ArtefactsDisplay";
import { createContext,useState } from "react";

const ArtefactContext = createContext(null)



export  function Dashboard() {
    const [artefact,changeArtefact] = useState(null)

return (
    <>
    <ArtefactContext.Provider value={{artefact,changeArtefact}}>

    <Artefacts />
    <PushArtefacts />

    </ArtefactContext.Provider>
    <LogOut />

    
    </>
)


}

export default ArtefactContext