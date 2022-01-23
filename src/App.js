import React, { useState, useCallback } from 'react';
import Games from './components/Games';
import History from './components/History';
import logo from './images/logo.png';

const App = () => {
  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState(new Map());

  const addGamesForPlayers = useCallback( (newGame) => {
    setPlayers(oldPlayers => {
      const newMap = new Map(oldPlayers);
      const gamesA = newMap.has(newGame.playerA.name) ? [...newMap.get(newGame.playerA.name), newGame] : [newGame];
      const gamesB = newMap.has(newGame.playerB.name) ? [...newMap.get(newGame.playerB.name), newGame] : [newGame];
      newMap.set(newGame.playerA.name, gamesA);
      newMap.set(newGame.playerB.name, gamesB);
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

  const updatePlayers = useCallback( (newPlayers) => {
    setPlayers( oldPlayers => newPlayers );
  }, [])

  return (
    <div>
      <div className="header">
        <img alt="Rock, Paper, Scissors" width="200" src={logo}/>
      </div>
      <Games games={games} addGame={addGame} />
      <History players={players} addGamesForPlayers={addGamesForPlayers} updatePlayers={updatePlayers}/>
    </div>
  );
};

export default App;
