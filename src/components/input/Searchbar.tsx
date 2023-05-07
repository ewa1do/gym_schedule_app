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

    function handleMouseEnter({ target }: React.MouseEvent<HTMLElement>) {
        const el = target as HTMLElement

        el.classList.add('text-teal')
    }

    function handleMouseLeave({ target }: React.MouseEvent<HTMLElement>) {
        const el = target as HTMLElement

        el.classList.remove('text-teal')
    }

    useEffect(() => {
        ;(async function () {
            const data = await fetchClients()

            loadClientsFromDB(data)
        })()
    }, [loadClientsFromDB])

    return (
        <form className={`${poppins.className}`}>
            <div className="flex justify-center min-w-[20rem] max-w-[25rem]">
                <div className="flex items-center justify-around mx-10 border border-teal rounded-lg px-2">
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Buscar clientes"
                        ref={inputRef}
                        onChange={() => getCoincidences(clients)}
                        className="p1 bg-transparent py-1 outline-none text-slate-300 w-10/12"
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
                <div className="flex flex-col ml-14 border-b border-l border-r border-teal rounded-md text-slate-300 max-w-[14.6rem] cursor-pointer">
                    {clientsSelected?.map((client, i) => {
                        return (
                            <p
                                onClick={() => {
                                    addAssistant({
                                        ...client,
                                        entrance: getHour(),
                                    })

                                    if (inputRef.current !== null) {
                                        inputRef.current.value = ''
                                    }

                                    setClientsSelected([])
                                }}
                                key={`client-${client.cedula}`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                className="p-1"
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
