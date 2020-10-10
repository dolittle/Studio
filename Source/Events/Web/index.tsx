import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';

import '@shared/styles/theme';

import './index.scss';
import Stack from 'office-ui-fabric-react/lib/components/Stack/Stack';
import { PrimaryButton } from 'office-ui-fabric-react/lib/components/Button/PrimaryButton/PrimaryButton';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FontIcon, mergeStyles, mergeStyleSets, Toggle } from 'office-ui-fabric-react';

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
    return (
        <>
            <Stack>
                <div>
                    <FontIcon iconName="CompassNW" className={classNames.deepSkyBlue} />
                    <FontIcon iconName="Dictionary" className={classNames.greenYellow} />
                    <FontIcon iconName="TrainSolid" className={classNames.salmon} />
                </div>
                <Toggle label="Enable stuff" onText="On" offText="Off" />

                <DefaultButton>Click me</DefaultButton>
                <PrimaryButton>Click me</PrimaryButton>
            </Stack>
        </>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);