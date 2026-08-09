
import { useEffect,useState,useRef } from "react"
import { Canvas,useFrame,useLoader,} from "@react-three/fiber"
import { FirstPersonControls, OrbitControls,GizmoHelper,GizmoViewcube, GizmoViewport,useTexture } from "@react-three/drei"
import { useControls } from "leva"
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { useParams } from "react-router-dom";
import useAccess from "../../../../hooks/useAccessContextHook"
import ArtefactCss from "./Preview3dArtefact.module.css"







const Artefact = () =>{

const {access} = useAccess();
const {artefactId} = useParams()
const [obj,setObj] = useState(null)
const [error,setError] = useState({state : false, message: null})
useEffect(() =>{
    
    const fetchData = async () =>{
        
        
        try{
        const response = await fetch(`http://localhost:3000/users/second/artefacts/obj/${artefactId}`, {
            method : "GET",
            headers : {
                Authorization : access
            }
        })

    
        console.log(response)

        if(!response.ok){
            const {message} = await response.json()
            throw new Error(message)
        }
        const data = await response.text()
        const loader = new OBJLoader()
        const model = loader.parse(data)

   
        setObj(model)
   


    }
    

    
    catch(err){
      
        setError({state: true, message: err.message})
        return;

    }
    }
fetchData()


},[])


if(error.state){
    return null
}

if(obj === null){
    return null
}

return (
    <primitive object={obj}  />
)


}


const Animation = () =>{

    const boxRef = useRef()
    const {speed} = useControls({
        speed : {
            value : 0.01,
            min: 0.0,
            max: 0.03,
            step: 0.001

        }
    })

    
    useFrame(() =>{
        boxRef.current.rotation.x += speed
        boxRef.current.rotation.y += speed
        boxRef.current.rotation.z += speed
    })
    return(<>
        <mesh ref={boxRef}>
            <Artefact />
            <meshStandardMaterial  />
        </mesh>

        </>
    )
}

const ArtefactObj = () =>{

    return(
    <div className={ArtefactCss.obj}>

        <Canvas className={ArtefactCss.canvas}   camera={{position: [10,10,10], fov:5}}>

        <GizmoHelper alignment="bottom-left" margin={[70,70]}>

        <GizmoViewport />

        </GizmoHelper>
       
       <axesHelper args={[10]} />
       <gridHelper args={[10]} />
     

        <OrbitControls movementSpeed={3} minDistance={1} maxDistance={25} />
      
       <directionalLight position={[1,1,1]} intensity={5} />
        <Animation />
    
</Canvas>
        </div>
    )



}


export default ArtefactObj
