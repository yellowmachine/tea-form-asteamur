import { gql } from 'graphql-request'
import axios from 'axios'
import { tokenizedQueryOne, getToken, tokenizedRequest, type Result } from '@/query'
import type { User } from '.'
import { createMutation } from '@/query'

type UserResult = Result & {
    data: {
        queryUser: User
    }
}

type PUser = Partial<User>

type UsersResult = Result & {
    data: {
        queryUsers: PUser[]
    }
}

export const QUERY_ONE = gql`
    query queryUser($id: ID!) {
        getUser(id: $id) {
            id
            name
            surname
        }
    }
`

export const QUERY_MANY = gql`
    query queryUsers($filter: UserFilter) {
        queryUser(filter: $filter) {
            id
            name
            surname
        }
    }
`

function _queryOne(id: string){
    return {
        document: QUERY_ONE,
        variables: {id}
    }
}

/*
const example_filter = {
    completed: true, 
    or: {
        command: {
            allofterms: "k"
        }
    }
}
*/

function _queryMany(filter: Record<string, any>){
    return {
        document: QUERY_MANY,
        variables: {
            filter
        }
    }
}

export async function queryOne(id){
    const response = await tokenizedQueryOne<UserResult>(_queryOne(id))
    return response.data.queryUser
}

//https://sveltequery.vercel.app/guides/query-functions#usage-with-fetch-and-others-clients-that-do-not-throw-by-default
export async function query(filter){ 
    const response = await tokenizedRequest<UsersResult>(_queryMany(filter))
    return response.data.queryUsers
}

export const MUTATION_UPDATE = gql`
    mutation updateUser($id: [ID!], $set: UserPatch) {
        updateUser(input: {filter: {id: $id}, set: $set}) {
            user {
                id
            }
        }
    }
`

export const MUTATION_ADD = gql`
    mutation addUser($input: [AddUserInput!]) {
        addUser(input: $input){
            user{
                id
            }
        }
    }
`

function add(variables: Record<string, any>){
    return {
        document: MUTATION_ADD,
        variables: {
            input: variables
        }
    }
}

function update(id: string, variables: Record<string, any>){
    return {
        document: MUTATION_UPDATE,
        variables: {
            id,
            set: variables
        }
    } 
}

const m = createMutation({add, update})

export async function mutation(id: string | null, data: User){
    const response = await m(id, data)
    const token = await getToken()
    if(id == null){
        await axios.post(`/api/users`, 
                                {
                                    app_metadata:{
                                        user: response.addUser.user.id,
                                        role: data.role,
                                        area: data.area.value
                                    }
                                }, 
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                }
                            )
    }else{
        await axios.put(`/api/users/${id}`, 
                                {
                                    app_metadata:{
                                        role: data.role,
                                        area: data.area.value
                                    }
                                }, 
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                }
                            )
    }
}

/*
export async function mutation(id: string | null, data: User){
    if(id === null){
        //must axios.post /api/users with all the data
        //...
        await tokenizedRequest(add(data))
    }else{
        const token = await getToken()
        await axios.put(`/api/users/${id}`, 
                                {
                                    app_metadata:{
                                        role: data.role,
                                        area: data.area.value
                                    }
                                }, 
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                }
                            )
        
        await tokenizedRequest(update(id, data))
    }
}
*/