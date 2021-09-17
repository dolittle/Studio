// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { useHistory } from 'react-router-dom';

import { Grid, IconButton } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TabPanel } from '../../utils/materialUi';
import DeleteIcon from '@material-ui/icons/Delete';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { savePurchaseOrderMicroservice } from '../../stores/microservice';
import { MicroservicePurchaseOrder } from '../../api/index';

import { HttpResponseApplications2 } from '../../api/api';
import { useGlobalContext } from '../../stores/notifications';
import { Overview } from './overview';
import { Guid } from '@dolittle/rudiments';

type Props = {
    application: HttpResponseApplications2;
    environment: string;
};

// TODO add waitForData
// TODO add Deleteicon colours
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        button: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        actionsContainer: {
            marginBottom: theme.spacing(2),
        },
        resetContainer: {
            padding: theme.spacing(3),
        },

        iconRoot: {
            padding: 0,
            marginRight: theme.spacing(1),
            fill: 'white',
        },
        icon: {
            fill: 'white',
        },
    })
);

export const Create: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const classes = useStyles();
    // TODO handle when it is not create
    const isCreate = true;

    const _props = props!;
    const application = _props.application;
    const environment = _props.environment;

    const { setNotification } = useGlobalContext();
    const [value, setValue] = React.useState(0);

    const microserviceId = Guid.create().toString();
    const headImage = 'dolittle/integrations-m3-purchaseorders:latest';
    const runtimeImage = 'dolittle/runtime:6.1.0';

    const ms: MicroservicePurchaseOrder = {
        dolittle: {
            applicationId: application.id,
            tenantId: application.tenantId,
            microserviceId,
        },
        name: '',
        kind: 'purchase-order-api',
        environment: _props.environment,
        extra: {
            //ingress: {
            //    path: '/',
            //    pathType: 'Prefix',
            //    host: ingressInfo.host,
            //    domainPrefix: ingressInfo.domainPrefix
            //}
            headImage,
            runtimeImage,
            webhooks: [],
            rawDataLogName: 'raw-data-log-v1',
        },
    };


    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        if (isCreate) {
            setNotification(
                'Health Status only available after microservice created',
                'error'
            );
            return;
        }
        setValue(newValue);
    };

    const _onSave = (ms: MicroservicePurchaseOrder): void => {
        // TODO handle exception (maybe move to wait)
        savePurchaseOrderMicroservice(ms).then((data) => {
            // TODO We want to take them to the actual new microservice and set to step 3.
            //const href = `/microservices/application/${application.id}/${environment}/overview`;
            const href = `/microservices/application/${application.id}/${environment}/view/${microserviceId}?step=3`;
            history.push(href);
        }).catch(reason => console.log(reason));
    };

    return (
        <Grid
            container
            direction='column'
            justifyContent='flex-start'
            alignItems='stretch'
        >
            <h1>Create purchase order API</h1>
            <div>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    TabIndicatorProps={{ style: { background: '#ffffff' } }}
                >
                    <Tab label='Configuration' />
                    <Tab label='Health Status' />

                    <IconButton aria-label="more-options" onClick={() => {
                        setNotification('TODO: More options?', 'info');
                    }}
                        className={classes.iconRoot}
                    >
                        <DeleteIcon className={classes.icon} />
                        <span>DELETE</span>
                    </IconButton>
                </Tabs >
                <TabPanel value={value} index={0}>
                    <Overview onSave={_onSave} microservice={ms} />
                </TabPanel>
            </div >
        </Grid >
    );
};
