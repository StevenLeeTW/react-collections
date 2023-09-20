
export const checkStrLengthOfLimit = (str?: string, maxLength?: number, minLength?: number) => {
  if (typeof str !== "string") {
    return false;
  }
  const isLengthExceeded =
    maxLength !== undefined ? typeof str === "string" && str.length > maxLength : false;
  const isLengthBelowMin =
    minLength !== undefined ? typeof str === "string" && str.length < minLength : false;
  return isLengthExceeded || isLengthBelowMin;
};
