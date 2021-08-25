// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import {
    IDocumentCardStyles,
    IButtonStyles
} from '@fluentui/react';
import { MicNone } from '@material-ui/icons';

export const aTagBackgroundColor = '#6678F6';
export const backgroundColor = '#191A21';
export const cardStyles: IDocumentCardStyles = {
    root: {
        display: 'inline-block',
        marginRight: 20,
        maxWidth: 400,
        width: 400,
        backgroundColor,
        border: 'none',
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

