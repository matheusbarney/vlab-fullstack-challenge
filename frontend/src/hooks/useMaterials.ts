
import { materialService } from '../services/materialService';
import type { MaterialInput, AIGeneratedContent } from '../services/materialService';
import{ useEffect, useState } from 'react';
import type { Material } from "../types/material";
import { toast } from 'react-toastify/unstyled';

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
                toast.error('Error loading materials');
                throw err;
            } finally {
                setLoading(false);
            }
        };

        loadMaterials();
    }, []);

    const addMaterial = async (data: MaterialInput) => {
        try {
            setLoading(true);
            setError(null);
            const newMaterial = await materialService.addMaterial(data);
            setMaterials(prev => [...prev, newMaterial]);
            return newMaterial;
            toast.success('Material added successfully!');
        } catch (err) {
            console.error('Error adding material:', err);
            toast.error('Error adding material');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const editMaterial = async (id: string, data: MaterialInput) => {
        try {
            setLoading(true);
            setError(null);
            const updatedMaterial = await materialService.editMaterial(id, data);
            setMaterials(prev => prev.map(material => material.id === id ? updatedMaterial : material));
            return updatedMaterial;
            toast.info('Material edited successfully.');
        } catch (err) {
            console.error('Error editing material:', err);
            toast.error('Error editing material');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteMaterial = async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            await materialService.deleteById(id);
            setMaterials(prev => prev.filter(material => material.id !== id));
            toast.info('Deleted material.');
        } catch (err) {
            console.error('Error deleting material:', err);
            toast.error('Error deleting material');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const generateAIContent = async (title: string, type: string): Promise<AIGeneratedContent | null> => {
        try {
            setLoading(true);
            setError(null);
            const content = await materialService.generateAIContent(title, type);
            return content;
            toast.info('Filled in Description and tags using AI!');
        } catch (err) {
            console.error('Error generating AI content:', err);
            toast.error('Error generating AI content');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { materials, loading, error, deleteMaterial, editMaterial, addMaterial, generateAIContent };
};

export default useMaterials;