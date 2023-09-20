import { useEffect, useRef, useState } from 'react'
import useLayoutEffect from './useLayoutEffect'

interface OptionProps<J> {
  ltm?: number
  defaultData?: J
}

interface FetchResProps<J> {
  data?: J
  isError: boolean
  isLoading: boolean
}

type FetchProps = ([...params]?: unknown[]) => Promise<{ data?: unknown }>

const cacheData: Record<string, { res?: Promise<{ data?: unknown }>; ltm?: number } | undefined> =
  {}

const getTimeNow = () => new Date().getTime()

const isFetchInCache = (keyname: string) => (cacheData?.[keyname]?.ltm ?? 0) > getTimeNow()

const cleanOverLtmCache = () => {
  const keys = Object.keys(cacheData)
  keys.map((key) => {
    if (cacheData[key] && !isFetchInCache(key)) {
      cacheData[key] = undefined
    }
  })
}

const useFetch = <T = unknown,>(
  keyname: string,
  fetch?: FetchProps,
  option?: Partial<OptionProps<T>>
): FetchResProps<T> => {
  const optionRef = useRef(option)
  const fetchRef = useRef(fetch)
  const [state, setState] = useState<FetchResProps<T>>({
    data: optionRef?.current?.defaultData,
    isError: false,
    isLoading: typeof fetch === 'function' && !isFetchInCache(keyname) ? true : false,
  })
  useLayoutEffect(() => {
    if (typeof fetch === 'function' && fetchRef.current !== fetch) {
      fetchRef.current = fetch
    }

    if (
      typeof option === 'object' &&
      JSON.stringify(option) !== JSON.stringify(optionRef.current)
    ) {
      optionRef.current = option
    }
  }, [fetch, option])

  useEffect(() => {
    if (!keyname || typeof keyname !== 'string') {
      return console.error('missing keyname or keyname is error', keyname)
    }

    if (typeof fetchRef.current === 'function') {
      if (!isFetchInCache(keyname)) {
        setState((prev) => ({ ...prev, isLoading: true }))
        cacheData[keyname] = {
          res: fetchRef.current(),
          ltm: getTimeNow() + (optionRef?.current?.ltm || 0),
        }
      }
      if (cacheData[keyname]) {
        cacheData[keyname]?.res
          ?.then((apiResponse) => {
            setState((prev) => ({ ...prev, data: apiResponse as T }))
          })
          .catch(() => {
            cacheData[keyname] = undefined
            setState((prev) => ({ ...prev, isError: true }))
          })
          .finally(() => {
            setState((prev) => ({ ...prev, isLoading: false }))
          })
      }
    } else {
      console.error(fetch, 'is not a function')
    }

    return () => {
      cleanOverLtmCache()
    }
  }, [keyname])
  return state
}

export default useFetch
