// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SxProps } from '@mui/material';



import { ShortInfoWithEnvironment } from '../api/api';
import { useGlobalContext } from '../stores/notifications';

type Props = {
    applications: ShortInfoWithEnvironment[];
    applicationId: string;
    environment: string;
};

const styles = {
    formControl: {
        '&.MuiFormControl-root': {
            marginRight: 3,
            minWidth: 120,
        },
        '& .MuiSelect-icon': {
            color: 'white',
        }
    } as SxProps,

    menuItem: {
        justifyContent: 'flex-end',
    } as SxProps,

    icon: {
        fill: 'white',
    } as SxProps,
};
export const ApplicationsChanger: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const { setCurrentApplicationId, setCurrentEnvironment } =
        useGlobalContext();
    const applications = props!.applications;
    const currentApplicationEnvironment = `${props!.applicationId}/${props!.environment}`;

    const items = applications.map((application, index) => {
        // TODO maybe we filter this into an order?
        // key using / so we can just pump it into the url
        const key = `${application.id}/${application.environment}`;
        const text = `${application.environment.toUpperCase()} ENVIRONMENT · ${application.name}`;
        return (
            <MenuItem sx={styles.menuItem} key={key} value={key}>
                {text}
            </MenuItem>
        );
    });

    items.push(
        <MenuItem sx={styles.menuItem} key='createNew' value='createNew'>
            + New application
        </MenuItem>
    );

    const onChange = (event: SelectChangeEvent<string>) => {
        event.stopPropagation();
        event.preventDefault();
        const newApplication = event.target.value;

        if (newApplication === currentApplicationEnvironment) {
            return;
        }

        if (newApplication === 'createNew') {
            const href = '/application/create';
            history.push(href);
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

    // TODO How can we fix the popper or the arrow to appear in the first menu item
    return (
        <>
            <FormControl sx={styles.formControl}>
                <Select
                    value={currentApplicationEnvironment}
                    onChange={onChange}
                    variant='standard'
                >

                    {items}
                </Select>
            </FormControl>
        </>
    );
};
