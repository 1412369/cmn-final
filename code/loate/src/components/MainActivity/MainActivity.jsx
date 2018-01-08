import React from 'react';
import MyMapComponent from './Map'
import {
    Grid, Cell, ExpansionPanel, Paper, TextField, FontIcon,
    ExpansionList, TabsContainer, Tabs, Tab, Button
} from 'react-md'
import LeftActivity from './LeftActivity'
import { Socket } from '../Config/config.js'
import { GetDrivers, Pair } from './api.js'

const removeDriver = (drivers, id) => {
    return drivers.filter(driver => driver._id != id && driver)
}
class MainActivity extends React.PureComponent {
    constructor() {
        super()
        this.state = {
            location: {},
            drivers: [],
            radius: 0,
            closer_driver: ""
        }
        this.fetchDriver = this.fetchDriver.bind(this)
        this.updateDrivers = this.updateDrivers.bind(this)
    }
    onExpandToggle(expanded) {
        console.log(expanded)
    }
    updateCloserDriver(closer_driver) {
        this.setState({ ...this.state, closer_driver })
    }
    fetchDriver() {
        GetDrivers().then(response => {
            const drivers = response.data.message
            this.setState({ ...this.state, drivers })
        })
    }
    updateDrivers(drivers) {
        this.setState({ ...this.state, drivers: [...drivers] })
    }
    pairDriverUser() {
        const { socket } = this.props
        const { location, closer_driver } = this.state
        const current_locator = JSON.parse(localStorage.getItem('user'))
        const payload = {
            driver: {
                _id: closer_driver.driver._id,
                email: closer_driver.driver.email,
                name: closer_driver.driver.name,
            },
            locator: {
                _id: current_locator._id,
                email: current_locator.email,
                name: current_locator.name
            },
            _id: location._id
        }
        socket.emit(Socket.Locate.PAIR, payload)
    }
    updateRadius(radius) {
        this.setState({ ...this.state, radius })
    }
    componentDidMount() {
        const { drivers } = this.state
        const { socket } = this.props
        this.fetchDriver()
        if (socket) {
            socket.on(Socket.Phone.NEW_ADDRESS, (address) => {
                console.log("new_address",address)
                this.setState({ ...this.state, location: address })
            })
            socket.on(Socket.Driver.ONLINE, (driver) => {
                if (driver.status === "free") {
                    this.setState({ ...this.state, drivers: [...this.state.drivers, driver] })
                }
            })
            socket.on(Socket.Driver.OFFLINE, (id) => {
                const filterDriver = this.state.drivers.filter(driver => driver._id != id && driver)
                this.setState({ ...this.state, drivers: [...filterDriver] })
            })
            socket.on(Socket.Locate.PAIR, () => {
                GetDrivers().then(response => {
                    const drivers = response.data.message
                    this.setState({
                        ...this.state,
                        drivers,
                        location: {},
                        closer_driver: null,
                        radius: 0
                    })
                }).catch(err => {
                    throw err
                })

            })
            socket.on(Socket.Driver.DRIVER_MOVE,(data)=>{
                console.log("driver_move",data)
                let new_update = this.state.drivers.map(driver=>{
                    if(driver._id===data._id){
                        return data
                    }else{
                        return driver
                    }
                })
                this.setState({...this.state,drivers:[...new_update]})
            })
        } else {
            throw new Error("Loi cai con cac")
        }
    }

    render() {
        return (
            <Grid style={{ padding: "0px", margin: "0px" }} className="force-overflow">
                <Cell size={4} phoneSize={12} style={{ padding: "10px", margin: "0px" }} className="scrollbar" id="style-1">
                    <LeftActivity
                        {...this.state}
                        updateRadius={this.updateRadius.bind(this)}
                        pairDriverUser={this.pairDriverUser.bind(this)}
                    />
                </Cell>
                <Cell size={8} style={{ padding: "0px", margin: "0px" }}>
                    <MyMapComponent
                        {...this.state}
                        socket = {this.props.socket}
                        fetchDriver={this.fetchDriver}
                        updateDrivers={this.updateDrivers}
                        updateCloserDriver={this.updateCloserDriver.bind(this)}
                    />
                </Cell>
            </Grid >
        )
    }
};

export default MainActivity;