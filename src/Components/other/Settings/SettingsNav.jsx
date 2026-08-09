import SettingsCss from "./SettingsNav.module.css"
import { useNavigate } from "react-router-dom"

const SettingsNav = () =>{
const navigate = useNavigate()
    return (

        <>
        <button onClick={() => navigate("credits") } className={SettingsCss.btn}>Credits</button>

 
        </>
    )
}

export default SettingsNav