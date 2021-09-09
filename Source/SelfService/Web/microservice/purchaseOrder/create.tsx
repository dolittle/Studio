// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Grid } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TabPanel } from '../../utils/materialUi';
import DeleteIcon from '@material-ui/icons/Delete';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { savePurchaseOrderMicroservice } from '../../stores/microservice';
import { MicroservicePurchaseOrder } from '../../api/index';

import { HttpResponseApplications2 } from '../../api/api';
import { useGlobalContext } from '../../stores/notifications';
import { Overview } from './overview';
import { Guid } from '@dolittle/rudiments';
import '../purchaseOrder/purchaseorder.scss';
import { microservices } from '../../stores/state';

type Props = {
    application: HttpResponseApplications2;
    environment: string;
};

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
    })
);

export const Create: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const _props = props!;
    const application = _props.application;
    const environment = _props.environment;

    const { setNotification } = useGlobalContext();
    const [value, setValue] = React.useState(0);

    // TODO do something with
    const microserviceId = Guid.create().toString();

    const ms: MicroservicePurchaseOrder = {
        dolittle: {
            applicationId: application.id,
            tenantId: application.tenantId,
            microserviceId,
        },
        name: 'TODO:Changeme', // TODO update based on name change in stepper part 2
        kind: 'purchase-order-api',
        environment: _props.environment,
        // TODO make specific for the purchase-order
        extra: {
            // nginxdemos/hello:latest
            //headImage: 'nginxdemos/hello:latest', //'dolittle/spinner:0.0.0', // Doesnt work
            //runtimeImage: 'dolittle/runtime:5.6.0',
            //ingress: {
            //    path: '/',
            //    pathType: 'Prefix',
            //    host: ingressInfo.host,
            //    domainPrefix: ingressInfo.domainPrefix
            //}

            headImage: 'TODO',
            runtimeImage: 'TODO',
            webhooks: [],
            rawDataLogID: 'TODO',
        },
    };

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [msName, setMsName] = React.useState('');

    const steps = ['Select ERP system', 'Provide a name', 'Connect with ERP system'];

    const stepsContent = [
        <>
            <Typography>
                <p>
                    Select the ERP system you have. Make sure you have access to the
                    system for the next two steps.
                </p>
            </Typography>
        </>,
        <>
            <Typography>
                <p>
                    Establish a descriptive name for this microservice. A good example
                    might be, “supplier purchase orders”. This can always be changed
                    later.{' '}
                </p>
            </Typography>
        </>,
        <>
            <Typography>
                <p>
                    The webhook endpoints are provided below. Each one will be established
                    separately in program CMS045 in M3, however, the same username and
                    password can be used for both endpoints.
                </p>
            </Typography>
        </>,
    ];

    const handleNext = async () => {
        // Save microservice
        // Redirect to view
        if (activeStep === 2) {
            await _onSave(ms);
            return;
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const isCreate = true;
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

    const headImage = 'dolittle/integrations-m3-purchaseorders:latest';
    const runtimeImage = 'dolittle/runtime:6.1.0';

    const _onSave = (ms: MicroservicePurchaseOrder): void => {
        console.log(msName);
        const href = `/microservices/application/${application.id}/${environment}/view/${microserviceId}?step=3`;
        history.push(href);
        return;
        // TODO when platform-api is running or mock
        ms.name = msName;
        ms.extra.headImage = headImage;
        ms.extra.runtimeImage = runtimeImage;

        savePurchaseOrderMicroservice(ms).then((data) => {
            // TODO We want to take them to the actual new microservice and set to step 3.
            //const href = `/microservices/application/${application.id}/${environment}/overview`;
            const href = `/microservices/application/${application.id}/${environment}/view/${microserviceId}?step=3`;
            history.push(href);
        });
    };

    const onChangeHandler = (
        setter: React.Dispatch<React.SetStateAction<string>>
    ): ((
        event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
        newValue?: string
    ) => void) => {
        return (
            event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
            newValue?: string
        ): void => {
            {
                setter(newValue!);
            }
        };
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
                    <DeleteIcon className='deleteIcon' />
                    <Button className='deleteIcon'>DELETE</Button>
                </Tabs >
                <TabPanel value={value} index={0}>
                    <Overview onNameChange={onChangeHandler(setMsName)} onSave={_onSave} microservice={ms} />
                </TabPanel>
            </div >
        </Grid >
    );
};
