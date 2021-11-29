// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Stack } from '@fluentui/react/lib/Stack';
import { Pivot, PivotItem, IDropdownOption, DefaultButton } from '@fluentui/react';


import CodeEditor, { loader } from '@monaco-editor/react';
import { saveBusinessmoment } from '../stores/businessmoment';
import { HttpResponseApplication } from '../api/api';
import { BusinessMoment, HttpInputBusinessMoment, BusinessMomentEntity } from '../api/index';


const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const stackTokens = { childrenGap: 15 };

type Props = {
    application: HttpResponseApplication
    connectors: IDropdownOption[]
    entities: IDropdownOption[]
    businessMoment: BusinessMoment
    entity: BusinessMomentEntity
    onCreate: () => void;
    onEntityChange: (newEntityId: string) => void;
    onSave: (moment: BusinessMoment) => void;
};

export const BusinessMomentEditor: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const _props = props!;
    const application = _props.application;
    const { environment, applicationId, businessMomentId, microserviceId } = useParams() as any;
    const [connectors, setConnectors] = useState(_props.connectors);
    const [moment, setBusinessMoment] = useState(_props.businessMoment);
    const [entities, setEntities] = useState(_props.entities);
    const [loaded, setLoaded] = useState(false);

    // Not sure how to hook up to IPivotItemProps
    const [outputScreen, setOutputScreen] = useState('Raw Data');
    const onOutputScreenChanged = (item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) => {
        setOutputScreen(item!.props.headerText as string);
    };

    const [connectorIdState, setConnectorIdState] = useState('');

    const connectorChanged = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
        setConnectorIdState(option!.key as string);
    };

    const entityChanged = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
        const key = option!.key as string;
        if (key === 'skip') {
            return;
        }

        if (key === 'newEntity') {
            _props.onCreate();
            return;
        }

        moment.entityTypeId = key;
        _props.onEntityChange(moment.entityTypeId);
    };


    useEffect(() => {
        Promise.all([
            loader.init(),
        ]).then(values => {
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
                        defaultSelectedKey={microserviceId}
                        onChange={connectorChanged}
                    />

                    <Dropdown placeholder="Select"
                        dropdownWidth="auto"
                        label="Entity"
                        defaultSelectedKey={moment.entityTypeId}
                        options={entities}
                        onChange={entityChanged}
                    />

                    <TextField
                        label="Business Moment"
                        styles={textFieldStyles}
                        defaultValue={moment.name}

                        onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                            moment.name = newValue!;
                        }}
                    />
                </Stack>

                <Stack grow={1} tokens={stackTokens}>
                    <Stack horizontal grow={1} tokens={stackTokens}>

                        <Stack tokens={{ childrenGap: 15, maxWidth: '50vw' }}>
                            <h1>Business Moment</h1>
                            <CodeEditor
                                onChange={(value: string | undefined) => {
                                    moment.embeddingCode = value!;
                                    setBusinessMoment(moment);
                                }}
                                height="20vh"
                                width="50vw"
                                defaultLanguage="javascript"
                                defaultValue={moment.embeddingCode}
                            />

                            <h1>Projection</h1>
                            <CodeEditor
                                height="20vh"
                                width="50vw"
                                onChange={(value: string | undefined) => {
                                    moment.projectionCode = value!;
                                    setBusinessMoment(moment);
                                }}
                                defaultLanguage="javascript"
                                defaultValue={moment.projectionCode}
                            />
                            <DefaultButton onClick={async () => {
                                console.log('Save business moment', moment);
                                console.log('with entity', _props.entity);
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
                                _props.onSave(moment);
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
