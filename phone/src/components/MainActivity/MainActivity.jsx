import React, { Component } from 'react';
import { Grid, Cell, Paper, TextField, Button, SelectField } from 'react-md'
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
    }
    onTextChange(value, e) { this.setState({ ...this.state, [e.target.name]: value }) }
    render() {
        const { phone, name, address, note } = this.state
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
                            <Button raised primary swapTheming>Gửi</Button>
                        </Grid>
                    </Paper>
                </Cell>
                <Cell size={3}></Cell>

            </Grid>
        );
    }
}

export default MainActivity;