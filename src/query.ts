import { request } from 'graphql-request'

export async function getToken(){
    return "ABC";
}

const ENDPOINT = "http://localhost:8888/api/";//process.env.VITE_GRAPHQL_ENDPOINT

export type Result = {data?: any, errors?: any}

export async function tokenizedRequest<T>({document, variables}: {document: string, variables: Record<string, any>}): Promise<T>{
    const token = await getToken()
    const response = await request<T & Result>({
        url: ENDPOINT,
        document,
        variables,
        requestHeaders: {
            Authorization: `Bearer ${token}`
        },
      })

    if(response.errors !== undefined) throw new Error(response.errors)
    return response
}

export async function tokenizedQueryOne<T>({document, variables}: {document: string, variables: Record<string, any>}): Promise<T>{
    const token = await getToken()
    const response = await request<T & Result>({
        url: ENDPOINT,
        document,
        variables,
        requestHeaders: {
            Authorization: `Bearer ${token}`
        },
    })
    if(response.errors !== undefined) throw new Error(response.errors)
    return response
}

export const createMutation = <T>({add, update}:
    {
        add: (data: T) => {document: string, variables: any}, 
        update: (id: string, data: T) => {document: string, variables: any}
    }) => 
    async (id: string | null, data: T) => {
        if(id === null){
            return await tokenizedRequest<T & Result>(add(data))
        }else{
            return await tokenizedRequest<T & Result>(update(id, data))
        }
}
