
import './App.css'
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useMaterials } from './hooks/useMaterials';

const ITEMS_PER_PAGE = 3;

function MaterialItems({ currentItems }: { currentItems: { id: number; title: string; description: string }[] }) {
  return (
    <>
      {currentItems && currentItems.map((material) => (
        <li key={material.id} className="border rounded-lg p-4">
          <p className="font-bold">{material.title}</p>
          <p>{material.description}</p>
        </li>
      ))}
    </>
  );
}

function PaginatedMaterials({ materials }: { materials: { id: number; title: string; description: string }[] }) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + ITEMS_PER_PAGE;
  const currentItems = materials.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(materials.length / ITEMS_PER_PAGE);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * ITEMS_PER_PAGE) % materials.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-2 md:gap-4 py-4 bg-red-200 w-xl">
        <MaterialItems currentItems={currentItems} />
      </ul>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Próximo >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< Anterior"
        renderOnZeroPageCount={null}
        className="flex gap-2 py-4"
        pageClassName="border rounded cursor-pointer hover:bg-slate-300 py-3"
        activeClassName="bg-slate-400 font-bold py-3"
        previousClassName="border rounded cursor-pointer hover:bg-slate-300 py-3"
        nextClassName="border rounded cursor-pointer hover:bg-slate-300 py-3"
        disabledClassName="opacity-40 cursor-not-allowed"
        pageLinkClassName="display-block px-3 py-3"
        previousLinkClassName="display-block px-4 py-3"
        nextLinkClassName="display-block px-4 py-3"
      />
    </>
  );
}

function App() {
  const { materials, loading, error } = useMaterials();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  const renderContent = () => {
    if (materials.length === 0) return <p>Material Indisponível</p>;
    return <PaginatedMaterials materials={materials} />;
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
