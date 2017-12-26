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
        const {address="",name="",phone="",type="",note=""}= this.props.location
        return (
            <ExpansionList>
                <ExpansionPanel
                    label="Địa chỉ khách" footer={null}
                    defaultExpanded={true}
                >
                    {/* <hr /> */}
                    <Grid>
                        <Cell size={8}>
                            <TextField
                                id="disabled-floating-label-multiline-field"
                                label="Địa chỉ khách:"
                                value={address}
                                disabled
                                leftIcon={<FontIcon>add_location</FontIcon>}
                            />
                        </Cell>
                        <Cell size={4}>
                            <TextField
                                id="disabled-floating-label-multiline-field"
                                label="Loại xe:"
                                disabled
                                value={type}
                                leftIcon={<FontIcon>directions_bike</FontIcon>}
                            />
                        </Cell>
                    </Grid>
                    <Grid>
                        <Cell size={6}>
                            <TextField
                                id="disabled-floating-label-multiline-field"
                                label="SĐT:"
                                disabled
                                value={phone}
                                leftIcon={<FontIcon>phone</FontIcon>}
                            />
                        </Cell>
                        <Cell size={6}>
                            <TextField
                                id="disabled-floating-label-multiline-field"
                                label="Tên:"
                                value={name}                                
                                disabled
                                leftIcon={<FontIcon>accessibility</FontIcon>}
                            />
                        </Cell>
                    </Grid>
                    <Cell size={12}>
                        <TextField
                            id="disabled-floating-label-multiline-field"
                            label="Ghi chú:"
                            disabled
                            value={note}
                            leftIcon={<FontIcon>note</FontIcon>}
                        />
                    </Cell>
                </ExpansionPanel>
                <ExpansionPanel
                    label="Tài xế" footer={null}
                    defaultExpanded={true}                    
                >
                    {/* <hr /> */}
                    <Grid>
                        <Cell size={8}>
                            <TextField
                                id="disabled-floating-label-multiline-field"
                                label="Địa chỉ khách:"
                                disabled
                                leftIcon={<FontIcon>add_location</FontIcon>}
                            />
                        </Cell>
                        <Cell size={4}>
                            <TextField
                                id="disabled-floating-label-multiline-field"
                                label="Loại xe:"
                                disabled
                                leftIcon={<FontIcon>directions_bike</FontIcon>}
                            />
                        </Cell>
                    </Grid>
                    <Grid>
                        <Cell size={6}>
                            <TextField
                                id="disabled-floating-label-multiline-field"
                                label="SĐT:"
                                disabled
                                leftIcon={<FontIcon>phone</FontIcon>}
                            />
                        </Cell>
                        <Cell size={6}>
                            <TextField
                                id="disabled-floating-label-multiline-field"
                                label="Tên:"
                                disabled
                                leftIcon={<FontIcon>accessibility</FontIcon>}
                            />
                        </Cell>
                    </Grid>
                    <Cell size={12}>
                        <TextField
                            id="disabled-floating-label-multiline-field"
                            label="Ghi chú:"
                            disabled
                            leftIcon={<FontIcon>note</FontIcon>}
                        />
                    </Cell>
                </ExpansionPanel>
            </ExpansionList>
        )
    }
};

export default LeftActivity;