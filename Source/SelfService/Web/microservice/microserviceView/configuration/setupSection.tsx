// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Button } from '@dolittle/design-system/atoms/Button/Button';

import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { DeleteRounded, EditRounded, ExpandCircleDownRounded, SaveRounded, RestartAltRounded } from '@mui/icons-material';

export const SetupSection = () => {
    return (
        <>
            <Accordion expanded>
                <AccordionSummary
                    expandIcon={<ExpandCircleDownRounded />}
                    aria-controls='setup-content'
                    id='setup-content'
                >
                    <Typography variant='subtitle1'>Configuration Setup</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Button variant='text' label='edit' startWithIcon={<EditRounded fontSize='small' />} sx={{ fontSize: 12, mr: 2.5 }} />
                    <Button variant='text' label='save' startWithIcon={<SaveRounded fontSize='small' />} sx={{ fontSize: 12, mr: 2.5 }} />
                    <Button variant='text' label='Restart Microservice' startWithIcon={<RestartAltRounded fontSize='small' />} sx={{ fontSize: 12, mr: 2.5 }} />
                    <Button variant='text' label='Delete Microservice' startWithIcon={<DeleteRounded fontSize='small' />} sx={{ fontSize: 12 }} />

                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    );
};
