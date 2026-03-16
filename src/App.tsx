import { useState } from 'react';
import './index.css';

// ============================================================================
// COMPONENTE: Square (Ahora es "tonto", recibe todo por props del Board)
// ============================================================================
interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
}

function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// ============================================================================
// COMPONENTE: Board (Ahora maneja el estado de los 9 cuadros)
// ============================================================================
export default function Board() {
  // Elevamos el estado: el tablero ahora guarda un arreglo con los 9 valores (inician en null)
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));

  function handleClick(i: number) {
    // Creamos una copia del arreglo por inmutabilidad (muy importante en React)
    const nextSquares = squares.slice();
    // Asignamos la X en la posición del cuadro que se clickeó
    nextSquares[i] = 'X';
    // Actualizamos el estado del tablero
    setSquares(nextSquares);
  }

  return (
    <>
      <div className="board-row">
        {/* Pasamos el valor actual y una función de flecha para saber qué índice actualizar */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}