import React from 'react';
import { Grid, Cell, TextField, Button, Avatar } from 'react-md'

const style = {
    marginTop: "100px"
}
const text = {
    fontSize: "50px"
}
const imageStyle = {
    position: "relative",
    left: "40%",

}
class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: ""
        }
        this.onChange = this.onChange.bind(this)
    }
    onChange(value, e) {
        this.setState({
            ...this.state,
            [e.target.name]:value
        })
    }
    render() {
        const { username, password } = this.state
        return (
            <Grid style={style}>
                <Cell size={4}></Cell>
                <Cell size={4}>
                    <img src='image/user.png' style={imageStyle} width="100px" role="presentation" />
                    <TextField
                        value={username}
                        id="username"
                        name="username"
                        type="email"
                        onChange={this.onChange}
                        label="Email or Username"
                        customSize="username" style={{ marginTop: "20px" }} />
                    <TextField
                        value={password}
                        name="password"
                        id="password"
                        type="password"
                        label="Password"
                        onChange={this.onChange}
                    style={{ marginTop: "20px" }} />
                    <Grid>
                        <Cell size={4}><Button flat primary swapTheming>Đăng nhập</Button></Cell>
                        <Cell size={8} ><Button flat secondary swapTheming>Đăng kí</Button></Cell>
                    </Grid>
                </Cell>

                <Cell size={4}></Cell>
            </Grid>
        );
    }
};

export default Login;