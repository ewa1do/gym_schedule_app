import { useEffect, useState } from 'react'
import { IoEllipsisHorizontalOutline, IoTrashOutline } from 'react-icons/io5'
import { clsx } from 'clsx'

import { deleteAssistant } from '@/services'
import { useAssistStore } from '@/store'
import { Assistant } from '@/types'

function TableClientsMobile(): JSX.Element {
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
                    <th className="w-1/4">Nombre</th>
                    <th className="w-1/4">Apellido</th>
                    <th className="w-1/4">H. entrada</th>
                    <th className="w-1/4">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {assistants?.map((client, i) => (
                    <tr
                        key={`client-${client.cedula}`}
                        className={clsx(`flex justify-between pt-2`, {
                            'border-b': true,
                            'border-mint': i % 2 === 0,
                            'border-teal': i % 2 !== 0,
                        })}
                    >
                        <td className="w-1/4">{client.name}</td>
                        <td className="w-1/4">{client.lastname}</td>
                        <td className="w-1/4">{client.entrance}</td>
                        <td className="w-1/4">
                            <button className="text-mint_light hover:text-teal">
                                {' '}
                                <IoEllipsisHorizontalOutline />{' '}
                            </button>{' '}
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

export default TableClientsMobile
