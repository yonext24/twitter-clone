import { useEffect, useRef, useState } from 'react'

/* eslint-disable react/no-unknown-property */
export function LoadingTweet ({ isLoading, isSuccess, isError }) {
  const [percentage, setPercentage] = useState(0)
  const [showing, setShowing] = useState(true)

  const timeoutRef = useRef()

  useEffect(() => {
    if (isLoading) {
      setShowing(true)
      setPercentage(Math.ceil(Math.random() * 10))
    }
  }, [isLoading])

  useEffect(() => {
    if (isLoading && percentage < 80) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setPercentage((prevPercentage) => prevPercentage + Math.ceil(Math.random() * 20))
      }, 50)
    }
  }, [percentage])

  useEffect(() => {
    if (isSuccess || isError) {
      clearTimeout(timeoutRef.current)
      setPercentage(100)

      setTimeout(() => { setShowing(false) }, 300)
      setTimeout(() => { setPercentage(0) }, 400)
    }
  }, [isSuccess, isError])

  return <>
  <div className='container'>
    <div className='line'></div>
  </div>

  <style jsx>{`
  .container {
    height: 3px;
    width: 100%;
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
  }
  .line {
    background-color: var(--blue);
    height: 100%;
    width: ${percentage}%;
    transition: width .2s ease-in-out;
    opacity: ${showing ? '1' : '0'}
  }
  `}</style>
  </>
}
