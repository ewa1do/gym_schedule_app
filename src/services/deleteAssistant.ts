import { supabaseClient } from '@/lib'
import { Assistant } from '@/types'

export async function deleteAssistant(
    clientSelected: Assistant,
    date: string = new Date().toLocaleDateString()
) {
    const { error } = await supabaseClient
        .from('assistance')
        .delete()
        .eq('id', clientSelected.id)

    if (error) {
        console.error(error)
        return
    }

    console.log('Field Successfully Deleted!')
}
