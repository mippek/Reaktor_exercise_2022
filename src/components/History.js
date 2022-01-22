import React, { useState, useEffect } from 'react';
import axios from "axios";
import PlayerList from './PlayerList';

//const baseUrl = 'https://bad-api-assignment.reaktor.com';
const loadingText = 'Loading...';

const History = ({ players, addGamesForPlayers }) => {
  const [cursor, setCursor] = useState('/rps/history');
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    if (cursor !== null) {
      setLoading(oldValue => true);
      axios
        .get(`${cursor}`)
        .then((response) => {
          setCursor(response.data.cursor);
          console.log(response.data.cursor);
          response.data.data.forEach((newObj) => addGamesForPlayers(newObj));
        })
        .catch((e) => {
            console.log(e);
        });
    } else {
      setLoading(oldValue => false);
    }
  }, [cursor, addGamesForPlayers])

  return (
    <div>
      <h1>History</h1>
      {loading 
        ? loadingText
        : ''
      }
      <div>
        <PlayerList players={[ ...players ]} />
      </div>
    </div>

  );

};

export default History;