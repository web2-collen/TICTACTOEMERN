import React from 'react';
import './styling/Square.css';


const Square = (props) => {
  return (
    <div className="board"
    onClick={props.onClick}>
    {props.value}
    </div>
  )
}

export default Square;
