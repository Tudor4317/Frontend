
import {useForm} from "react-hook-form"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState,createContext,useContext} from "react";
import AccessContext from "../../ContextAPI/accessContext";
import useRefreshArtefact from "../../../hooks/useRefreshArtefact"
import Pushcss from "./Pushartefact.module.css"
import { ColorUtils } from "three/examples/jsm/Addons.js";
const schema = z.object({

    artefactName: z.string().min(3,"Artefact name must be at least 3 characters"),
    description : z.string().max(100,"Description can't be longer than 100 characters"),
    isPublic : z.boolean(),
    file : z.instanceof(FileList).refine(files => files.length === 1, "Select one file").transform(files => files[0]).refine(file => file.name.endsWith(".obj"), "Only obj format allowed"),
    site : z.string().max(100,"Site name can't be longer than 50 characters").optional(),
    author : z.string().max(50,"Author name can't be longer than 50 characters").optional(),
    note: z.string().max(50,"Note can't be longer than 50 characters").optional(),
    colour: z.string().max(50,"Colour name can't be longer than 50 characters").optional(),
    material: z.string().max(50,"Material can't be longer than 50 characters").optional(),



})


const PushArtefacts = () =>{
    const {access} = useContext(AccessContext)
    const navigate = useNavigate()
    const {register,handleSubmit,formState : {errors,isSubmitting},setError} = useForm({resolver : zodResolver(schema), defaultValues : {
        isPublic : false,
    }});

    const onSubmit = async (values) =>{
        try{
            console.log(values)
            const Formdata = new FormData()
            Formdata.append("artefactName", values.artefactName)
            Formdata.append("description", values.description)
            Formdata.append("isPublic", values.isPublic)
            Formdata.append("file", values.file)
            Formdata.append("site", values.site)
            Formdata.append("author", values.author)
            Formdata.append("note", values.note)
            Formdata.append("colour", values.colour)
            Formdata.append("material", values.material)
            


            

            
      const response =  await fetch("http://localhost:3000/users/artefacts",{
            method: "PUT",
            credentials: "include",
            headers :{
        
            'Authorization' : access
            },
            body : Formdata
        })
      
      
        const data = await response.json()
       

        if(!response.ok){
            throw new Error(data)
        }

        navigate("/home/dashboard/artefacts")


        }
        catch({message}){
            
            setError("root",{
                message : message.message || "Unexpected error"
            })
        }
    }


    return (
        <div className={Pushcss.container} >
            <form onSubmit={handleSubmit(onSubmit)} >
        


        <div className={Pushcss.important}>


        <label className={Pushcss.optional}>Artefact info</label>

        <div className={Pushcss.field}>
        <input  {...register("artefactName")} className={Pushcss.bracket} type="text" placeholder="Name" />
        {errors.artefactName && (<div className={Pushcss.error}>{errors.artefactName.message}</div>)}
        </div>

        <div className={Pushcss.visibility}>
        <label className={Pushcss.sign}>Visible </label>
        <div className={Pushcss.field}>
        <input className={Pushcss.tick} {...register("isPublic")} type="checkbox"/>
        {errors.isPublic && (<div className={Pushcss.error}>{errors.isPublic.message}</div>)}
        </div>
        </div>

         <div className={Pushcss.field}>
        <input className={Pushcss.bracket} {...register("description")} type="text" placeholder="Description" />
        

        {errors.description && (<div className={Pushcss.error}>{errors.description.message}</div>)}
        </div>

        <div className={Pushcss.field}>
        <input className={Pushcss.file} {...register("file")} type="file" /> 
        {errors.file && (<div className={Pushcss.error}>{errors.file.message}</div>)}
        </div>

     
        </div>

        

        
        
        <div className={Pushcss.optionalinfo}>

        <label className={Pushcss.optional}>Optional info</label>
        

         <div className={Pushcss.field}>
        <input className={Pushcss.bracket} {...register("site")} type="text" placeholder="site" />
        {errors.site && (<div className={Pushcss.error}>{errors.site.message}</div>)}
        </div>
    
        <div className={Pushcss.field}>
        <input className={Pushcss.bracket} {...register("author")} type="text" placeholder="author name" />
        {errors.author && (<div className={Pushcss.error}>{errors.author.message}</div>)}
        </div>

        <div className={Pushcss.field}>
        <input className={Pushcss.bracket} {...register("colour")} type="text" placeholder="artefact colour" />
        {errors.colour && (<div className={Pushcss.error}>{errors.colour.message}</div>)}
        </div>

        <div className={Pushcss.field}>
        <input className={Pushcss.bracket} {...register("note")} type="text" placeholder="optional note" />
        {errors.note && (<div className={Pushcss.error}>{errors.note.message}</div>)}
        </div>

        <div className={Pushcss.field}>
        <input className={Pushcss.bracket} {...register("material")} type="text" placeholder="artefact material" />
        {errors.material && (<div className={Pushcss.error}>{errors.material.message}</div>)}
        </div>
        </div>

        <button className={Pushcss.bracket} disabled={isSubmitting} type="submit">{isSubmitting ? "Loading..." : "Send"}</button>
       
        {errors.root && <div className={Pushcss.error}>{errors.root.message}</div>}
           
            </form>


        </div>
    )
}

export default PushArtefacts