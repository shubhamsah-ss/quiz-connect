"use client"
import { Button } from "@/components/ui/button"
import { makeDeleteRequest } from "@/lib/apiResponse"
import { CategoryType } from "@/types/categories"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { toast } from "sonner"

const handleDelete = async (id: string) => {
    const response = await makeDeleteRequest(`/admin/categories/delete?category=${id}`)

    if (response.success) {
        toast.success(`${response.message} Refresh table to see changes.`, {
            className: "bg-green-600 text-white border-0"
        })
    } else {
        toast.error(response.error, {
            className: "bg-destructive text-white border-0"
        })
    }
}

export const columns: ColumnDef<CategoryType>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "subjects",
        header: "Total subjects",
        cell: ({ row }) => {
            const subjects: string[] = row.getValue("subjects")
            return subjects.length || 0
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
            const category = row.original.id
            return <Button onClick={() => handleDelete(category)} variant={"link"} className="text-red-500 hover:text-red-700 m-0 p-0">Delete</Button>
        }
    }
]