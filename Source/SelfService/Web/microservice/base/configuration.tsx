// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Box, Divider } from '@mui/material';
import React, {useEffect, useState} from 'react';
import { IngressURLWithCustomerTenantID, SimpleIngressPath } from '../../api/api';
import { MicroserviceSimple } from '../../api/index';


import { ButtonText } from '../../theme/buttonText';
import { DownloadButtons } from '../components/downloadButtons';
import { ConfigView } from './configView';
import { LiveIngressView } from './liveIngressView';

export type ConfigurationProps = {
    applicationId: string
    environment: string
    microserviceId: string
    msName: string
    ingressUrls: IngressURLWithCustomerTenantID[]
    ingressPaths: SimpleIngressPath[]
    ms: MicroserviceSimple
    onClick: () => void
// add onclick

};



const MAX_CONFIGMAP_ENTRY_SIZE = 3145728;


const styles = {
    divider: {
        backgroundColor: '#3B3D48'
    }
};


export const Configuration: React.FunctionComponent<ConfigurationProps> = (props) => {

    return(
        <>
            <Box ml={2}>
                <ConfigView microservice={props.ms} />
                </Box>
                <Divider sx={styles.divider} />
                <Box ml={2}>
                    <LiveIngressView urls={props.ingressUrls} paths={props.ingressPaths} />
                </Box>
                <Divider sx={styles.divider} />
                <Box ml={2}>
                    <ButtonText
                        onClick={props.onClick}
                    >Manage environment variables</ButtonText>

                        <DownloadButtons
                            environment={props.environment}
                            microserviceName={props.msName}
                            applicationId={props.applicationId}
                        />
            </Box>

        </>
    )
}
