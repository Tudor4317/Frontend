
import ArtefactData from "./Preview/PrevieArtefactData";
import ArtefactObj from "./Preview/Preview3dArtefact";
import ArtefactCss from "./ArtefactPreview.module.css"



const Preview = () =>{
    return(
        <main className={ArtefactCss.container}>
        
        <section className={ArtefactCss.artefact}>
            <ArtefactObj />
        </section>

        <section className={ArtefactCss.metadata}>
            <ArtefactData />
        </section>


        </main>
    )
}

export default Preview

