import useAccess from "./useAccessContextHook"

export default function useRefreshToken(){


const refreshToken = async () =>{
try{  

const response = await fetch("http://localhost:3000/token/refreshToken")
const token =  await response.json()
return token.accessToken
}
catch(err){
    return err
}
}

return refreshToken

}