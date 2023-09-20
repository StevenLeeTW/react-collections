import React, { useEffect, useState } from "react";
import "./index.css";

const CircleDot = () => <div className="circle-dot" />;

const Circle = () => <div className="circle" />;

export interface RadioOptionProps {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioButtonGroupProps {
  options: RadioOptionProps[];
  onChange?: (selectedValue: string) => void;
  defaultSelected?: number;
}


export const RadioButtonGroup = ({ options = [], onChange, defaultSelected }: RadioButtonGroupProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    typeof defaultSelected === "number" && defaultSelected >= 0 ? defaultSelected : undefined
  );

  const handleOptionChange = (index: number) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (typeof defaultSelected === "number" && defaultSelected !== selectedIndex) {
      setSelectedIndex(defaultSelected);
    }
  }, [defaultSelected]);

  useEffect(() => {
    if (
      typeof onChange === "function" &&
      options &&
      typeof selectedIndex === "number" &&
      selectedIndex >= 0 &&
      options?.[selectedIndex]?.value
    ) {
      onChange(options[selectedIndex].value);
    }
  }, [selectedIndex]);

  if (!options?.length) {
    return null;
  }

  return (
    <div>
      {options.map((option, index) => {
        const isChecked = selectedIndex === index;
        return (
          <div
            className={`radio-button ${isChecked ? "checked" : ""} ${
              option?.disabled ? "disabled" : ""
            }`}
            key={`radio-btn-${option.label}-${isChecked ? "selected" : "unselected"}-${
              option?.disabled ? "disabled" : "able"
            }`}
            onClick={() => !option.disabled && handleOptionChange(index)}
            data-testid={`radio-btn-${index}`}
          >
            {isChecked ? <CircleDot /> : <Circle />}
            {option.label}
          </div>
        );
      })}
    </div>
  );
};

export default RadioButtonGroup;
