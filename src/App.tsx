import * as React from 'react';
import { inject, observer } from 'mobx-react';
import AppState from './AppStateClass';
import { Menu, Icon } from 'semantic-ui-react'
import { Divider } from 'semantic-ui-react'

import { Router, Route, Switch, Link, BrowserRouter, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Child from './Child';
import Home from './Home';
import Param from './Param';


const history = createHistory();
@inject((store:any) =>{ 
    return ({main : store.store.main}) } )
@observer
export default class App extends React.Component<{main? : AppState, history? : any},{}> {
    public unlisten: any;

    public componentDidMount = () => {
        const unlisten = history.listen((location, action) => {
            console.log(action, location);
          });
      }

  public render() {

    return (
        <Router history={history}>
            <div>
                <div className='ui massive secondary menu'>
                    <div className='item'>
                        Test
                    </div>
                    <div className='right menu'>
                        <NavLink exact activeClassName="active" className='item' to='/'> <Icon name='home' /> Home</NavLink>
                        <NavLink activeClassName="active" className='item' to='/test'><Icon name='bug' /> Test</NavLink>
                        <NavLink activeClassName="active" className='item' to='/order/1234'><Icon name='paper plane' /> Param</NavLink>
                    </div>  
                </div>

                <Divider />

                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/test' component={Child}/>
                    <Route path='/order/:id' component={Param}/>
                </Switch>
            </div>
        </Router>
      
    );
  }
}