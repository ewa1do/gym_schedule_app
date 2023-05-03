import { useEffect, useState } from 'react'

import { Client } from '@/types'
import { Searchbar, TableClients } from '@/components'
import { fonts } from '@/utilities'
import { insertDataToSupabase } from '@/services/insertDataToSupaBase'
import { useAssistStore } from '@/store'

const { poppins } = fonts()

function AssistancePage(): JSX.Element {
    const [assistance, setAssitance] = useState<Client[]>([])
    const { assistants, totalAssists, incrementAssistantsNumber } =
        useAssistStore()

    function addAssistantHandler(client: Client) {
        setAssitance((prev) => prev.concat(client))
    }

    function removeAssistantHandler(id: number) {
        setAssitance((prev) => prev.filter((client) => client.id !== id))
    }

    useEffect(() => {
        ;(async function () {
            if (assistants.length > totalAssists) {
                if (assistants[assistants.length - 1]) {
                    const { id: client_id, entrance } =
                        assistants[assistants.length - 1]

                    let assistant = {
                        client_id,
                        entrance,
                        date: String(new Date().toLocaleDateString()),
                    }

                    await insertDataToSupabase('assistance', assistant)
                    incrementAssistantsNumber()
                }
            }
        })()
    }, [assistants])

    return (
        <div className={`${poppins.className}`}>
            {/* hamburger */}

            <h1>GYM</h1>
            <Searchbar />
            <TableClients
                assistance={assistants}
                handler={removeAssistantHandler}
            />
        </div>
    )
}

export default AssistancePage
