import { useParams } from "react-router-dom"
import { useState,useEffect } from "react"


const ProfilePage = () =>{
    const [error,setError] = useState({state : false, message : {}})
    const [user,setUser] = useState(null)
    const {username} = useParams()
    console.log(username)

useEffect(() =>{

const userFetch = async () =>{
try{

    const response= await fetch(`http://localhost:3000/users/generalInfo/${username}`,{
        method : "GET"
    })

    const userData  = await response.json()


  

    if(!response.ok){
        throw new Error(userData)
     
    }

    
    setUser(userData)


}
 catch(err){
    setError({state : true, message : err?.message || "Unexpected error"})
    return;
 }



}

userFetch()


},[])
if(error.state){
return (<p className="error">{error.message}</p>)
}

if(!user){
    return (<p>Loading...</p>)
}

if(!user.data){
    return (<p>No user found !</p>)
}


return (
    <>
   
   
    { user.data.artefacts.length === 0 && (<p>No public artefacts</p>)}
    
    <div className="user-info">
        <h1 className="Username">{user.data.username}</h1>
        <p className="Description">{user.data.description || "No description available"}</p>
    </div>
    <div className="user-artefacts">

        {user.data.artefacts.map((artefact) =>{return <div className="Artefact" key={artefact.artefactId}><p>{artefact.artefact}</p> <p>{artefact.description}</p></div>})}

    </div>
    </>
)


}

export default ProfilePage