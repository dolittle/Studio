// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { ShortInfoWithEnvironment } from '../api/api';

import { useGlobalContext } from '../stores/notifications';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';

type Props = {
    applications: ShortInfoWithEnvironment[];
    applicationId: string;
    environment: string;
};

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
            color: 'white',
        },
    })
);

export const ApplicationsChanger: React.FunctionComponent<Props> = (props) => {
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
        <ButtonGroup color='primary' aria-label='outlined primary button group'>
            <Select value={currentApplicationEnvironment} onChange={onChange}>
                {items}
            </Select>
            <NotificationsIcon className={classes.notifPanel} />
            <AccountCircleIcon className={classes.notifPanel} />
            <MoreVertIcon className={classes.notifPanel} />
        </ButtonGroup>
    );
};
