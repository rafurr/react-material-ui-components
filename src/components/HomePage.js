import React from 'react';
import {Link} from 'react-router';

const HomePage = () => {
  return (
    <div>
      <h1>React Material UI Components</h1>

      <h2>Get Started</h2>
      <ol>
        <li>Review the <Link to="material-ui">Material UI Components </Link></li>
        <li>Remove the demo and start coding: npm run remove-demo</li>
      </ol>
    </div>
  );
};

export default HomePage;
