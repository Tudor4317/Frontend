import {useLocation,Outlet,Navigate, } from "react-router-dom";
import { useEffect } from "react";
import useAccess from "../../hooks/useAccessContextHook";;
import { useState } from "react";


export default  function  CheckAuth(){
const {access,changeAccess} = useAccess()
const [authorized,setAuthorization] = useState(null)
const location = useLocation()

useEffect(() =>{

if(access){
    setAuthorization(true)
    return;
}

const refreshToken = async () =>{
   try{
    
    const response = await fetch("http://localhost:3000/token/refreshToken", {
        credentials : "include"
    })
    const data = await response.json()



    if(!response.ok){
        setAuthorization(false)
        return;
    }
    changeAccess(data.accessToken)
    setAuthorization(true)
  

   }
   catch(err){

    setAuthorization(false)
    return;

   }

}


 refreshToken()


},[])



if(authorized === null){
    return <h1>Loading...</h1>
}


return(
    
    authorized ? <Outlet /> : <Navigate to="/login" state={{from : location}} replace />                
)



}

