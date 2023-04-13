import { DateTime } from 'luxon'

export const AVAILABLE_USER_STATES = {
  NONE: null,
  NOT_KNOWN: undefined
}

export function changeSlug (slug) {
  return fetch('/api/user', {
    method: 'POST',
    body: slug
  })
    .then(res => res.json())
    .then(json => {
      if (!json.error) return new Promise(resolve => resolve(json))
      else {
        throw new Error(json.error)
      }
    })
}
export function getSingleTweet (id) {
  return fetch('/api/tweet?id=' + id)
    .then(res => res.json())
}
export function getTimeline (page) {
  return fetch('/api/timeline?page=' + page)
    .then(res => res.json())
}
export function createTweet (value) {
  return fetch('/api/tweet', {
    method: 'POST',
    body: JSON.stringify({ data: value })
  })
    .then(res => res.json())
    .then(json => {
      if (!json.error) return new Promise(resolve => resolve(json))
      else {
        throw new Error(json.error)
      }
    })
}
export function likeTweet (id) {
  // No se puede utilizar en useMutate
  fetch('/api/tweet', {
    method: 'PUT',
    body: id
  })
    .then(res => res.json())
}

export function commentTweet (id) {
  // Código para comentar un tweet
}

export function retweetTweet (id) {
  // Código para retweetear un tweet
}

export function deleteTweet (id) {
  return fetch('/api/tweet', {
    method: 'DELETE',
    body: id
  })
}

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
