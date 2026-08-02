import HomeMainCss from "./HomeMain.module.css"
import { useNavigate } from "react-router-dom"


const HomeMain = () =>{
  const navigate = useNavigate()
    return (
        <main className={HomeMainCss.homeMain}>
        <section className={HomeMainCss.intro}>
        <p>
          DigITAll is a 2-part app made for archaeologists.The mobile app uses the phones Lidar sensor to scan an archaelogical artefact. Then,you can use the Desktop app to analyze the scanned artefacts and find out how they would match together.Whether you are an archaeologist or do archaeology as an hobby, DigITAll is the perfect app for you !
        </p>
      </section>

        <section className={HomeMainCss.arguments}>
            <h1 className={HomeMainCss.title}>Why DigITAll ?</h1>
            <div className={HomeMainCss.reasons}>
            <article className={`${HomeMainCss.reason} ${HomeMainCss.one}`}><h2>Easy to use</h2> <p>DigITAll is very user-friendly and accessible with a fun, modern UI. No need to download complicated source code or know specialty terminology. Anyone can use DigITAll!</p></article>
            <article className={`${HomeMainCss.reason} ${HomeMainCss.two}`}><h2>Positive experiences</h2> <p>Local archaeologist Gh. Natea himself said that this amazing app has helped him save over 4 hours of work every day!</p></article>
            <article className={`${HomeMainCss.reason} ${HomeMainCss.three}`}><h2>Open Source</h2> <p>We, Gear Maniacs Jr., are part of the Open Source community and publically share all of our code on our GitHub. We believe that, line by line, Open Source code can change the world!</p></article>
         
            </div>
        </section>
         <section className={HomeMainCss.join}>
        <h1>Join now for free!</h1>

        <div className={HomeMainCss.joinContent}>
          <p>
            DigITAll is Open Source and completely free, forever!
          </p>

          <button onClick={() => navigate("/signup")}>Sign up now! →</button>
        </div>
      </section>

        </main>
    )
}

export default HomeMain