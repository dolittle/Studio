// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stack } from '@fluentui/react/lib/Stack';
import { Pivot, PivotItem, IDropdownOption } from '@fluentui/react';
import { BusinessMomentEditor } from './businessMomentEditor';

import { loader } from '@monaco-editor/react';
import { HttpResponseApplication } from '../api/application';
import { MicroserviceBusinessMomentAdaptor, BusinessMoment, HttpResponseBusinessMoments, BusinessMomentEntity } from '../api/index';
import { Guid } from '@dolittle/rudiments';
import { EntityEditor } from './entityEditor';

const stackTokens = { childrenGap: 15 };

type Props = {
    application: HttpResponseApplication
    businessMoments: HttpResponseBusinessMoments
};

export const Editor: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const application = _props.application;
    const businessMoments = _props.businessMoments;
    const { environment, applicationId, businessMomentId, microserviceId } = useParams() as any;
    const [loaded, setLoaded] = useState(false);
    const [selectedKey, setSelectedKey] = useState('businessMomentEditor');
    const applicationData = application;

    const microservicesGit: MicroserviceBusinessMomentAdaptor[] = applicationData.microservices.filter(microservice => {
        return microservice.kind === 'business-moments-adaptor';
    });

    const connectors = microservicesGit.map(microservice => {
        return { key: microservice.dolittle.microserviceId, text: microservice.extra.connector.kind } as IDropdownOption;
    });


    let initEntity: BusinessMomentEntity = {
        name: '',
        entityTypeId: Guid.create().toString(),
        idNameForRetrival: 'id',
        filterCode: '',
        transformCode: '',
    } as BusinessMomentEntity;


    let businessMoment = {
        name: '',
        entityTypeId: '',
        uuid: Guid.create().toString(),
        embeddingCode: '',
        projectionCode: ''
    } as BusinessMoment;


    const businessMomentsData = businessMoments;
    if (businessMomentId !== 'new') {
        const _businessMoment = businessMomentsData.moments.find(data => data.moment.uuid === businessMomentId);
        if (!_businessMoment) {
            alert('Something has gone wrong');
            console.log(_businessMoment, businessMomentsData, businessMomentId);
            return <h1>Something has gone wrong</h1>;
        }

        // This might not be needed
        const entityTypeId = _businessMoment.moment.entityTypeId;

        const entityInput = businessMomentsData.entities.find(data => data.entity.entityTypeId === entityTypeId);
        if (!entityInput) {
            alert('Entity is no longer connected to this business moment');
        } else {
            initEntity = entityInput.entity;
        }

        businessMoment = _businessMoment.moment;
    }

    const entities = businessMomentsData.entities.map(data => {
        const entity = data.entity;
        return { key: entity.entityTypeId, text: entity.name } as IDropdownOption;
    });
    entities.unshift({ key: 'skip', text: 'Select Entity' } as IDropdownOption);
    entities.push({ key: 'newEntity', text: 'Create new' } as IDropdownOption);

    const [entity, setEntity] = useState(initEntity);

    useEffect(() => {
        Promise.all([
            loader.init(),
        ]).then(values => {
            setLoaded(true);
        });
    }, []);


    if (!loaded) {
        return null;
    }

    return (
        <>
            <Stack tokens={stackTokens}>
                <Pivot selectedKey={selectedKey}
                    onLinkClick={(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) => {
                        const key = item?.props.itemKey as string;
                        if (selectedKey !== key) {
                            setSelectedKey(key);
                        }
                    }}
                >
                    <PivotItem
                        itemKey="businessMomentEditor"
                        headerText="Business Moment"
                        onClick={() => {
                            // TODO add protection if entity not saved
                            // TODO add protection if business moment not save
                            setSelectedKey('businessMomentEditor');
                        }}
                    >
                        <BusinessMomentEditor
                            application={application}
                            connectors={connectors}
                            entities={entities}
                            entity={entity}
                            businessMoment={businessMoment}
                            onCreate={() => {
                                setEntity({
                                    name: '',
                                    entityTypeId: Guid.create().toString(),
                                    idNameForRetrival: 'id',
                                    filterCode: '',
                                    transformCode: '',
                                } as BusinessMomentEntity);
                                setSelectedKey('entityEditor');
                            }}
                            onEntityChange={(newEntityId: string) => {
                                // TODO confirm this
                                const newEntity = businessMomentsData.entities.find(entity => entity.entity.entityTypeId === newEntityId)?.entity;
                                setEntity(newEntity!);
                                console.log('On change');
                            }}

                            onSave={(moment: BusinessMoment) => {
                                console.log('BusinessMomentEditor onSave callback TODO', moment);
                            }}
                        />
                    </PivotItem>
                    <PivotItem
                        itemKey="entityEditor"
                        headerText="Entity">
                        <EntityEditor
                            application={application}
                            connectors={connectors}
                            entity={entity}
                            onCreate={() => {
                                setSelectedKey('entityEditor');
                            }}

                            onSave={(entity: BusinessMomentEntity) => {
                                console.log('EntityEditor onSave callback TODO', entity);
                            }}
                        />

                    </PivotItem>
                </Pivot>
            </Stack>
        </>
    );
};
