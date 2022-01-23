import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import PlayerList from './PlayerList';

//const baseUrl = 'https://bad-api-assignment.reaktor.com';
const loadingText = 'Loading...';
const REFRESH_INTERVAL = 1000 * 60 * 60; // 60 minutes

const History = ({ players, addGamesForPlayers, updatePlayers }) => {
  // cursor for the initial fetch of data from /rps/history
  const [cursor, setCursor] = useState('/rps/history');
  const [loading, setLoading] = useState(false); 

  // temporary cursor and players for refreshing player data from /rps/history after the initial fetch
  const tempCursor = useRef('/rps/history');
  const error = useRef(false);
  const tempPlayers = useRef(new Map());

  // initially fetch data
  useEffect(() => {
    // fetch data with a new cursor until the cursor returns null
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
            setLoading(oldValue => false);
        });
    } else {
      setLoading(oldValue => false);
    }
  }, [cursor, addGamesForPlayers])

  // set an interval for a REFRESH_INTERVAL time to refetch data from /rps/history
  useEffect(() => {
    const fetchData = async () => {
      console.log('update started')
      try {
        const response = await axios.get(`${tempCursor.current}`);
        tempCursor.current = response.data.cursor;
        console.log('temp cursor:', response.data.cursor);
        response.data.data.forEach((newGame) => {
          const newMap = new Map(tempPlayers.current);
          const gamesA = newMap.has(newGame.playerA.name) ? [...newMap.get(newGame.playerA.name), newGame] : [newGame];
          const gamesB = newMap.has(newGame.playerB.name) ? [...newMap.get(newGame.playerB.name), newGame] : [newGame];
          newMap.set(newGame.playerA.name, gamesA);
          newMap.set(newGame.playerB.name, gamesB);
          tempPlayers.current = newMap;
        })
      } catch (e) {
        console.log(e);
        error.current = true;
      }
    }

    const updateHistory = async () => {
      while (tempCursor.current !== null && !error.current) {
        await fetchData();
      }
      updatePlayers(tempPlayers.current);
      tempCursor.current = '/rps/history';
      error.current = false;
      tempPlayers.current = new Map();
    }
    
    const interval = setInterval(() => {
        updateHistory();
    }, REFRESH_INTERVAL)
       
       
     return () => clearInterval(interval);

  }, [updatePlayers])

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