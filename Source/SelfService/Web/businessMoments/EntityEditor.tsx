// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.


// TODO how to load the logs?
// TODO validate the data
// TODO change action button from create to save

import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Stack } from '@fluentui/react/lib/Stack';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Text, Pivot, PivotItem, IDropdownOption } from '@fluentui/react';


import CodeEditor, { loader } from '@monaco-editor/react';
import { HttpResponseApplications2 } from '../api/api';
import { BusinessMomentEntity } from '../api/index';


const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const stackTokens = { childrenGap: 15 };

type Props = {
    application: HttpResponseApplications2
    connectors: IDropdownOption[]
    entity: BusinessMomentEntity
    onCreate: () => void;
    onSave: () => void;
};

export const EntityEditor: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const _props = props!;
    const application = _props.application;
    const currentEntity = _props.entity;
    const connectors = _props.connectors;

    const [loaded, setLoaded] = useState(false);
    // Not sure how to hook up to IPivotItemProps
    const [outputScreen, setOutputScreen] = useState('Raw Data');
    const onOutputScreenChanged = (item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) => {
        setOutputScreen(item!.props.headerText as string);
    };


    useEffect(() => {
        Promise.all([
            //getBusinessMoments(applicationId, environment),
            loader.init(),
        ]).then(values => {
            //const applicationData = application;
            //const microservicesGit: MicroserviceBusinessMomentAdaptor[] = applicationData.microservices.filter(microservice => {
            //    return microservice.kind === 'business-moments-adaptor';
            //});
            //
            //
            //const connectors = microservicesGit.map(microservice => {
            //    return { key: microservice.dolittle.microserviceId, text: microservice.extra.connector.kind } as IDropdownOption;
            //});
            //
            //const businessMomentsData = values[0] as HttpResponseBusinessMoments;
            //
            //const entities = businessMomentsData.entities.map(data => {
            //    const entity = data.entity;
            //    return { key: entity.typeID, text: entity.name } as IDropdownOption;
            //});
            //entities.push({ key: 'newEntity', text: 'Create new' } as IDropdownOption);
            //
            //setConnectors(connectors);
            //setEntities(entities);
            setLoaded(true);
            return;
        });

    }, []);


    if (!loaded) {
        return null;
    }



    // TODO this might need to use state etc


    return (
        <>
            <Stack tokens={stackTokens}>
                <Stack horizontal tokens={stackTokens}>
                    <Text variant="xLarge" nowrap block>
                        Remove
                    </Text>

                    <PrimaryButton text="Load logs" onClick={(e => {
                        console.log('Load raw logs');
                    })} />

                </Stack>
                <Stack horizontal tokens={stackTokens}>
                    <TextField
                        label="Entity Name"
                        styles={textFieldStyles}
                        defaultValue={currentEntity.name}
                        onChange={(e, v) => {
                            currentEntity.name = v!;
                        }}
                    />

                    <Dropdown placeholder="Select"
                        dropdownWidth="auto"
                        label="Business Moments adapter"
                        options={connectors}
                        onChange={(e, v) => {
                            //currentEntity.connectorId = (v as IDropdownOption).key as string;
                        }}
                    />

                    <TextField
                        label="Entity ID"
                        styles={textFieldStyles}
                        placeholder="id"
                        defaultValue={currentEntity.idForRetrival}
                        onChange={(e, v) => {
                            //currentEntity.id = v!;
                        }}
                    />

                </Stack>

                <Stack grow={1} tokens={stackTokens}>
                    <Stack horizontal grow={1} tokens={stackTokens}>

                        <Stack tokens={{ childrenGap: 15, maxWidth: '50vw' }}>
                            <h1>Filter Payload</h1>
                            <CodeEditor
                                height="20vh"
                                width="50vw"
                                defaultLanguage="javascript"
                                defaultValue={currentEntity.filter}
                                onChange={(value, e) => {
                                    currentEntity.filter = value!;
                                }}
                            />

                            <h1>Transform Payload</h1>
                            <CodeEditor
                                height="20vh"
                                width="50vw"
                                defaultLanguage="javascript"
                                defaultValue={currentEntity.transform}
                                onChange={(value, e) => {
                                    currentEntity.transform = value!;
                                }}
                            />
                        </Stack>

                        <Stack tokens={{ childrenGap: 15, maxWidth: '50vw' }}>
                            <Pivot onLinkClick={onOutputScreenChanged}>
                                <PivotItem
                                    headerText="Raw Data"
                                >
                                </PivotItem>
                                <PivotItem
                                    headerText="With Filter">
                                </PivotItem>
                                <PivotItem
                                    headerText="With Transform">
                                </PivotItem>
                            </Pivot>
                            <textarea readOnly value={outputScreen} />
                        </Stack>

                    </Stack>
                </Stack>

                <Stack horizontal horizontalAlign="end" tokens={stackTokens}>
                    <PrimaryButton text="Create" onClick={(e => {
                        console.log('Current state of entity is ', currentEntity);
                        // _props.onCreate();
                        // _props.onSave()
                    })} />
                </Stack>
            </Stack>
        </>
    );
};
