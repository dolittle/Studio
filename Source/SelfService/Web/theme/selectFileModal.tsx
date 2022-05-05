// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, { useState } from 'react';

export type OnSubmit = () => boolean //returns true if user submitted a file.
export type OnFileSelectorSubmit = (event: SubmitEvent) => any
export interface SelectFileModalModalProps {
    open: boolean,
    onFileSelectorSubmit: OnFileSelectorSubmit,
    body?: string
    header?: string
    maxUploadSize?: number // bytes
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
};



export function SelectFileModal (props: SelectFileModalModalProps){
    const [open, setOpen] = useState(props.open);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fileSelector = document?.getElementById('config-file-selector-form');

    const attachFormSubmitEvent = () => {
        fileSelector?.addEventListener('submit', props.onFileSelectorSubmit);
    }

    const sizeValidation=(event)=> {
        const fileList = event.target.files;
        console.log("FILE SIZE",fileList[0].size)
        if (fileList[0].size > (props?.maxUploadSize ?? 30000000)) {
            alert(`file cannot be larger than ${props.maxUploadSize} bytes. Please select another file`);
        }
    }


    attachFormSubmitEvent();

    console.log("visility", props.open)


    fileSelector?.addEventListener('change', sizeValidation);



    return (
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">{props.header}</Typography>
                <Typography id="modal-modal-title" variant="h6" component="h2">{props.body}</Typography>
                <form method="put" id="config-file-selector-form">
                    <input type="file" id="file-selector" name='file' />
                    <input type="submit" value="Submit" />
                </form>
            </Box>
        </Modal>
    );
};
