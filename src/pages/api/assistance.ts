import { supabaseClient } from '@/lib'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const data = await supabaseClient.from('assistance').select('*')

    res.status(200).json(data)
}
