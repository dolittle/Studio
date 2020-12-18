// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import styles from './Panel.module.scss';
import { Separator, Stack } from 'office-ui-fabric-react';

export type PanelProps = {
    children?: React.ReactNode;
    header: string;
};

export const Panel = (props: PanelProps) => {
    return(
        <div className={styles.panel}>
            <div className={styles.panelBody}>
                <h2 className={styles.panelHeader}>{props.header}</h2>
                <div className={styles.panelContent}>{props.children}</div>
            </div>
        </div>
    );
};