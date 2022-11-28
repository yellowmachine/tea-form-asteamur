const AREA = async (q: string):Promise<{value: string, text: string}[]> => [{value: "MURCIA", text: "Murcia"}, {value: "CARTAGENA", text: "Cartagena"}, {value: "LORCA", text: "Lorca"}]
const ROLE = async (q: string):Promise<{value: string, text: string}[]> => [{value: "ADMIN", text: "Admin"}, {value: "TERAPEUTA", text: "Terapeuta"}, {value: "DIRECTORA", text: "Directora"}]

export const Q = {
    AREA,
    ROLE
}