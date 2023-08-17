// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useGlobalContext } from '../../context/globalContext';
import { useSnackbar } from 'notistack';

import { ShortInfo } from '../../apis/solutions/api';
import { getApplication, getApplicationsListing, HttpResponseApplication, HttpResponseApplications } from '../../apis/solutions/application';

import { getSelectionMenuItems, DropdownMenuProps, MenuItemProps } from '@dolittle/design-system';

import { ApplicationCreateDialog } from './applicationCreateDialog';

export const ApplicationChanger = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { currentApplicationId, setCurrentApplicationId } = useGlobalContext();

    const [applications, setApplications] = useState([] as ShortInfo[]);
    const [application, setApplication] = useState({} as HttpResponseApplication);
    const [canCreateApplication, setCanCreateApplication] = useState(false);
    const [createSpaceDialogOpen, setCreateSpaceDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!currentApplicationId) return;

        Promise.all([
            getApplicationsListing(),
            getApplication(currentApplicationId),
        ]).then(values => {
            const response = values[0] as HttpResponseApplications;
            const applicationData = values[1];

            setApplications(response.applications);
            setApplication(applicationData);
            setCanCreateApplication(response.canCreateApplication);
            setIsLoading(false);
        }).catch(() => enqueueSnackbar('Failed getting data from the server.', { variant: 'error' }));
    }, [currentApplicationId]);

    if (isLoading) return null;

    const applicationMenuItems = () => {
        const menuItems: DropdownMenuProps['menuItems'] = applications.map(application => {
            return {
                id: application.id,
                label: application.name,
                onSelect: (menuItem: MenuItemProps) => handleApplicationChange(menuItem),
            };
        });

        menuItems.push({
            id: 'create-new-application',
            label: 'Create New application',
            icon: 'AddBoxRounded',
            onSelect: () => handleApplicationCreate(),
        });

        return menuItems;
    };

    const handleApplicationChange = (menuItem: MenuItemProps) => {
        if (menuItem.id === currentApplicationId) return;
        setCurrentApplicationId(menuItem.id);
    };

    const handleApplicationCreate = () => {
        if (!canCreateApplication) {
            enqueueSnackbar('Currently disabled. Please reach out via freshdesk or teams.', { variant: 'error' });
            return;
        }

        setCreateSpaceDialogOpen(true);
    };

    return (
        <>
            <ApplicationCreateDialog isOpen={createSpaceDialogOpen} onClose={() => setCreateSpaceDialogOpen(false)} />
            {getSelectionMenuItems(applicationMenuItems(), application.name)}
        </>
    );
};
