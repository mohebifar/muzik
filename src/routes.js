import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// Import containers
import App from 'containers/App/App';
import NowPlaying from 'containers/NowPlaying/NowPlaying';
import Albums from 'containers/Albums/Albums';

export default function getRoutes(store) {
  const history = syncHistoryWithStore(browserHistory, store);

  return (<Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Albums}/>
      <Route path="now-playing/:id" component={NowPlaying}/>
    </Route>
  </Router>);
};
