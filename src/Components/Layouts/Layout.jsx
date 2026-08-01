import { Outlet } from "react-router-dom";
import Header from "../../reusable-components/GeneralUse-components/Header";
import Footer from "../../reusable-components/GeneralUse-components/Footer";
import LayoutCss from "./Layout.module.css"
export default function Layout(){
    return (
  
        <div className={LayoutCss.layout}>

            <Header />

   

            <Outlet />

  

            <Footer />

        </div>
        
    )
}