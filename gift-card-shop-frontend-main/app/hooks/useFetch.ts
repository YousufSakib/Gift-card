import type { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import apiClient from '~/config/apiConfig';
import { store } from '~/store/store';

type UseFetch<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
};

export function useFetch<T>(
    url: string | null,
    config?: AxiosRequestConfig<any> | undefined,
    onSuccess?: (data?: T) => void
): UseFetch<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const setUser = store((state: RootState) => state.setUser);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        if (!url) return;

        try {
            const response = await apiClient.get<T>(url, { ...config });

            setData(response.data);
            onSuccess && onSuccess(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'An error occurred');
            if (err.response.status === 401) {
                console.log('Unauthorized access - redirecting to login');
                setUser({} as User);
            }
            // setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!url) return;

        fetchData();
    }, [url, JSON.stringify(config)]);

    return { data, loading, error, refetch: fetchData };
}
