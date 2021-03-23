import { useRef, useEffect } from 'react'


/**
 * Creates event like addEventListener in vanilla JS when you call functional component
 * @param {event} eventName - name of the event you want to use with component
 * @param {function} handler - handler function
 * @param {Object} element - object that be receive event @default window*/

//@ts-ignore
export default function useEventListener(eventName, handler, element=window){
    // Create a ref that stores handler
    const savedHandler = useRef(null)

    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // ... without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.
    useEffect(() => {
        savedHandler.current = handler
    }, [handler])

    useEffect(
        () => {
            // Make sure element supports addEventListener
            // On
            // @ts-ignore
            const isSupported = element ?? element?.addEventListener
            if (!isSupported) return

            // Create event listener that calls handler function stored in ref
            // @ts-ignore
            const eventListener = event => savedHandler.current(event)

            // Add event listener
            element.addEventListener(eventName, eventListener)

            // Remove event listener on cleanup
            return () => {
                element.removeEventListener(eventName, eventListener)
            }
        },
        [eventName, element] // Re-run if eventName or element changes
    )
}
