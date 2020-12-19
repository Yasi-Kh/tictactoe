import React from 'react';
import Board from "./Board";
import { Button,Box,Container} from "@material-ui/core";

function calculateWinner(squares) {
  const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winCondition.length; i++) {
    const [a, b, c] = winCondition[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [
          {
            squares: Array(9).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true,
      };
    }
    
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([
          {
            squares: squares
          }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    }
    
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Reset';
        return (
          <li key={move}>
            <Button color="primary" onClick={() => this.jumpTo(move)}>{desc}</Button>
          </li>
        );
      });

      let status;
      if (winner) {
        status = "Winner: " + winner;
      } 
      else {
        if(moves.length !== 10){
          status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }
        else{status = "Tie";}
      }
      return (
        <div align = "center">
        <div className="game" text-align="center" 
        style={{ backgroundColor: "#cfe8fc" , width:'46vw', border:"0.2vw dashed blue", borderRadius: '2vw'}}>
          <br/>
          <br/>
          <Container align="center">
          <br/>
            <div className="game-board">
              <Board
                squares={current.squares}
                onClick={i => this.handleClick(i)}
              />
            </div>
          </Container>
            <div className="game-info">
              <div>
               <Box align="center" color="#f73378" fontSize="1.5vw">{status}</Box>
              </div>
              <Box style={{paddingLeft:'1vw'}} align = "left" color="#f73378" fontSize="1.5vw"><ol>{moves}</ol></Box>
            </div>
          </div>
        </div>
      );
    }
  }
  export default Game;