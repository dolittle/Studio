// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { ButtonText } from '../../theme/buttonText';

import { LogsInRange } from './logsInRange';
import { LogLines } from './logLines';

export type LogContextDialogState = {
    show: boolean;
    application: string;
    applicationId: string;
    environment: string;
    microservice: string;
    microserviceId: string;
    from: bigint;
    to: bigint;
};

export const LogContextDialog = (
    state: LogContextDialogState,
    setState: React.Dispatch<React.SetStateAction<LogContextDialogState>>,
    showTimestamp: boolean
) => (
    <Dialog
        open={state.show}
        maxWidth='xl'
        fullWidth
        scroll='paper'
        onClose={() => setState({ ...state, show: false })}
    >
        <DialogTitle>Detailed view</DialogTitle>
        <LogsInRange
            applicationId={state.applicationId}
            environment={state.environment}
            filters={{
                dateRange: { start: state.from, stop: state.to },
                searchTerms: [],
                microservice: [{ id: state.microserviceId, name: state.microservice }],
            }}
            from={state.from}
            to={state.to}
            firstFetchLimit={10}
            moreFetchLimit={10}
            render={(logs, loadMoreLogs) => (
                <>
                    <DialogContent>
                        <LogLines
                            logs={logs}
                            showTimestamp={showTimestamp}
                            sx={{
                                '& > div:first-of-type': {
                                    color: '#75e8db', // TODO: Where does this color come from?
                                },
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <ButtonText onClick={() => setState({ ...state, show: false })}>
                            Close
                        </ButtonText>
                        <ButtonText onClick={() => loadMoreLogs()}>Show more</ButtonText>
                    </DialogActions>
                </>
            )}
        />
    </Dialog>
);
