'use client'

import { useEffect, useState } from 'react'

type WindowDimentions = {
  screenWidth: number | undefined
  screenHeight: number | undefined
}

export function useWindowsDimensions(): WindowDimentions {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimentions>({
    screenWidth: undefined,
    screenHeight: undefined,
  })

  useEffect(() => {
    function handleResize(): void {
      setWindowDimensions({
        screenWidth: window?.innerWidth,
        screenHeight: window?.innerHeight,
      })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return (): void => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}
