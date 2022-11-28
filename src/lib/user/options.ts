import type { User, PUser } from '.'
import {z} from 'zod'
import type { QueryPageOptions } from "@/lib/form/queryPage";
import type { FormPageOptions } from "@/lib/form/formPage";
import { schema as personSchema } from '../person'
import { queryOne, query, mutation} from './gqlDocuments'

type UserQueryFilter = {
    name?: string,
    phone?: string
}

export const queryPageOptions: QueryPageOptions<UserQueryFilter, PUser[]> = {
    schema: z.object({
        name: z.string().nullable(),
        phone: z.string().nullable()
    }),
    initialValues: {
        name: "",
        phone: ""
    },
    tag: "/users",
    query: query,
    enabled: ({name, phone}) => !(name !== "" || phone !== "")
}

export const formPageOptions: FormPageOptions<User> = {
    queryOne,
    initialValues: {
        name: "",
        surname: "",
        email: null,
        phone: "",
        user: "",
        address: "",
        location: "",
        area: null,
        active: false,
        role: null,
        //privateInfo: null
    },
    tag: (id) => `/user/${id}`,
    mutation,
    schema: z.object({
            ...personSchema, 
            role: z.object({
                value: z.string(),
                text: z.string()
            }).nullable(),
            active: z.boolean(),
            user: z.string().email({message: "El campo debe ser un email"}).min(1, {message: "El campo es obligatorio"}),
        })
};