import React, { useState } from 'react';

// Component for toggling the list of games for each player to only show the games when the button 
// show games is clicked
const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '': 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>hide games</button>
        {props.children}
      </div>
    </div>
  )
}

export default Togglable;