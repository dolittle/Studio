// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Application, Microservice } from '@dolittle/vanir-common';
import { default as styles } from './ExternalContent.module.scss';

export interface IExternalContentProps {
    application?: Application;
    microservice?: Microservice;
    path: string;
    api: boolean;
}

export const ExternalContent = (props: IExternalContentProps) => {
    if (!props.application && !props.microservice) {
        return (<></>);
    }

    const isPortal = props.application.portal?.id === props.microservice.id;
    let prefix = '';
    if (!isPortal) {
        if (!props.api) {
            prefix = '/_/';
        }
        prefix = prefix + props.microservice?.name.toLowerCase();
    } else {
        prefix = '';
    }
    if (props.api) {
        if (prefix.length > 0) {
            prefix = `/api/${prefix}`;
        } else {
            prefix = '/api';
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.contentScrollable}>
                <div className={styles.content}>
                    <iframe src={`http://localhost:9000${prefix}/${props.path}`} frameBorder={1}></iframe>
                </div>
            </div>
        </div>
    );
};
