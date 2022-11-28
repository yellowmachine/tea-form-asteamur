import type { z } from "zod"

export type QueryFilter = Record<string, any>

export type QueryPageOptions<G, T> = {
    schema: z.ZodSchema,
    initialValues: QueryFilter,
    tag: string,
    query: (filter: G) => Promise<T>;
    enabled: (filter: QueryFilter) => boolean 
}
