import { useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import useAccess from "../../../hooks/useAccessContextHook"
const ArtefactData = () =>{
    const {access} = useAccess()
    const [data,changeData] = useState(null)
    const [error,setError] = useState({state : false, message : null})
    const {artefactId} = useParams()

    useEffect(() =>{
        const fetchData = async () =>{
            try{
            const response = await fetch(`http://localhost:3000/users/artefacts/metadata/${artefactId}`,{
                
          
                method : "GET",
                headers : {
                     'Authorization' : access,
                }
            })

            const data = await response.json()
           
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
        return (<p className="error">{error.message}</p>)
    }


    
    if(data === null){
        return (<p>Loading...</p>)
    }

   
    return(
        <div className="MetaData">

            <ul>
                <li className="Artefact-Name">{data.artefact.artefact || "No name provided"}</li>
                <li className="site">{data.artefact.site || "No name provided"}</li>
                <li className="Author">{data.artefact.author || "No name provided"}</li>

            </ul>

        </div>
    )



}

export default ArtefactData