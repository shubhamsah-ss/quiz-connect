"use client"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import QuestionDetails from "@/components/table/QuestionDetails"
import { makeDeleteRequest } from "@/lib/apiResponse"
import { toast } from "sonner"
import { QuestionsType } from "@/types/quiz"

const handleDelete = async(id:string) => {
    const response = await makeDeleteRequest(`/questions/delete?question=${id}`)

    if(response.success) {
        toast.success(`${response.message} Refresh table to see changes`)
        
    } else {
        toast.error(response.error, {
            className: "bg-destructive text-white border-0"
        })
    }
}

export const columns: ColumnDef<QuestionsType>[] = [
    {
        accessorKey: "",
        header: "Question",
        cell: ({ row }) => {
            return <Dialog>
                <DialogTrigger className="hover:underline underline-offset-4">View Question</DialogTrigger>
                <DialogContent>
                    <DialogTitle>Question Details</DialogTitle>
                    <DialogDescription>Created: {format(new Date(row.original.createdAt), "dd MMMM yyyy hh:mm:ss a")}</DialogDescription>
                    <QuestionDetails data={row.original} />
                </DialogContent>
            </Dialog>
        }
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => {
            const { name }: { name: string } = row.getValue("category")
            return name
        }
    },
    {
        accessorKey: "subject",
        header: "Subject",
        cell: ({ row }) => {
            const { name }: { name: string } = row.getValue("subject")
            return name
        }
    },
    {
        accessorKey: "topic",
        header: "Topic",
        cell: ({ row }) => {
            const { name }: { name: string } = row.getValue("topic")
            return name
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status: string = row.getValue("status")
            let color
            switch (status) {
                case "PENDING": {
                    color = "text-yellow-600"
                    break
                }
                case "APPROVED": {
                    color = "text-green-600"
                    break
                }
                case "REJECTED": {
                    color = "text-rose-600"
                    break
                }

            }

            return <p className={`${color}`}><strong>{status}</strong></p>
        }
    },
    {
        accessorKey: "approved",
        header: "Approved",
        cell: ({ row }) => {
            const status: string = row.getValue("status")
            if (status === "APPROVED") {
                const date = format(new Date(row.getValue("approved")), "dd MMMM yyyy hh:mm:ss a")
                return date
            }
            return null
        }
    },
    {
        accessorKey: "reports",
        header: "Reports",
        cell: ({ row }) => {
            // const question = row.original.id
            // return <Link href={{ pathname: "/reports", query: { question }}} className="text-blue-500 hover:text-blue-800 hover:underline underline-offset-4">View</Link>
            const reportCount: string = String((row.getValue("reports") as string[]).length)
            return <p className=""><strong>{reportCount.padStart(3, " ")}</strong></p>
        }
    },
    {
        header: "Actions",
        cell: ({ row }) => {
            const id = row.original.id
            return <Button onClick={() => handleDelete(id)} variant={"link"} className="text-red-500 hover:text-red-700 m-0 p-0">Delete</Button>
        }
    }
]