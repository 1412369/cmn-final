import React from 'react';
import MyMapComponent from './Map'
import {
    Grid, Cell, ExpansionPanel, Paper, TextField, FontIcon,
    ExpansionList, TabsContainer, Tabs, Tab, Button
} from 'react-md'
import LeftActivity from './LeftActivity'
import { Socket } from '../Config/config.js'
import {GetDrivers} from './api.js'

const removeDriver = (drivers,id) => {
    return drivers.filter(driver=>driver._id!=id && driver)
}
class MainActivity extends React.PureComponent {
    constructor() {
        super()
        this.state = {
            location: {},
            drivers:[],
            radius:0
        }
        this.fetchDriver = this.fetchDriver.bind(this)
        this.updateDrivers = this.updateDrivers.bind(this)
    }
    onExpandToggle(expanded) {
        console.log(expanded)
    }
    updateLocation(){

    }
    fetchDriver(){
        GetDrivers().then(response=>{
            const drivers = response.data.message
            this.setState({...this.state,drivers})
        })
    }
    updateDrivers(drivers){
        this.setState({...this.state,drivers:[...drivers]})
    }
    updateRadius(radius){
        this.setState({...this.state,radius})
    }
    componentDidMount() {
        const {drivers}= this.state
        const { socket } = this.props
        this.fetchDriver()
        socket.on(Socket.Phone.NEW_ADDRESS, (address) => {
            this.setState({ ...this.state, location: address })
        })
        socket.on(Socket.Driver.ONLINE ,(driver)=>{
            this.setState({...this.state,drivers:[...this.state.drivers,driver]})
        })
        socket.on(Socket.Driver.OFFLINE ,(id)=>{
            const filterDriver = drivers.filter(driver=>driver._id!=id && driver)
            this.setState({...this.state,drivers:[...filterDriver]})
        })
    }

    render() {
        const compress = { ...this.state }
        console.log("main_update",this.state.radius)
        return (
            <Grid style={{ padding: "0px", margin: "0px" }} className="force-overflow">
                <Cell size={4} phoneSize={12} style={{ padding: "10px", margin: "0px" }} className="scrollbar" id="style-1">
                    <LeftActivity 
                    {...this.state}
                    updateRadius={this.updateRadius.bind(this)}
                    />
                </Cell>
                <Cell size={8} style={{ padding: "0px", margin: "0px" }}>
                    <MyMapComponent
                        {...compress}
                        fetchDriver = {this.fetchDriver}
                        updateDrivers ={this.updateDrivers}
                    />
                </Cell>
            </Grid >
        )
    }
};

export default MainActivity;