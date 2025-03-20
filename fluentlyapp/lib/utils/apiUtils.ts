/**
 *  Take a request object and turn it into url params.
 */
export const createQueryParamsString = <T extends object>(obj: T) => {
    if (Object.keys(obj).length === 0) return '';

    const queryString = Object.keys(obj)
        .filter(key => (obj as any)[key] !== undefined)
        .map(key => {
            const value = (obj as any)[key];
            if (Array.isArray(value)) {
                return `${encodeURIComponent(key)}=${encodeURIComponent(value.join(','))}`;
            }
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        })
        .join('&');

    return `?${queryString}`;
}

export const getHeaders = (at: string) => ({ headers: { Authorization: `Bearer ${at}` }});