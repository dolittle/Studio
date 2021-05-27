// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Stack } from '@fluentui/react/lib/Stack';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Pivot, PivotItem, IDropdownOption, DefaultButton } from '@fluentui/react';


import CodeEditor, { loader } from '@monaco-editor/react';
import { getBusinessMoments, saveBusinessmoment } from '../api/businessmoments';
import { HttpResponseApplications2 } from '../api/api';
import { MicroserviceBusinessMomentAdaptor, BusinessMoment, HttpResponseBusinessMoments, HttpInputBusinessMoment } from '../api/index';
import { Guid } from '@dolittle/rudiments';


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
    const [moment, setBusinessMoment] = useState({} as BusinessMoment);
    const [entities, setEntities] = useState({} as IDropdownOption[]);

    // Not sure how to hook up to IPivotItemProps
    const [outputScreen, setOutputScreen] = useState('Raw Data');
    const onOutputScreenChanged = (item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) => {
        setOutputScreen(item!.props.headerText as string);
    };

    const [connectorIdState, setConnectorIdState] = useState('');

    const connectorChanged = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
        setConnectorIdState(option!.key as string);
    };


    useEffect(() => {
        Promise.all([
            getBusinessMoments(applicationId, environment),
            loader.init(),
        ]).then(values => {
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
                if (businessMoment) {
                    setBusinessMoment(businessMoment?.moment);
                }
                alert('Something has gone wrong');
                return <h1>Something has gone wrong</h1>;
            }


            if (businessMomentId === 'new') {
                setBusinessMoment({
                    name: '',
                    uuid: Guid.create().toString(),
                    filter: '',
                    mapper: '',
                    transform: ''
                } as BusinessMoment);
            }

            const entities = businessMomentsData.entities.map(data => {
                const entity = data.entity;
                return { key: entity.typeID, text: entity.name } as IDropdownOption;
            });
            entities.push({ key: 'newEntity', text: 'Create new' } as IDropdownOption);

            setEntities(entities);
            setConnectors(connectors);
            setLoaded(true);
            return;
        });

    }, []);



    if (!loaded) {
        return null;
    }

    return (
        <>
            <Stack tokens={stackTokens}>
                <Stack horizontal tokens={stackTokens}>
                    <Dropdown placeholder="Select"
                        dropdownWidth="auto"
                        label="Connector"
                        options={connectors}
                        onChange={connectorChanged}
                    />

                    <Dropdown placeholder="Select"
                        dropdownWidth="auto"
                        label="Entity"
                        options={entities}
                    />

                    <PrimaryButton text="Add Entity" />

                    <TextField
                        label="Business Moment"
                        styles={textFieldStyles}
                        defaultValue={moment.name}

                        onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                            moment.name = newValue!;
                            setBusinessMoment(moment);
                        }}
                    />
                </Stack>

                <Stack grow={1} tokens={stackTokens}>
                    <Stack horizontal grow={1} tokens={stackTokens}>

                        <Stack tokens={{ childrenGap: 15, maxWidth: '50vw' }}>
                            <h1>Moment</h1>
                            <CodeEditor
                                onChange={(value: string | undefined) => {
                                    moment.mapper = value!;
                                    setBusinessMoment(moment);
                                }}
                                height="20vh"
                                width="50vw"
                                defaultLanguage="javascript"
                                defaultValue={moment.mapper}
                            />

                            <h1>Projection</h1>
                            <CodeEditor
                                height="20vh"
                                width="50vw"
                                onChange={(value: string | undefined) => {
                                    moment.transform = value!;
                                    setBusinessMoment(moment);
                                }}
                                defaultLanguage="javascript"
                                defaultValue={moment.transform}
                            />
                            <DefaultButton onClick={async () => {
                                console.log('Save business moment', moment);

                                const input = {
                                    applicationId,
                                    environment,
                                    microserviceId,
                                    moment,
                                } as HttpInputBusinessMoment;


                                const success = await saveBusinessmoment(input);
                                if (!success) {
                                    alert('Failed to save');
                                    return;
                                }
                                alert('Business moment saved');
                            }} text="Save Business Moment" />
                        </Stack>
                        <Stack tokens={{ childrenGap: 15, maxWidth: '50vw' }}>
                            <Pivot onLinkClick={onOutputScreenChanged}>
                                <PivotItem
                                    headerText="Raw Data"
                                >
                                </PivotItem>
                                <PivotItem
                                    headerText="With Moment">
                                </PivotItem>
                                <PivotItem
                                    headerText="With Projection">
                                </PivotItem>
                            </Pivot>
                            <textarea defaultValue={outputScreen} readOnly />
                        </Stack>

                    </Stack>
                </Stack>

            </Stack>
        </>
    );
};
