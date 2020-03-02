import React from 'react';
import './styling/Player.css';

const AddPlayer = (props) => {
  return (
    <form className="userForm" onSubmit={props.onSubmit}>
      <div>
        <input name="first-player" type="text" onChange={props.onFirstPlayer} placeholder="Player 1"/>
      </div>
      <div>
        <input name="second-player" type="text" onChange={props.onSecondPlayer}
         placeholder="Player 2"/>
      </div>
        <input type="submit" value="Submit" className="btn-submit"/>
    </form>
  )
}

export default AddPlayer;
