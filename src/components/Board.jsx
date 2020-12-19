import React from "react";
import { Button} from "@material-ui/core";

const classes = {
  badgeFont: {
    fontSize: "1.9vw",
    height: "5vw",
    margin: "0.1vw",
  },
};

function Square(props) {
    return (
      <Button style={classes.badgeFont} size = "large" variant="contained" color="primary"  onClick={props.onClick}>
        {props.value}
      </Button>
    );
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
          <br/>
        </div>
      );
    }
  }
  export default Board;