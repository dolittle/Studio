// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';

import { PrimaryButton, DefaultButton, Stack, FontIcon, mergeStyles, mergeStyleSets, Toggle } from 'office-ui-fabric-react';
import { Navigation } from '@shared/portal';

import './index.scss';
import '@shared/styles/theme';
const iconClass = mergeStyles({
    fontSize: 50,
    height: 50,
    width: 50,
    margin: '0 25px',
});

const classNames = mergeStyleSets({
    deepSkyBlue: [{ color: 'deepskyblue' }, iconClass],
    greenYellow: [{ color: 'greenyellow' }, iconClass],
    salmon: [{ color: 'salmon' }, iconClass],
});


export default function App() {

    Navigation.setStructure([
        {
            name: 'First group',
            items: [{
                name: 'First Item'
            }]
        }
    ])

    function publishMessage() {
        var data = { foo: 'bar' }
        var event = new CustomEvent('myCustomEvent', { detail: data })
        window.parent.document.dispatchEvent(event)
    }

    return (
        <>
            <Stack>
                <div>
                    <FontIcon iconName="CompassNW" className={classNames.deepSkyBlue} />
                    <FontIcon iconName="Dictionary" className={classNames.greenYellow} />
                    <FontIcon iconName="TrainSolid" className={classNames.salmon} />
                </div>
                <Toggle label="Enable stuff" onText="On" offText="Off" />

                <DefaultButton onClick={publishMessage}>Click me</DefaultButton>
                <PrimaryButton>Click me</PrimaryButton>
            </Stack>
        </>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);