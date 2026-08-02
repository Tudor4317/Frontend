import { useState,useEffect} from "react";
import useRefreshToken from "../../../hooks/useRefreshToken";
import useAccess from "../../../hooks/useAccessContextHook";
import useRefreshArtefact from "../../../hooks/useRefreshArtefact";
import LogOut from "../GeneralUse-components/LogOut";
import { useNavigate } from "react-router-dom";
const Artefact = () =>{

const navigate = useNavigate()
const {artefact,changeArtefact,setUser} = useRefreshArtefact()

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
      setUser(responseData.user)


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

   {(artefact.map((values) =>{return <div className="container" onClick={() => navigate(`/dashboard/workshop/${values.artefactId}`)} key={values.artefactId}>Artefact Name : {values.artefact}</div>}))}


   </div>

   {/*  description : {values.description ? (<p>{values.description}</p>): (<p>No description used</p>)} */}

</>

)


}

export default Artefact


