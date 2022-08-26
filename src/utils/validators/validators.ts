export const required = (value:string): string | undefined => {
    if (value) return undefined;
    return "Поле пустое";
}

export const maxLengthCreator = (maxLength: number) => (value:string): string | undefined => {
    if (value.length <= maxLength) return undefined;
    return `Максимальная длина: ${maxLength} символов`;
}

