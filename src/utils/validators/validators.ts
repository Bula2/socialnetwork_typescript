export const required = (value:string) => {
    if (value) return undefined;
    return "Поле пустое";
}

export const maxLengthCreator = (maxLength: number) => (value:string) => {
    if (value.length <= maxLength) return undefined;
    return `Максимальная длина: ${maxLength} символов`;
}

