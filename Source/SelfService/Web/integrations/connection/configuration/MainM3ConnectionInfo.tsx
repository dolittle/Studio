// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';

import { Stack } from '@mui/material';

import { Input, MaxWidthTextBlock, Select, SelectPropsOptions, Tooltip } from '@dolittle/design-system';

import { Link } from '../../../apis/integrations/generated';

const newConnectionDescription = `This process might take some time depending on access rights and working knowledge of
                    your organization's firewall and M3 system. You can always save and create the connection setup details then come back at a later time to finish.`;

const ConnectorNameTooltipText = () =>
    <>
        Provide a name for this M3 connector instance. You can have multiple M3 connectors.
        We recommend naming your connector based on its intended use. For example, <i>M3 Connector Test</i> or <i>M3 Connector Production</i>.
    </>;

const hostingTooltipText = `Currently, you can only setup the connection with on premise hosting. Soon, we will support setup in the
                    cloud where Dolittle takes care of hosting, establishing backups and making sure the connector is running.`;

export type MainM3ConnectionInfoProps = {
    hasSelectedDeploymentType: boolean;
    connectionIdLinks?: Link[] | null;
    canEdit: boolean;
};

export const MainM3ConnectionInfo = ({ connectionIdLinks, hasSelectedDeploymentType, canEdit }: MainM3ConnectionInfoProps) => {
    const selectValues = useMemo(() => {
        const shouldUseOnPrem = connectionIdLinks?.some(link => link.rel === 'deploy-on-premises') || false;
        const shouldUseCloud = connectionIdLinks?.some(link => link.rel === 'deploy-to-cloud') || false;

        const selectValues: SelectPropsOptions = [
            { value: 'On premises', displayValue: 'On Premises' },
            { value: 'Cloud', displayValue: 'In the Dolittle Cloud' },
        ];

        if (hasSelectedDeploymentType) {
            return selectValues;
        }

        if (!shouldUseOnPrem) {
            selectValues.splice(selectValues.findIndex(select => select.value === 'On premises'), 1);
        }
        if (!shouldUseCloud) {
            selectValues.splice(selectValues.findIndex(value => value.value === 'Cloud'), 1);
        }

        return selectValues;
    }, [connectionIdLinks, hasSelectedDeploymentType]);

    return (
        <Stack spacing={3.5} sx={{ mt: 3, ml: 3 }}>
            <MaxWidthTextBlock>{newConnectionDescription}</MaxWidthTextBlock>

            <Tooltip tooltipTitle='Connector Name' tooltipText={<ConnectorNameTooltipText />} sx={{ top: 16 }}>
                <Input
                    id='connectorName'
                    label='Connector Name'
                    placeholder='M3 Connector Test'
                    required='Please enter the connector name.'
                    disabled={!canEdit}
                />
            </Tooltip>

            <Tooltip tooltipTitle='Hosting' tooltipText={hostingTooltipText} displayOnHover={hasSelectedDeploymentType} sx={{ top: 38 }}>
                <Select
                    id='selectHosting'
                    label='Hosting'
                    options={selectValues}
                    disabled={!canEdit || hasSelectedDeploymentType}
                    required='Please select the hosting type.'
                />
            </Tooltip>
        </Stack>
    );
};
