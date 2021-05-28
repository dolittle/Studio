// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';

import { Stack } from '@fluentui/react/lib/Stack';
import { Pivot, PivotItem, IDropdownOption } from '@fluentui/react';
import { BusinessMomentEditor } from './businessMomentEditor';

import CodeEditor, { loader } from '@monaco-editor/react';
import { getBusinessMoments, saveBusinessmoment } from '../api/businessmoments';
import { HttpResponseApplications2 } from '../api/api';
import { MicroserviceBusinessMomentAdaptor, BusinessMoment, HttpResponseBusinessMoments, HttpInputBusinessMoment, BusinessMomentEntity } from '../api/index';
import { Guid } from '@dolittle/rudiments';
import { EntityEditor } from './entityEditor';


const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const stackTokens = { childrenGap: 15 };

type Props = {
    application: HttpResponseApplications2
};

export const Editor: React.FunctionComponent<Props> = (props) => {

    const history = useHistory();
    const _props = props!;
    const application = _props.application;
    const { environment, applicationId, businessMomentId, microserviceId } = useParams() as any;

    const [loaded, setLoaded] = useState(false);
    const [connectors, setConnectors] = useState({} as IDropdownOption[]);
    const [businessMoment, setBusinessMoment] = useState({} as BusinessMoment);
    const [entities, setEntities] = useState({} as IDropdownOption[]);
    const [entity, setEntity] = useState({} as BusinessMomentEntity);// TODO use object
    const [selectedKey, setSelectedKey] = useState('businessMomentEditor');
    const [businessMomentsData, setBusinessMomentData] = useState({} as HttpResponseBusinessMoments);


    useEffect(() => {
        Promise.all([
            getBusinessMoments(applicationId, environment),
            loader.init(),
        ]).then(values => {
            console.log('Loading editor data');
            const applicationData = application;
            const microservicesGit: MicroserviceBusinessMomentAdaptor[] = applicationData.microservices.filter(microservice => {
                return microservice.kind === 'business-moments-adaptor';
            });


            const connectors = microservicesGit.map(microservice => {
                return { key: microservice.dolittle.microserviceId, text: microservice.extra.connector.kind } as IDropdownOption;
            });

            const businessMomentsData = values[0] as HttpResponseBusinessMoments;
            if (businessMomentId !== 'new') {
                const businessMoment = businessMomentsData.moments.find(data => data.moment.uuid === businessMomentId);
                if (!businessMoment) {
                    alert('Something has gone wrong');
                    console.log(businessMoment, businessMomentsData, businessMomentId);
                    return <h1>Something has gone wrong</h1>;
                }

                // This might not be needed
                const entityTypeId = businessMoment.moment.entityTypeId;
                let entity = {
                    name: '',
                    entityTypeId: Guid.create().toString(),
                    idNameForRetrival: 'id',
                    filterCode: '',
                    transformCode: '',
                } as BusinessMomentEntity;

                const entityInput = businessMomentsData.entities.find(data => data.entity.entityTypeId === entityTypeId);
                if (!entityInput) {
                    alert('Entity is no longer connected to this business moment');
                } else {
                    entity = entityInput.entity;
                }

                setEntity(entity);

                setBusinessMoment(businessMoment.moment);
            }


            if (businessMomentId === 'new') {
                setBusinessMoment({
                    name: '',
                    entityTypeId: '',
                    uuid: Guid.create().toString(),
                    embeddingCode: '',
                    projectionCode: ''
                } as BusinessMoment);
            }

            const entities = businessMomentsData.entities.map(data => {
                const entity = data.entity;
                return { key: entity.entityTypeId, text: entity.name } as IDropdownOption;
            });
            entities.push({ key: 'newEntity', text: 'Create new' } as IDropdownOption);

            setEntities(entities);
            setConnectors(connectors);
            setLoaded(true);
            setBusinessMomentData(businessMomentsData);
            return;
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
                                const newEntity = businessMomentsData.entities.find(entity => entity.entity.entityTypeId === newEntityId)?.entity;
                                setEntity(newEntity!);
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
