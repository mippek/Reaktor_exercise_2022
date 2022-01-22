import React from 'react';
import GameListComponent from './GameListComponent';

const PlayerGames = ({ games }) => {
  
  return (
    <div>
      <h4>Games</h4> 
      <div className="container">
        <div className="game-list-container">
          <GameListComponent games={games}/>
        </div>
      </div>
    </div>
  )
};

export default PlayerGames;