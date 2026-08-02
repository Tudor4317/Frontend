import WorkshopCss from "./Workshop.module.css"
import ArtefactData from "../../reusable-components/Dashboard-components/ArtefactMetadata"
import ArtefactObj from "../../reusable-components/Dashboard-components/Artefact3dObj"


const Workshop = () =>{

return(<>
 <main className={WorkshopCss.container}>
        
        <section className={WorkshopCss.artefact}>
            <ArtefactObj />
        </section>

        <section className={WorkshopCss.metadata}>
            <ArtefactData />
        </section>


        </main>
    </>
       
)
}

export default Workshop