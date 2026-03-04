
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
                toast.error('Erro carregando materials');
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
        } catch (err) {
            console.error('Error adding material:', err);
            toast.error('Erro ao adicionar material');
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
        } catch (err) {
            console.error('Error editing material:', err);
            toast.error('Erro ao editar material');
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
            toast.info('Material deletado.');
            setMaterials(prev => prev.filter(material => material.id !== id));
        } catch (err) {
            console.error('Error deleting material:', err);
            toast.error('Erro deletando material');
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
            toast.info('Descrição e tags preenchidas usando IA!');
            return content;
        } catch (err) {
            console.error('Error generating AI content:', err);
            toast.error('Erro ao gerar conteúdo IA');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { materials, loading, error, deleteMaterial, editMaterial, addMaterial, generateAIContent };
};

export default useMaterials;