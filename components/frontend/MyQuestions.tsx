"use client"
import { columns } from '@/components/table/QuestionColumns'
import { DataTable } from '@/components/table/DataTable'
import { makeGetRequest } from '@/lib/apiResponse'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { QuestionsType } from '@/types/quiz'

const MyQuestions = () => {

    return (
        <div>
            <DataTable columns={columns} url='/questions/user' />
        </div>
    )
}

export default MyQuestions