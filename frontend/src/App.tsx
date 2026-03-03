import { useState, useEffect } from 'react';
import { RotateLoader } from 'react-spinners';
import { PopupAdd } from './components/PopupAdd';
import { PopupEdit } from './components/PopupEdit';
import './App.css'
import { useMaterials } from './hooks/useMaterials';
import { PaginatedMaterials } from './components/PaginatedMaterials';
import Button from './components/atoms/Button';
import type { Material } from './types/material';
import { toast } from 'react-toastify';

function App() {
  const [addIsOpen, setAddIsOpen] = useState(false); // controla o popup de add
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);

  const { materials, loading, error, deleteMaterial, addMaterial, editMaterial } = useMaterials();

  useEffect(() => {
    if (error) toast.error(`Erro: ${error.message}`);
  }, [error]);

  const renderContent = () => {
    if (loading) return <RotateLoader color="#363636" />;
    if (materials.length === 0) return <p>Material Indisponível</p>;
    return <>
      <div className="py-0 font-bold text-4xl">
                Material Educacional
      </div>
      <PaginatedMaterials materials={materials} onDelete={deleteMaterial} onEdit={setEditingMaterial} />;
      {/* Botão que abre o popup */}
      <Button mainText="Adicionar Material Educacional" showText={true} onClick={() => setAddIsOpen(true)} />
    </>

  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br bg-slate-700 dark:bg-cyan-950">
      
      <div className="flex-col place-items-center flex justify-center bg-slate-200 px-10 lg:py-15 shadow-xl h-screen w-2xl mx-40">

        {renderContent()}

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