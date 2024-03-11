export function validate(validationObj) {
    const value = validationObj.value;
    if (validationObj.required && value.toString().trim().length === 0)
        return false;
    if (validationObj.maxLength !== undefined &&
        typeof value === "string" &&
        value.trim().length > validationObj.maxLength)
        return false;
    if (validationObj.minLength !== undefined &&
        typeof value === "string" &&
        value.trim().length < validationObj.minLength)
        return false;
    if (validationObj.max !== undefined &&
        typeof value === "number" &&
        value > validationObj.max)
        return false;
    if (validationObj.min !== undefined &&
        typeof value === "number" &&
        value < validationObj.min)
        return false;
    return true;
}
//# sourceMappingURL=validation.js.map