         import { useContext } from "react"
import ArtefactContext from "../src/Components/protected/Dashboard"




const useRefreshArtefact = () =>{
const {artefact,changeArtefact} = useContext(ArtefactContext)

    return {artefact,changeArtefact}

}

export default useRefreshArtefact