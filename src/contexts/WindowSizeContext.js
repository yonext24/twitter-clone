import { createContext, useEffect, useState } from 'react'

export const WindowSizeContext = createContext()

export const WindowSizeContextProvider = ({ children }) => {
  const [size, setSize] = useState(1000)

  useEffect(() => {
    if (!window) return

    setSize(window.innerWidth)

    const onChange = e => {
      setSize(e.target.innerWidth)
    }

    window.addEventListener('resize', onChange)

    return () => window.removeEventListener('resize', onChange)
  }, [])

  return <WindowSizeContext.Provider value={{ size }}>
    {children}
  </WindowSizeContext.Provider>
}
