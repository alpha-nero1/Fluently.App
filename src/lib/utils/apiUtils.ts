/**
 *  Take a request object and turn it into url params.
 */
export const createQueryParamsString = <T extends object>(obj: T) => {
    if (Object.keys(obj).length === 0) return '';

    const ampersandCity = Object.keys(obj)
        .filter(key => typeof (obj as any)[key] !== 'undefined')
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent((obj as any)[key])}`)
        .join('&');
    return `?${ampersandCity}`;
}