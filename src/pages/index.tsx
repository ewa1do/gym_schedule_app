import Image from 'next/image'
import { Inter } from 'next/font/google'
import { clientStore } from '@/store/clients'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return <h1>Index</h1>
}
