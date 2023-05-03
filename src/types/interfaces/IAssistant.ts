interface RawClient {
    cedula: string
    lastname: string
    name: string
    phone: string
}

export interface Assistant {
    client_id: number
    clients: RawClient
    date: string
    entrance: string
    id: number
    inserted_at: string
    updated_at: string
}
