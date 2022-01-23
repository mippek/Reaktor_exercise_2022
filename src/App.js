import React, { useState, useCallback } from 'react';
import Games from './components/Games';
import History from './components/History';
import logo from './images/logo.png';

const App = () => {
  // ongoing games
  const [games, setGames] = useState([]);
  // history data of players
  const [players, setPlayers] = useState(new Map());


  // add games fetched from /rps/history to correct players
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

  // add games received from /rps/live to games and game results to correct players 
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

  // update player data when data from /rps/history has been refetched
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
