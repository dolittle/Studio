// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';

type Props = {
    onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
    items: DropDownMenuItem[];
    value: string;
    label?: string;
};

type DropDownMenuItem = {
    value: string;
    displayValue: string;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            'margin': theme.spacing(1),
            'minWidth': 220,
            '& .MuiOutlinedInput-input': {
                color: 'white'
            },
            '& .MuiInputLabel-root': {
                color: 'white'
            },
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                color: 'white',
                borderColor: '#6678F6'
            },
            '&:hover .MuiOutlinedInput-input': {
                color: 'white'
            },
            '& .MuiSelect-icon': {
                color: '#6678F6'
            }
        },
        menuItem: {
            '&$selected': {
                // this is required so that hovering over the current selection works (in conjunction with the empty "selected" property)
                '&:hover': {
                    background: '#3B3D48'
                }
            },
            '&:hover': {
                background: '#3B3D48'
            }
        },
        // this is required so that hovering over the current selection works (in conjunction with the "$selected" selector)
        selected: {}
    })
);

// Based off the simple Select with outline
// https://v4.mui.com/components/selects/#simple-select
export const DropDownMenu: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles();

    const _props = props!;

    const options = _props.items.map(item => <MenuItem value={item.value} key={item.value} classes={{ selected: classes.selected, root: classes.menuItem }} > {item.displayValue}</ MenuItem>);

    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">{_props.label}</InputLabel>
                <Select
                    // to make it expand downwards https://stackoverflow.com/a/61225313/5806412
                    MenuProps={{
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left'
                        },
                        transformOrigin: {
                            vertical: 'top',
                            horizontal: 'left'
                        },
                        getContentAnchorEl: null
                    }}
                    value={_props.value}
                    onChange={_props.onChange}
                    label={_props.label}
                >
                    {options}
                </Select>
            </FormControl>
        </div >
    );
};
