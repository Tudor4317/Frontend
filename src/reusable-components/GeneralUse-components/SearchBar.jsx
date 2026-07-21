import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import {useForm} from "react-hook-form"
import {check, z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import useUserDataContext from "../../../hooks/useUserDataContext";



const schema = z.object({

    username : z.string().min(1, "Field"),
    showArtefacts : z.boolean()


})





const SearchBar = () =>{
const {register,handleSubmit,formState : {errors,isSubmitting},setError} = useForm({resolver : zodResolver(schema), defaultValues :{
    showArtefacts : true
}})
const {userData,setUserData} = useUserDataContext()




    const fetchData = async (data) =>{
        try{
            const response = await fetch(`http://localhost:3000/users/generalInfo/${data.username}`,{
                method: "GET"

            })

            const values = await response.json()
            console.log(values)


            if(!response.ok){

                throw new Error(values.message)
            }

            if(!values.data){
                throw new Error("No user found by this username")
              
            }


            if(!data.showArtefacts){
            setUserData({username : values.data.username,  artefacts: null})
            return;
            }

            setUserData({username:values.data.username  , artefacts : values.data.artefacts})




        
        }
        catch(err){
            console.log(err)
            setError("root", {
                message : err.message || "Unexpected error"
            })
            return;

        }
    }
    




    return(
       <form onSubmit={handleSubmit(fetchData)}>

        <input {...register("username")} type="text" placeholder="search"  />
        {errors.username && (<div className="error">{errors.username.message}</div>)}

        <label>Display artefacts</label>
        <input {...register("showArtefacts")}  type="checkbox" />

        {errors.root && (<div className="error">{errors.root.message}</div>)}

        <button disabled={isSubmitting}>{isSubmitting ? "Loading.." : "search"}</button>


       </form> 
    )






}

export default SearchBar