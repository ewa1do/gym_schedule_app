import { supabaseClient } from '@/lib'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { date } = req.query

    const data = await supabaseClient
        .from('assistance')
        .select(
            `*, clients (
                        name, 
                        lastname,
                        phone, 
                        cedula)
        `
        )
        .eq('date', date)

    res.status(200).json({ ...data })
}
