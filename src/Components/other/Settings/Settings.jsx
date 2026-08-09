import SettingsCss from "./Settings.module.css"
import { Outlet } from "react-router-dom"
import SettingsNav from "./SettingsNav"

const Settings = () => {

return (
    <div className={SettingsCss.container}>
        <nav className={SettingsCss.navbar}>
    <SettingsNav />
        </nav>
        <section className={SettingsCss.panel}>
            <Outlet />
        </section>
    </div>
)
}

export default Settings