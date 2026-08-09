import HeaderCss from "./Header.module.css"
import { useNavigate } from "react-router-dom"


const Header = () =>{
    const navigate = useNavigate()
    return (
<header className={HeaderCss.header}>


<div className={HeaderCss.main}>
<h1 onClick={() => navigate("/")} className={HeaderCss.title}>DigITAll</h1>
<p className={HeaderCss.subtitle}>Making archaeology easier</p>
</div>




<nav className={HeaderCss.nav}>
<button  className={HeaderCss.btn} onClick={() => navigate("/home/dashboard/artefacts") }>Dashboard</button>
<button  className={HeaderCss.btn} onClick={() => navigate("/home/dashboard/search")}>Explore</button>
<button className={HeaderCss.btn} onClick={() => navigate("/home/upload")}>Upload</button>
</nav>
</header>
    )
}

export default Header