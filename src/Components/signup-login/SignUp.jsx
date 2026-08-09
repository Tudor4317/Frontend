
import {useForm} from "react-hook-form"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState,createContext,useContext} from "react";
import AccessContext from "../../ContextAPI/accessContext";
import SignupCss from "./Signup.module.css"

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

        navigate("/home/dashboard/artefacts")

        }
 

        catch(err){
         
            setError("root",{
                message : err.message || "Unexpected error"
            })
           
        }
    
    }
    


    return (
        <main className={SignupCss.signup}>
           
           <h1 className={SignupCss.title}>Sign up now</h1>

        <section className={SignupCss.container}>
        <form  onSubmit={handleSubmit(onSubmit)}>


            <input  {...register("email")} type="text" className={`${SignupCss.bracket} ${SignupCss.email}`} placeholder="Email"/>
            {errors.email && (<div className={SignupCss.error}>{errors.email.message}</div>)}


            <input {...register("username")}type ="text" className={`${SignupCss.bracket} ${SignupCss.username}`} placeholder="username"/>
            {errors.username && (<div className={SignupCss.error}>{errors.username.message}</div>)}


            <input {...register("password")}  className={`${SignupCss.bracket} ${SignupCss.password}`} type = "password" placeholder="password"/>
            {errors.password && (<div className={SignupCss.error}>{errors.password.message}</div>)}
            {errors.root && (<div className={SignupCss.error}>{errors.root.message}</div>)}

            <button disabled={isSubmitting}  className={SignupCss.btn} type="submit">{isSubmitting ? "Loading" : "Sign up now !"}</button>
             <button type="button" onClick={() => navigate("/login")}   className={SignupCss.redirect} >I already have an account </button>
              
        </form>
        
        </section>
        </main>
    )
}
