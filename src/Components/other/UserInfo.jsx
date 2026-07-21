import { useState,useEffect } from "react"
import useUserDataContext from "../../../hooks/useUserDataContext"
import { useNavigate } from "react-router-dom"


const UserInfo = () =>{
    const navigate = useNavigate()
// const [error,setError] = useState({status: false,message: null})
const {userData,setUserData} = useUserDataContext()

 

        if(userData === null) {
             return (<p className="username" >Start searching for a user</p>)

        }
  
            if(!userData.artefacts){

                return (
                    <div className="user" onClick={() => navigate(`/profile/${userData.username}`)}>{userData.username}</div>
                )

            }

return(
    <div>
        <p className="username" onClick={() => navigate(`/profile/${userData.username}`)}>{userData.username}</p>
        {userData.artefacts.length > 0 ? userData.artefacts.map((data) =>{return <div className="Artefacts" key={data.artefactId}>{data.artefact} by {userData.username}</div>}) : "This user has no artefacts uploaded"}
    </div>
)



} 

export default UserInfo