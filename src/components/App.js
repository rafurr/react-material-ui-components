import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

const App = (props) => {
  return (
    <div className="container">
      <IndexLink to="/">Home</IndexLink>
      <Link to="/demo">Demo</Link>
      <Link to="/speed-dial">SpeedDial</Link>
      <Link to="/number-input">NumberInput</Link>
      <Link to="/about">About</Link>
      <br/>
      {props.children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
