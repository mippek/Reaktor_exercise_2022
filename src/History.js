import React, { useState, useEffect } from 'react';
import axios from "axios";

//const baseUrl = 'https://bad-api-assignment.reaktor.com';

const History = () => {
  const [cursor, setCursor] = useState('/rps/history');
  const [endedGames, setEndedGames] = useState([]);
  const [players, setPlayers] = useState(new Map());

  useEffect(() => {
    if (cursor !== null) {
      axios
        .get(`${cursor}`)
        .then((response) => {
          setCursor(response.data.cursor);
          console.log(response.data.cursor);
          response.data.data.forEach((obj) => setPlayers(oldPlayers => {
              const newMap = new Map(oldPlayers);
              const objA = newMap.has(obj.playerA.name) ? [...newMap.get(obj.playerA.name), obj] : [obj];
              const objB = newMap.has(obj.playerB.name) ? [...newMap.get(obj.playerB.name), obj] : [obj];
              newMap.set(obj.playerA.name, objA);
              newMap.set(obj.playerB.name, objB);
              return newMap
            })
          );
          setEndedGames(games => [ ...games, ...response.data.data ]);
        })
        .catch((e) => {
            console.log(e);
        });
    }
  }, [cursor])
  //console.log(players);

  const playerRows = (map) => 
      [...map].map((player, index) => (
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