// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import './theme.scss';


type Props = {
    title: string
    icon: JSX.Element
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    titleColor?: string
};

const defaultOnClick = (event: React.MouseEvent<HTMLElement>) => { };
const defaultTitleColor = '#B39DDB'; // TODO this shouldnt be here


export const SecondaryButton: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const title = _props.title;
    const icon = _props.icon;
    const onClick = _props.onClick ? _props.onClick : defaultOnClick;
    const titleColor = _props.titleColor ? _props.titleColor : defaultTitleColor;
    return (
        <div className="btn container">
            <div className="icon" style={{
                color: titleColor,
            }}>
                {icon}
            </div>
            <a
                className="title"
                style={{
                    color: titleColor,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                }}
                onClick={onClick}>{title}</a>
        </div>
    );
};
