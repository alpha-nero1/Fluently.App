export const getEnumNames = <TEnum>(enm: object): TEnum[] => {
    return Object.keys(enm).filter(item => item !== 'Unknown' && item !== "-1") as TEnum[];
}

export const getEnumCaseInsensitive = <TEnum>(enm: object, enumName: string): TEnum => {
    const enumNameLower = enumName.toLowerCase();
    const found = Object.keys(enm).find(item => item.toLowerCase() == enumNameLower);
    if (typeof found === 'undefined') {
        return -1 as TEnum;
    }
    return found as TEnum;
}