// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useSnackbar } from 'notistack';
import { useGlobalContext } from '../../../context/globalContext';

import { getSelectionMenuItems, MenuItemProps } from '@dolittle/design-system';

import { getApplications, HttpResponseApplications } from '../../../apis/solutions/application';
import { ShortInfoWithEnvironment } from '../../../apis/solutions/api';

export const SpaceSelectMenu = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { currentApplicationId, setCurrentApplicationId } = useGlobalContext();

    const [applicationInfos, setApplicationInfos] = useState([] as ShortInfoWithEnvironment[]);
    const [canCreateApplication, setCanCreateApplication] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const currentApplication = applicationInfos.find(application => application.id === currentApplicationId) || applicationInfos[0];

    useEffect(() => {
        Promise.all([getApplications()])
            .then(values => {
                const response = values[0] as HttpResponseApplications;

                setCanCreateApplication(response.canCreateApplication);
                setApplicationInfos(response.applications);
                setIsLoading(false);
            }).catch(() => enqueueSnackbar('Failed getting data from the server.', { variant: 'error' }));
    }, []);

    if (isLoading) return null;

    const applicationMenuItems = () => {
        const menuItems: MenuItemProps[] = applicationInfos.map(application => {
            return {
                id: application.id,
                label: application.name,
                onMenuItemSelect: (menuItem: MenuItemProps) => handleApplicationChange(menuItem),
            };
        });

        menuItems.push({
            id: 'create-new-application',
            label: 'Create New Space',
            icon: 'AddBoxRounded',
            onMenuItemSelect: () => handleApplicationCreate(),
        });

        return menuItems;
    };

    const handleApplicationChange = (menuItem: MenuItemProps) => {
        if (menuItem.id === currentApplicationId) {
            return;
        }

        setCurrentApplicationId(menuItem.id);
    };

    const handleApplicationCreate = () => {
        if (!canCreateApplication) {
            enqueueSnackbar('Currently disabled, please reach out via freshdesk or teams.', { variant: 'error' });
            return;
        }

        const href = '/application/create';
        navigate(href);
    };

    return getSelectionMenuItems(applicationMenuItems(), currentApplication?.name);
};
