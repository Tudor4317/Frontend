import UserDataContext from "../src/Components/other/GlobalSearch"
import { useContext } from "react"



const useUserDataContext = () =>{
const {userData,setUserData} = useContext(UserDataContext)

return {
    userData,setUserData
}


}

export default useUserDataContext