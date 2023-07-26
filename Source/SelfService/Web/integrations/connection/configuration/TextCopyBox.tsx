// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback } from 'react';

import { useSnackbar } from 'notistack';

import { Paper, Typography, SxProps } from '@mui/material';

import { Button, MaxWidthBlock } from '@dolittle/design-system';

export type TextCopyBoxProps = {
    /**
     * The list of instructions to display
     * This will be rendered as a list with default text styling, and be made available for copying as a multi-line string
     * For more control, use the children prop.
     */
    instructions: string[];

    /**
     * Pass in children if you want to have more control over the styling of the instructions
     */
    children?: React.ReactNode;

    /**
     * Should content be wrapped in a {@link MaxWidthTextBlock}?
     */
    withMaxWidth?: boolean;

    /**
     * Style overrides applied to the root Paper component
     */
    sx?: SxProps;
};

export const TextCopyBox = ({ instructions, children, withMaxWidth, sx }: TextCopyBoxProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const handleTextCopy = useCallback(() => {
        const textToCopy = instructions.join('\n\n');
        navigator.clipboard.writeText(textToCopy);
        enqueueSnackbar('Copied to clipboard');
    }, [instructions]);

    return (
        <Paper elevation={0} sx={{ 'mt': 3, 'p': 2, '& p': { mb: 3 }, ...sx }}>
            {withMaxWidth
                ? <MaxWidthBlock>
                    <InstructionContent instructions={instructions}>{children}</InstructionContent>
                </MaxWidthBlock>
                : <InstructionContent instructions={instructions}>{children}</InstructionContent>
            }

            <Button
                label='Copy content'
                startWithIcon='CopyAllRounded'
                onClick={handleTextCopy}
            />
        </Paper>
    );
};

type RenderContentsProps = Pick<TextCopyBoxProps, 'instructions' | 'children'>;

const InstructionContent = ({ instructions, children }: RenderContentsProps) => <>
    {children
        ? <>{children}</>
        : <>{instructions.map((instruction, index) => <Typography key={index}>{instruction}</Typography>)}</>
    }</>;
