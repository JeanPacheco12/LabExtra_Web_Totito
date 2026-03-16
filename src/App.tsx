import { useState } from 'react';
import './index.css';

// ============================================================================
// COMPONENTE: Square (Ahora con estado propio)
// ============================================================================
function Square() {
  // useState hace que el cuadrito "recuerde" su valor (inicia en null)
  const [value, setValue] = useState<string | null>(null);

  function handleClick() {
    // Al hacer clic, cambiamos el estado a 'X'
    setValue('X');
  }

  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}

// ============================================================================
// COMPONENTE: Board (Renderiza 9 Squares independientes)
// ============================================================================
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}