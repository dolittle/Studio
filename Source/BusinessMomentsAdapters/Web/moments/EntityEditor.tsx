// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.


// TODO how to load the logs?
// TODO validate the data
// TODO change action button from create to save

import React, { useEffect } from 'react';

import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Stack } from '@fluentui/react/lib/Stack';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Pivot, PivotItem, IDropdownOption } from '@fluentui/react';


import CodeEditor, { useMonaco } from '@monaco-editor/react';

import { Entity, getConnectors } from '../store';


const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const stackTokens = { childrenGap: 15 };

export const Editor: React.FunctionComponent = () => {
    const monaco = useMonaco();

    useEffect(() => {
        if (monaco) {
            console.log('here is the monaco isntance:', monaco);
        }
    }, [monaco]);

    // Not sure how to hook up to IPivotItemProps
    const [outputScreen, setOutputScreen] = React.useState('Raw Data');
    const onOutputScreenChanged = (item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) => {
        setOutputScreen(item!.props.headerText as string);
    };

    const _connectors: IDropdownOption[] = getConnectors().map(connector => {
        return { key: connector.id, text: connector.name } as IDropdownOption;
    }) as IDropdownOption[];

    // TODO this might need to use state etc
    const currentEntity: Entity = {} as Entity;
    currentEntity.id = 'id';
    currentEntity.name = '';
    currentEntity.filterCode = '';
    currentEntity.transformCode = '';
    currentEntity.connectorId = '';

    return (
        <>
            <Stack tokens={stackTokens}>
                <Stack horizontal tokens={stackTokens}>
                    <Dropdown placeholder="Select"
                        label="Connector:"
                        options={_connectors}
                        onChange={(e, v) => {
                            currentEntity.connectorId = (v as IDropdownOption).key as string;
                        }}
                    />

                    <TextField
                        label="Entity Name:"
                        styles={textFieldStyles}
                        defaultValue={currentEntity.name}
                        onChange={(e, v) => {
                            currentEntity.name = v!;
                        }}
                    />

                    <TextField
                        label="Entity ID:"
                        styles={textFieldStyles}
                        placeholder="id"
                        defaultValue={currentEntity.id}
                        onChange={(e, v) => {
                            currentEntity.id = v!;
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
                                defaultValue={currentEntity.filterCode}
                                onChange={(value, e) => {
                                    currentEntity.filterCode = value!;
                                }}
                            />

                            <h1>Transform Payload</h1>
                            <CodeEditor
                                height="20vh"
                                width="50vw"
                                defaultLanguage="javascript"
                                defaultValue={currentEntity.transformCode}
                                onChange={(value, e) => {
                                    currentEntity.transformCode = value!;
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
                    })} />
                </Stack>
            </Stack>
        </>
    );
};
