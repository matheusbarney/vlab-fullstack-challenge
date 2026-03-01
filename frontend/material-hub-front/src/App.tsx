
import './App.css'

import { useMaterials } from './hooks/useMaterials';

function App() {
  const { materials, loading, error } = useMaterials();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  return (
    <>
      <div>
        <h1>Materiais ({materials.length})</h1>
        <pre>{JSON.stringify(materials, null, 2)}</pre>
      </div>
    </>
  )
}

export default App
