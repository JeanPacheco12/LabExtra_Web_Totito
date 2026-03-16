import { useState } from 'react';
import './index.css';

// ============================================================================
// COMPONENTE: Square
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
// COMPONENTE: Board
// ============================================================================
export default function Board() {
  // Nuevo estado para saber de quién es el turno
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));

  function handleClick(i: number) {
    // Si el cuadro ya está ocupado, cortamos la función y no hacemos nada
    if (squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    
    // Asignamos X o O dependiendo del turno
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    
    setSquares(nextSquares);
    setXIsNext(!xIsNext); // Invertimos el turno
  }

  return (
    <>
      <div className="board-row">
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