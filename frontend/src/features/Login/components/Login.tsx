import { Button, Card, Hero, Input } from "react-daisyui";
import { useForm } from "react-hook-form";
import { LoginForm } from "../types/LoginForm";

export function Login() {
    const { register, handleSubmit } = useForm<LoginForm>();

    const onSubmit = (data: LoginForm) => {
        console.log(data);
    }

    return (
        <Hero>
            <Hero.Content>
                <h1>Login</h1>
                <p>Login to your account</p>
            </Hero.Content>
            
            <Card>
                <Card.Body>
                    <form onSubmit={() => handleSubmit(onSubmit)}>
                        <label>Username</label>
                        <Input type="text" placeholder="Username" {...register("username")} />
                        <label>Password</label>
                        <Input type="password" placeholder="Password" {...register("password")} />
                        <Button type="submit">Login</Button>
                    </form>
                </Card.Body>
            </Card>
        </Hero>
    )
}
