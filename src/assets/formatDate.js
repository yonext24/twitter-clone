import { DateTime } from 'luxon'

export const formatDate = (createdAt, inPage) => {
  if (inPage) {
    const date = new Date(createdAt)
    const hour = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) // Formato de la hora con AM/PM
    const month = date.toLocaleString('en-US', { month: 'short' }) // Nombre del mes abreviado en inglés
    const day = date.toLocaleString('en-US', { day: 'numeric' }) // Día del mes en números

    return `${hour} · ${month} ${day}, ${date.getFullYear()}`
  }
  const date = DateTime.fromISO(createdAt)
  const now = DateTime.now()

  const diffInDays = now.diff(date, 'days').days

  let formattedDate = diffInDays > 1
    ? date.toFormat('LLL d')
    : date.toRelative({
      locale: 'en',
      style: 'short',
      round: true
    })
      .replace(/\sago/, '')
      .replace(/(hr.|horas)/, 'h')
      .replace(/min./, 'm')
      .replace(' ', '')
  if (date.year < now.year) {
    formattedDate += `, ${date.year}`
  }

  return formattedDate
}
