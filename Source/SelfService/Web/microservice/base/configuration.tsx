// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, {useEffect, useState} from 'react';


import { ButtonText } from '../../theme/buttonText';
type Props = {
    applicationId: string
    environment: string
    microserviceId: string
};



const MAX_CONFIGMAP_ENTRY_SIZE = 3145728;


export const ConfigFiles: React.FunctionComponent<Props> = (props) => {

    return(
        <>

            <Box ml={2}>
                        <ConfigView microservice={ms} />
                    </Box>
                    <Divider className={classes.divider} />
                    <Box ml={2}>
                        <LiveIngressView urls={currentMicroservice.live.ingressUrls} paths={currentMicroservice.live.ingressPaths} />
                    </Box>
                    <Divider className={classes.divider} />
                    <Box ml={2}>
                        <ButtonText
                            onClick={async () => {
                                const href = `/microservices/application/${applicationId}/${environment}/view/${microserviceId}/environment-variables`;
                                history.push(href);
                            }}
                        >Manage environment variables</ButtonText>

                        <DownloadButtons
                            environment={environment}
                            microserviceName={msName}
                            applicationId={applicationId}
                        />
                    </Box>
                    <ConfigFiles applicationId={applicationId} environment={environment} microserviceId={microserviceId} />

        </>
    )
}
