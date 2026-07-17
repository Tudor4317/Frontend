import useAccess from "../../../hooks/useAccessContextHook"


export default function Home(){
const {access} = useAccess()
console.log(access)
    return(
        <div>
            <h1>Home</h1>
        </div>
    )


}