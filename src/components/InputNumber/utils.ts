import BigNumber from 'bignumber.js'

export const isStrGreaterThanMax = (str: string, max: number) =>
  new BigNumber(str).isGreaterThan(new BigNumber(max))

export const isStrLessThanMax = (str: string, min: number) =>
  new BigNumber(str).isLessThan(new BigNumber(min))

export function enforceRange(str: string, min: number, max: number, isEnforce: boolean) {
  if (!str || isNaN(Number(str))) {
    return ''
  }

  if (!isEnforce) {
    return str
  }

  if (isStrGreaterThanMax(str, max)) {
    return new BigNumber(max).toFixed()
  }

  if (isStrLessThanMax(str, min)) {
    return new BigNumber(min).toFixed()
  }

  return str
}

export function stringtoFixed(str: string | undefined, decimalPlaces: number) {
  if (!str || isNaN(Number(str))) {
    return ''
  }
  return new BigNumber(str).toFixed(decimalPlaces, BigNumber.ROUND_DOWN)
}

function getFirstSymbol(str: string): string {
  const regex = /^([-])/
  const matches = str.match(regex)
  if (matches && matches.length > 1) {
    return matches[1]
  }
  return ''
}

export function filterInputNumberString(str: string): string {
  const firstSymbol = getFirstSymbol(str)
  return `${firstSymbol}${str.replace(/[^0-9.]/g, '')}`
}

export function getStep(decimalPlaces: number) {
  const result = ['1']
  for (let i = 0; i < decimalPlaces; i++) {
    if (i === decimalPlaces - 1) {
      result.unshift('.')
    }
    result.unshift('0')
  }

  return new BigNumber(result.join('')).toNumber()
}
