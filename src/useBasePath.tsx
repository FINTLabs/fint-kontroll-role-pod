import { useState, useEffect } from 'react';
import axios from 'axios';

export function useBasePath() {
    const [basePath, setBasePath] = useState('');

    useEffect(() => {
        const configUrl = 'api/layout/configuration';

        const fetchBasePath = async () => {
            try {
                const basePathResponse = await axios.get(configUrl);
                const newBasePath = basePathResponse.data.basePath;
                setBasePath(newBasePath);
            } catch (error) {
                console.error('API Error:', error);
                throw error;
            }
        };

        fetchBasePath();
    }, []);

    return basePath;
}
