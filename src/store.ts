import type { Auth0Client } from "@auth0/auth0-spa-js";
import { get, writable, type Writable } from "svelte/store";

export const auth0Client: Writable<Auth0Client> = writable(null);
export const isAuthenticated = writable(false);
export const user: Writable<{
    user: string | null,
    area: string | null,
    role: string | null
}> = writable({
    user: null,
    area: null,
    role: null
});
export const popupOpen = writable(false);
export const error = writable();

export function role(){
    return get(user).role
}