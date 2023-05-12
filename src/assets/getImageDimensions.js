export async function getImageDimensions (inputFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = e => {
      const img = new Image()

      img.onload = function () {
        resolve({ width: img.width, height: img.height })
      }

      img.src = e.target.result
    }

    reader.onabort = reject

    reader.readAsDataURL(inputFile)
  })
}
