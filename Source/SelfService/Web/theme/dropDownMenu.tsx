// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { SxProps } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem } from '@mui/material';

type Props = {
    onChange: (event: SelectChangeEvent) => void;
    items: DropDownMenuItem[];
    value: string;
    label?: string;
};

type DropDownMenuItem = {
    value: string;
    displayValue: string;
};

const styles = {
    formControl: {
        'margin': 1,
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
        },
    } as SxProps,
    menuItem: {
        '&.MuiMenuItem-root': {
            '&:hover, & .Mui-selected': {
                background: '#3B3D48'
            }
        },
    } as SxProps,
};

// Based off the simple Select with outline
// https://v4.mui.com/components/selects/#simple-select
export const DropDownMenu: React.FunctionComponent<Props> = (props) => {
    const _props = props!;

    const options = _props.items.map(item => <MenuItem sx={styles.menuItem} value={item.value} key={item.value}> {item.displayValue}</ MenuItem>);

    return (
        <div>
            <FormControl variant="outlined" sx={styles.formControl} style={{ margin: 0 }}>
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
                        }
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
