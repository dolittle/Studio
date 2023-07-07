// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';

import { useSnackbar } from 'notistack';
import { useGlobalContext } from '../../../context/globalContext';

import { getApplications, HttpResponseApplications } from '../../../apis/solutions/application';
import { ShortInfoWithEnvironment } from '../../../apis/solutions/api';

import { getSelectionMenuItems, DropdownMenuProps, MenuItemProps } from '@dolittle/design-system';

import { CreateSpaceDialog } from './createSpaceDialog';

export const SpaceSelectMenu = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { currentEnvironment, currentApplicationId, setCurrentApplicationId } = useGlobalContext();

    const [applicationInfos, setApplicationInfos] = useState([] as ShortInfoWithEnvironment[]);
    const [canCreateApplication, setCanCreateApplication] = useState(false);
    const [createSpaceDialogOpen, setCreateSpaceDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const currentApplication = applicationInfos.find(application => application.id === currentApplicationId) || applicationInfos[0];

    useEffect(() => {
        Promise.all([getApplications()])
            .then(values => {
                const response = values[0] as HttpResponseApplications;

                setCanCreateApplication(response.canCreateApplication);
                setApplicationInfos(response.applications);
                setIsLoading(false);
            })
            .catch(() => enqueueSnackbar('Failed getting data from the server.', { variant: 'error' }));
    }, []);

    if (isLoading) return null;

    const applicationMenuItems = () => {
        const menuItems: DropdownMenuProps['menuItems'] = applicationInfos.filter(application => application.environment === currentEnvironment)
            .map(application => {
                return {
                    id: application.id,
                    label: application.name,
                    onSelect: (menuItem: MenuItemProps) => handleApplicationChange(menuItem),
                };
            });

        menuItems.push({
            id: 'create-new-application',
            label: 'Create New Space',
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
            <CreateSpaceDialog isOpen={createSpaceDialogOpen} onClose={() => setCreateSpaceDialogOpen(false)} />
            {getSelectionMenuItems(applicationMenuItems(), currentApplication?.name)}
        </>
    );
};
