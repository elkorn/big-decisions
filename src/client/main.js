import React from 'react';
import Router from 'react-router';
import routes from './routes';
import {measureRender} from './console';

const app = document.getElementById('app');

Router.run(routes, Router.HistoryLocation, (Root) => {
  measureRender(done => React.render(<Root />, app, done));
});
