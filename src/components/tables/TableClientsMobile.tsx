import { Client } from '@/types'
import { clsx } from 'clsx'
import { IoEllipsisHorizontalOutline, IoTrashOutline } from 'react-icons/io5'

interface Props {
    clients: Client[]
    onClick: (client: Client) => void
}

function TableClientsMobile(props: Props): JSX.Element {
    const { clients, onClick } = props

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
                {clients?.map((client, i) => (
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
                        <td className="w-1/4">09:00AM</td>
                        <td className="w-1/4">
                            <button className="text-mint_light hover:text-teal">
                                {' '}
                                <IoEllipsisHorizontalOutline />{' '}
                            </button>{' '}
                            <button
                                className="text-mint hover:text-teal"
                                onClick={() => onClick(client)}
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
