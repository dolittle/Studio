// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { getPersonalisedInfo } from '../api/application';

import { Doc as AccessContainerRegistry } from '../documentation/accessContainerRegistry';

type Props = {
    applicationId: string;
};

export const View: React.FunctionComponent<Props> = (props) => {
    const applicationId = props!.applicationId;

    const [info, setInfo] = useState({} as any);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            getPersonalisedInfo(applicationId)
        ]).then(values => {
            const data = values[0];
            data.applicationId = applicationId;
            setInfo(data);
            setLoaded(true);
        });
    }, []);

    if (!loaded) {
        return null;
    }


    return (
        <>
            <p>Your container registry is empty</p>
            <br />

            <h1>How to access and add an image to your container registry</h1>
            <br />
            <AccessContainerRegistry info={info} />
        </>
    );
};
