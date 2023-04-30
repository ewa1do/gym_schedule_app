import clientsData from '../../data/clients.json'

import { ClientsJSONData } from '@/types'
import { Searchbar, TableClients } from '@/components'
import { fonts } from '@/utilities'

interface Props {
    clientsData: ClientsJSONData
}

const { poppins } = fonts()

function AssistancePage({ clientsData }: Props): JSX.Element {
    return (
        <div className={`${poppins.className}`}>
            {/* hamburger */}

            <h1>GYM</h1>
            <Searchbar data={clientsData.data} />
            <TableClients />
        </div>
    )
}

export async function getStaticProps() {
    return {
        props: {
            clientsData,
        },
    }
}

export default AssistancePage
