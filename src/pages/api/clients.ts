import { supabaseClient } from '@/lib'
import { Client, Status } from '@/types'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Payload {
    status: Status
    message?: string
    clients?: Client[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { data: clients, error } = await supabaseClient
        .from('clients')
        .select('*')

    if (error) {
        return res.status(400).json({
            status: Status.Fail,
            message: error.message,
        } as Payload)
    }

    const mappedClients = clients.map((client) => ({
        name: client.name,
        lastname: client.lastname,
        phone_number: client.phone_number,
        date: client.inserted_at,
        hour: client.inserted_at,
        cedula: client.cedula,
    }))

    res.status(200).json({
        status: Status.Success,
        clients: mappedClients,
    } as Payload)
}
