import React from 'react';
import { FixedSizeList } from 'react-window';
import ROCK from '../images/rock.png';
import PAPER from '../images/paper.png';
import SCISSORS from '../images/scissors.png';

const handToImage = { ROCK, PAPER, SCISSORS };

// Create one row for a game that shows all game information
const GameRow = ({ data, index, style }) => {
  const game = data[index];
  return (
    <div className="game-row" style={style}>
      <div>
        <h4>{game.gameId}</h4>
        <div className="game-flex-container">
          <div>
            <h2>{game.playerA.name}</h2>
            <img alt={game.playerA.played} width="50" src={handToImage[game.playerA.played]}/>
            <p>{game.playerA.played}</p>
          </div>
          <h2>vs.</h2>
          <div>
            <h2>{game.playerB.name}</h2>
            <img alt={game.playerB.played} width="50" src={handToImage[game.playerB.played]}/>
            <p>{game.playerB.played}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Create own rows for each game, only show one game at a time using react-window
const GameListComponent = ({ games }) => (
  <FixedSizeList
    height={200}
    width={'100%'}
    itemSize={200}
    itemCount={games.length}
    itemData={games}
  >
    {GameRow}
  </FixedSizeList>
);

export default GameListComponent;