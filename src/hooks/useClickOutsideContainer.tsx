import { useCallback } from 'react'
import useEventListener from './useEventListener'

const useClickOutsideContainer = (
  ref: React.RefObject<HTMLDivElement>,
  callback: (e: MouseEvent | Event) => void
) => {
  const listener = useCallback(
    (e: MouseEvent | Event) => {
      const target = e.target as HTMLElement
      if (ref.current && !ref.current.contains(target)) {
        callback(e)
      }
    },
    [callback, ref]
  )
  useEventListener('mousedown', listener, ref)
  useEventListener('scroll', listener)
}

export default useClickOutsideContainer
