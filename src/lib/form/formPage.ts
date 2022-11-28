import type { z } from "zod"

export type FormPageOptions<T> = {
    schema: z.ZodSchema,
    initialValues?: T,
    tag: (id: string) => string,
    mutation: (id: string, data: T & Record<any, any>) => Promise<void>,
    queryOne: (id: string) => Promise<T>;
}
