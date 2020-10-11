// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import {
    DocumentCard,
    DocumentCardActivity,
    DocumentCardDetails,
    DocumentCardImage,
    DocumentCardTitle,
    FontIcon,
    IconButton,
    IDocumentCardStyles,
    ImageFit,
    mergeStyles,
    Stack
} from 'office-ui-fabric-react';
import React from 'react';

const iconClass = mergeStyles({
    fontSize: 30,
    height: 30,
    width: 30,
    color: 'white',
    margin: '0 12px',
});

const img = require('../images/microservice.png');

export const List = () => {
    const cardStyles: IDocumentCardStyles = {
        root: { display: 'inline-block', marginRight: 20, marginBottom: 20, width: 320 },
    };

    const microservices = [
        {
            name: 'Portal',
            running: true
        }, {
            name: 'Events',
            running: true
        }, {
            name: 'Microservices',
            running: false
        }, {
            name: 'Logs',
            running: false
        }, {
            name: 'Tracing',
            running: true
        }
    ];

    function cardClicked() {

    }

    function getIconFor(microservice: any) {
        const iconName = microservice.running ? 'CircleStopSolid' : 'MSNVideosSolid';
        return { iconName };
    }

    function getTitleFor(microservice: any) {
        return microservice.running ? 'Stop' : 'Start';
    }

    return (
        <>
            <div>
                {microservices.map(microservice =>
                    <DocumentCard key={microservice.name} styles={cardStyles} onClick={cardClicked}>
                        <DocumentCardImage height={150} imageFit={ImageFit.cover} imageSrc={img.default}></DocumentCardImage>
                        <DocumentCardDetails>
                            <Stack horizontal>
                                <IconButton iconProps={getIconFor(microservice)} title={getTitleFor(microservice)} />
                                <DocumentCardTitle title={microservice.name} shouldTruncate />
                            </Stack>

                        </DocumentCardDetails>
                        <DocumentCardActivity activity="Modified" people={[]} />
                    </DocumentCard>
                )}
            </div>
        </>
    );

};