
import { useEffect,useState} from "react"
import { useParams } from "react-router-dom";
import useAccess from "../../../../hooks/useAccessContextHook"
import ArtefactCss from "./PreviewArtefact.module.css"






const ArtefactData = () =>{
    const {access} = useAccess()
    const [data,changeData] = useState(null)
    const [error,setError] = useState({state : false, message : null})
    const {artefactId} = useParams()

    useEffect(() =>{
        const fetchData = async () =>{
            try{
            const response = await fetch(`http://localhost:3000/users/second/artefacts/metadata/${artefactId}`,{
                
          
                method : "GET",
                headers : {
                     'Authorization' : access,
                }
            })

            const data = await response.json()
            console.log(data)
            if(!response.ok){
                throw new Error(data.message)
            }

            changeData(data)
            return;

        }
        catch(err){
           
            setError({state: true, message: err.message || "Unexpected error"})
            return;
        }
        }

        fetchData()
    },[])

    if(error.state){
        return (<p className={ArtefactCss.error}>{error.message}</p>)
    }


    
    if(data === null){
        return (<p>Loading...</p>)
    }

   
    return(
        <section className={ArtefactCss.metadata}>

            <ul>
                
                <li className={ArtefactCss.title}>{data.artefact.artefact || "No artefact name provided"}</li>
                <label>Digging site: </label>
                <li className={ArtefactCss.item}>{data.artefact.site || "No site  provided"}</li>
                <label>Author:</label>
                <li className={ArtefactCss.item}>{data.artefact.author || "No author name provided"}</li>
                <label>Date:</label>
                <li className={ArtefactCss.item}>{data.artefact.date || "No date provided"}</li>
                <label>Colour:</label>
                <li className={ArtefactCss.item}>{data.artefact.colour || "No colour provided"}</li>
                <label>Material:</label>
                <li className={ArtefactCss.item}>{data.artefact.material || "No material provided"}</li>
                <label>Note:</label>
                <li className={ArtefactCss.item}>{data.artefact.note || "No note provided"}</li>
                <label>Visibility:</label>
                <li className={ArtefactCss.item}>{data.artefact.isPublic === true ? "Public" : "Private"}</li>
                
                
                
               
               

            </ul>

        </section>
    )



}


export default ArtefactData