import React, { useEffect } from 'react';

const Games = ({ games, addGame }) => {

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

  const gameRow = (game) =>
    <div>
      <h3>{game.gameId}</h3>
      <div className="game-flex-container">
        <h2>{game.playerA.name}</h2>
        <h2>vs.</h2>
        <h2>{game.playerB.name}</h2>
      </div>
    </div>

  const gameRows = (gameArr) =>
    gameArr &&
    gameArr.map((game, index) => (
      <div className="table-row" key={index}>
        {gameRow(game)}
      </div>
    ));

  return (
    <div>
      <h1>Ongoing Games</h1>
      <div>
        {gameRows(games)}
      </div>
    </div>
  );
};

export default Games;


