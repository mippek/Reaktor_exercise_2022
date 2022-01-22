import React from 'react';
import { FixedSizeList } from 'react-window';
import ROCK from '../images/rock.png';
import PAPER from '../images/paper.png';
import SCISSORS from '../images/scissors.png';

const handToImage = { ROCK, PAPER, SCISSORS };

const GameRow = ({ data, index, style }) => {
  const game = data[index];
  return (
    <div className="game-row" style={style}>
      <div>
        <h4>{game.gameId}</h4>
        <div className="game-flex-container">
          <div>
            <h2>{game.playerA.name}</h2>
            <img alt={handToImage[game.playerA.played]} width="50" src={handToImage[game.playerA.played]}/>
          </div>
          <h2>vs.</h2>
          <div>
            <h2>{game.playerB.name}</h2>
            <img alt={handToImage[game.playerB.played]} width="50" src={handToImage[game.playerB.played]}/>
          </div>
        </div>
      </div>
    </div>
  );
}

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