// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { makeStyles } from '@material-ui/core/styles';

const aTagBackgroundColor = '#1AD8C3';
const backgroundColor = '#323F4B';

export const useStyles = makeStyles({
    root: {
        color: aTagBackgroundColor,
        backgroundColor,
    },
});

export const classes = useStyles();
