import * as React from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';


export default class Param extends React.Component<{ match? : any},{}> {
    
    constructor(props){
        super(props);

        const { id } = this.props.match.params;
        console.log("match: ", this.props)
    }

    public render() {
        return (
            <div>Params</div>
        )
    }
}