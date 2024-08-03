"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { IconLoader3 } from '@tabler/icons-react'
import { FormError } from '@/components/form/form-error'
import { FormSuccess } from '@/components/form/form-success'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { makeGetRequest } from '@/lib/apiResponse'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const NewVerificationForm = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const token = searchParams.get("token")
    const hasSubmittedRef = useRef(false)

    const onSubmit = useCallback(async () => {
        if (hasSubmittedRef.current || success || error) return
        hasSubmittedRef.current = true
        if (!token) {
            setError("missing token!")
            return
        }

        try {
            const response = await makeGetRequest(`/auth/token/verify/token?token=${token}`)

            if (response.success) {
                setSuccess(response.message)
                setError(undefined)
                router.replace("/login")
            }
            if (response.error) {
                setError(response.error)
                setSuccess(undefined)
            }

        } catch (error) {
            setError("Something went wrong!")
        }

    }, [token, success, error, router])

    useEffect(() => {
        if (!success && !error) onSubmit()
    }, [onSubmit, success, error])
    return (
        <div className='flex items-center justify-center w-screen h-screen'>
            <Card className='w-full md:w-[400px] mx-auto'>
                <CardHeader>
                    <h1 className='text-muted-foreground text-sm text-center animate-pulse'>
                        Confirming your verification
                    </h1>
                </CardHeader>
                <CardContent>
                    <div className='flex justify-center items-center w-full'>

                        {
                            !success && !error && <IconLoader3 size={45} className='text-muted-foreground animate-spin' />
                        }

                        <FormSuccess message={success} />
                        <FormError message={error} />
                    </div>
                </CardContent>
                {
                    (success || error) && (
                        <CardFooter className='flex justify-center'>
                            <Button variant={"link"} size={"sm"} className="mx-0 px-0">
                                <Link href={"/login"} className="text-center">Go to login</Link>
                            </Button>
                        </CardFooter>
                    )
                }
            </Card>
        </div>
    )
}

export default NewVerificationForm