import React from 'react';
import MyMapComponent from './Map'
import {
    Grid, Cell, ExpansionPanel, Paper, TextField, FontIcon,
    ExpansionList, TabsContainer, Tabs, Tab, Button, SelectField
} from 'react-md'
import Clock from 'react-countdown-clock'
class LeftActivity extends React.PureComponent {
    state = {
        isMarkerShown: false,
    }
    render() {
        const { address = "", name = "", phone = "", type = "", note = "" } = this.props.location
        return (
            <Grid>
                <Cell size={8} phoneSize={12}>
                    <TextField
                        label="Địa chỉ khách:"
                        value={address}
                        disabled
                        leftIcon={<FontIcon>add_location</FontIcon>}
                    />
                </Cell>
                <Cell size={4} phoneSize={12}>
                    <TextField
                        label="Loại xe:"
                        disabled
                        value={type}
                        leftIcon={<FontIcon>directions_bike</FontIcon>}
                    />
                </Cell>
                <Cell size={12} phoneSize={12}>
                    <TextField
                        label="Ghi chú:"
                        value={address}
                        disabled
                        leftIcon={<FontIcon>note</FontIcon>}
                    />
                </Cell>
                <Cell size={12} phoneSize={12}>
                    <TextField
                        label="Số điện thoại:"
                        value={address}
                        disabled
                        leftIcon={<FontIcon>note</FontIcon>}
                    />
                </Cell>
                <Cell size={6}>
                    <Button
                        disabled
                        raised
                        primary
                        swapTheming
                    >Đón Khách</Button>
                </Cell>
                <Cell size={6}>
                    <Button
                        raised
                        disabled
                        primary
                        swapTheming
                    >Trả khách</Button>
                </Cell>
                <Clock
                    seconds={5}
                    color="#e67e22"
                    alpha={0.9}
                    size={100}
                    // onComplete={}
                />
            </Grid>

        )
    }
};

export default LeftActivity;