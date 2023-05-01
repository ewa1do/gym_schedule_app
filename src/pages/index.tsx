import { useClientStore } from '@/store'
import { useEffect } from 'react'

export default function Home() {
    const { loadClientsFromDB, clients } = useClientStore()

    async function fetchClients() {
        const res = await fetch('/api/clients')

        try {
            const { clients } = await res.json()
            loadClientsFromDB(clients)
        } catch (error) {
            console.log(error)
        }
    }

    console.log(clients)

    useEffect(() => {
        fetchClients()
        // loadClientsFromDB()
    }, [])

    return <h1>Index</h1>
}
