import React from 'react';
import './styling/Player.css';


const PlayerList = (props) => {
  return (
    <div>
      <h4>Player Records</h4>
      <table className="user-list">
          <thead>
            <tr>
                <th>Player:</th>
                <th>Win:</th>
                <th>Lose:</th>
                <th># of Games:</th>
            </tr>
          </thead>
          <tbody>
            {
              props.data.map(user => {
            return (<tr key={user._id}>
                    <td>{user.player}</td>
                    <td>{user.win}</td>
                    <td>{user.lose}</td>
                    <td>{user.game}</td>
                  </tr>)
              })
            }
          </tbody>
      </table>
    </div>
  )
}

export default PlayerList;
