import { useForm } from "react-hook-form";
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AccessContext from "../../ContextAPI/accessContext";
import LoginCss from "./Login.module.css"

const schema = z.object({
    email : z.string().email("Email must be valid !"),
    password : z.string().min(1,"Password is required")
})

export default function LogIn(){

    const navigate = useNavigate()
    const {register,handleSubmit,formState: {errors,isSubmitting}, setError} = useForm({resolver : zodResolver(schema)})
    const {access,changeAccess} = useContext(AccessContext)
const onSubmit = async (data) =>{
    try{


        
        const response = await fetch("http://localhost:3000/users/login",{
            method : "POST",
            credentials : 'include',
            headers :{
                'Accept' : "application/json",
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(data)

        })

        const userData = await response.json()

        
     if(!response.ok){
         
    throw new Error(userData.message)

}

changeAccess(userData.accessToken)


        navigate("/home/dashboard/artefacts")

    }


    catch(err){
         
       return  setError("root", {
            message : err.message || "Unexpected error"
        })
    }
}

return  (
  <main className={LoginCss.login}>
           
           <h1 className={LoginCss.title}>Log in</h1>

        <section className={LoginCss.container}>
        <form  onSubmit={handleSubmit(onSubmit)}>


            <input  {...register("email")} type="text" className={`${LoginCss.bracket} ${LoginCss.email}`} placeholder="Email"/>
            {errors.email && (<div className={LoginCss.error}>{errors.email.message}</div>)}



            <input {...register("password")}  className={`${LoginCss.bracket} ${LoginCss.password}`} type = "password" placeholder="password"/>
            {errors.password && (<div className={LoginCss.error}>{errors.password.message}</div>)}
            {errors.root && (<div className={LoginCss.error}>{errors.root.message}</div>)}

            <button disabled={isSubmitting}  className={LoginCss.btn} type="submit">{isSubmitting ? "Loading" : "Log in"}</button>
           
              
        </form>
        </section>
        </main>
)

}