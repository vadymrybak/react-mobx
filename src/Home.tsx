import * as React from 'react';
import { Header } from 'semantic-ui-react'

export default class Home extends React.Component {
    public render() {
        return (
            <Header as='h2'>
                Home Page
                <Header.Subheader>Manage your account settings and set email preferences</Header.Subheader>
            </Header>
        );
    }
}