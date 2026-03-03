import { useState } from 'react';
import { MaterialItems } from './MaterialItems';
import ReactPaginate from 'react-paginate';

const ITEMS_PER_PAGE = 3;

export function PaginatedMaterials({ materials, onDelete }: { 
  materials: { id: string; title: string; description: string }[]; 
  onDelete: (id: string) => Promise<void>;
}) {
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
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-2 md:gap-4 py-4 w-xl">
        <MaterialItems currentItems={currentItems} onDelete={onDelete} />
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