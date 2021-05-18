// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';

import { Create as Microservice } from '../micoservice/Microservice';
import { getMicroservices, HttpResponseMicroservices } from '../api';
import { getTenant } from '../store';

const stackTokens = { childrenGap: 15 };

export const MicroserviceNewScreen: React.FunctionComponent = () => {
    const tenantId = getTenant();
    const { applicationId } = useParams() as any;

    const [data, setData] = useState({
        application: {
            name: '',
            id: ''
        },
        microservices: []
    } as HttpResponseMicroservices);
    const [environment, setEnvironment] = useState('');
    const [environments, setEnvironments] = useState(['Dev']);

    useEffect(() => {
        // TODO when no microservices are running, there are no environments to pick from
        // TODO no microservices = no ingress = no environment
        // TODO create environment = name, spin up ingress
        // https://XXX/dolittle/welcome
        getMicroservices(applicationId).then(data => {
            setData(data);
            // No environment, add Dev
            // TODO downside of this, we need to handle ingress setup (oh dear)
            let newEnvironments = [...new Set(data.microservices.map(item => item.environment))];
            if (newEnvironments.length === 0) {
                newEnvironments = ['Dev'];
            }
            setEnvironments(newEnvironments);
            return;
        });
    }, []);

    const options: IChoiceGroupOption[] = environments.map(environment => {
        return { key: environment.toLowerCase(), text: environment };
    });

    function _onChange(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption): void {
        setEnvironment(option!.text as string);
    }

    return (
        <>
            <h1>Microservice New Screen</h1>

            <Stack tokens={stackTokens}>
                <Text variant="xLarge" block>
                    Please choose an Environment:
                    </Text>
                <ChoiceGroup defaultValue={environment} options={options} onChange={_onChange} label="Pick environment" required={true} />
            </Stack>

            {environment !== '' && (
                <>
                    <Microservice applicationId={applicationId} tenantId={tenantId} environments={[...new Set(data.microservices.map(item => item.environment))]} />
                </>
            )}
        </>
    );
};
