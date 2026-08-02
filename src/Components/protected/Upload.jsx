import PushArtefacts from "../../reusable-components/Dashboard-components/PushArtefact"
import UploadCss from "./Upload.module.css"


const Upload = () =>{
    return (
        <main className={UploadCss.upload}>
            <PushArtefacts />
        </main>
    )
}

export default Upload