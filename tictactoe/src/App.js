import React from 'react';
import Square from './Square';
import PlayerList from './PlayerList';
import AddPlayer from './AddPlayer';
import './styling/App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cell : Array(9).fill(null),
      next: true,
      data: [],
      player: [],
      firstPlayer: '',
      secondPlayer: '',
    }
  }

componentDidMount() {
  console.log(this.state.firstPlayer)
  axios.get('http://localhost:5000/player/fetchPlayer')
  .then(response => {
  console.log(response.data);
  this.setState({
      data: response.data
    })
  })
  .catch(error => console.log(error));
}

clickBoard(i){
  const cell = this.state.cell.slice();
  if(checkWinner(cell) || cell[i])
  { return };
  cell[i] = this.state.next ? 'X' : 'O';
  this.setState({
    cell : cell,
    next : !this.state.next,
  });
}

restartGame = () => {
  this.setState({
    next: true,
    cell: Array(9).fill(null),
  })
}

renderBoard(i) {
  return (
      <Square value={this.state.cell[i]}
      onClick= {() => this.clickBoard(i)}
   />
    )
}

handleInput = (e) => {
  const {name , value} = e.target;
  this.setState({
    [name]: value,
  })
  console.log(this.state.firstPlayer, this.state.secondPlayer)
}

onFirstPlayer = (e) => {
  this.setState({
    firstPlayer: e.target.value,
  })
}

onSecondPlayer = (e) => {
  this.setState({
    secondPlayer: e.target.value,
  })
}

handlePlayer = () => {
  this.setState({
    player:[],
  })
}


onScoreUpdate = () => {
  const score = [
    {win: 1}
  ]
  axios.put('http://localhost:5000/player/updateScore/:id', score)
  .then(res => console.log(res.data))
  .catch(error => console.log(error))
}


onSubmit = (e) => {
  e.preventDefault();
    const players = [
      {player: this.state.firstPlayer},
      {player: this.state.secondPlayer},
    ]

    this.setState({
      player:players,
    })

    players.map((player) => {
      axios.post('http://localhost:5000/player/addPlayer', player)
      .then(res => console.log(res.data))
      .catch(error => console.log(error))
    })

    window.location = '/';
  }

render() {
  const msg = 'No Players Yet';
  const winner = checkWinner(this.state.cell);
  const draw = checkAllBox(this.state.cell);
  let player;
   if (winner) {
     player = 'Winner: ' + (winner === 'X' ? this.state.firstPlayer : this.state.secondPlayer);
   } else if(!winner && draw) {
     player = 'Its a Draw';
   } else {
     player = 'Next player: ' + (this.state.next ? this.state.firstPlayer : this.state.secondPlayer);
   }
  return (
    <div className="App">
    <header className="App-header">
      <h3>TicTacToe Game</h3>
        <h5>{player}</h5>
        <button className="btn-game"
          onClick={this.restartGame}>New Game
        </button>
          <AddPlayer
              onFirstPlayer ={this.onFirstPlayer}
              onSecondPlayer = {this.onSecondPlayer}
              onSubmit={this.onSubmit}
              />

        <button  className="btn-players" onClick={this.handlePlayer}>
          New Players
        </button>
    </header>

  { this.state.player.length > 0 ?
  <div className="board-container">
    <div className="border" id="cell">
      {this.renderBoard(0)}
      {this.renderBoard(1)}
      {this.renderBoard(2)}
      {this.renderBoard(3)}
      {this.renderBoard(4)}
      {this.renderBoard(5)}
      {this.renderBoard(6)}
      {this.renderBoard(7)}
      {this.renderBoard(8)}
      </div>
    </div> :
        <h3>{msg}</h3>
  }
    <div className="player-container">
        <PlayerList
          data = {this.state.data}/>
    </div>
  </div>
  );
  }
}

function checkAllBox(cell) {
  let count = 0;

  cell.forEach((box) => {
    if (box !== null)
    count++;
  })
  if(count === 9) {
    return true;
  } else {
    return false;
  }
}

function checkWinner(cell) {
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
    if (cell[a] && cell[a] === cell[b] && cell[a] === cell[c]) {
      return cell[a];
    }
  }
  return null;
}

export default App;
