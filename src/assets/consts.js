import { uploadImages } from '@firebase/utils'

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
export function getUserBookmarks (page) {
  return fetch('api/user?page=' + page)
    .then(res => res.json())
}

export async function createTweet (data) {
  return new Promise((resolve, reject) => {
    if (data.imageToUploadData?.hasImage) {
      uploadImages(data.imageToUploadData.userId, data.imageToUploadData.image)
        .then(image => {
          fetch('/api/tweet', {
            method: 'POST',
            body: JSON.stringify({ data: { ...data.data, image } })
          })
            .then(res => {
              if (!res.ok) throw new Error('Error while creating tweet')
              return res.json()
            })
            .then(json => {
              if (!json.error) resolve(json)
              else {
                reject(json.error)
              }
            })
        })
        .catch(reject)
    } else {
      fetch('/api/tweet', {
        method: 'POST',
        body: JSON.stringify({ data: data.data })
      })
        .then(res => {
          if (!res.ok) throw new Error('Error while creating tweet')
          return res.json()
        })
        .then(json => {
          if (!json.error) resolve(json)
          else {
            reject(json.error)
          }
        })
        .catch(reject)
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

export function bookmarkTweet (id) {
  return fetch('/api/tweet', {
    method: 'PATCH',
    body: id
  })
}

export function deleteTweet (id) {
  return fetch('/api/tweet', {
    method: 'DELETE',
    body: id
  })
}
