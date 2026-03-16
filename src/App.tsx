import { useState } from 'react';
import './index.css';

// ============================================================================
// FUNCIÓN AUXILIAR MEJORADA: Ahora devuelve el ganador y las posiciones
// ============================================================================
function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  // LA CORRECCIÓN ESTÁ AQUÍ:
  return { winner: null, line: [] as number[] }; // Agregamos "as number[]"
}

// ============================================================================
// COMPONENTE: Square (Resalta si es parte de la línea ganadora)
// ============================================================================
function Square({ value, onSquareClick, isHighlight }: { value: string | null, onSquareClick: () => void, isHighlight: boolean }) {
  return (
    <button 
      className={`square ${isHighlight ? 'highlight' : ''}`} 
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

// ============================================================================
// COMPONENTE: Board (Usa bucles para renderizar la cuadrícula)
// ============================================================================
function Board({ xIsNext, squares, onPlay }: { xIsNext: boolean, squares: (string | null)[], onPlay: (nextSquares: (string | null)[], index: number) => void }) {
  const result = calculateWinner(squares);
  const winner = result.winner;
  const winningLine = result.line;

  function handleClick(i: number) {
    if (winner || squares[i]) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares, i);
  }

  // Lógica de Status: Ganador, Empate o Siguiente
  let status;
  if (winner) {
    status = '🏆 Ganador: ' + winner;
  } else if (!squares.includes(null)) {
    status = '🤝 ¡Empate!';
  } else {
    status = 'Siguiente jugador: ' + (xIsNext ? 'X' : 'O');
  }

  // EXTRA: Renderizar usando dos bucles (Loops)
  const boardSize = 3;
  let boardRows = [];
  for (let row = 0; row < boardSize; row++) {
    let rowSquares = [];
    for (let col = 0; col < boardSize; col++) {
      const index = row * boardSize + col;
      rowSquares.push(
        <Square 
          key={index} 
          value={squares[index]} 
          onSquareClick={() => handleClick(index)} 
          isHighlight={winningLine.includes(index)} // Resaltado de victoria
        />
      );
    }
    boardRows.push(<div key={row} className="board-row">{rowSquares}</div>);
  }

  return (
    <>
      <div className="status">{status}</div>
      {boardRows}
    </>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL: Game (Maneja historial, orden y coordenadas)
// ============================================================================
export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), location: null as number | null }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true); // EXTRA: Orden ascendente/descendente

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(nextSquares: (string | null)[], index: number) {
    const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, location: index }];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const moves = history.map((step, move) => {
    let description;
    if (move > 0) {
      const row = Math.floor(step.location! / 3) + 1;
      const col = (step.location! % 3) + 1;
      description = `Ir al movimiento #${move} (${row}, ${col})`;
    } else {
      description = 'Ir al inicio del juego';
    }

    return (
      <li key={move}>
        {move === currentMove ? (
          <span className="current-move">Estás en el mov. #{move}</span>
        ) : (
          <button onClick={() => setCurrentMove(move)}>{description}</button>
        )}
      </li>
    );
  });

  // EXTRA: Invertir el orden de la lista si es necesario
  if (!isAscending) {
    moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button className="sort-btn" onClick={() => setIsAscending(!isAscending)}>
          Orden: {isAscending ? 'Ascendente ↑' : 'Descendente ↓'}
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}