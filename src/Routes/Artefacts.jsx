import { useState } from "react";
import { useEffect } from "react";


export default function Artefacts(){
const [artefacts,changeArtefacts] = useState([])
const [token,changeToken] = useState(null)


const fetchData = () =>{
fetch("http://api--express-api-1:3000/users/artefacts",{
    headers :{
        "Authorization" : token 
    }
})
.then((artefacts) =>{  return artefacts.json()})
.then((artefacts) => {changeArtefacts(artefacts.artifacts)})


}

console.log(artefacts)

useEffect(() =>{

fetchData()


},[])

return (
    <>
       
    {artefacts.map((data) =>{return <div key={data.artifactId}>{data.artifact} Crated by {data.userId}</div>})}
     <button onClick={() => {return fetchData() }}>refresh</button> 
    </>
)



}
