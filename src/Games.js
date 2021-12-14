
import React, { useState, useEffect } from 'react';

const Games = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('wss://bad-api-assignment.reaktor.com/rps/live');

    ws.onopen = () => {
      console.log("websocket open");
    };
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      const newObj = JSON.parse(response);
      console.log(newObj);
      let ongoingGames = [ ...games, newObj ];
      if (newObj.type === 'GAME_RESULT') {
        ongoingGames = ongoingGames.filter( obj => obj.type !== 'GAME_RESULT' && obj.gameId !== newObj.gameId);
      }
      setGames(ongoingGames);
    };
    ws.onclose = () => {
      console.log("websocket closed");
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, [games]);

  const gameRow = (obj) =>
    Object.entries(obj).map(([key, value]) => {
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
    <div className="order-container">
      <p>Ongoing Games:</p>
      <table>
        <tbody>{gameRows(games)}</tbody>
      </table>
      
    </div>
  );
};

export default Games;


