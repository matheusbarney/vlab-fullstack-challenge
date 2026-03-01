export interface Material {
    id: number;
    title: string;
    description: string;
    type: "Vídeo" | "PDF" | "Link";
    url: string;
    tags: string[];
}
