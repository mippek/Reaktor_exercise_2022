import React, { useState, useCallback } from 'react';
import Games from './Games';
import History from './History';

const App = () => {
  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState(new Map());

  const addGamesForPlayers = useCallback( (obj) => {
    setPlayers(oldPlayers => {
      const newMap = new Map(oldPlayers);
      const gamesA = newMap.has(obj.playerA.name) ? [...newMap.get(obj.playerA.name), obj] : [obj];
      const gamesB = newMap.has(obj.playerB.name) ? [...newMap.get(obj.playerB.name), obj] : [obj];
      newMap.set(obj.playerA.name, gamesA);
      newMap.set(obj.playerB.name, gamesB);
      return newMap;
    });
  }, [])

  const addGame = useCallback( (newGame) => {
    setGames(oldGames => {
      let ongoingGames = [ ...oldGames, newGame ];
      if (newGame.type === 'GAME_RESULT') {
        ongoingGames = ongoingGames.filter( obj => obj.type !== 'GAME_RESULT' && obj.gameId !== newGame.gameId);
        addGamesForPlayers(newGame);
      }
      return ongoingGames;
    });
  }, [addGamesForPlayers])

  return (
    <div>
      <h1> Rock, Paper, Scissors</h1>
      <Games games={games} addGame={addGame} />
      <History players={players} addGamesForPlayers={addGamesForPlayers}/>
    </div>
  );
};

export default App;
