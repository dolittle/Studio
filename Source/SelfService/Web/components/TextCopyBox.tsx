// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback } from 'react';

import { useSnackbar } from 'notistack';

import { Paper, Typography, SxProps } from '@mui/material';

import { Button, MaxWidthBlock, MaxWidthTextBlock } from '@dolittle/design-system';

export type TextCopyBoxProps = {
    /**
     * The list of instructions to display
     * This will be rendered as a list with default text styling wrapped in a <p>, and be made available for copying as a multi-line string
     * For more control, use the children and instructionsToCopy props.
     */
    instructions: React.ReactNode | React.ReactNode[];

    /**
     * The list of instructions to be copied to the clipboard
     * If not supplied, the instructions prop will be used instead
     */
    instructionsToCopy?: string[];

    /**
     * Pass in children if you want to have more control over the styling of the instructions.
     */
    children?: React.ReactNode;

    /**
     * Should content be wrapped in a {@link MaxWidthBlock}?
     */
    withMaxWidth?: boolean;

    /**
     * The filename the content should be downloadable as {@link MaxWidthBlock}?
     */
    downloadableFileName?: string;

    /**
     * Style overrides applied to the root Paper component
     */
    sx?: SxProps;
};

export const TextCopyBox = ({ instructions, instructionsToCopy, children, withMaxWidth, downloadableFileName, sx }: TextCopyBoxProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const handleTextCopy = useCallback(() => {
        const textToCopy = !!instructionsToCopy ? instructionsToCopy.join('\n\n') : Array.isArray(instructions) ? instructions.join('\n\n') : instructions!.toString();
        navigator.clipboard.writeText(textToCopy);
        enqueueSnackbar('Copied to clipboard');
    }, [instructions]);

    const handleTextDownload = useCallback(() => {
        const textToDownload = !!instructionsToCopy
            ? instructionsToCopy
            : Array.isArray(instructions)
                ? instructions
                : [instructions];
        const logsBlob = new Blob(textToDownload.map(t => t?.toString() || ''), { type: 'text/plain' });
        return URL.createObjectURL(logsBlob);
    }, [instructions]);

    return (
        <>{withMaxWidth
            ? <MaxWidthTextBlock>
                <TextCopyContent
                    instructions={instructions}
                    sx={sx}
                    handleTextCopy={handleTextCopy}
                    handleTextDownload={handleTextDownload}
                    downloadableFileName={downloadableFileName}
                >
                    {children}
                </TextCopyContent>
            </MaxWidthTextBlock>
            : <TextCopyContent
                instructions={instructions}
                sx={sx}
                handleTextCopy={handleTextCopy}
                handleTextDownload={handleTextDownload}
                downloadableFileName={downloadableFileName}
            >
                {children}
            </TextCopyContent>
        }
        </>
    );
};

type TextCopyContentProps = TextCopyBoxProps & {
    handleTextCopy: () => void;
    handleTextDownload: () => string;
};

const TextCopyContent = ({ instructions, children, sx, downloadableFileName, handleTextCopy, handleTextDownload }: TextCopyContentProps) => <>
    <Paper elevation={0} sx={{ 'mt': 3, 'p': 2, '& p': { mb: 3 }, ...sx }}>
        <InstructionContent instructions={instructions}>{children}</InstructionContent>
        <Button
            label='Copy content'
            startWithIcon='CopyAllRounded'
            onClick={handleTextCopy}
        />
        <Button
            label={`Download ${downloadableFileName}`}
            startWithIcon='DownloadRounded'
            href={handleTextDownload()}
            overrides={{ download: downloadableFileName }}
        />
    </Paper>

</>;

type RenderContentsProps = Pick<TextCopyBoxProps, 'instructions' | 'children'>;

const InstructionContent = ({ instructions, children }: RenderContentsProps) => <>
    {children
        ? <>{children}</>
        : <>{Array.isArray(instructions)
            ? instructions.map((instruction, index) => <Typography key={index}>{instruction}</Typography>)
            : <Typography>{instructions}</Typography>
        }</>
    }</>;
