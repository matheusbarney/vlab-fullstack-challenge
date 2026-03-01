import api from "./api";

import type { Material } from "../types/material";

export interface MaterialInput {
    title: string;
    description: string;
    type: "Vídeo" | "PDF" | "Link";
    url: string;
    tags?: string[];
}

export const materialService = {
    getAll: async () => {
        const res = await api.get<Material[]>("/materials");
        return res.data;
    },

    getById: async (id: string) => {
        const res = await api.get<Material>(`/materials/${id}`);
        return res.data;
    },

    deleteById: async (id: string) => {
        const res = await api.delete(`/materials/${id}`);
        return res.data;
    },

    addMaterial: async (data: MaterialInput) => {
        const response = await api.post<Material>('/materials', data);
        return response.data;
    },

    editMaterial: async (id: string, data: MaterialInput) => {
        const response = await api.put<Material>(`/materials/${id}`, data);
        return response.data;
    },

    generateAIContent: async (title: string, type: string) => {
        const res = await api.post<{ response: string }>('/ai', {
            prompt_title: title,
            prompt_type: type
        });
        return res.data.response;
    }
}