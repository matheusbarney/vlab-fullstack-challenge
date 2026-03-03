import { useState } from 'react';
import { PopupAdd } from './components/PopupAdd';
import { PopupEdit } from './components/PopupEdit';
import './App.css'
import { useMaterials } from './hooks/useMaterials';
import { PaginatedMaterials } from './components/PaginatedMaterials';
import Button from './components/atoms/Button';
import type { Material } from './types/material';

function App() {
  const [addIsOpen, setAddIsOpen] = useState(false); // controla o popup de add
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);

  const { materials, loading, error, deleteMaterial, addMaterial, editMaterial } = useMaterials();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  const renderContent = () => {
    if (materials.length === 0) return <p>Material Indisponível</p>;
    return <PaginatedMaterials materials={materials} onDelete={deleteMaterial} onEdit={setEditingMaterial} />;
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br bg-slate-700 dark:bg-cyan-950">
      
      <div className="flex-col place-items-center flex justify-center bg-slate-200 px-10 lg:py-15 shadow-xl h-screen mx-40">
        <div className="py-0 mx-5 lg:mx-0 lg:py-5 font-bold text-4xl">
          Material Educacional
        </div>

        {renderContent()}

        {/* Botão que abre o popup */}
        <Button mainText="Adicionar Material Educacional" showText={true} onClick={() => setAddIsOpen(true)} />

        {/* Popup com o form para adicionar Material dentro */}
        <PopupAdd
          addIsOpen={addIsOpen}
          setAddIsOpen={setAddIsOpen}
          addMaterial={addMaterial}
        />


        {/* Popup com o form para adicionar Material dentro */}
        <PopupEdit
          material={editingMaterial}
          onClose={() => setEditingMaterial(null)}
          editMaterial={editMaterial}
        />    
      </div>
    </div>
  );
}

export default App;