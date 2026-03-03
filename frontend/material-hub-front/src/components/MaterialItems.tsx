export function MaterialItems({ currentItems, onDelete }: {
  currentItems: { id: string; title: string; description: string; }[];
  onDelete: (id: string) => void;
}) {
  return (
    <>
      {currentItems && currentItems.map((material) => (
        <li key={material.id} className="border rounded-lg p-4 flex items-start justify-between gap-4">
          <div>
            <p className="font-bold">{material.title}</p>
            <p>{material.description}</p>
          </div>
          <button
            onClick={() => onDelete(material.id)}
            className="bg-red-300"
          >
            Deletar
          </button>
        </li>
      ))}
    </>
  );
}
