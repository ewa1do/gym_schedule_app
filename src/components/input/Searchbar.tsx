import { useEffect, useRef, useState } from 'react'
import { IoSearchOutline, IoAddSharp } from 'react-icons/io5/'

import { Client } from '@/types'
import { fonts, getHour } from '@/utilities'
import { fetchClients } from '@/services'
import { useAssistStore, useClientStore } from '@/store'

const { poppins } = fonts()

export function Searchbar(): JSX.Element {
    const { addAssistant } = useAssistStore()
    const { loadClientsFromDB, clients } = useClientStore()
    const [clientsSelected, setClientsSelected] = useState<Client[]>([])

    const inputRef = useRef<HTMLInputElement>(null)

    function getCoincidences(arr: Client[]) {
        const value = inputRef.current?.value

        if (value === undefined || value?.length < 2) {
            return setClientsSelected([])
        }

        const coincidences = arr.filter((client) => {
            return client.name.includes(value)
        })

        return setClientsSelected(coincidences)
    }

    useEffect(() => {
        ;(async function () {
            const data = await fetchClients()

            loadClientsFromDB(data)
        })()
    }, [loadClientsFromDB])

    return (
        <form className={`${poppins.className}`}>
            <div className="flex justify-center">
                <div className="flex items-center justify-around mx-10 border border-teal rounded-lg px-2">
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Buscar clientes"
                        ref={inputRef}
                        onChange={() => getCoincidences(clients)}
                        className="p1 bg-transparent py-1 outline-none text-slate-300 min-w-[20rem]"
                    />

                    <i className="text-teal">
                        <IoSearchOutline />
                    </i>
                </div>

                <button className="border border-teal px-3 text-2xl rounded-md text-slate-300">
                    <IoAddSharp />
                </button>
            </div>

            {clientsSelected.length > 0 && (
                <div className="flex flex-col ml-14 border max-w-[22rem] text-slate-300">
                    {clientsSelected?.map((client) => {
                        return (
                            <p
                                onClick={() =>
                                    addAssistant({
                                        ...client,
                                        entrance: getHour(),
                                    })
                                }
                                key={`client-${client.cedula}`}
                            >
                                {client.name} {client.lastname}
                            </p>
                        )
                    })}
                </div>
            )}
        </form>
    )
}
