// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { List } from '@fluentui/react/lib/List';
import { Link, Text } from '@fluentui/react';
import { PrimaryButton } from '@fluentui/react/lib/Button';

import { getMicroservices, HttpResponseMicroservices, ShortInfoWithEnvironment } from './api';


export const ApplicationScreen: React.FunctionComponent = () => {
    const { id } = useParams() as any;
    const applicationId = id;
    const [data, setData] = useState({
        application: {
            name: '',
            id: ''
        },
        microservices: []
    } as HttpResponseMicroservices);

    const [environments, setEnvironments] = useState([] as string[]);
    const [environment, setEnvironment] = useState('');


    useEffect(() => {
        getMicroservices(applicationId).then(data => {
            setData(data);
            setEnvironments([...new Set(data.microservices.map(item => item.environment))]);
            return;
        });
    }, []);


    const environmentRow = (item?: string, index?: number | undefined): JSX.Element => {
        const environment = item!;
        return (
            <Link underline onClick={(event: React.MouseEvent<HTMLElement>) => {
                event.preventDefault();
                setEnvironment(environment);
            }}>
                {environment}
            </Link>
        );
    };

    const microserviceRow = (item?: ShortInfoWithEnvironment, index?: number | undefined): JSX.Element => {
        const microservice = item!;
        return (
            <Text>
                {microservice.name}
            </Text>
        );
    };

    return (
        <>
            <h1>Application Screen</h1>
            <p title={`${data.application.name} (${data.application.id})`}>{data.application.name}</p>

            <PrimaryButton text="Create New Microservice" onClick={(e => {
                console.log('Create microservice');
                window.location.href = '/microservice/create';
            })} />


            <h1>Environment</h1>
            <List items={environments} onRenderCell={environmentRow} />

            {environment !== '' && (
                <>
                    <h1>Microservices</h1>
                    <List items={data.microservices
                        .filter(microservice => microservice.environment === environment)}
                        onRenderCell={microserviceRow} />
                </>
            )}
        </>
    );
};
