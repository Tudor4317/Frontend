import { createContext,useState } from "react"
import SearchBar from "../../reusable-components/GeneralUse-components/SearchBar"
import UserInfo from "./UserInfo"
import SearchCss from "./GlobalSearch.module.css"
const UserDataContext = createContext(null)

export const GlobalSearch = () =>{

const [userData,setUserData] = useState(null)



return (


<main className={SearchCss.container}>
<UserDataContext.Provider value={{userData,setUserData}}>

<section className={SearchCss.searchbar}>
<SearchBar />
</section>

<section className={SearchCss.users}>
<UserInfo />
</section>

</UserDataContext.Provider>
</main>



)




}

export default UserDataContext
