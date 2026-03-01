
import { materialService } from '../services/materialService';
import{ useEffect, useState } from 'react';
import type { Material } from "../types/material";

export const useMaterials = () => {
    const [materials, setMaterials] = useState<Material[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadMaterials = async () => {
            try {
                setLoading(true);
                const data = await materialService.getAll();
                setMaterials(data);
                setError(null);
            } catch (err) {
                console.error('Error loading materials:', err);
                setError(err instanceof Error ? err : new Error(String(err)));
            } finally {
                setLoading(false);
            }
        };

        loadMaterials();
    }, []);

    return { materials, loading, error };
};

export default useMaterials;