import { useState, useEffect } from 'react'

interface ScreenSize {
    width: number
    height: number
}

interface Breakpoints {
    mobile: number
    tablet: number
    desktop: number
}

function breakpoints(): Breakpoints {
    return {
        mobile: 425,
        tablet: 768,
        desktop: 1020,
    }
}

function getScreenDimensions(): ScreenSize {
    const { innerHeight: height, innerWidth: width } = window

    return { width, height }
}

export function useScreenSize(): [ScreenSize, Breakpoints] {
    const [screenSize, setScreenSize] = useState<ScreenSize>({} as ScreenSize)

    useEffect(() => {
        setScreenSize(getScreenDimensions())
    }, [])

    useEffect(() => {
        const updateSize = () => {
            setScreenSize(getScreenDimensions())
        }

        window.addEventListener('resize', updateSize)

        return () => {
            window.removeEventListener('resize', updateSize)
        }
    }, [screenSize])

    return [screenSize, breakpoints()]
}
