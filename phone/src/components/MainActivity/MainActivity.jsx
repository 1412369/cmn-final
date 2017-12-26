import React, { Component } from 'react';
import { Grid, Cell, Paper, TextField, Button, SelectField } from 'react-md'
import {PostAddress} from './api.js'
import {Socket} from '../Config/config.js'
class MainActivity extends Component {
    constructor() {
        super()
        this.state = {
            address: "",
            type: "",
            phone: "",
            name: "",
            note: "",
        }
        this.onTextChange = this.onTextChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onTypeChange = this.onTypeChange.bind(this)
    }
    onTypeChange(value, index, event){
        this.setState({...this.state,type:value})
    }
    onTextChange(value, e) { this.setState({ ...this.state, [e.target.name]: value }) }
    onSubmit(){
        PostAddress(localStorage.getItem('token'),{...this.state})
        .then(response=>{
            const {socket} = this.props
            socket.emit(Socket.Phone.NEW_ADDRESS,response.data.message)
            this.setState({
                address: "",
                type: "",
                phone: "",
                name: "",
                note: "",
            })
        })
        .catch(err=>{
            console.error(err)
        })
        
    }
    render() {
        const { phone, name, address, note,type } = this.state
        return (
            <Grid>
                <Cell size={3}></Cell>
                <Cell size={6}>
                    <Paper style={{ padding: "20px" }}>
                        <h4>Nhận khách</h4>
                        <hr />
                        <Grid>
                            <Cell size={8}>
                                <TextField
                                    id="text-with-close-button"
                                    label="Địa chỉ*"
                                    name="address"
                                    value={address}
                                    onChange={this.onTextChange}
                                />
                            </Cell>
                            <Cell size={4}>
                                <SelectField
                                    id="select-field-2"
                                    label="Loại xe"
                                    placeholder="Chọn loại xe"
                                    block={true}
                                    value={type}
                                    name="type"
                                    onChange={this.onTypeChange}                                    
                                    menuItems={["premium","normal"]}
                                    simplifiedMenu={true}
                                />
                            </Cell>
                        </Grid>
                        <Grid>
                            <Cell size={6}>
                                <TextField
                                    id="text-with-close-button"
                                    onChange={this.onTextChange}
                                    name="phone"
                                    value={phone}
                                    label="Số điện thoại*"
                                />
                            </Cell>
                            <Cell size={6}>
                                <TextField
                                    id="text-with-close-button"
                                    onChange={this.onTextChange}
                                    name="name"
                                    value={name}
                                    label="Họ tên"
                                />
                            </Cell>
                        </Grid>
                        <Grid>
                            <Cell size={12}>
                                <TextField
                                    id="text-with-close-button"
                                    onChange={this.onTextChange}
                                    name="note"
                                    value={note}
                                    label="Ghi chú"

                                />
                            </Cell>
                            <label htmlFor="">* bắt buộc</label>
                        </Grid>
                        <Grid>
                            <Button raised primary swapTheming onClick={this.onSubmit}>Gửi</Button>
                        </Grid>
                    </Paper>
                </Cell>
                <Cell size={3}></Cell>

            </Grid>
        );
    }
}

export default MainActivity;