import NavCss from "./DashboardNav.module.css"
import { useNavigate } from "react-router-dom"


const Navigator = () =>{
const navigate = useNavigate()

    return (
        

        <>
            <div className={NavCss.navigator}>
            {/* <div onClick={() => navigate("/foryou")} className={NavCss.you}>You</div> */}
            <div onClick={() => navigate("artefacts")} className={NavCss.item}>Artefacts</div>
            <div onClick={() => navigate("search")} className={NavCss.item}>Explore</div>
            <div onClick={() => navigate("/home/settings/credits")} className={NavCss.item}>Settings</div>
            <div onClick={() => navigate("/home/myprofile")} className={NavCss.item} >My profile</div>
            <div onClick={() => navigate("matching")} className={NavCss.item}>Match artefacts</div>
            </div>
       </>
    )
}

export default Navigator