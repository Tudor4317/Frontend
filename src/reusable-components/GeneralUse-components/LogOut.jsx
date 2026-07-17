import { useNavigate } from "react-router-dom"
import { useState } from "react"
import useAccess from "../../../hooks/useAccessContextHook"




const LogOut = () =>{
const {access,changeAccess} = useAccess()
const [error,setError] = useState(false)
const navigate = useNavigate()

const onSubmit = async () =>{
    
    try{
    const response =   await fetch("http://localhost:3000/users/logout",{
            method: "GET",
            credentials: "include",
            headers : {
                "Authorization" : access
            }
        })
        
        if(!response.ok){
            const data = await response.json()
            throw new Error(data)
        }
        changeAccess(null)
        navigate("/")

    }
    catch(err){
        setError(err.message)
        return;
    }
}

return (
    <>
    {error && (<p>{error}</p>)}
    <div>
        <button onClick={onSubmit}>logout</button>
    </div>
    </>
)

}

export default LogOut