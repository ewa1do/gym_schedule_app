import { supabaseClient } from '@/lib'
import { Client } from '@/types'

interface Assistant {
    date: string | undefined
    entrance: string | undefined
    client_id: number
}

export async function insertDataToSupabase(table: string, data: Assistant) {
    try {
        const { data: insertedData, error } = await supabaseClient
            .from(table)
            .insert(data)

        console.log(`New row created in table: ${table}`)
    } catch (error) {
        console.error(error)
    }
}
