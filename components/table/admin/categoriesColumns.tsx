"use client"
import EditDialog from "@/components/admin/EditDialog"
import AlertMessage from "@/components/AlertMessage"
import EditCategory from "@/components/form/admin/edit-category"
import Tooltip from "@/components/Tooltip"
import { makeDeleteRequest } from "@/lib/apiResponse"
import { CategoryType } from "@/types/categories"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { toast } from "sonner"

const handleDelete = async (id: string) => {
    const response = await makeDeleteRequest(`/admin/categories/delete?category=${id}`)

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
        header: "Category name",
    },
    {
        accessorKey: "subjects",
        header: "Total subjects",
        cell: ({ row }) => {
            const subjects: {
                subject: {
                    name: string
                }
            }[] = row.getValue("subjects")

            // Extract subject names
            const names = subjects.map(sub => sub.subject.name)

            return (
                <Tooltip buttonLabel={`${subjects?.length || 0}`} tooltip={names} />
            )
        }
    },
    {
        accessorKey: "questions",
        header: "Total Questions",
        cell: ({ row }) => {
            const questions: string[] = row.getValue("questions")
            return questions?.length || 0
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

            return (
                <div className="flex gap-4">
                    <EditDialog title="Update Category">
                        <EditCategory id={id} name={name} />
                    </EditDialog>
                    <AlertMessage trigger="Delete" onConfirm={() => handleDelete(id)} />
                </div>
            )
        }
    }
]