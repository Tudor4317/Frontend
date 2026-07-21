
import {useForm} from "react-hook-form"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState,createContext,useContext} from "react";
import AccessContext from "../../ContextAPI/accessContext";


const schema = z.object({
    email : z.string().email("Email must be valid"),
    password: z.string().min(8,"Password must be at least 8 characters"),
    username: z.string().min(3, "Username must be at least 3 characters"),

})





export default function SignUpForm(){
    const {access,changeAccess} = useContext(AccessContext)
    const navigate = useNavigate()
    const {register,handleSubmit,formState : {errors,isSubmitting},setError} = useForm({resolver : zodResolver(schema)});
    const onSubmit =  async (data) =>{
        try{
            
      const response = await fetch("http://localhost:3000/users",{
            method : 'POST',
            credentials: 'include',
            headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'   
            },
            body : JSON.stringify(data)
        })

      const userData = await response.json()
        console.log(userData.message)


        if(!response.ok){
           
            throw new Error(userData.message)

        }
        
        changeAccess(userData.accessToken)

        navigate("/Dashboard")

        }
 

        catch(err){
         
            setError("root",{
                message : err.message || "Unexpected error"
            })
           
        }
    
    }
    

console.log(access)
    return (
        <form  onSubmit={handleSubmit(onSubmit)}>


            <input  {...register("email")} type="text"  placeholder="Email"/>
            {errors.email && (<div className="error">{errors.email.message}</div>)}


            <input {...register("username")}type = "text" placeholder="username"/>
            {errors.username && (<div className="error">{errors.username.message}</div>)}


            <input {...register("password")}  type = "password" placeholder="password"/>
            {errors.password && (<div className="error">{errors.password.message}</div>)}


            <button disabled={isSubmitting} type="submit">{isSubmitting ? "Loading" : "Submit"}</button>
              {errors.root && (<div className="error">{errors.root.message}</div>)}
        </form>
    )
}
