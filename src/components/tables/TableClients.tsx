import { useEffect, useState } from 'react'
import { Client } from '@/types'
import { useClientStore } from '@/store'

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

    function removeClientHandler(client: Client) {
        removeClient(client.cedula)
    }

    useEffect(() => {
        ;(async function () {
            const { data: assists } = await getAssistants()

            console.log('assists', assists)
        })()
    }, [])

    return width >= tablet ? (
        <TableClientsDesktop
            clients={props.assistance}
            onClick={props.handler}
        />
    ) : (
        <TableClientsMobile clients={clients} onClick={removeClientHandler} />
    )
}
