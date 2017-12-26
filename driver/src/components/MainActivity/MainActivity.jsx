import React from 'react';
import MyMapComponent from './Map'
import {
    Grid, Cell, ExpansionPanel, Paper, TextField, FontIcon,
    ExpansionList, TabsContainer, Tabs, Tab, Button
} from 'react-md'
import LeftActivity from './LeftActivity'
import { Socket } from '../Config/config.js'
import {GetDrivers} from './api.js'
class MainActivity extends React.PureComponent {
    constructor() {
        super()
        this.state = {
            location: {},
            drivers:[],

        }
    }
    onExpandToggle(expanded) {
        console.log(expanded)
    }
    componentDidMount() {
        const { socket } = this.props
        GetDrivers().then(response=>{
            const drivers = response.data.message
            this.setState({...this.state,drivers})
        })
        socket.on(Socket.Phone.NEW_ADDRESS, (address) => {
            this.setState({ ...this.state, location: address })
        })
    }

    render() {
        const compress = { ...this.state, ...this.props }
        return (
            <Grid style={{ padding: "0px", margin: "0px" }} className="force-overflow">
                <Cell size={4} phoneSize={12} style={{ padding: "10px", margin: "0px" }} className="scrollbar" id="style-1">
                    <LeftActivity {...this.state}/>
                </Cell>
                <Cell size={8} style={{ padding: "0px", margin: "0px" }}>
                    <MyMapComponent
                        {...this.state}
                    />
                </Cell>
            </Grid >
        )
    }
};

export default MainActivity;