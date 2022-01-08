import React, { useState, useEffect } from 'react';
import axios from "axios";

//const baseUrl = 'https://bad-api-assignment.reaktor.com';

const History = ({ players, addGamesForPlayers }) => {
  const [cursor, setCursor] = useState('/rps/history');
  //const [endedGames, setEndedGames] = useState([]);
  //const [players, setPlayers] = useState(new Map());

  useEffect(() => {
    if (cursor !== null) {
      axios
        .get(`${cursor}`)
        .then((response) => {
          setCursor(response.data.cursor);
          console.log(response.data.cursor);
          response.data.data.forEach((obj) => addGamesForPlayers(obj));
          //setEndedGames(games => [ ...games, ...response.data.data ]);
        })
        .catch((e) => {
            console.log(e);
        });
    }
  }, [cursor, addGamesForPlayers])
  //console.log(players);

  const playerRows = (map) => 
      [...map].slice(0, 10).map((player, index) => (
        <tr key={index}>
          <td>{player[0]}</td>
          <td>{player[1].length}</td>
        </tr>
      ));

  return (
    <div>
      <h2>History</h2>
      <table>
        <tbody>{playerRows(players)}</tbody>
      </table>
    </div>

  );

};

export default History;