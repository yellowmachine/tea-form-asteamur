import type { Person } from '../person';
export { formPageOptions, queryPageOptions } from './options'
export { iterElements as elements } from './elements'

export type User = Person & {
    user: string,
    active: boolean,
    role: string
}

export type PUser = Partial<User>