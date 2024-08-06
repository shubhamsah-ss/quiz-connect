"use client"
import EditDialog from "@/components/admin/EditDialog"
import AlertMessage from "@/components/AlertMessage"
import EditSubject from "@/components/form/admin/edit-subject"
import Tooltip from "@/components/Tooltip"
import { makeDeleteRequest } from "@/lib/apiResponse"
import { CategoryType } from "@/types/categories"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { toast } from "sonner"

const handleDelete = async (id: string) => {
    const response = await makeDeleteRequest(`/admin/subjects/delete?subject=${id}`)

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
        header: "Subject name",
    },
    {
        accessorKey: "categories",
        header: "Total categories",
        cell: ({ row }) => {
            const categories: {
                category: {
                    name: string
                }
            }[] = row.getValue("categories")

            // Extract subject names
            const names = categories.map(sub => sub.category.name)

            return (
                <Tooltip buttonLabel={`${categories?.length || 0}`} tooltip={names} />
            )
        }
    },
    {
        accessorKey: "topics",
        header: "Total topics",
        cell: ({ row }) => {
            const topics: string[] = row.getValue("topics")
            return topics?.length || 0
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
            const categories: {
                category: {
                    id: string,
                    name: string
                }
            }[] = row.getValue("categories")

            const categoriesArray: {
                id: string,
                name: string
            }[] = categories.map(sub => sub.category)

            return (
                <div className="flex gap-4">
                    <EditDialog title="Update Subject">
                        <EditSubject id={id} name={name} defaultInputs={categoriesArray} />
                    </EditDialog>
                    <AlertMessage trigger="Delete" onConfirm={() => handleDelete(id)} />
                </div>
            )
        }
    }
]