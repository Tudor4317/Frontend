import LogOut from "../../reusable-components/GeneralUse-components/LogOut";
import PushArtefacts from "../../reusable-components/Dashboard-components/PushArtefact";
import Artefacts from "../../reusable-components/Dashboard-components/ArtefactsDisplay";
export default function Dashboard() {
return (
    <>
    <Artefacts />
    <PushArtefacts />
    <LogOut />
    </>
)



}