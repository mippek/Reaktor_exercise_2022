import React, { useState, useEffect } from 'react';

const gameKeys = ['gameId', 'playerA', 'playerB'];

const Games = ({ games, addGame }) => {
  //const [games, setGames] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('wss://bad-api-assignment.reaktor.com/rps/live');

    ws.onopen = () => {
      console.log("websocket open");
    };
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      const newObj = JSON.parse(response);
      console.log(newObj);
      addGame(newObj);
    };
    ws.onclose = () => {
      console.log("websocket closed");
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, [addGame]);

  const gameRow = (obj) =>
    Object.entries(obj).filter(([key, value]) => gameKeys.includes(key))
                       .map(([key, value]) => {
                         if (key === 'playerA' || key === 'playerB') {
                           return Object.entries(value).map(([playerKey, playerValue]) =>
                              <td key={`${key}${playerKey}`}> {key}, {playerKey}: {playerValue}</td>
                           )
                         }
                         return(
                            <td key={key}> {key}: {value} </td>
                       )});

  const gameRows = (arr) =>
    arr &&
    arr.map((obj, index) => (
      <tr key={index}>
        {gameRow(obj)}
      </tr>
    ));

  return (
    <div>
      <h2>Ongoing Games</h2>
      <table>
        <tbody>{gameRows(games)}</tbody>
      </table>
    </div>
  );
};

export default Games;


