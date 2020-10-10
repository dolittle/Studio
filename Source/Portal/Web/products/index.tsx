import { withViewModel } from '@shared/mvvm';
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

    // https://www.benmarshall.me/responsive-iframes/
    const iframe = React.createElement('iframe', {
        src: 'about: blank',
        style: {
            backgroundColor: 'transparent'
        },
        frameBorder: 1,
        allowFullScreen: true
    });

    return (
        <div className="something iframe-container">
            {iframe}
        </div>
    );
});