import React, { useEffect } from 'react';

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

  const gameRow = (game) =>
    <div>
      <h3>{game.gameId}</h3>
      <div className="game-flex-container">
        <h2>{game.playerA.name}</h2>
        <h2>vs.</h2>
        <h2>{game.playerB.name}</h2>
      </div>
    </div>
   /*Object.entries(game).filter(([key, value]) => gameKeys.includes(key))
                       .map(([key, value]) => {
                         if (key === 'playerA' || key === 'playerB') {
                           return Object.entries(value).map(([playerKey, playerValue]) =>
                              <div key={`${key}${playerKey}`}> {playerValue}</div>
                           )
                         }
                         return(
                            <div key={key}> {value} </div>
                       )});*/

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


