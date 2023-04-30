import { create } from 'zustand'
import { Client } from '@/types/interfaces'

interface ClientState {
    clients: Client[]
    addClient: (client: Client) => void
    removeClient: (id: string) => void
}

export const clientStore = create<ClientState>((set) => ({
    clients: [],

    addClient: (client: Client) =>
        set(({ clients }) => ({ clients: clients.concat(client) })),

    removeClient: (id: string) =>
        set((state) => ({
            clients: state.clients.filter((client) => client.cedula !== id),
        })),
}))
