export const updateLikes = (prevData, id) => {
  if (id !== prevData?._id) return prevData

  const isLiked = prevData.isLiked
  prevData.isLiked = !isLiked
  prevData.likes = isLiked ? prevData.likes - 1 : prevData.likes + 1

  return prevData
}
