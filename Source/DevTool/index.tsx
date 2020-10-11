// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';

import { PrimaryButton, DefaultButton, Stack, FontIcon, mergeStyles, mergeStyleSets, Toggle, CompoundButton } from 'office-ui-fabric-react';
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

    function setOriginalStructure() {
        Navigation.setStructure([
            {
                name: 'First group',
                items: [{
                    name: 'First Item'
                }]
            }
        ]);
    }

    setOriginalStructure();

    function setOtherStructure() {
        Navigation.setStructure([
            {
                name: 'Some other group',
                items: [{
                    name: 'Some other First Item'
                }, {
                    name: 'Some other Second Item'
                }]
            }
        ])
    }

    function setThirdStructure() {
        Navigation.setStructure([
            {
                name: 'A third group',
                items: [{
                    name: 'Some other First Item'
                }, {
                    name: 'Some other Second Item'
                }]
            },
            {
                name: 'A fourth group',
                items: [{
                    name: 'Some other First Item'
                }, {
                    name: 'Some other Second Item'
                },{
                    name: 'Some other Third Item'
                }]
            }
        ])
    }


    return (
        <>
            <Stack>
                <div>
                    <FontIcon iconName="CompassNW" className={classNames.deepSkyBlue} />
                    <FontIcon iconName="Dictionary" className={classNames.greenYellow} />
                    <FontIcon iconName="TrainSolid" className={classNames.salmon} />
                </div>
                <Toggle label="Enable more stuff" onText="On" offText="Off" />

                <Stack horizontal>
                    <DefaultButton onClick={setOtherStructure}>Set other structure</DefaultButton>
                    <PrimaryButton onClick={setThirdStructure}>Set third structure</PrimaryButton>
                    <CompoundButton onClick={setOriginalStructure} secondaryText="This will reset the structure">Reset structure</CompoundButton>
                </Stack>
            </Stack>
        </>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);