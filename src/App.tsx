import { useState } from 'react';
import './index.css';

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square({ value, onSquareClick }: { value: string | null, onSquareClick: () => void }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }: { xIsNext: boolean, squares: (string | null)[], onPlay: (nextSquares: (string | null)[], index: number) => void }) {
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares, i); // Pasamos el índice para calcular la ubicación
  }

  const winner = calculateWinner(squares);
  const status = winner ? 'Ganador: ' + winner : 'Siguiente jugador: ' + (xIsNext ? 'X' : 'O');

  return (
    <>
      <div className="status">{status}</div>
      {[0, 3, 6].map((row) => (
        <div key={row} className="board-row">
          {[0, 1, 2].map((col) => (
            <Square key={row + col} value={squares[row + col]} onSquareClick={() => handleClick(row + col)} />
          ))}
        </div>
      ))}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), location: null as number | null }
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  
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
      // Extra 1: Calcular fila y columna
      const row = Math.floor(step.location! / 3) + 1;
      const col = (step.location! % 3) + 1;
      description = `Ir al movimiento #${move} (Fila ${row}, Col ${col})`;
    } else {
      description = 'Ir al inicio del juego';
    }

    return (
      <li key={move}>
        {/* Extra 2: Resaltar el movimiento actual con negrita */}
        {move === currentMove ? (
          <b>Usted está en el movimiento #{move}</b>
        ) : (
          <button onClick={() => setCurrentMove(move)}>{description}</button>
        )}
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}