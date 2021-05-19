// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.


// TODO how to load the logs?
// TODO validate the data
// TODO change action button from create to save

import React from 'react';

import { ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text, IDropdownOption } from '@fluentui/react';
import { Microservice as BusinessMomentsAdaptor } from './BusinessMomentsAdaptor';
import { Microservice as Simple } from './Simple';
import { Microservice as StaticSite } from './StaticSite';

import { useParams } from 'react-router-dom';
import { HttpResponseApplications2 } from '../api';

const stackTokens = { childrenGap: 15 };

type Props = {
    application: HttpResponseApplications2
};

export const Create: React.FunctionComponent<Props | undefined> = (props) => {
    const { environment } = useParams() as any;

    const _props = props!;
    const applicationId = _props.application.id;
    const tenantId = _props.application.tenantId;


    const [microserviceTypeState, setMicroserviceTypeState] = React.useState('');

    const microserviceTypes: IDropdownOption[] = [
        { key: 'business-miner', text: 'Business Moment Adapter' },
        { key: 'static-site', text: 'Static Site' },
        { key: 'dolittle-microservice', text: 'Default Microservice' }
    ];

    function _onChange(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void {
        setMicroserviceTypeState(option!.key as string);
    }

    return (
        <>
            <Stack tokens={stackTokens}>
                <Stack tokens={stackTokens}>
                    <Text variant="xLarge" block>
                        What type of microservice would you like to create?
                    </Text>
                    <Dropdown placeholder="Select" defaultSelectedKey={microserviceTypeState}
                        options={microserviceTypes}
                        onChange={_onChange}
                    />
                </Stack>


                {microserviceTypeState === 'business-miner' && (
                    <Stack tokens={stackTokens}>
                        <BusinessMomentsAdaptor applicationId={applicationId} environment={environment} />
                    </Stack>
                )}

                {microserviceTypeState === 'static-site' && (
                    <Stack tokens={stackTokens}>
                        <StaticSite applicationId={applicationId} environment={environment} />
                    </Stack>
                )}

                {microserviceTypeState === 'dolittle-microservice' && (
                    <Stack tokens={stackTokens}>
                        <Simple application={_props.application} environment={environment} />
                    </Stack>
                )}


            </Stack>
        </>
    );
};
