// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useRef } from 'react';

import { componentStories, Button, FileUploadBox } from '@dolittle/design-system';

import { FileUploadFormRef } from './FileUploadBox';

const { metadata, createStory } = componentStories(FileUploadBox, {
    decorator: (Story) => {
        const fileUploadRef = useRef<FileUploadFormRef>(null);

        return (
            <>
                {Story()}
                <Button
                    label='Upload file'
                    type='submit'
                    //startWithIcon={<UploadRounded />}
                    onClick={() => fileUploadRef.current?.showPrompt()}
                />
            </>
        );
    }
});

export default metadata;

export const Default = createStory();
