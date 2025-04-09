import { useForm, SubmitHandler } from "react-hook-form";
import { LoginForm } from "../types/LoginForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "../types/LoginSchema";

export function Login() {
    const { 
        register, 
        handleSubmit,
        formState: { errors }
    } = useForm<LoginForm>({
        resolver: zodResolver(loginFormSchema)
    })

    const onSubmit: SubmitHandler<LoginForm> = (data: LoginForm) => {
        console.log(data)
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Welcome back, Moonlite</h1>
              <p className="py-6">
                Back for another round?
              </p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <fieldset className="fieldset">
                  <label className="fieldset-label">Username</label>
                  <input type="text" className="input" placeholder="Username" {...register("username")} />
                  {errors.username && <p className="text-red-500">{errors.username.message}</p>}

                  <label className="fieldset-label">Password</label>
                  <input type="password" className="input" placeholder="Password" {...register("password")} />
                  {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                  <div><a className="link link-hover">Forgot password?</a></div>
                  <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
    )
}
