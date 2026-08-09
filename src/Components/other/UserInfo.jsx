import { useState,useEffect } from "react"
import useUserDataContext from "../../../hooks/useUserDataContext"
import { useNavigate } from "react-router-dom"
import Usercss from "./UserInfo.module.css"

const UserInfo = () =>{
    const navigate = useNavigate()
// const [error,setError] = useState({status: false,message: null})
const {userData,setUserData} = useUserDataContext()

 

        if(userData === null) {
             return (<p className={Usercss.empty} >Start searching for a user</p>)

        }
  
            if(!userData.artefacts){

                return (
                    <div className={Usercss.username} onClick={() => navigate(`/profile/${userData.username}`)}>{userData.username}</div>
                )

            }

return(
    <div className={Usercss.container}>
        <article className={Usercss.username} onClick={() => navigate(`/profile/${userData.username}`)}>{userData.username}</article>
        {userData.artefacts.length > 0 ? userData.artefacts.map((data) =>{return <div onClick={() => navigate(`/home/preview/${data.artefactId}`)} className={Usercss.artefact} key={data.artefactId}>{data.artefact} by {userData.username}</div>}) : "This user has no artefacts uploaded"}
    </div>
)



} 

export default UserInfo