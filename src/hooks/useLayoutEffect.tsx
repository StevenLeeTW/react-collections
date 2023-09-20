import { useLayoutEffect as reactUseLayoutEffect, useEffect as reactUseEffect } from 'react'
import { isClient } from '../utils/window'

const useLayoutEffect = (effect: React.EffectCallback, deps?: React.DependencyList) => {
  // Never happen in test env
  if (isClient) {
    /* istanbul ignore next */
    reactUseLayoutEffect(effect, deps)
  } else {
    reactUseEffect(effect, deps)
  }
}

export default useLayoutEffect
