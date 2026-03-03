import type { Material } from "../types/material";

export function MaterialItems({ currentItems, onDelete, onEdit }: {
  currentItems: Material[];
  onDelete: (id: string) => void;
  onEdit: (material: Material) => void;
}) {
  return (
    <>
      {currentItems && currentItems.map((material) => (
        <li key={material.id} className="border rounded-lg p-4 flex items-start justify-between gap-4">
          <div>
            <p className="font-bold">{material.title}</p>
            <p className="italic">{material.type}</p>
            <p>{material.description}</p>
            <p>URL: {material.url}</p>
            <p>{material.tags?.join(', ')}</p>
          </div>
          <div className="flex flex-col gap-2">
            <button onClick={() => onEdit(material)} className="bg-blue-200">
              Editar
            </button>
            <button onClick={() => onDelete(material.id)} className="bg-red-300">
              Deletar
            </button>
          </div>
        </li>
      ))}
    </>
  );
}
