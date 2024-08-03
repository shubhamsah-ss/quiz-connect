import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { signIn } from 'next-auth/react'
import { IconBrandGithubFilled, IconBrandGoogleFilled } from '@tabler/icons-react'
import { BottomGradient } from '@/components/BottomGradient'

const Socials = () => {

    const onClick = async(provider: "google" | "github") => {
        try {
            const result = await signIn(provider, { 
                callbackUrl: DEFAULT_LOGIN_REDIRECT
            })
            if(result?.error) throw new Error(result?.error)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <button
                type='button'
                onClick={() => onClick("github")}
                className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            >
                <IconBrandGithubFilled className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    GitHub
                </span>
                <BottomGradient />
            </button>
            <button
                type='button'
                onClick={() => onClick("google")}
                className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            >
                <IconBrandGoogleFilled className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    Google
                </span>
                <BottomGradient />
            </button>

        </div>
    )
}

export default Socials