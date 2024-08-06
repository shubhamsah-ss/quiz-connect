"use client"
import EditDialog from "@/components/admin/EditDialog"
import AlertMessage from "@/components/AlertMessage"
import EditTopic from "@/components/form/admin/edit-topic"
import { makeDeleteRequest } from "@/lib/apiResponse"
import { CategoryType } from "@/types/categories"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { toast } from "sonner"

const handleDelete = async (id: string) => {
    const response = await makeDeleteRequest(`/admin/topics/delete?topic=${id}`)

    if (response.success) {
        toast.success(`${response.message} Refresh table to see changes.`)
    } else {
        toast.error(response.error, {
            className: "bg-destructive text-white border-0"
        })
    }
}

export const columns: ColumnDef<CategoryType>[] = [
    {
        accessorKey: "name",
        header: "Topic name",
    },
    {
        accessorKey: "subject",
        header: "Subject",
        cell: ({ row }) => {
            const subject: { name: string } = row.getValue("subject")
            return subject.name
        }
    },
    {
        accessorKey: "question",
        header: "Total Questions",
        cell: ({ row }) => {
            const questions: string[] = row.getValue("question")
            return questions.length || 0
        }
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const createdAt = row.getValue("createdAt")
            const date = format(new Date(createdAt as string), "dd MMMM yyyy")
            return date
        }
    },
    {
        header: "Actions",
        cell: ({ row }) => {
            const id = row.original.id
            const name = row.original.name
            const subject: {
                id: string,
                name: string
            } = row.getValue("subject")
            

            return (
                <div className="flex gap-4">
                    <EditDialog title="Update Subject">
                        <EditTopic id={id} name={name} defaultInput={subject} />
                    </EditDialog>
                    <AlertMessage trigger="Delete" onConfirm={() => handleDelete(id)} />
                </div>
            )
        }
    }
]