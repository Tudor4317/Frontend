         import { useContext } from "react"
import ArtefactContext from "../src/ContextAPI/artefactsRefresh"




const useRefreshArtefact = () =>{
const {artefact,changeArtefact} = useContext(ArtefactContext)

    return {artefact,changeArtefact}

}

export default useRefreshArtefact