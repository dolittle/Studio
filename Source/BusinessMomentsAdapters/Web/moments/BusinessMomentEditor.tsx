// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect } from 'react';

import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Stack } from '@fluentui/react/lib/Stack';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Pivot, PivotItem, IDropdownOption } from '@fluentui/react';


import CodeEditor, { useMonaco } from '@monaco-editor/react';


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

    return (
        <>
            <Stack tokens={stackTokens}>
                <Stack horizontal tokens={stackTokens}>
                    <Dropdown placeholder="Select"
                        label="Connector"
                        options={[]}
                    />

                    <Dropdown placeholder="Select"
                        label="Entity"
                        options={[]}
                    />

                    <PrimaryButton text="Add Entity" />

                    <TextField
                        label="Business Moment"
                        styles={textFieldStyles}
                    />
                </Stack>

                <Stack grow={1} tokens={stackTokens}>
                    <Stack horizontal grow={1} tokens={stackTokens}>

                        <Stack tokens={{ childrenGap: 15, maxWidth: '50vw' }}>
                            <h1>Moment</h1>
                            <CodeEditor
                                height="20vh"
                                width="50vw"
                                defaultLanguage="javascript"
                                defaultValue="// some comment"
                            />

                            <h1>Projection</h1>
                            <CodeEditor
                                height="20vh"
                                width="50vw"
                                defaultLanguage="javascript"
                                defaultValue="// some comment"
                            />
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
                            <textarea value={outputScreen} />
                        </Stack>

                    </Stack>
                </Stack>

            </Stack>
        </>
    );
};
