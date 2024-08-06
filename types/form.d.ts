import React, { Dispatch } from "react"
import { UseFormReturn } from "react-hook-form"

export type FormInputProps = {
    form: UseFormReturn<any>,
    disabled?: boolean,
    name: string,
    label: string,
    type?: string,
    inputRest?: React.InputHTMLAttributes<HTMLInputElement>,
    rest?: React.ReactNode
}

type SelectItemsType = {
    id: string,
    name: string
}

export type FormSelectProps = {
    name: string,
    label: string,
    placeholder: string,
    selectItems: SelectItemsType[],
    form: UseFormReturn<any>,
}

export type FormImageProps = {
    src: string, 
    alt: string, 
    disabled: boolean, 
    form: UseFormReturn<any>
}

export interface FormMultiSelectProps extends FormSelectProps {
    defaultInputs?: SelectItemsType[]
}