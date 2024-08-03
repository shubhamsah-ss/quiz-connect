import axios, { AxiosResponse } from "axios"
import { FieldValues, UseFormReset } from "react-hook-form"

const instance = axios.create({
    baseURL: `/api/v1`
})

export const makeGetRequest = async (endpoint: string) => {
    try {
        const response: AxiosResponse = await instance.get(endpoint)
        
        const { data } = response
        
        return data
    } catch (error: any) {
        return { data: [], success:false, error: error.response?.data?.error?.message }
    }
}

type PostRequest = {
    endpoint: string,
    payload: object
    reset?: UseFormReset<FieldValues>,
    redirect?: Function
}

export const makePostRequest = async ({
    endpoint,
    payload,
    reset,
    redirect

}: PostRequest) => {
    try {
        const response: AxiosResponse = await instance.post(endpoint, {
            values: payload
        })

        const data = response.data

        if (reset) reset()

        if (redirect) redirect()

        return data

    } catch (error: any) {
        return { error: error.response?.data?.error?.message }
    }
}

export const makePatchRequest = async ({
    endpoint,
    payload,

}: PostRequest) => {
    try {
        const response: AxiosResponse = await instance.patch(endpoint, {
            values: payload
        })

        const data = response.data

        return data

    } catch (error: any) {
        return { error: error.response?.data?.error?.message }
    }
}

export const makeDeleteRequest = async (endpoint: string) => {
    try {
        const response: AxiosResponse = await instance.delete(endpoint)

        const data = response.data

        return data

    } catch (error: any) {
        return { error: error.response?.data?.error?.message }
    }
}