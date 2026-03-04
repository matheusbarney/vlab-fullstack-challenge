import type { Material } from "../../types/material";

export function MaterialItems({ currentItems, onDelete, onEdit }: {
  currentItems: Material[];
  onDelete: (id: string) => void;
  onEdit: (material: Material) => void;
}) {

  function truncate(text: string, limit = 200) {
    if (!text || text.length <= limit) return text;
    return text.slice(0, limit).trimEnd() + "…";
  }

  return (
    <>
      {currentItems && currentItems.map((material) => (
        <li key={material.id} className="border rounded-lg p-4 flex items-start justify-between gap-4">
          <div>
            <p className="font-bold">{material.title}</p>
            <p className="italic">{material.type}</p>
            <p><span className="font-bold">Descrição:</span> {truncate(material.description)}</p>
            <p><span className="font-bold">URL:</span> {material.url}</p>
            <p><span className="font-bold">Tags:</span> {material.tags?.join(', ')}</p>
          </div>
          <div className="flex flex-col gap-2">
            <button onClick={() => onEdit(material)} className="bg-blue-300 hover:bg-slate-400 text-slate-800 hover:text-slate-900">
              Editar
            </button>
            <button onClick={() => onDelete(material.id)} className="bg-slate-700 text-white hover:bg-slate-900 hover:text-slate-100">
              Deletar
            </button>
          </div>
        </li>
      ))}
    </>
  );
}
