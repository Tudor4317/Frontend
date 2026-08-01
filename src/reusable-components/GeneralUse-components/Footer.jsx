import FooterCss from "./Footer.module.css"


const Footer = () =>{
    return (
     <footer className={FooterCss.footer}>
        <p className={FooterCss.copyright}> © 2026 DigITAll — Gear Maniacs Jr.</p>
        <div className={FooterCss.links}>
            <a href="">Github</a>
            <a href="">Contact</a>
        </div>
     </footer>
    )
}

export default Footer