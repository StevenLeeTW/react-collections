import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  stringtoFixed,
  filterInputNumberString,
  enforceRange,
  isStrGreaterThanMax,
  isStrLessThanMax,
} from "./utils";
import BigNumber from "bignumber.js";
import useEventListener from "../../hooks/useEventListener";
import "./index.css";

export interface ErrorProps {
  message?: "number is greater than max value" | "number is less than min value";
  value?: string;
}

export interface InputNumberProps {
  id?: string;
  decimalPlaces?: number;
  value?: string;
  step?: number;
  onChange?: (value: string) => void;
  min?: number;
  max?: number;
  isEnforceRange?: boolean;
  onError?: (isError: boolean, error?: ErrorProps) => void;
  prefix?: string;
  className?: string;
  placeHolder?: string;
  "data-testid"?: string;
}

const InputNumber = ({
  id,
  decimalPlaces = 0,
  value,
  onChange,
  step = 1,
  prefix = "",
  min = -Infinity,
  max = Infinity,
  isEnforceRange = true,
  onError,
  className,
  placeHolder,
  ...props
}: InputNumberProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>(value || "");
  const [error, setError] = useState<ErrorProps>();

  useEffect(() => {
    // align value and inputValue
    if (value === inputValue) return;

    if (typeof value === "string") {
      setInputValue(stringtoFixed(enforceRange(value, min, max, isEnforceRange), decimalPlaces));
    }
  }, [value, decimalPlaces, setInputValue, min, max, isEnforceRange]);

  useEffect(() => {
    // error handler
    if (isStrGreaterThanMax(inputValue, max)) {
      setError({ message: "number is greater than max value", value: inputValue });
    } else if (isStrLessThanMax(inputValue, min)) {
      setError({ message: "number is less than min value", value: inputValue });
    } else {
      setError({});
    }

    // onChange callback
    if (typeof onChange === "function") {
      onChange(inputValue);
    }
  }, [inputValue, max, min]);

  useEffect(() => {
    // error callback, only trigger as error state is changed
    if (typeof onError === "function") {
      if (error?.message) {
        onError(true, { message: "number is greater than max value", value: inputValue });
      } else {
        onError(false);
      }
    }
  }, [error]);

  const preventKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === "e") {
      e.preventDefault();
    }
  }, []);

  const keyDownFunction = useCallback(
    (e: KeyboardEvent) => {
      if (step) {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          const nextValue = new BigNumber(inputValue || 0)
            .plus(new BigNumber(step))
            .toFixed(decimalPlaces, BigNumber.ROUND_DOWN);
          setInputValue(nextValue);
        }
        // downWardArrow key
        if (e.key === "ArrowDown") {
          e.preventDefault();
          const nextValue = new BigNumber(inputValue || 0)
            .minus(new BigNumber(step))
            .toFixed(decimalPlaces, BigNumber.ROUND_DOWN);
          setInputValue(nextValue);
        }
      }
    },
    [inputValue]
  );

  useEventListener("keypress", preventKeyPress, inputRef);
  useEventListener("keydown", keyDownFunction, inputRef);

  return (
    <input
      id={id}
      className={`input-number ${className ? className : ""}`}
      ref={inputRef}
      type="text"
      value={`${inputValue ? prefix : ""}${inputValue}`}
      step={step}
      placeholder={placeHolder}
      onBlur={() => {
        const [inputValueOnes = "", inputValueDp, ...rest] = inputValue.split(".");
        if (inputValueDp?.length === 0 && decimalPlaces == 0) {
          return setInputValue(
            stringtoFixed(enforceRange(inputValueOnes, min, max, isEnforceRange), decimalPlaces)
          );
        }
        if (inputValueDp?.length > decimalPlaces || rest.length > 0) {
          return setInputValue(
            stringtoFixed(
              enforceRange(`${inputValueOnes}.${inputValueDp}`, min, max, isEnforceRange),
              decimalPlaces
            )
          );
        }

        return setInputValue(
          stringtoFixed(enforceRange(inputValue, min, max, isEnforceRange), decimalPlaces)
        );
      }}
      onChange={(e) => {
        setInputValue(filterInputNumberString(e.target.value));
      }}
      {...props}
    />
  );
};

export default InputNumber;
