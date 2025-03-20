export const useAppLogger = () => {
    const info = (text: string, data: any = '') => console.log(text, data);
    const warning = (text: string, data: any = '') => {
        if (typeof data === 'object') {
            console.warn(text, JSON.stringify(data))
            return;
        }
        console.warn(text, data)
    };
    const error = (text: string, data: any = '') => {
        if (typeof data === 'object') {
            console.error(text, JSON.stringify(data))
            return;
        }
        console.error(text, data)
    }

    return {
        info,
        warning,
        error
    }
}