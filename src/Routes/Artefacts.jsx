import { useState } from "react";
import { useEffect } from "react";


export default function Artefacts(){
const [artefacts,changeArtefacts] = useState([])

const fetchData = () =>{
fetch("http://localhost:3000/users/artefacts",{
    headers :{
        "Authorization" : "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlYzU4NDc2My1iNTRhLTQ0MGQtYmM5My0yZDEyNGRmNGYzZDIiLCJpYXQiOjE3ODMxMDk3NjUsImV4cCI6MTc4MzcxNDU2NX0.CZgBjXGnD38ZVUIK0R2dba6h5_1nY1PnWYNbyd066pTJJcs6BPlJio2u_5D8YEAFf4C-nw0BGfmvX069XEkyJZ8W99XX2Bpz3tmp5Jl_l-8qH0JnE1b7jAigEldZgOXAVoHAmnL6Np1Vjzx6ApPU7ZbvayfHm6eEiqpXu9V4hNNYPWnCiqSZJ_TyLcOXojAb4rqUwmBV2b0oggRUOnZTP8RmWA0fbXnqkT_uDkr-D7PE9cTW8SYglEkkM42qLHx5CZoQPaRTd7si2T8d-n-eY8qP1vtwAowOc8q-ZLGO_Lg_Gijjz0n0KoOBjpIcQYdBQzpTqt9eweYxavuQiORYm5LLT1j1FHKqmZoqbjJ9NpUtMklmW8tlbIc2-bMEs-NOWQ-DMK3eoyQw_Q33yr72ZjQctwQn5lkH_TVryE2K0Q1JunW4zd-qa3GBKEwZtY4yzy7Abb2J-ufa_yrUyf-vob9s0_koKNwBuEuUp4ZynBL2_iCrRi2gJiGdCgupKAOI0b3qKZXYhXB3VqBVGfnkegLkfPs-B5fSL-2Rx9_XRGNlQkmc2UtHDMTEpKE9cQmaCX5E4Vct8Yqpic_K9PVnMpW6m1xr8h2g6aJsDbcykasAOM_xPu_aTTlMvyeZo52sXoJT486tRUsbY5xAkPnJ9-70wxMC3RfmQugTadAL6p0"
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