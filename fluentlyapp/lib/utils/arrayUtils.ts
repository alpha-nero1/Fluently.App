export const deepCopyArray = <T>(array: T): T => {
    return (array as Array<any>).map(item => {
        if (Array.isArray(item)) {
            return deepCopyArray(item);
        } 
        
        if (item && typeof item === 'object') {
            return deepCopyObject(item);
        }

        return item;
    }) as T;
}

export const deepCopyObject = <T>(obj: T): T => {
    if (!obj || typeof obj !== 'object') return obj;
    
    return Object.keys(obj as object).reduce((copy, key) => {
        const value = obj[key as keyof T];
        
        if (Array.isArray(value)) {
            copy[key as keyof T] = deepCopyArray(value) as T[keyof T];
        } else if (value && typeof value === 'object') {
            copy[key as keyof T] = deepCopyObject(value) as T[keyof T];
        } else {
            copy[key as keyof T] = value;
        }
        return copy;
    }, {} as T);
  }