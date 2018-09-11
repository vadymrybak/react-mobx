import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppState from './AppStateClass';
import App from './App';
import { TimerView } from './TimerView';
import Subs from './Subs';
import { Provider } from 'mobx-react';
import { Container ,  Menu, Segment } from 'semantic-ui-react'
import 'semantic-ui/dist/semantic.min.css'
import { Router, Route, Switch, Link } from 'react-router-dom';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import createBrowserHistory from 'history/createBrowserHistory';


const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);
const stores = {
  main: new AppState(),
  routing: routingStore,
 
}


ReactDOM.render(
  <Provider store={stores}>
    <Container>
    
      <Router history={history}>
        <App />
      </Router>

    </Container>
  </Provider>, 
  document.getElementById('root')
);

