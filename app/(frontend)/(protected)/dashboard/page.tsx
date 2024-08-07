"use client"
import CustomTab from "@/components/frontend/CustomTab"
import Heading from "@/components/frontend/Heading"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { makeGetRequest } from "@/lib/apiResponse"
import { UserType } from "@/types/user"
import { useSession } from "next-auth/react"
import dynamic from "next/dynamic"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

const NewQuestionForm = dynamic(() => import("@/components/form/NewQuestionForm"))
const RequestForm = dynamic(() => import("@/components/form/RequestForm"))
const MyQuestions = dynamic(() => import("@/components/frontend/MyQuestions"))
const Profile = dynamic(() => import("@/components/frontend/Profile"))

const tabList = [
    {
        value: "myprofile",
        label: "My profile"
    },
    {
        value: "myquestions",
        label: "My questions"
    },
    {
        value: "newquestion",
        label: "Add new question",
    },
    {
        value: "newrequest",
        label: "Raise a request",
        className: "data-[state=active]:bg-[#643c2c] dark:data-[state=active]:bg-[#643c2c] data-[state=active]:text-white"
    }
]

const Dashboard = () => {

    const { status, data } = useSession()

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const [tabValue, setTabValue] = useState<string>(searchParams.get("tab") || "myProfile")

    const [user, setUser] = useState<UserType | null>(null)
    
    

    useEffect(() => {
        const fetchUser = async() => {
            const response = await makeGetRequest(`/users`)
            setUser({
                ...response.data.user,
                isOAuth: data?.user.isOAuth
            })
        }
        if(!user) fetchUser()
    }, [user, data])

    useEffect(() => {
        const tab = searchParams.get("tab") as string
        if (!tab) {
            const query = new URLSearchParams(searchParams)
            query.set("tab", "myprofile")
            router.replace(`${pathname}?${query.toString()}`)
            setTabValue("myprofile")
        } else {
            setTabValue(tab)
        }
    }, [pathname, searchParams, router])

    const tabContent = useMemo(() => [
        {
            value: "myprofile",
            content: <Profile user={user} />
        },
        {
            value: "myquestions",
            content: <MyQuestions />
        },
        {
            value: "newquestion",
            content: <NewQuestionForm />
        },
        {
            value: "newrequest",
            content: <RequestForm />,
        }
    ], [user])

    
    function handleValueChange(value: string) {
        const query = new URLSearchParams(searchParams)
        query.set("tab", value)
        setTabValue(value)
        router.replace(`${pathname}?${query.toString()}`)
    }
    
    if(status === "loading") return <p>Loading...</p>

    return (
        <div className="space-y-10 mb-10">
            <div className="flex items-center space-x-2">

                <Avatar className="h-14 w-14">
                    <AvatarImage src={user?.image as string || "/user.svg"} />
                    <AvatarFallback>{user?.name?.charAt(0) + "D" || "User"}</AvatarFallback>
                </Avatar>

                <Heading heading={`${user?.name?.split(" ")[0]}'s Dashboard`} />
            </div>

            <CustomTab defaultValue={"myProfile"} value={tabValue} handleValueChange={handleValueChange} tabList={tabList} tabContent={tabContent} />

        </div>
    )
}

export default Dashboard
