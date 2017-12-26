import React from 'react';
import MyMapComponent from './Map'
import {
    Grid, Cell, ExpansionPanel, Paper, TextField, FontIcon,
    ExpansionList, TabsContainer, Tabs, Tab, Button, SelectField
} from 'react-md'

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
                        id="disabled-floating-label-multiline-field"
                        label="Địa chỉ khách:"
                        value={address}
                        disabled
                        leftIcon={<FontIcon>add_location</FontIcon>}
                    />
                </Cell>
                <Cell size={4}  phoneSize={12}>
                    <TextField
                        id="disabled-floating-label-multiline-field"
                        label="Loại xe:"
                        disabled
                        value={type}
                        leftIcon={<FontIcon>directions_bike</FontIcon>}
                    />
                </Cell>
                <Cell size={12}  phoneSize={12}>
                    <TextField
                        id="disabled-floating-label-multiline-field"
                        label="Ghi chú:"
                        value={address}
                        disabled
                        leftIcon={<FontIcon>note</FontIcon>}
                    />
                </Cell>
                <Cell>
                    <Button
                        raised
                        primary
                        swapTheming

                    >Ghép tài xế</Button>
                </Cell>
            </Grid>

        )
    }
};

export default LeftActivity;