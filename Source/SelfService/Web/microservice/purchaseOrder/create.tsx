// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';


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


import { HttpResponseApplications2 } from '../../api/api';
import { useGlobalContext } from '../../stores/notifications';
import { Overview } from './overview';

type Props = {
    application: HttpResponseApplications2
    environment: string
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
    }),
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
    const _props = props!;
    const { setNotification } = useGlobalContext();
    const [value, setValue] = React.useState(0);


    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = ['Select ERP system', 'Provide a name', 'Connect with ERP system'];

    const stepsContent = [
        (
            <>
                <Typography>
                    <p>Select the ERP system you have. Make sure you have access to the system for the next two steps.</p>
                </Typography>
            </>
        ),
        (
            <>
                <Typography>
                    <p>Establish a descriptive name for this microservice. A good example might be, “supplier purchase orders”. This can always be changed later. </p>
                </Typography>
            </>
        ),

        (
            <>
                <Typography>
                    <p>The webhook endpoints are provided below. Each one will be established separately in program CMS045 in M3, however, the same username and password can be used for both endpoints.</p>
                </Typography>
            </>
        ),


    ];

    const handleNext = () => {
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
            setNotification('Health Status only available after microservice created', 'error');
            return;
        }
        setValue(newValue);
    };

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
        >
            <h1>Create purchase order API</h1>
            <div>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    TabIndicatorProps={{ style: { background: '#ffffff' } }}
                >
                    <Tab label="Overview" />
                    <Tab label="Config" />
                    <Tab label="Health Status" />
                </Tabs>

                <TabPanel value={value} index={0}>
                    <Overview />
                </TabPanel>
            </div>


        </Grid>
    );
};
