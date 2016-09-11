import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import ReduxMUIPage from './containers/ReduxMUIPage'; // eslint-disable-line import/no-named-as-default
import ReduxPage from './containers/ReduxPage'; // eslint-disable-line import/no-named-as-default
import SpeedDialPage from './containers/SpeedDialPage'; // eslint-disable-line import/no-named-as-default
import NumberInputPage from './containers/NumberInputPage'; // eslint-disable-line import/no-named-as-default
import AboutPage from './components/AboutPage.js';
import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="redux" component={ReduxPage}/>
    <Route path="redux-mui" component={ReduxMUIPage}/>
    <Route path="speed-dial" component={SpeedDialPage}/>
    <Route path="number-input" component={NumberInputPage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
