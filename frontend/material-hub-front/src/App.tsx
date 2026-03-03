
import './App.css'

import { useMaterials } from './hooks/useMaterials';
import { PaginatedMaterials } from './components/PaginatedMaterials';

function App() {
  const { materials, loading, error, deleteMaterial } = useMaterials();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  const renderContent = () => {
    if (materials.length === 0) return <p>Material Indisponível</p>;
    return <PaginatedMaterials materials={materials} onDelete={deleteMaterial} />;
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br bg-slate-700 dark:bg-cyan-950">
        <div className="flex-col place-items-center bg-slate-200 px-10 lg:py-15 shadow-xl h-screen mx-40">
            <div className="py-0 mx-5 lg:mx-0 lg:py-5 font-bold text-4xl">
                Material Educacional
            </div>
            {renderContent()}
        </div>
    </div>
  )
}

export default App
