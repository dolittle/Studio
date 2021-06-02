// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CreateCard, CreateCardAdaptor } from './createCard';

import { useBoolean } from '@fluentui/react-hooks';
import { Modal, DefaultButton } from '@fluentui/react';


import { ViewCard } from './viewCard';
import { HttpResponseApplications2, getMicroservices } from '../api/api';
import { getBusinessMoments } from '../api/businessmoments';
import { MicroserviceBusinessMomentAdaptor, HttpResponseBusinessMoments } from '../api/index';

import { useReadable } from 'use-svelte-store';
import { microservices } from '../stores/microservice';

type Props = {
    application: HttpResponseApplications2
};

export const BusinessMomentsOverview: React.FunctionComponent<Props> = (props) => {
    const $microservices = useReadable(microservices) as any;
    //
    const _props = props!;
    const application = _props.application;
    const { environment, applicationId } = useParams() as any;
    const canEdit = application.environments.some(info => info.name === environment && info.automationEnabled);
    const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
    const [loaded, setLoaded] = useState(false);
    //const [connectors, setConnectors] = useState({} as CreateCardAdaptor[]);
    const [moments, setBusinessMoments] = useState({} as any[]);



    console.log('how many times', $microservices.length);
    const microservicesGit: MicroserviceBusinessMomentAdaptor[] = $microservices.filter(storeItem => {
        console.log('storeItem', storeItem);
        if (storeItem.edit === {}) {
            console.log('edit is empty object');
            return false;
        }

        if (!storeItem.edit.kind) {
            console.error('kind not set issue');
            return false;
        }

        if (storeItem.edit.kind !== 'business-moments-adaptor') {
            return false;
        }
        return true;
    }).map(storeItem => {
        return storeItem.edit;
    });

    console.log('microservicesGit', microservicesGit);
    const connectors = microservicesGit.map(microservice => {
        return {
            id: microservice.dolittle.microserviceId,
            name: microservice.name,
            connectorType: microservice.extra.connector.kind,
        } as CreateCardAdaptor;
    });

    useEffect(() => {
        Promise.all([
            getBusinessMoments(applicationId, environment),
            //getMicroservices(applicationId),
        ]
        ).then((values) => {
            const applicationData = application;
            //const microservicesGit: MicroserviceBusinessMomentAdaptor[] = applicationData.microservices.filter(microservice => {
            //    console.log(microservice);
            //    return microservice.kind === 'business-moments-adaptor';
            //});
            //const microservicesData = values[1] as any;
            //// This does not include kind
            //
            //const microservicesLive: MicroserviceBusinessMomentAdaptor[] = microservicesData.microservices.filter(microservice => {
            //    return microservice.kind === 'buisness-moments-adaptor';
            //});
            //console.log(microservicesLive);


            const businessMomentsData = values[0] as HttpResponseBusinessMoments;
            // We use from git as we store the data in git
            const moments = businessMomentsData.moments.map(bmData => {
                const tempMs: MicroserviceBusinessMomentAdaptor | undefined = microservicesGit.find(ms => ms.dolittle.microserviceId === bmData.microserviceId);
                const microserviceName = tempMs ? tempMs.name : 'Missing';
                const connectorType = tempMs ? tempMs.extra.connector.kind : 'Missing';
                const moment = bmData.moment;

                return {
                    applicationId,
                    environment,
                    momentId: moment.uuid,
                    name: moment.name,
                    microserviceId: bmData.microserviceId,
                    microserviceName,
                    connectorType,
                    canEdit,
                };
            });
            setBusinessMoments(moments);
            //setConnectors(connectors);
            setLoaded(true);
        });
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <>
            <h1>Business moments</h1>
            <ul>
                {$microservices.map(foo => (
                    <li key={foo.id}>{foo.name}</li>
                ))}
            </ul>
            <DefaultButton onClick={() => {
                if (!canEdit) {
                    alert('Automation is disabled');
                    return;
                }
                showModal();
            }} text="Create Business Moment" />
            <div className="serv">
                <ul>
                    {moments.map((moment) => {
                        return <li key={moment.momentId}><ViewCard {...moment} /></li>;
                    })}
                </ul>
            </div>
            <Modal
                isOpen={isModalOpen}
                onDismiss={hideModal}
                isBlocking={false}
            >
                <CreateCard applicationId={applicationId} environment={environment} adaptors={connectors} onCancel={() => {
                    hideModal();
                }} />
            </Modal>
        </>
    );
};
