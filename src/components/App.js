import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

const App = (props) => {
  return (
    <div>
      <IndexLink to="/react-material-ui-components">Home</IndexLink>
      {' | '}
      <Link to="/react-material-ui-components/demo">Demo</Link>
      {' | '}
      <Link to="/react-material-ui-components/speed-dial">SpeedDial</Link>
      {' | '}
      <Link to="/react-material-ui-components/number-input">NumberInput</Link>
      {' | '}
      <Link to="/react-material-ui-components/about">About</Link>
      <br/>
      {props.children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
