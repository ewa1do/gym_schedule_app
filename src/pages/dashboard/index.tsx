import { useEffect, useState } from 'react'

import { Client } from '@/types'
import { Searchbar, TableClients } from '@/components'
import { fonts } from '@/utilities'
import { useClientStore } from '@/store'
import { fetchClients } from '@/services'
import { insertDataToSupabase } from '@/services/insertDataToSupaBase'

const { poppins } = fonts()

function AssistancePage(): JSX.Element {
    const { loadClientsFromDB, clients } = useClientStore()
    const [assistance, setAssitance] = useState<Client[]>([])

    function addAssistantHandler(client: Client) {
        setAssitance((prev) => prev.concat(client))
    }

    function removeAssistantHandler(id: number) {
        setAssitance((prev) => prev.filter((client) => client.id !== id))
    }

    useEffect(() => {
        ;(async function () {
            const data = await fetchClients()

            loadClientsFromDB(data)
        })()
    }, [loadClientsFromDB])

    useEffect(() => {
        ;(async function () {
            if (assistance[assistance.length - 1]) {
                const { id: client_id, entrance } =
                    assistance[assistance.length - 1]

                let assistant = {
                    client_id,
                    entrance,
                    date: String(new Date().toLocaleDateString()),
                }

                await insertDataToSupabase('assistance', assistant)
            }
        })()
    }, [assistance])

    return (
        <div className={`${poppins.className}`}>
            {/* hamburger */}

            <h1>GYM</h1>
            <Searchbar data={clients} addAssistent={addAssistantHandler} />
            <TableClients
                assistance={assistance}
                handler={removeAssistantHandler}
            />
        </div>
    )
}

export default AssistancePage
