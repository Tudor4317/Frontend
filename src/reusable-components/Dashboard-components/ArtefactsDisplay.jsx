import { useState,useEffect} from "react";
import useRefreshToken from "../../../hooks/useRefreshToken";
import useAccess from "../../../hooks/useAccessContextHook";
import useRefreshArtefact from "../../../hooks/useRefreshArtefact";
import LogOut from "../GeneralUse-components/LogOut";
import { useNavigate } from "react-router-dom";
import ArtefactCss from "./ArtefactDisplay.module.css"


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
      // setUser(responseData.user)


      }

      catch(err){
      setError({state : true, message : err?.message || "Unexpected error"})
      return;
      }
   }
   getArtefacts()
},[access])

if(!artefact){

   return(<p>Loading...</p>)
}

if(error.state){
   return (
      <p className={ArtefactCss.error}>{error.message}</p>
   )
}


return(<>


{ artefact.length === 0 && (<p className={ArtefactCss.text}>No artefacts uploaded yet</p>)}

<div className={ArtefactCss.container}>
   
  

   {(artefact.map((values) =>{return <article className={ArtefactCss.artefact} key={values.artefactId}>Artefact Name : {values.artefact} <button  onClick={() => navigate(`/home/workshop/${values.artefactId}`)} className={ArtefactCss.view}>View</button></article>}))}
       <button onClick={() => navigate("/home/upload")} className={ArtefactCss.btn}>
           upload →
           </button>
</div>
  


</>

)


}

export default Artefact


