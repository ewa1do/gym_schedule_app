export async function getAssistants() {
    const res = await fetch('/api/assistance')

    const data = await res.json()

    return data
}
