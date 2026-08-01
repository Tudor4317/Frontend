import HeaderCss from "./Header.module.css"



const Header = () =>{
    return (
<header className={HeaderCss.header}>

<h1 className={HeaderCss.title}>DigITAll</h1>
<p className={HeaderCss.subtitle}>Making archaeology easier</p>

</header>
    )
}

export default Header