import { useState,useEffect} from "react";
import useRefreshToken from "../../../hooks/useRefreshToken";
import useAccess from "../../../hooks/useAccessContextHook";
import useRefreshArtefact from "../../../hooks/useRefreshArtefact";
import LogOut from "../GeneralUse-components/LogOut";
const Artefact = () =>{
const {artefact,changeArtefact} = useRefreshArtefact()

// const [isFetching,stopFetching] = useState(true)

const [error,setError] = useState({state : false, message : {}})

const {access,changeAccess} = useAccess()



useEffect(() =>{
   const getArtefacts = async () =>{
      try{
         const response = await fetch("http://localhost:3000/users/artefacts", {
            method: "GET",
            headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : access
            }
         })

      const responseData = await response.json()

      if(!response.ok){
         throw new Error(responseData)
      }

      changeArtefact(responseData.artefacts)

      }

      catch(err){
      setError({state : true, message : err?.message || "Unexpected error"})
      return;
      }
   }
   getArtefacts()
},[artefact])

if(!artefact){

   return(<p>Loading...</p>)
}

if(error.state){
   return (
      <p>{error.message}</p>
   )
}


return(<>


{ artefact.length === 0 && (<p>No artefacts uploaded yet</p>)}


   <div className="Artefacts-Container">

   {(artefact.map((values) =>{return <div className="container" key={values.artefactId}>Artefact Name : {values.artefact} description : {values.description ? (<p>{values.description}</p>): (<p>No description used</p>)}</div>}))}


   </div>

</>

)


}

export default Artefact


