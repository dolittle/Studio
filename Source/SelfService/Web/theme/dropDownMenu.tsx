import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

type Props = {
    onChange?: (event: React.ChangeEvent<{ value: unknown }>) => void;
    value?: string;
    items: DropDownMenuItem[];
    label?: string;
};

type DropDownMenuItem = {
    value?: string;
    displayValue?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 220,
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
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

// Based off the Native Select
// https://v4.mui.com/components/selects/#native-select
export const DropDownMenu: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles();

    const options = props.items.map(item => <option value={item.value} key={item.value}>{item.displayValue}</option>);

    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">{props.label}</InputLabel>
                <Select
                    native
                    value={props.value}
                    onChange={props.onChange}
                    label={props.label}
                >
                    {options}
                </Select>
            </FormControl>
        </div >
    );
}
