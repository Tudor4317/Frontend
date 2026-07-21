import { createContext,useState } from "react"
import SearchBar from "../../reusable-components/GeneralUse-components/SearchBar"
import UserInfo from "./UserInfo"

const UserDataContext = createContext(null)

export const GlobalSearch = () =>{

const [userData,setUserData] = useState(null)



return (
<UserDataContext.Provider value={{userData,setUserData}}>
<SearchBar />
<UserInfo />
</UserDataContext.Provider>


)




}

export default UserDataContext
