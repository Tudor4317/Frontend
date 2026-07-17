import { createContext, useState } from "react";


const AccessContext = createContext(null)

export function AccessComponent({children}){
    const [access,changeAccess] = useState(null)
    return(
        <AccessContext.Provider value={{access,changeAccess}}>
            {children }
        </AccessContext.Provider>
    )
}


export default AccessContext