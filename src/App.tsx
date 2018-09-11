import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import { Menu, Icon, Segment } from 'semantic-ui-react'
import { Divider } from 'semantic-ui-react'

import { Router, Route, Switch, Link } from 'react-router-dom';
import Child from './Child';
import Home from './Home';

@inject((store:any) =>{ 
    console.log(store.store.routing)
    return ({routing : store.store.routing}) } )
@observer
export default class App extends React.Component<{routing?: RouterStore},{}> {
  public render() {
    const { location, push, goBack } = this.props.routing;
    console.log(this.props.routing);
    return (
      <div>
            <Menu borderless secondary size='huge'>
                <Menu.Item>
                    <span>Current pathname: {location.pathname}</span>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item
                        color='blue'
                        name='Home'
                        active={location.pathname === '/'}
                        onClick={() => push('/')}
                    >
                        <Icon name='home' /> Home
                    </Menu.Item>

                    <Menu.Item
                        color='blue'
                        name='Test'
                        active={location.pathname === '/test'} 
                        onClick={() => push('/test')}
                    >
                        <Icon name='bug' /> Test
                    </Menu.Item>
                </Menu.Menu>  
            </Menu>
            
            

            <Divider />

        {/* <button onClick={() => goBack()}>Go Back</button> */}
        
        <Route path='/' component={Home}/>
        <Route path='/test' component={Child}/>
      </div>
    );
  }
}