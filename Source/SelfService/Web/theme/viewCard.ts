// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import {
    IDocumentCardStyles,
    IButtonStyles
} from '@fluentui/react';

const aTagBackgroundColor = '#1AD8C3';
export const backgroundColor = '#323F4B';
export const cardStyles: IDocumentCardStyles = {
    root: {
        display: 'inline-block',
        marginRight: 20,
        maxWidth: 400,
        width: 400,
        backgroundColor,
    },
};

export const buttonStyles: IButtonStyles = {
    root: {
        backgroundColor,
        color: aTagBackgroundColor,
    },
    rootDisabled: {
        backgroundColor,
        color: aTagBackgroundColor,
    }
};

export const commandTileClass: IDocumentCardStyles = {
    root: {
        backgroundColor,
        buttonStyles
    }
};

