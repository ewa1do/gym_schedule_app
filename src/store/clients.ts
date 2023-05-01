import { create } from 'zustand'
import { Client, ClientSupabase } from '@/types'
import { supabaseClient } from '@/lib'

interface ClientState {
    clients: Client[]
    loadClientsFromDB: (clients: Client[]) => void
    addClient: (client: Client) => void
    removeClient: (id: string) => void
}

export const useClientStore = create<ClientState>((set) => ({
    clients: [],

    loadClientsFromDB: (mappedClients: Client[]) =>
        set(() => ({ clients: mappedClients })),

    addClient: (client: Client) =>
        set(({ clients }) => ({ clients: clients.concat(client) })),

    removeClient: (id: string) =>
        set((state) => ({
            clients: state.clients.filter((client) => client.cedula !== id),
        })),
}))
