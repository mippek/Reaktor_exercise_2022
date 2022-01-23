import React, { useState } from 'react';
import Togglable from './Togglable';
import GameListComponent from './GameListComponent';
import PlayerPagination from './Pagination';
import ROCK from '../images/rock.png';
import PAPER from '../images/paper.png';
import SCISSORS from '../images/scissors.png';

const handToImage = { ROCK, PAPER, SCISSORS };
const DATA_PER_PAGE = 5;

// Component for listing the games a player has played
const PlayerGames = ({ games }) => (
  <div>
    <h4>Games</h4> 
    <div className="container">
      <div className="game-list-container">
        <GameListComponent games={games}/>
      </div>
    </div>
  </div>
);

// Component for showing other data (win ratio, number of matches and most played hand) for a player
const PlayerData = ({ player }) => {
  const playerName = player[0];
  const games = player[1];

  // Rules for determining which hand wins
  const winningRules = (myHand, otherHand) => {
    return (myHand === 'ROCK' && otherHand === 'SCISSORS') || (myHand === 'PAPER' && otherHand === 'ROCK') || (myHand === 'SCISSORS' && otherHand === 'ROCK') 
            ? 'WIN' 
            : 'LOSE';
  }
  // Count the win ratio of all games
  const winRatio = (player, games) => {
    const gameScores = games.reduce( (score, game) => {
      const myHand = game.playerA.name === player ? game.playerA.played : game.playerB.played;
      const otherHand = game.playerA.name === player ? game.playerB.played : game.playerA.played;
      const newScore = winningRules(myHand, otherHand);
      score[newScore] = (score[newScore] || 0) + 1;
      return score;
    }, {})
    return `${gameScores.WIN}/${gameScores.LOSE}`;
  }
  // Count the number of all games
  const numberOfMatches = (games) => {
    return games.length;
  }
  // Count the most played hand of all games
  const mostPlayedHand = (player, games) => {
    const playedHands = games.reduce( (hand, game) => {
      const newHand = game.playerA.name === player ? game.playerA.played : game.playerB.played;
      hand[newHand] = (hand[newHand] || 0) + 1;
      return hand;
    }, {})
    const max = Object.keys(playedHands).reduce( (a, b) => playedHands[a] > playedHands[b] ? a : b );
    return max;
  }

  const hand = mostPlayedHand(playerName, games);

  return (
    <div className="table-row history-row">
      <div className="history-flex-container">
        <div>
          <h2>{playerName}</h2>
          <h3>win ratio: {winRatio(playerName, games)}</h3>
          <h3>number of matches: {numberOfMatches(games)}</h3>
        </div>
        <div>
          <h3>most played hand</h3>
          <img alt={hand} width="100" src={handToImage[hand]}/>
          <p>{hand}</p>
        </div>
      </div>
      <div>
          <Togglable buttonLabel='show games'>
            <PlayerGames games={games}/>
          </Togglable>
        </div>
    </div>
  )
};

// Compponent for listing all players and their data
const PlayerList = ({ players }) => {
  // Currently shown players for pagination as only DATA_PER_PAGE players are shown at a time 
  const [currentPlayers, setCurrentPlayers] = useState(players.slice(0, DATA_PER_PAGE));

  const updateData = (firstIndex, lastIndex) => {
    setCurrentPlayers(players.slice(firstIndex, lastIndex));
  };

  const pageCount = Math.ceil(players.length / DATA_PER_PAGE);

  // Create the rows for player data
  const playerRows = (currentPlayers) => {
    const actualPlayers = currentPlayers.length === 0 ? players.slice(0, DATA_PER_PAGE) : currentPlayers;
    return (
      <div>
        {actualPlayers.map((player, index) => (
          <PlayerData player={player} key={index}/>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div>{ playerRows(currentPlayers) }</div>
      <PlayerPagination pageCount={pageCount} dataPerPage={DATA_PER_PAGE} updateData={updateData} />
    </div>
  )
}

export default PlayerList;