// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, { useState } from 'react';
import { Grid } from '@mui/material';

export type OnAdd = (event) => void;
export type OnCancel = () => void;

export interface SelectFileConfirmationModalProps {
    open: boolean,
    fileName: string,
    onCancel: OnCancel,
    onAdd: OnAdd,
    disableAdd: boolean,
    fileSize?: number,
}


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: 200
};



export function SelectFileConfirmationModal(props: SelectFileConfirmationModalProps) {
    const [open, setOpen] = useState(props.open);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    return (
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid container spacing={2} direction="row">
                    <Grid item xs={12}>
                        <Typography id="" variant="body2" component="p">{props.fileName}</Typography>
                        <Typography id="" variant="body2" component="p">{props.fileSize} bytes</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={props.onCancel}>cancel</Button>
                        <Button onClick={props.onAdd} disabled={props.disableAdd}>add</Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};
