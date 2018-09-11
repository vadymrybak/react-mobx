import * as React from 'react';
import {observer, inject} from 'mobx-react';
import AppState from './AppStateClass';
import Child from './Child';
import {IMobxProps} from './AppStateClass';
import { Header, Icon } from 'semantic-ui-react'
import {autorun, observe, observable} from 'mobx';


interface ITimerViewProps extends IMobxProps {
    message? : string,
    dummy? : {
        greeting: string
    }
}

/**
 * This is view component
 */
@inject( (store:any) => ({main : store.main}) ) // acontrol component injects appStare to TimerView props
@observer // generates a control component wrapping TimerView.
export class TimerView extends React.Component<ITimerViewProps, {}> {
    
    constructor(props){
        super(props);

        console.log("custom Props", this.props.message)
    }

    public render() {
        return (
            <div>
                <Child />
            </div>
        );
     }
 
};