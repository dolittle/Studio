// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CreateCard, CreateCardAdaptor } from './createCard';

import { useBoolean } from '@fluentui/react-hooks';
import { Modal, DefaultButton } from '@fluentui/react';


import { ViewCard } from './viewCard';
import { getApplication, getMicroservices, HttpResponseApplications2, HttpResponseMicroservices, MicroserviceInfo } from '../api';
import { MicroserviceBusinessMomentAdaptor } from '../store';

type Props = {
    application: HttpResponseApplications2
};

export const BusinessMomentsOverview: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const application = _props.application;
    const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
    const { environment, applicationId } = useParams() as any;

    const microservices: MicroserviceBusinessMomentAdaptor[] = application.microservices.filter(microservice => {
        console.log(microservice);
        return microservice.kind === 'buisness-moments-adaptor';
    });

    //useEffect(() => {
    //    Promise.all([
    //        getMicroservices(applicationId)
    //    ]
    //    ).then((values) => {
    //        const applicationData = application;
    //        const microservicesData = values[0] as any;
    //        // This does not include kind
    //
    //        const microservices: MicroserviceBusinessMomentAdaptor[] = microservicesData.microservices.filter(microservice => {
    //            console.log(microservice);
    //            return microservice.kind === 'buisness-moments-adaptor';
    //        });
    //        console.log(microservices);
    //        setCurrentMicroservices(microservices);
    //    });
    //}, []);
    //
    // TODO load from the server
    console.log(microservices);
    const businessMoments = [
        {
            applicationId,
            momentId: 'fake-bm-123',
            environment,
            name: 'Added to Component',
            microserviceId: 'fake-ms-345',
            microserviceName: 'Product Structure Extractor',
            connectorType: 'Webhook',
            canEdit: true,

        },
        {
            applicationId,
            environment,
            momentId: 'fake-bm-678',
            name: 'Customer Created',
            microserviceId: 'fake-ms-345',
            microserviceName: 'Customer Extractor',
            connectorType: 'Webhook',
            canEdit: true,
        },
    ];

    const adaptors = businessMoments.map(moment => {
        return {
            id: moment.momentId,
            name: moment.microserviceName,
            connectorType: moment.connectorType,
        } as CreateCardAdaptor;
    });

    return (
        <>
            <h1>Business moments</h1>
            <DefaultButton onClick={showModal} text="Create Business Moment" />
            <div className="serv">
                <ul>
                    {businessMoments.map((moment) => {
                        return <li key={moment.momentId}><ViewCard {...moment} /></li>;
                    })}
                </ul>
            </div>
            <Modal
                isOpen={isModalOpen}
                onDismiss={hideModal}
                isBlocking={false}
            >
                <CreateCard applicationId={applicationId} environment={environment} adaptors={adaptors} onCancel={() => {
                    hideModal();
                }} />
            </Modal>
        </>
    );
};
