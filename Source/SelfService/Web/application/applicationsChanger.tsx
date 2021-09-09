// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';

import { ShortInfoWithEnvironment } from '../api/api';

import { useGlobalContext } from '../stores/notifications';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import { backgroundColor } from '../theme/viewCard';
import '../application/applicationScreen.scss';

type Props = {
    applications: ShortInfoWithEnvironment[];
    applicationId: string;
    environment: string;
};

const options = ['+ New Application'];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            marginRight: theme.spacing(30),
            minWidth: 120,
            float: 'left',
        },

        menuItem: {
            justifyContent: 'flex-end',
        },

        notifPanel: {
            // margin: theme.spacing(1),
            // marginRight: theme.spacing(1),
            // minWidth: 120,
            // float: 'right',
            backgroundColor: 'white',
        },
    })
);

export const ApplicationsChanger: React.FunctionComponent<Props> = (props) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef: any = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains!(event.target)) {
            return;
        }

        setOpen(false);
    };

    const classes = useStyles();
    const { setNotification, setCurrentApplicationId, setCurrentEnvironment } =
        useGlobalContext();
    const applications = props!.applications;
    const currentApplicationEnvironment = `${props!.applicationId}/${props!.environment}`;

    const items = applications.map((application) => {
        // TODO maybe we filter this into an order?
        // key using / so we can just pump it into the url
        const key = `${application.id}/${application.environment}`;
        const text = `${application.environment.toUpperCase()} ENVIRONMENT · ${
            application.name
        }`;
        return (
            <MenuItem className={classes.menuItem} key={key} value={key}>
                {text}
            </MenuItem>
        );
    });

    items.push(
        <MenuItem className={classes.menuItem} key='createNew' value='createNew'>
            + New application
        </MenuItem>
    );

    const onChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        event.stopPropagation();
        event.preventDefault();
        const newApplication = event.target.value as string;

        if (newApplication === currentApplicationEnvironment) {
            return;
        }

        if (newApplication === 'createNew') {
            // TODO I feel there is a better way
            setNotification('TODO: Create application screen', 'info');
            return;
        }

        // Little ugly, it would be nicer to add data to the drop down, or look it up
        const newApplicationId = newApplication.split('/')[0];
        const newEnvironment = newApplication.split('/')[1];

        //setCurrentApplicationAndEnvironment(newApplicationId, newEnvironment);
        setCurrentApplicationId(newApplicationId);
        setCurrentEnvironment(newEnvironment);

        const parts = window.location.pathname.split(
            `/${currentApplicationEnvironment}/`
        );
        const href = `${parts[0]}/${newApplication}/${parts[1]}`;

        // We use window here, as its a hack to get around the selfservice being duplicated
        window.location.href = href;
    };

    return (
        // <FormControl className={classes.formControl}>
        //     <Select value={currentApplicationEnvironment} onChange={onChange}>
        //         {items}
        //     </Select>
        // </FormControl>

        <Grid container direction='row' alignItems='center'>
            <Grid item xs={12}>
                <ButtonGroup
                    aria-label='split button'
                    className='NavbarColor'
                    ref={anchorRef}
                >
                    <Button onClick={handleToggle} className='envTitle'>
                        {items.slice(0, 1)}
                    </Button>

                    <Button
                        size='small'
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label='select merge strategy'
                        aria-haspopup='menu'
                        className='NavbarColor'
                        onClick={handleToggle}
                    >
                        <ArrowDropDownIcon className='envTitle' />
                    </Button>
                    <NotificationsIcon />
                    <AccountCircleIcon />
                    <MoreVertIcon />
                </ButtonGroup>

                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                    className='NewApplication'
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom'
                                        ? 'center top'
                                        : 'center bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        id='split-button-menu'
                                        className='NavbarColor'
                                    >
                                        {options.map((option, index) => (
                                            <MenuItem
                                                key={option}
                                                disabled={index === 2}
                                                selected={index === selectedIndex}
                                                onClick={(event) =>
                                                    handleMenuItemClick(event, index)
                                                }
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Grid>
        </Grid>
    );
};
