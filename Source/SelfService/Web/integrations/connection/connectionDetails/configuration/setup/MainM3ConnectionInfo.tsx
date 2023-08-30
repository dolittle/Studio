// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useMemo } from 'react';

import { Typography, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { Input, MaxWidthTextBlock, Select, SelectPropsOptions, Tooltip } from '@dolittle/design-system';

import { Link } from '../../../../../apis/integrations/generated';
import { M3AuthenticationType } from './M3AuthenticationType';

const newConnectionDescription = `This process might take some time depending on access rights and working knowledge of
                    your organization's firewall and M3 system. You can always save and create the connection setup details then come back at a later time to finish.`;

const ConnectorNameTooltipText = () =>
    <>
        Provide a name for this M3 connector instance. You can have multiple M3 connectors.
        We recommend naming your connector based on its intended use. For example, <i>M3 Connector Test</i> or <i>M3 Connector Production</i>.
    </>;

const hostingTooltipText = `Select between hosting the connector bundle on premise or allowing a platform-managed solution in the cloud. The cloud setup takes care of hosting, establishing backups and making sure the connector is running.`;
const hostingSelectedTooltipText = `Once selected, the hosting type cannot be changed. Create a new connector to change the hosting type.`;

const authenticationTypeTooltipText = `Depending on the version of M3 you are using, you can select between basic M3 authentication or ION API authentication. Typically cloud hosted M3 systems use ION API authentication, but some on premise versions of M3 might also support this.`;

export type MainM3ConnectionInfoProps = {
    hasSavedDeploymentType: boolean;
    connectionIdLinks?: Link[] | null;
    canEdit: boolean;
    onAuthenticationTypeChange: (authenticationType: M3AuthenticationType) => void;
};

export const MainM3ConnectionInfo = ({ connectionIdLinks, hasSavedDeploymentType, canEdit, onAuthenticationTypeChange }: MainM3ConnectionInfoProps) => {
    const { watch, setValue } = useFormContext();

    const selectDropdownHostingValue: string = watch('selectHosting');
    const selectAuthenticationValue: M3AuthenticationType | undefined = watch('selectAuthenticationType');

    const authenticationTypeSelectValues: SelectPropsOptions = [
        { value: 'ion', displayValue: 'ION' },
        { value: 'basic', displayValue: 'Basic' },
    ];

    const deploymentTypeSelectValues = useMemo(() => {
        const shouldUseOnPrem = connectionIdLinks?.some(link => link.rel === 'deploy-on-premises') || false;
        const shouldUseCloud = connectionIdLinks?.some(link => link.rel === 'deploy-to-cloud') || false;

        const selectValues: SelectPropsOptions = [
            { value: 'On premises', displayValue: 'On Premises' },
            { value: 'Cloud', displayValue: 'In the Aigonix Cloud' },
        ];

        if (hasSavedDeploymentType) {
            return selectValues;
        }

        if (!shouldUseOnPrem) {
            selectValues.splice(selectValues.findIndex(select => select.value === 'On premises'), 1);
        }
        if (!shouldUseCloud) {
            selectValues.splice(selectValues.findIndex(value => value.value === 'Cloud'), 1);
        }

        return selectValues;
    }, [connectionIdLinks, hasSavedDeploymentType]);


    useEffect(() => {
        if (selectAuthenticationValue) {
            onAuthenticationTypeChange(selectAuthenticationValue);
        }
    }, [selectAuthenticationValue, onAuthenticationTypeChange]);

    const isCloudDeploymentValueSelected = selectDropdownHostingValue.toLowerCase() === 'cloud';

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

            <Tooltip
                tooltipTitle='Hosting'
                tooltipText={hasSavedDeploymentType ? hostingSelectedTooltipText : hostingTooltipText}
                displayOnHover={hasSavedDeploymentType}
                sx={{ top: 38 }}
            >
                <Select
                    id='selectHosting'
                    label='Hosting'
                    options={deploymentTypeSelectValues}
                    disabled={!canEdit || hasSavedDeploymentType}
                    required='Please select the hosting type.'
                />
            </Tooltip>

            <Tooltip
                tooltipTitle='M3 Authentication Type'
                tooltipText={authenticationTypeTooltipText}
                displayOnHover={true}
                sx={{ top: 38 }}
            >
                <Select
                    id='selectAuthenticationType'
                    label='M3 Authentication Type'
                    options={authenticationTypeSelectValues}
                    disabled={!canEdit}
                    required='Please select the authentication type.'
                />
            </Tooltip>
        </Stack>
    );
};
