import React from 'react';
import { Board } from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.firstPlayer = "X";
        this.secondPlayer = "O";
        this.currentPlayer = this.firstPlayer;

        this.movesDone = 0;

        const initialSquares = Array(9).fill(null);
        this.movesHistory = [
            {
                squares: initialSquares,
                currentPlayer: this.firstPlayer,
                winner: null
            }
        ]

        this.state = {
            movesDone: this.movesDone
        }
    }

    render() {
        const movesDone = this.movesDone;
        const current = this.movesHistory[movesDone];
        const currentSquares = current.squares;
        const player = current.currentPlayer;
        const winner = current.winner;

        const status = winner ? "Zwycięża gracz " + winner : "Aktualny gracz: " + player;

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={currentSquares} onClick={(squareIndex) => { this.handleBoardClick(squareIndex) }} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }

    // ========================================

    handleBoardClick(squareIndex) {
        const moveIsLegit = this.checkMoveLegitnes(squareIndex);
        if (!moveIsLegit) return;

        this.makeMove(squareIndex);

        const gameIsOver = this.checkWinner();
        if (gameIsOver) return;

        this.changePlayer();
    }

    // ========================================

    checkMoveLegitnes(squareIndex) {
        const current = this.movesHistory[this.movesDone];
        const currentSquares = current.squares;
        if (currentSquares[squareIndex]) return false;
        const winner = current.winner;
        if (winner) return false;
        return true;
    }

    // ========================================

    makeMove(squareIndex) {
        const current = { ...this.movesHistory[this.movesDone] };
        const currentSquares = { ...current.squares };
        current.squares = currentSquares;

        current.squares[squareIndex] = current.currentPlayer;
        this.movesHistory.push(current);

        this.movesDone++;
        this.setState({ movesDone: this.movesDone });
    }

    // ========================================

    checkWinner() {
        const current = this.movesHistory[this.movesDone];
        const squares = current.squares;
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return current.winner = squares[a];
            }
        }
        return current.winner = null;
    }

    // ========================================

    changePlayer() {
        let player = null
        const winner = this.movesHistory[this.movesDone].winner;
        if (winner) return;
        player = this.firstPlayer;
        if (this.movesDone % 2) player = this.secondPlayer;
        this.movesHistory[this.movesDone].currentPlayer = player;
    }
}

export { Game };