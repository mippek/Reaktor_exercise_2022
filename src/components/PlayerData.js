import React from 'react';
import Togglable from './Togglable';
import PlayerGames from './PlayerGames';
import ROCK from '../images/rock.png';
import PAPER from '../images/paper.png';
import SCISSORS from '../images/scissors.png';

//const gameKeys = ['gameId', 'playerA', 'playerB'];
const handToImage = { ROCK, PAPER, SCISSORS };

const PlayerData = ({ player }) => {
  const playerName = player[0];
  const games = player[1];

  const winningRules = (myHand, otherHand) => {
    return (myHand === 'ROCK' && otherHand === 'SCISSORS') || (myHand === 'PAPER' && otherHand === 'ROCK') || (myHand === 'SCISSORS' && otherHand === 'ROCK') 
            ? 'WIN' 
            : 'LOSE';
  }
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
  const numberOfMatches = (games) => {
    return games.length;
  }
  const mostPlayedHand = (player, games) => {
    const playedHands = games.reduce( (hand, game) => {
      const newHand = game.playerA.name === player ? game.playerA.played : game.playerB.played;
      hand[newHand] = (hand[newHand] || 0) + 1;
      return hand;
    }, {})
    const max = Object.keys(playedHands).reduce( (a, b) => playedHands[a] > playedHands[b] ? a : b );
    return [max, handToImage[max]];
  }

  /*
   <Togglable buttonLabel='show'>
    <PlayerGames games={games.slice(0, 5)}/>
    </Togglable>
  */

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
          <img alt={mostPlayedHand(playerName, games)[0]} width="100" src={mostPlayedHand(playerName, games)[1]}/>
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

export default PlayerData;