export interface Material {
    id: string;
    title: string;
    description: string;
    type: "Vídeo" | "PDF" | "Link";
    url: string;
    tags: string[];
}
