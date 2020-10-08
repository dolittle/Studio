import { withViewModel } from '../infrastructure';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Index } from './index.vm';
import { mergeStyles, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

import './index.scss';

interface Parameters {
    productId: number;
};

import { FontIcon, Toggle, DefaultButton, PrimaryButton, Stack, IStackTokens } from 'office-ui-fabric-react';
const stackTokens: IStackTokens = { childrenGap: 5 };

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

export const index = withViewModel(Index, (viewContext) => {
    const params = useParams() as any as Parameters;

    return (
        <div className="something">
            <Stack tokens={stackTokens}>
                <span>This is the products page for {params.productId}</span>
                <span>State is : {viewContext.viewModel.someState}</span>
                <span>The Feature is : {viewContext.viewModel.featureEnabled ? 'enabled' : 'disabled'}</span>
                <div>
                    <FontIcon iconName="CompassNW" className={classNames.deepSkyBlue} />
                    <FontIcon iconName="Dictionary" className={classNames.greenYellow} />
                    <FontIcon iconName="TrainSolid" className={classNames.salmon} />
                </div>
                <Toggle label="Enable stuff" onText="On" offText="Off" onChange={(ev, checked) => viewContext.viewModel.featureEnabled = checked!} />
                <Stack horizontal tokens={stackTokens}>
                    <DefaultButton text="Standard" allowDisabledFocus />
                    <PrimaryButton text="Primary" allowDisabledFocus />
                </Stack>
            </Stack>
        </div>
    );
});