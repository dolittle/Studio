// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Stack } from '@fluentui/react/lib/Stack';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Pivot, PivotItem, IDropdownOption, DefaultButton } from '@fluentui/react';


import CodeEditor, { loader, Monaco } from '@monaco-editor/react';
import { getConnectors, getEntitiesByConnector } from '../store';
import { getBusinessMoments, HttpResponseBusinessMoments } from '../api/businessmoments';
import { HttpResponseApplications2 } from '../api/api';
import { MicroserviceBusinessMomentAdaptor, BusinessMoment } from '../api/index';
import { CreateCardAdaptor } from './createCard';


const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const stackTokens = { childrenGap: 15 };

type Props = {
    application: HttpResponseApplications2
};

export const Editor: React.FunctionComponent<Props> = (props) => {
    // TODO need to create guid
    const _props = props!;
    const application = _props.application;

    const { environment, applicationId, businessMomentId } = useParams() as any;

    const [loaded, setLoaded] = useState(false);
    const [connectors, setConnectors] = useState({} as IDropdownOption[]);
    const [moments, setBusinessMoments] = useState({} as any[]);
    const [moment, setBusinessMoment] = useState({} as BusinessMoment);
    const [monaco, setMoncao] = useState({} as any[]);

    // Not sure how to hook up to IPivotItemProps
    const [outputScreen, setOutputScreen] = useState('Raw Data');
    const onOutputScreenChanged = (item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) => {
        setOutputScreen(item!.props.headerText as string);
    };

    const [connectorIdState, setConnectorIdState] = useState('');

    const connectorChanged = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
        setConnectorIdState(option!.key as string);
    };

    const monacoRef = useRef(null as Monaco);


    useEffect(() => {
        Promise.all([
            getBusinessMoments(applicationId, environment),
            loader.init(),
        ]).then(values => {
            console.log(values[1]);
            monacoRef.current = values[1];
            const applicationData = application;
            const microservicesGit: MicroserviceBusinessMomentAdaptor[] = applicationData.microservices.filter(microservice => {
                return microservice.kind === 'business-moments-adaptor';
            });


            const connectors = microservicesGit.map(microservice => {
                return { key: microservice.dolittle.microserviceId, text: microservice.extra.connector.kind } as IDropdownOption;
            });

            const businessMomentsData = values[0] as HttpResponseBusinessMoments;

            const moment = businessMomentsData.moments.find(data => data.moment.uuid === businessMomentId);
            if (moment) {
                setBusinessMoment(moment.moment);
            } else {
                setBusinessMoment({
                    name: '',
                    uuid: '',
                    filter: '',
                    mapper: '',
                    transform: ''
                } as BusinessMoment);
            }
            //const moments = businessMomentsData.moments.map(bmData => {
            //    const tempMs: MicroserviceBusinessMomentAdaptor | undefined = microservicesGit.find(ms => ms.dolittle.microserviceId === bmData.microserviceId);
            //    const microserviceName = tempMs ? tempMs.name : 'Missing';
            //    const connectorType = tempMs ? tempMs.extra.connector.kind : 'Missing';
            //    const moment = bmData.moment;
            //
            //    return {
            //        applicationId,
            //        environment,
            //        momentId: moment.uuid,
            //        name: moment.name,
            //        microserviceId: bmData.microserviceId,
            //        microserviceName,
            //        connectorType,
            //        canEdit: true,
            //    };
            //});
            //setBusinessMoments(moments);
            setConnectors(connectors);
            setLoaded(true);

        });

    }, []);



    if (!loaded) {
        return null;
    }




    let entities = [] as IDropdownOption[];

    if (connectorIdState) {
        entities = getEntitiesByConnector(connectorIdState).map(entity => {
            return { key: entity.id, text: entity.name } as IDropdownOption;
        });
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
                            <DefaultButton onClick={() => {
                                console.log('Save business moment', moment);
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
