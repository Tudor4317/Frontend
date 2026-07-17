import { createContext,useState } from "react";

const ArtefactContext= createContext(null)

export const ArtefactRefresh = ({children}) =>{

const [artefact,changeArtefact] = useState(null)
return (
    <ArtefactContext.Provider value={{artefact,changeArtefact}}>
        {children}
    </ArtefactContext.Provider>
)

}

export default ArtefactContext