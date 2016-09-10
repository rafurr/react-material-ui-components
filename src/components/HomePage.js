import React from 'react';
import {Link} from 'react-router';

// Since this component is simple and static, there's no parent container for it.
const HomePage = () => {
  return (
    <div>
      <h1>React Material-UI Components</h1>

      <h2>Get Started</h2>

      <ol>
        <li>View the <Link to="/speed-dial">SpeedDial Component</Link></li>
        <li>View the <Link to="/number-input">NumberInput Component </Link></li>
      </ol>
    </div>
  );
};

export default HomePage;
