import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppState from './AppStateClass';
import App from './App';
import { Provider } from 'mobx-react';
import { Container} from 'semantic-ui-react'
import 'semantic-ui/dist/semantic.min.css'
import './styles.css'



const stores = {
  main: new AppState(),
}


ReactDOM.render(
  <Provider store={stores}>
    <Container>
    

        <App />


    </Container>
  </Provider>, 
  document.getElementById('root')
);

