import { Client } from '@/types'
import { clientStore } from '@/store'

import TableClientsMobile from './TableClientsMobile'
import TableClientsDesktop from './TableClientsDesktop'

import { useScreenSize } from '@/hooks'

export function TableClients() {
    const [{ width }, { tablet }] = useScreenSize()

    const { clients, removeClient } = clientStore()

    function removeClientHandler(client: Client) {
        removeClient(client.cedula)
    }

    return width >= tablet ? (
        <TableClientsDesktop clients={clients} onClick={removeClientHandler} />
    ) : (
        <TableClientsMobile clients={clients} onClick={removeClientHandler} />
    )
}
