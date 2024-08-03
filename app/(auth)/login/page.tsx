import LoginForm from "@/components/form/form-login"
import { Suspense } from "react"


const Login = () => {
    return (
        <div className="max-w-md w-full mx-auto">
            <Suspense>
                <LoginForm />
            </Suspense>
        </div>
    )
}

export default Login