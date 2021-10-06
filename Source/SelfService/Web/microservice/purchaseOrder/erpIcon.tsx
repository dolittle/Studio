// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import clsx from 'clsx';

import logoInfor from '../../images/infor.png'; // with import
import logoIFS from '../../images/ifs.png';
import logoSAP from '../../images/sap.png';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

type Props = {
    kind: 'infor' | 'ifs' | 'sap';
    onClick: (event: React.MouseEvent<HTMLImageElement>) => void;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            margin: '10px',
            border: '1px solid #3B3D48',
            boxSizing: 'border-box',
            borderRadius: '4px',
        },
        infor: {
            backgroundColor: 'grey',
        },
        ifs: {
            backgroundColor: 'inherit',
        },
        sap: {
            backgroundColor: 'inherit',
        },
        icon: {
            display: 'block',
            margin: '0 auto',
        }
    })
);

export const ErpIcon: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles();
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
        <div className={clsx(classes.container, option.className)}>
            <img className={classes.icon} src={option.src} onClick={onClick} />
        </div>
    );
};
