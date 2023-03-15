// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useRef, useState } from 'react';

import { Box } from '@mui/material';

import { Button } from '@dolittle/design-system';

export const FileUploadBox = () => {
    const [dragActive, setDragActive] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    //React.DragEvent<HTMLLabelElement>
    const handleDrag = (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        if (event.type === 'dragenter' || event.type === 'dragover') {
            setDragActive(true);
        } else if (event.type === 'dragleave') {
            setDragActive(false);
        }
    };

    //: React.DragEvent<HTMLLabelElement>
    const handleDrop = (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        setDragActive(false);

        const files = event.dataTransfer.files;

        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            console.log(files);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const files = event.currentTarget.files;

        if (files) {
            console.log(files);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <>
            <form id='form-file-upload' onDragEnter={handleDrag} onSubmit={handleSubmit} style={{ position: 'relative' }}>
                <input ref={inputRef} type='file' id='input-file-upload' multiple={true} onChange={handleChange} hidden />

                <label id='label-file-upload' htmlFor='input-file-upload'>
                    <p>Drag and drop your file here</p>
                </label>
                {dragActive &&
                    <Box
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            //zIndex: 1000,
                            //display: 'flex',
                            //justifyContent: 'center',
                            //alignItems: 'center',
                            //color: 'white',
                            //fontSize: '1.5rem',
                            //cursor: 'pointer',
                            // '&:hover': {
                            //     backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            // },
                        }}
                    >
                    </Box>
                }
            </form>
            <Button label='Upload file' type='submit' onClick={() => inputRef.current?.click()} />
        </>
    );
};
