export async function waitFunc (fn, duration) {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      reject(new Error('Function execution timed out (manually)'))
    }, duration)

    fn()
      .then(resolve)
      .finally(() => clearTimeout(id))
      .catch(e => reject(new Error(e)))
  })
}
