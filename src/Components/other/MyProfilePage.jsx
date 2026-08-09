import { useEffect,useState } from "react"
import useRefreshArtefact from "../../../hooks/useRefreshArtefact"
import { useParams } from "react-router-dom"
import ProfileCss from "./MyProfilePage.module.css"
import useAccess from "../../../hooks/useAccessContextHook"
import { useNavigate } from "react-router-dom"
const MyProfilePage = () => {
    const {access} = useAccess()
    const [error,setError] = useState({state : false, message : {}})
    const [user,setUser] = useState(null)
    const username = useParams()
    const navigate = useNavigate()
   
useEffect(() =>{

const userFetch = async () =>{
try{

    const response= await fetch(`http://localhost:3000/users/info`,{
       
        method : "GET",
        headers :{
             Authorization : access,
        }
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
   
   
    
    <main className={ProfileCss.container}>

    <section className={ProfileCss.info}>
         <img className={ProfileCss.image} src=""></img>
        <h1 className={ProfileCss.username}>{user.data.username}</h1>
        <p className={ProfileCss.description}>{user.data.description || "No description available"}</p>
        <button onClick={() => navigate("/home/settings/credits")} className={ProfileCss.btn}>Edit profile</button>
    </section>

    <section className={ProfileCss.artefacts}>
        { user.data.artefacts.length === 0 && (<p className={ProfileCss.message}>No public artefacts</p>)}
        {user.data.artefacts.map((artefact) =>{return <article onClick={() => navigate(`/home/workshop/${artefact.artefactId}`)} className={ProfileCss.artefact} key={artefact.artefactId}><p>{artefact.artefact}</p></article>})}

    </section>
    </main>
    </>
)



}

export default MyProfilePage


