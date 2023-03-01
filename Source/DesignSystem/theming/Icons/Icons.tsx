// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import {
    AddCircle,
    ArrowBack,
    BackupRounded,
    CheckCircleRounded,
    ChevronRight,
    CloseRounded,
    DeleteRounded,
    DownloadRounded,
    ErrorRounded,
    Explore,
    ExpandCircleDownRounded,
    ExpandMore,
    ExpandLess,
    FindInPageRounded,
    KeyboardDoubleArrowLeft,
    LogoutRounded,
    PolylineRounded,
    QuestionMark,
    RefreshRounded,
    RestartAltRounded,
    RocketLaunch,
    Search,
    SettingsRounded,
    TextSnippetRounded,
    WarningRounded,
} from '@mui/icons-material';

// TODO: This is a temporary solution to get the icons type working.
export interface SvgIconsDefinition {
    icon:
    'AddCircle' |
    'ArrowBack' |
    'BackupRounded' |
    'CheckCircleRounded' |
    'ChevronRight' |
    'CloseRounded' |
    'DeleteRounded' |
    'DownloadRounded' |
    'ErrorRounded' |
    'Explore' |
    'ExpandCircleDownRounded' |
    'ExpandMore' |
    'ExpandLess' |
    'FindInPageRounded' |
    'KeyboardDoubleArrowLeft' |
    'LogoutRounded' |
    'PolylineRounded' |
    'QuestionMark' |
    'RefreshRounded' |
    'RestartAltRounded' |
    'RocketLaunch' |
    'Search' |
    'SettingsRounded' |
    'TextSnippetRounded' |
    'WarningRounded'
};

export const SvgIcons = {
    AddCircle: <AddCircle />,
    ArrowBack: <ArrowBack />,
    BackupRounded: <BackupRounded />,
    CheckCircleRounded: <CheckCircleRounded />,
    ChevronRight: <ChevronRight />,
    CloseRounded: <CloseRounded />,
    DeleteRounded: <DeleteRounded />,
    DownloadRounded: <DownloadRounded />,
    ErrorRounded: <ErrorRounded />,
    Explore: <Explore />,
    ExpandCircleDownRounded: <ExpandCircleDownRounded />,
    ExpandMore: <ExpandMore />,
    ExpandLess: <ExpandLess />,
    FindInPageRounded: <FindInPageRounded />,
    KeyboardDoubleArrowLeft: <KeyboardDoubleArrowLeft />,
    LogoutRounded: <LogoutRounded />,
    PolylineRounded: <PolylineRounded />,
    QuestionMark: <QuestionMark />,
    RefreshRounded: <RefreshRounded />,
    RestartAltRounded: <RestartAltRounded />,
    RocketLaunch: <RocketLaunch />,
    Search: <Search />,
    SettingsRounded: <SettingsRounded />,
    TextSnippetRounded: <TextSnippetRounded />,
    WarningRounded: <WarningRounded />,
};

export const availableIcons = Object.keys(SvgIcons);
