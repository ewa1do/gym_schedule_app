import { useEffect, useRef, useState } from 'react'
import { Client } from '@/types'

import { IoSearchOutline, IoAddSharp } from 'react-icons/io5/'

import { insertDataToSupabase } from '@/services/insertDataToSupaBase'
import { fonts, getHour } from '@/utilities'

const { poppins } = fonts()

interface SearchbarProps {
    data: Array<Client>
    addAssistent: (client: Client) => void
}

export function Searchbar({ data, addAssistent }: SearchbarProps): JSX.Element {
    const [clients, setClients] = useState<Client[]>([])

    const inputRef = useRef<HTMLInputElement>(null)

    function getCoincidences(arr: Client[]) {
        const value = inputRef.current?.value

        if (value === undefined || value?.length < 2) {
            return setClients([])
        }

        const coincidences = arr.filter((client) => {
            return client.name.includes(value)
        })

        return setClients(coincidences)
    }

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
                        onChange={() => getCoincidences(data)}
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

            {clients.length > 0 && (
                <div className="flex flex-col ml-14 border max-w-[22rem] text-slate-300">
                    {clients?.map((client) => {
                        return (
                            <p
                                onClick={
                                    () =>
                                        addAssistent({
                                            ...client,
                                            entrance: getHour(),
                                        })
                                    // addClient({
                                    //     ...client,
                                    //     entrance: getHour(),
                                    // })
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
