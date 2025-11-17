import { useState } from 'react';
import apiClient from '~/config/apiConfig';
import type { AxiosRequestConfig } from 'axios';

type UseMutation<T> = {
    mutate: (url: string, data?: T, config?: AxiosRequestConfig) => Promise<T>;
    loading: boolean;
    error: string | null;
    success: boolean;
};

export function useMutation<T>(method: 'post' | 'put' | 'patch' | 'delete'): UseMutation<T> {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const mutate = async (url: string, data?: any, config?: AxiosRequestConfig) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await apiClient[method]<T>(url, data, config);

            setSuccess(true);
            return response.data;
        } catch (err: any) {
            setError(err.response?.data?.message || 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { mutate, loading, error, success };
}
