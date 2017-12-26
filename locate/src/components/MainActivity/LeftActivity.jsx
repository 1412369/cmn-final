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
    onRadiusChange(value, index, e) {
        value = value ==="Tất cả"? 0 : value 
        this.props.updateRadius(value)
    }
    onSubmit() {
        // const { updateRadius } = this.props
        // const { _radius, _type } = this.state
        // updateRadius(_radius)
    }
    render() {
        const { _radius, _type } = this.state
        const { address = "", name = "", phone = "", type = "", note = "" } = this.props.location
        return (
            <ExpansionList>
                <ExpansionPanel
                    label="Địa chỉ khách" footer={null}
                    defaultExpanded={true}
                >
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
                    <Grid>
                        <Cell size={12}>
                            <SelectField
                                id="select-field-2"
                                label="Bán kính"
                                placeholder="Chọn bán kính"
                                block={true}
                                value={_radius}
                                onChange={this.onRadiusChange.bind(this)}
                                name="radius"
                                menuItems={["Tất cả",600, 800, 1000]}
                                simplifiedMenu={true}
                            />
                        </Cell>
                    </Grid>
                    <Grid>
                        <Button
                            raised
                            primary
                            swapTheming
                            onClick={this.onSubmit.bind(this)}
                        >Tìm kiếm</Button>
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