import React, { useState, useEffect } from 'react';
import axios from "axios";
import PlayerData from './PlayerData'

//const baseUrl = 'https://bad-api-assignment.reaktor.com';

const History = ({ players, addGamesForPlayers }) => {
  const [cursor, setCursor] = useState('/rps/history');
  const [loading, setLoading] = useState(false); 
  //const [endedGames, setEndedGames] = useState([]);
  //const [players, setPlayers] = useState(new Map());

  useEffect(() => {
    if (cursor !== null) {
      setLoading(oldValue => true);
      axios
        .get(`${cursor}`)
        .then((response) => {
          setCursor(response.data.cursor);
          console.log(response.data.cursor);
          response.data.data.forEach((newObj) => addGamesForPlayers(newObj));
          //setEndedGames(games => [ ...games, ...response.data.data ]);
        })
        .catch((e) => {
            console.log(e);
        });
    } else {
      setLoading(oldValue => false);
    }
  }, [cursor, addGamesForPlayers])
  //console.log(players);

  const playerRows = (playerMap) => 
      [...playerMap].slice(0, 5).map((player, index) => (
        <PlayerData player={player} key={index}/>
      ));
  const loadingText = 'Loading...';

  return (
    <div>
      <h1>History</h1>
      {loading 
        ? loadingText
        : ''
      }
      <div>
        <div>{ playerRows(players) }</div>
      </div>
    </div>

  );

};

export default History;