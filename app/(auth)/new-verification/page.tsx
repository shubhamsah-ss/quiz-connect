import NewVerificationForm from "@/components/form/NewVerificationForm"
import { Suspense } from "react"

const NewVerification = () => {
    return (
        <div>
            <Suspense>
                <NewVerificationForm />
            </Suspense>
        </div>
    )
}

export default NewVerification