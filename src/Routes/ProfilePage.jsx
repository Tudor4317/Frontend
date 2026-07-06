import { useParams } from "react-router"
import { useState,useEffect } from "react"
import { ErrorRoute } from "./ErrorRoute"


export function ProfilePage(){ 
   const [profile,updateProfile] = useState(null)
   const [error,checkError] = useState(false)
    const {username} = useParams()
    useEffect(() =>{
        fetch(`http://localhost:3000/users/generalInfo/${username}`)

        .then((profile) =>{
            return profile.json()
     
        
    })
        .then((profile) =>{
            
            if(!profile.data){
                return checkError(true)

            }
   
            return updateProfile(profile)
            
   
    })
      
    },[])

    if(error){
        return (<ErrorRoute />)
    }
        if(!profile){
            console.log("loading")
        return <h1>Loading...</h1>
    }

    return (<>

    <div className="Main">
         <h1 className="Name">{profile.data.username}</h1>
        <p className="Description">test</p>
    </div>
     <div className= "Artefacts">
     {profile.data.artefacts.map((artefact) =>{return <div className="artefact" key={artefact.artefactId}>{artefact.artefact}, ArtefactId : {artefact.artefactId}, CreatedAt : {artefact.date}</div>})}</div>
    
    </>
    )}