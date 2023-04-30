export function getHour(): string {
    const date = new Date()

    let hours: number = date.getHours()
    let minutes: string | number = date.getMinutes()
    const ampm: string = hours >= 12 ? 'pm' : 'am'

    hours = hours % 12
    hours = hours ? hours : 12
    minutes = minutes < 10 ? '0' + minutes : minutes

    return '' + hours + ':' + minutes + ampm
}
