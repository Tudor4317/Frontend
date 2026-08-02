import NavCss from "./DashboardNav.module.css"
import { useNavigate } from "react-router-dom"


const Navigator = () =>{
const navigate = useNavigate()

    return (
        

        <>
        
            {/* <div onClick={() => navigate("/foryou")} className={NavCss.you}>You</div> */}
            <div onClick={() => navigate("/search")} className={NavCss.explore}>Explore</div>
            <div onClick={() => navigate("/settings")} className={NavCss.settings}>Settings</div>
       </>
    )
}

export default Navigator