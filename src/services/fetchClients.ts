import { Client } from '@/types'

export async function fetchClients(): Promise<Client[] | undefined> {
    const res = await fetch('/api/clients')

    try {
        const { clients } = await res.json()

        return clients
    } catch (error) {
        console.log(error)
    }
}
