
import {useForm} from "react-hook-form"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState,createContext,useContext} from "react";
import AccessContext from "../../ContextAPI/accessContext";

const schema = z.object({

    artefactName: z.string().min(3,"Artefact name must be at least 3 characters"),
    description : z.string().max(100,"Maximum "),
    isPublic : z.boolean()

})


const PushArtefacts = () =>{
    const {access} = useContext(AccessContext)
    
    const navigate = useNavigate()
    const {register,handleSubmit,formState : {errors,isSubmitting},setError} = useForm({resolver : zodResolver(schema), defaultValues : {
        isPublic : false
    }});

    const onSubmit = async (values) =>{
        try{
            
            console.log(values)
      const response =  await fetch("http://localhost:3000/users/artefacts",{
            method: "PUT",
            credentials: "include",
            headers :{
            'Accept': 'application/json',
            'Content-Type': 'application/json' ,
            'Authorization' : access
            },
            body : JSON.stringify(values)
        })
      
      
        const data = await response.json()
       

        if(!response.ok){
            throw new Error(data)
        }


        }
        catch(err){
            setError("root",{
                message : err.message || "Unexpected error"
            })
        }
    }


    return (
        <div className="submit-form">
            <form onSubmit={handleSubmit(onSubmit)}>

        <input {...register("artefactName")} type="text" placeholder="Name" />
        {errors.artefactName && (<div className="error">{errors.artefactName.message}</div>)}
        <label>Visible </label>
        <input {...register("isPublic")} type="checkbox"/>
        {errors.isPublic && (<div className="error">{errors.isPublic.message}</div>)}

        <input {...register("description")} type="text" placeholder="Description" />

        {errors.description && (<div className="error">{errors.description.message}</div>)}

        <button disabled={isSubmitting} type="submit">{isSubmitting ? "Loading..." : "Send"}</button>
        {errors.root && <div className="error">{errors.root.message}</div>}

            </form>


        </div>
    )
}

export default PushArtefacts