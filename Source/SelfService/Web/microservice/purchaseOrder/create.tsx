// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { useHistory } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TabPanel } from '../../utils/materialUi';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { savePurchaseOrderMicroservice } from '../../stores/microservice';
import { MicroservicePurchaseOrder, MicroserviceSimple } from '../../api/index';

import { HttpResponseApplications2 } from '../../api/api';
import { useGlobalContext } from '../../stores/notifications';
import { Overview } from './overview';
import { Guid } from '@dolittle/rudiments';

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

function getSteps() {
    return ['Select ERP system', 'Provide a name', 'Connect with ERP system'];
}

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`;
        case 1:
            return 'An ad group contains one or more ads which target a shared set of keywords.';
        case 2:
            return `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`;
        default:
            return 'Unknown step';
    }
}

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
        kind: 'purchase-order',
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
        },
    };

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
                    <Tab label='Overview' />
                    <Tab label='Config' />
                    <Tab label='Health Status' />
                </Tabs>

                <TabPanel value={value} index={0}>
                    <Overview onNameChange={onChangeHandler(setMsName)} />
                </TabPanel>
            </div>
        </Grid>
    );
};
