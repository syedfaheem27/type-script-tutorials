export interface Validatable {
  value: number | string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
}

export function validate(validationObj: Validatable) {
  const value = validationObj.value;
  //Checking if the field is required
  if (validationObj.required && value.toString().trim().length === 0)
    return false;

  //Check max length of string
  if (
    validationObj.maxLength !== undefined &&
    typeof value === "string" &&
    value.trim().length > validationObj.maxLength
  )
    return false;

  //Check min length of a string
  if (
    validationObj.minLength !== undefined &&
    typeof value === "string" &&
    value.trim().length < validationObj.minLength
  )
    return false;

  //Check the max number
  if (
    validationObj.max !== undefined &&
    typeof value === "number" &&
    value > validationObj.max
  )
    return false;

  //Check the min number
  if (
    validationObj.min !== undefined &&
    typeof value === "number" &&
    value < validationObj.min
  )
    return false;

  return true;
}
