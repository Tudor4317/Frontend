import { Form } from "react-router";
import {useForm} from "react-hook-form"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

const schema = z.object({
    email : z.string().email("Email must be valid"),
    password: z.string().min(8,"Password must be at least 8 characters"),
    username: z.string().min(3, "Username must be at least 3 characters"),

})

export default function SignUpForm(){
    const navigate = useNavigate()
    const {register,handleSubmit,formState : {errors,isSubmitting},setError} = useForm({resolver : zodResolver(schema)});
    const onSubmit =  async (data) =>{
        try{
            console.log(data)
      const user = await fetch(`http://localhost:3000/users/`,{
            method : 'POST',
            headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'   
            },
            body : JSON.stringify({username : data.username, email : data.email, password : data.password})
        })

        navigate("/")

        }
        catch(err){
            setError("root",{
                message : err.message || "Unexpected error"
            })
        }
    
    }
    


    return (
        <form  onSubmit={handleSubmit(onSubmit)}>


            <input  {...register("email")} type="text"  placeholder="Email"/>
            {errors.email && (<div>{errors.email.message}</div>)}


            <input {...register("username")}type = "text" placeholder="username"/>
            {errors.username && (<div>{errors.username.message}</div>)}


            <input {...register("password")}  type = "password" placeholder="password"/>
            {errors.password && (<div>{errors.password.message}</div>)}


            <button disabled={isSubmitting} type="submit">{isSubmitting ? "Loading" : "Submit"}</button>
              {errors.root && (<div>{errors.root?.message}</div>)}
        </form>
    )
}
