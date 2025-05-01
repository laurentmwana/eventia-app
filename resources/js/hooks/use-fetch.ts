import { useEffect, useState } from 'react';

export const useFetch = <T>(path: string) => {
    const [isPending, setIsPending] = useState<boolean>(false);
    const [fetchData, setFetchData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!path) return;

        const fetchDataAsync = async () => {
            setIsPending(true);
            setError(null);

            try {
                const response = await fetch(path, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                const data: T = await response.json();
                setFetchData(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Une erreur inconnue est survenue');
                }
                setFetchData(null);
            } finally {
                setIsPending(false);
            }
        };

        fetchDataAsync();
    }, [path]);

    return {
        fetchData,
        isPending,
        error,
    };
};
