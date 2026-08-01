import HomeMainCss from "./HomeMain.module.css"



const HomeMain = () =>{
    return (
        <main className={HomeMainCss.homeMain}>
        <section className={HomeMainCss.intro}>
        <p>
          DigITAll is a 2-part app made for archaeologists...
        </p>
      </section>

        <section className={HomeMainCss.arguments}>
            <h1 className={HomeMainCss.title}></h1>
            <div className={HomeMainCss.reasons}>
            <article className={`${HomeMainCss.reason} ${HomeMainCss.one}`}><h2>Easy to use</h2> <p></p></article>
            <article className={`${HomeMainCss.reason} ${HomeMainCss.two}`}><h2>Positive experiences</h2></article>
            <article className={`${HomeMainCss.reason} ${HomeMainCss.three}`}><h2>Open Source</h2> <p></p></article>
         
            </div>
        </section>
         <section className={HomeMainCss.join}>
        <h1>Join now for free!</h1>

        <div className={HomeMainCss.joinContent}>
          <p>
            DigITAll is Open Source and completely free, forever!
          </p>

          <button>Sign up now! →</button>
        </div>
      </section>

        </main>
    )
}

export default HomeMain