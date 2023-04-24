import { getImageDimensions } from '@/assets/consts'
import { storage } from './client'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

export async function uploadImages (userId, file) {
  if (!file) return null

  const imageId = Date.now() + '.' + file.name.split('.')[1]

  const storageRef = ref(storage, `images/${userId}/${imageId}`)

  await uploadBytesResumable(storageRef, file)
  const src = await getDownloadURL(storageRef)

  const { width, height } = await getImageDimensions(file)

  return { src, id: imageId, height, width }
}
export async function deleteImage (userId, imageId) {
  if (!imageId || !userId) return null

  const imageRef = ref(storage, `images/${userId}/${imageId}`)
  await deleteObject(imageRef)
}
