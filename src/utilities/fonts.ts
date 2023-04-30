import { Poppins } from 'next/font/google'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '100', '700'],
})

export function fonts() {
    return {
        poppins,
    }
}
