import { useEffect, useState } from "react";

interface ApiContextOptions<TData> {
    id: string;
    fetcher: () => Promise<TData>;
    dataInterceptor?: (data: TData) => void;
}

interface ApiContextResponse<TData> {
    isLoading: boolean;
    isError: boolean;
    error: string;
    refresh: () => void;
    data: TData | null
} 

/**
 * A hook to store common context/data for API calls & responses.
 */
export const useApiContext = <TData> (ops: ApiContextOptions<TData>): ApiContextResponse<TData> => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [apiState, setApiState] = useState<TData | null>(null);

    const loadData = () => {
        setIsLoading(true);
        ops.fetcher()
            .then(res => {
                setApiState(res);
                setIsLoading(false);
            })
            .catch(res => {
                setError(res.message);
                setIsLoading(false);
            });
    }

    useEffect(loadData, [ops.id]);

    useEffect(() => {
        if (typeof ops.dataInterceptor === 'function' && apiState != null) {
            ops.dataInterceptor(apiState);
        }
    }, [apiState]);

    const refresh = loadData;

    return {
        data: apiState,
        isLoading,
        error,
        refresh,
        isError: !!error
    }
};