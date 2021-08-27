// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { ShortInfoWithEnvironment } from '../api/api';

import { useGlobalContext } from '../stores/notifications';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

type Props = {
    applications: ShortInfoWithEnvironment[]
    applicationId: string
    environment: string
};

export const ApplicationsChanger: React.FunctionComponent<Props> = (props) => {
    const { setNotification, setCurrentApplicationId, setCurrentEnvironment, setCurrentApplicationAndEnvironment } = useGlobalContext();
    const applications = props!.applications;
    const currentApplicationEnvironment = `${props!.applicationId}/${props!.environment}`;

    const items = applications.map(application => {
        // key using / so we can just pump it into the url
        const key = `${application.id}/${application.environment}`;
        const text = `${application.name} - ${application.environment}`;
        return (
            <MenuItem key={key} value={key}>{text}</MenuItem>
        );
    });

    items.push((
        <MenuItem key="createNew" value="createNew">Create New</MenuItem>
    ));

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

        const parts = window.location.pathname.split(`/${currentApplicationEnvironment}/`);
        const href = `${parts[0]}/${newApplication}/${parts[1]}`;

        // We use window here, as its a hack to get around the selfservice being duplicated
        window.location.href = href;
    };

    return (
        <FormControl >
            <Select
                id="application-environment-changer"
                value={currentApplicationEnvironment}
                onChange={onChange}
            >
                {items}
            </Select>
        </FormControl>

    );
};
