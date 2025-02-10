export const useAppLogger = () => {
    const info = (text: string, data: any = '') => console.log(text, data);
    const warning = (text: string, data: any = '') => console.warn(text, data);
    const error = (text: string, data: any = '') => console.error(text, data);

    return {
        info,
        warning,
        error
    }
}