import React, { FC, ChangeEvent, useRef, CompositionEvent, useCallback } from "react";
import { checkStrLengthOfLimit } from "../../utils/input";
import "./index.css";
import "simplebar-react/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";

const dataTestId = "data-testid";

const placeCaretAtEnd = (el: HTMLDivElement) => {
  el.focus();
  if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  }
};

export interface TextAreaProps {
  label: string;
  id: string;
  placeHolder?: string;
  minLength?: number;
  maxLength?: number;
  className?: string;
  isError?: boolean;
  onError?: (isError: boolean) => void;
  onChange?: (value?: string) => void;
  onBlur?: () => void;
  value?: string;
  [dataTestId]?: string;
}

const TextArea: FC<TextAreaProps> = ({
  label,
  id,
  placeHolder,
  minLength,
  maxLength,
  className,
  isError,
  onError,
  onChange,
  value = "",
  onBlur,
  ...props
}) => {
  const inputValueRef = useRef<string>(value);
  const isOnComposition = useRef<boolean>(false);
  const textAreaRef = useRef<HTMLDivElement>(null);
  const isLengthOutOfLimit = checkStrLengthOfLimit(value, maxLength, minLength);

  const handleChange = (event: ChangeEvent<HTMLDivElement> | CompositionEvent<HTMLDivElement>) => {
    // explicitly cast the event.target to HTMLInputElement
    const eventValue = (event.target as HTMLDivElement).textContent as string;

    // don't call onChange as is onComposition
    if (!isOnComposition.current && typeof onChange === "function") {
      typeof onError === "function" &&
        onError(checkStrLengthOfLimit(eventValue, maxLength, minLength));
      onChange(eventValue);
    }
  };

  const handleComposition = (e: CompositionEvent<HTMLDivElement>) => {
    // call onChange(inputValue) as composition have done(type enter)
    if (e.type === "compositionend") {
      isOnComposition.current = false;
      handleChange(e);
    } else {
      isOnComposition.current = true;
    }
  };

  const onBlurCallback = useCallback(() => {
    typeof onError === "function" && onError(isLengthOutOfLimit);
    typeof onBlur === "function" && onBlur();
  }, [isLengthOutOfLimit]);

  return (
    <div className={`textarea-container ${className ? `${className}` : ""}`}>
      <label
        data-testid={props?.[dataTestId] ? `${props[dataTestId]}-label` : undefined}
        className="textarea-label"
        htmlFor={id}
        onClick={() => {
          if (textAreaRef.current) {
            placeCaretAtEnd(textAreaRef.current);
          }
        }}
      >
        {label}
      </label>
      <SimpleBar
        className={`texaarea-simple-bar ${Boolean(isError) ? "error" : ""}`}
        style={{ maxHeight: 170 }}
      >
        <div
          className="textarea-div"
          ref={textAreaRef}
          id={id}
          contentEditable
          suppressContentEditableWarning
          dangerouslySetInnerHTML={{ __html: inputValueRef.current }}
          onInput={handleChange}
          data-testid={props?.[dataTestId] ? props[dataTestId] : undefined}
          placeholder={placeHolder}
          onCompositionStart={handleComposition}
          onCompositionEnd={handleComposition}
          onBlur={onBlurCallback}
          {...props}
        />
      </SimpleBar>
    </div>
  );
};

export default TextArea;
