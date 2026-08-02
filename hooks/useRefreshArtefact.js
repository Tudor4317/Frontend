         import { useContext } from "react"
import ArtefactContext from "../src/Components/protected/Dashboard"




const useRefreshArtefact = () =>{
const {artefact,changeArtefact,user,setUser} = useContext(ArtefactContext)

    return {artefact,changeArtefact,user,setUser}

}

export default useRefreshArtefact