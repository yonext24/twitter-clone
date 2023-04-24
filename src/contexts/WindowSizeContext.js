import { createContext, useEffect, useState } from 'react'

export const WindowSizeContext = createContext()

export const WindowSizeContextProvider = ({ children }) => {
  const [size, setSize] = useState(500)

  useEffect(() => {
    if (!window) return

    setSize(window.innerWidth)

    window.addEventListener('resize', e => {
      setSize(e.target.innerWidth)
    })
  }, [])

  return <WindowSizeContext.Provider value={{ size }}>
    {children}
  </WindowSizeContext.Provider>
}
