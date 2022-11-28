import { z } from "zod";
import { REQUIRED, EMAIL } from "@/lib/constants"


export const schema = {
    name: z.string().min(1, {message: REQUIRED}),
    surname: z.string().min(1, {message: REQUIRED}),
    email: z.string().email({message: EMAIL}).nullable(),
    phone: z.string(),
    address: z.string(),
    location: z.string(),
    area: z.object({
        value: z.string(),
        text: z.string()
    }).nullable(),
    privateInfo: z.object({
        iban: z.string()
    }).nullable()
}

export type Person = {
    name: string,
    surname: string,
    email?: string,
    phone?: string,
    address?: string,
    location?: string,
    area?: {
        value: string,
        text: string
    }
}