export function parseText (text) {
  const linkRegex = /\b((?:http:\/\/|https:\/\/)(?:(?:[a-z0-9_-]+(?:(?:\.[\w_-]+)+))(?:[\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])))/g
  const parts = text.split(linkRegex)
  return parts.map((part, index) => {
    if (part === '') return null
    if (part.match(linkRegex)) {
      const finalStr = part.replace(/(http:\/\/|https:\/\/)/, '')
      return (
            <a href={part} key={index} onClick={e => e.stopPropagation()} target="_blank" rel="noopener noreferrer">
              {finalStr}
            </a>
      )
    } else {
      return <span key={index}>{part}</span>
    }
  })
}
