import React, { FC, ChangeEvent, useCallback, useRef, CompositionEvent } from 'react'
import { checkStrLengthOfLimit } from '../../utils/input'
import './index.css'

const dataTestId = 'data-testid'

export interface InputTextProps {
  id?: string
  placeHolder?: string
  minLength?: number
  maxLength?: number
  className?: string
  onError?: (isError: boolean) => void
  onChange?: (value?: string) => void
  onBlur?: () => void
  value?: string
  [dataTestId]?: string
}

const InputText: FC<InputTextProps> = ({
  id,
  placeHolder,
  minLength,
  maxLength,
  className,
  onError,
  onChange,
  onBlur,
  value,
  ...props
}) => {
  const inputValueRef = useRef<string | undefined>(value)
  const isOnComposition = useRef<boolean>(false)

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | CompositionEvent<HTMLInputElement>
  ) => {
    // set error equate false as any type
    typeof onError === "function" && onError(false);
    // explicitly cast the event.target to HTMLInputElement
    const eventValue: string = (event.target as HTMLInputElement).value;

    // don't call onChange as is onComposition
    if (!isOnComposition.current && typeof onChange === "function") {
      onChange(eventValue);
    }
  }

  const isOutOfLimit = checkStrLengthOfLimit(value, maxLength, minLength)

  const errorCheckCallback = useCallback(() => {
    typeof onError === 'function' && onError(isOutOfLimit)
  }, [isOutOfLimit])

  const handleComposition = (e: CompositionEvent<HTMLInputElement>) => {
    // call onChange(inputValue) as composition have done(type enter)
    if (e.type === 'compositionend') {
      isOnComposition.current = false
      handleChange(e)
    } else {
      isOnComposition.current = true
    }
  }

  return (
    <input
      type="text"
      id={id}
      className={`input-text ${className ? className : ""}`}
      placeholder={placeHolder}
      defaultValue={inputValueRef.current}
      onChange={handleChange}
      onBlur={() => {
        typeof onBlur === "function" && onBlur();
        errorCheckCallback();
      }}
      data-testid={props?.[dataTestId] ? `${props?.[dataTestId]}-input-text` : undefined}
      onCompositionStart={handleComposition}
      onCompositionEnd={handleComposition}
    />
  );
}

export default InputText
