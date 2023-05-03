export async function getAssistants(
    date: string = new Date().toLocaleDateString()
) {
    const res = await fetch(`/api/assistance?date=${date}`)

    const data = await res.json()

    return data
}
