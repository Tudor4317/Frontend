import { useForm } from "react-hook-form";
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AccessContext from "../../ContextAPI/accessContext";

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


        navigate("/dashboard")

    }


    catch(err){
         
       return  setError("root", {
            message : err.message || "Unexpected error"
        })
    }
}

return  (
    <form onSubmit={handleSubmit(onSubmit)}>
<input {...register("email")} type="text" placeholder="Please enter your email"/>

{errors.email && (<div className="error">{errors.email.message}</div>)}

<input {...register("password")} type = "password" placeholder="Please enter your password"/>

{errors.password && (<div className="error">{errors.password.message}</div>)}

{errors.root && (<div className="error">{errors.root.message}</div>)}
<button disabled={isSubmitting} type="submit">{isSubmitting ? "Loading" : "Submit"}</button>

    </form>
)

}