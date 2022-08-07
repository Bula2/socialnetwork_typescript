export const required = value => {
    if (value) return undefined;
    return "Поле пустое";
}

export const maxLengthCreator = maxLength => value => {
    if (value.length <= maxLength) return undefined;
    return `Максимальная длина: ${maxLength} символов`;
}

