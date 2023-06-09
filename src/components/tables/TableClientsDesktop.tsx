import { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { IoTrashOutline } from 'react-icons/io5'

import { Assistant } from '@/types'
import { useAssistStore } from '@/store'
import { deleteAssistant } from '@/services'

function TableClientsDesktop() {
    const {
        assistants,
        removeAssistant,
        totalAssists,
        decrementAssistantsNumber,
    } = useAssistStore()

    const [clientSelected, setClientSelected] = useState<Assistant>(
        {} as Assistant
    )

    useEffect(() => {
        if (assistants.length < totalAssists) {
            ;(async function () {
                await deleteAssistant(clientSelected)

                setClientSelected({} as Assistant)
                decrementAssistantsNumber()
            })()
        }
    }, [assistants])

    return (
        <table className="mt-20 text-slate-300 w-[90%] ml-[5%]">
            <thead className="border-b border-teal">
                <tr className="flex justify-center ">
                    <th className="w-1/6">Fecha</th>
                    <th className="w-1/6">Nombre</th>
                    <th className="w-1/6">Apellido</th>
                    <th className="w-1/6">Cedula</th>
                    <th className="w-1/6">Numero Tlf</th>
                    <th className="w-1/6">H. entrada</th>
                    <th className="w-1/6">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {assistants?.map((client, i) => (
                    <tr
                        key={`client-${client.cedula}`}
                        className={clsx(
                            `flex justify-between items-center pt-2`,
                            {
                                'border-b': true,
                                'border-mint': i % 2 === 0,
                                'border-teal': i % 2 !== 0,
                            }
                        )}
                    >
                        <td className="w-1/6">{client.date}</td>
                        <td className="w-1/6">{client.name}</td>
                        <td className="w-1/6">{client.lastname}</td>
                        <td className="w-1/6">{client.cedula}</td>
                        <td className="w-1/6">{client.phone}</td>
                        <td className="w-1/6">{client?.entrance}</td>
                        <td className="w-1/6">
                            <button
                                className="text-mint hover:text-teal"
                                onClick={() => {
                                    setClientSelected(client)
                                    removeAssistant(client.id)
                                }}
                            >
                                {' '}
                                <IoTrashOutline />{' '}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableClientsDesktop
