import * as React from 'react';
import {observer, inject} from 'mobx-react';
import AppState from './AppStateClass';
import Bird from './Bird';
import { Button } from 'semantic-ui-react'
import {  List,Label, Header, Table } from 'semantic-ui-react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

@inject( (store:any) => ({main : store.store.main}) )
@observer
export default class Child extends React.Component<{main? : AppState}, {loading: boolean}> {

    constructor(props: any){
        super(props);
        this.state = {
            loading: true
        };
        const data = AppState.getSingleData().subscribe( (response: []) => {
            console.log("data ", response);
            this.props.main.dummy = response;
            this.setState({
                loading: false
            });
        },
        error => {
            console.log(error);
        });
    }

    public componentDidUpdate() {
        console.log("Child componentDidUpdate "+(new Date()));
     }

    public componentDidMount() {
        console.log("App rendered " + new Date());
    }

    public handleChangeColorClick = (event: any, bird: Bird) => {
        try{
            bird.changeColorNAge("BLUE", 10);
        }catch(error){
            console.log(error)
        }
        // bird.age = 10;
    }

    public handleClick = () => {
        const rand = Math.floor((Math.random() * 10) + 1);
        this.props.main.addBird(new Bird( "Bird #" + rand, rand, "green"));
    }

    public handleRemoveClick = () => {
        this.props.main.removeAllBirds();
    }

    public handleRemoveOnlyBlueClick = () => {
        this.props.main.removeOnlyBlue();
    }

    public render() {
        console.log("Child render at "+(new Date()));
        return (
            <div>
                <Dimmer active={this.state.loading} >
                    <Loader content='Loading' size='massive'/>
                </Dimmer>
                <Header as='h3' dividing={true}>
                    I have <Label circular={true} color={"blue"} key={"blue"}>{this.props.main.birdCount}</Label> birds!
                </Header>

                <Button fluid={true} onClick={this.handleClick}>Add new bird</Button>
                
                <List divided={true} verticalAlign='middle'>
                    {this.props.main.getBirds.map( (bird: Bird, index) => 
                        <List.Item key={index}>
                            <List.Content>
                                <span className="spanContent">{bird.name} with <strong>{bird.color}</strong> color. Age is {bird.age}</span>
                                <Button floated={"right"} content='Change color to BLUE' primary={true} onClick={(e) => this.handleChangeColorClick(e, bird)} />
                            </List.Content>
                        </List.Item>)
                    }
                </List>

                <Button.Group fluid={true}>
                    <Button negative={true} onClick={this.handleRemoveClick}>Remove all birds</Button>
                    <Button.Or text='or' />
                    <Button  color='yellow'  onClick={this.handleRemoveOnlyBlueClick}>Remove only blue birds</Button>
                </Button.Group>

                <Table striped={true}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Completed</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                     <Table.Body>
                         {this.props.main.dummy.map( (item,index) => (
                             <Table.Row key={index}>
                                    <Table.Cell>{item.id}</Table.Cell>
                                    <Table.Cell>{item.title}</Table.Cell>
                                    <Table.Cell>{item.completed ? 'yes' : 'no'}</Table.Cell>
                             </Table.Row>
                         ))}
                     </Table.Body>
                </Table>
            </div>
        );
     }
};