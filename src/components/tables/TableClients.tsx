import { useEffect, useState } from 'react'
import { Assistant, Client } from '@/types'
import { useAssistStore, useClientStore } from '@/store'

import TableClientsMobile from './TableClientsMobile'
import TableClientsDesktop from './TableClientsDesktop'

import { useScreenSize } from '@/hooks'
import { getAssistants } from '@/services'

interface Props {
    assistance: Client[]
    handler: (id: number) => void
}

export function TableClients(props: Props) {
    const [{ width }, { tablet }] = useScreenSize()
    const { clients, removeClient } = useClientStore()
    const { initialLoad, loadAssistants } = useAssistStore()

    function removeClientHandler(client: Client) {
        removeClient(client.cedula)
    }

    useEffect(() => {
        ;(async function () {
            const { data: assists } = await getAssistants()

            const mappedAssists = assists.map((assistant: Assistant) => ({
                name: assistant.clients.name,
                lastname: assistant.clients.lastname,
                cedula: assistant.clients.cedula,
                phone: assistant.clients.phone,
                date: assistant.date,
                entrance: assistant.entrance,
                client_id: assistant.client_id,
                id: assistant.id,
            }))

            loadAssistants(mappedAssists)
        })()
    }, [loadAssistants])

    return width >= tablet ? (
        <TableClientsDesktop
            clients={initialLoad.concat(props.assistance)}
            onClick={props.handler}
        />
    ) : (
        <TableClientsMobile clients={clients} onClick={removeClientHandler} />
    )
}
