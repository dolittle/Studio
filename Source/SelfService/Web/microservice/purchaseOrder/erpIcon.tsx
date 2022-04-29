// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';

import logoInfor from '../../images/infor.png'; // with import
import logoIFS from '../../images/ifs.png';
import logoSAP from '../../images/sap.png';


import { Box } from '@mui/material';

type Props = {
    kind: 'infor' | 'ifs' | 'sap';
    onClick: (event: React.MouseEvent<HTMLImageElement>) => void;
};

const classes = {
    container: {
        'width': '80px',
        'height': '80px',
        'display': 'flex',
        'alignItems': 'center',
        'justifyContent': 'center',
        'padding': '10px',
        'margin': '10px',
        'border': '1px solid #3B3D48',
        'boxSizing': 'border-box',
        'borderRadius': '4px',
        '& img': {
            display: 'block',
            margin: '0 auto',
        }
    },
    infor: {
        backgroundColor: 'gray',
    },
    ifs: {
        backgroundColor: 'inherit',
    },
    sap: {
        backgroundColor: 'inherit',
    },

};

export const ErpIcon: React.FunctionComponent<Props> = (props) => {
    const options = {
        infor: {
            className: classes.infor,
            src: logoInfor,
        },
        ifs: {
            className: classes.ifs,
            src: logoIFS,
        },
        sap: {
            className: classes.sap,
            src: logoSAP,
        },
    };

    const onClick = props!.onClick;
    const option = options[props!.kind];

    return (
        <Box sx={{ ...classes.container, ...option.className }}>
            <img src={option.src} onClick={onClick} />
        </Box>
    );
};
