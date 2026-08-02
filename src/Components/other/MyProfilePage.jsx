import { useEffect,useState } from "react"
import useRefreshArtefact from "../../../hooks/useRefreshArtefact"
import { useParams } from "react-router-dom"
import ProfileCss from "./MyProfilePage.module.css"
const MyProfilePage = () => {

    const [error,setError] = useState({state : false, message : {}})
    const [user,setUser] = useState(null)
    const username = useParams()
   
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
return (<p className={ProfileCss.error}>{error.message}</p>)
}

if(!user){
    return (<p className={ProfileCss.bar}>Loading...</p>)
}

if(!user.data){
    return (<p className={ProfileCss.error}>No user found !</p>)
}


return (
    <>
   
   
    { user.data.artefacts.length === 0 && (<p>No public artefacts</p>)}
    <main className={ProfileCss.container}>

    <section className={ProfileCss.info}>

        <h1 className={ProfileCss.username}>{user.data.username}</h1>
        <p className={ProfileCss.description}>{user.data.description || "No description available"}</p>
        <button className={ProfileCss.btn}>Edit profile</button>
    </section>

    <section className={ProfileCss.artefacts}>

        {user.data.artefacts.map((artefact) =>{return <article className={ProfileCss.artefact} key={artefact.artefactId}><p>{artefact.artefact}</p></article>})}

    </section>
    </main>
    </>
)



}


