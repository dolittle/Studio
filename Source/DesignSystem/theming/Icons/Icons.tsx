// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import {
    AddBoxRounded,
    AddCircle,
    AppsRounded,
    ArrowBack,
    BackupRounded,
    CancelRounded,
    CheckRounded,
    CheckCircleRounded,
    ChevronRight,
    CloseRounded,
    CloudRounded,
    DeleteRounded,
    DescriptionRounded,
    DownloadRounded,
    DnsRounded,
    EditRounded,
    ErrorRounded,
    Explore,
    ExpandCircleDownRounded,
    ExpandMore,
    ExpandLess,
    FindInPageRounded,
    HexagonRounded,
    InsightsRounded,
    KeyboardDoubleArrowLeft,
    KeyboardDoubleArrowRight,
    LogoutRounded,
    MenuRounded,
    MoreVertRounded,
    PolylineRounded,
    QuestionMark,
    RefreshRounded,
    RestartAltRounded,
    RocketLaunch,
    Search,
    SettingsRounded,
    SupervisedUserCircleRounded,
    TextSnippetRounded,
    UploadRounded,
    WarningRounded,
} from '@mui/icons-material';

import { Bridge, Dolittle, ContainerRegistry } from './CustomIcons';

// TODO: This is a temporary solution to get the icons type working.
export interface SvgIconsDefinition {
    icon:
    'AddBoxRounded' |
    'AddCircle' |
    'AppsRounded' |
    'ArrowBack' |
    'BackupRounded' |
    'Bridge' |
    'CancelRounded' |
    'ContainerRegistry' |
    'CheckCircleRounded' |
    'CheckRounded' |
    'ChevronRight' |
    'CloseRounded' |
    'CloudRounded' |
    'DeleteRounded' |
    'DescriptionRounded' |
    'Dolittle' |
    'DownloadRounded' |
    'DnsRounded' |
    'EditRounded' |
    'ErrorRounded' |
    'Explore' |
    'ExpandCircleDownRounded' |
    'ExpandMore' |
    'ExpandLess' |
    'FindInPageRounded' |
    'HexagonRounded' |
    'InsightsRounded' |
    'KeyboardDoubleArrowLeft' |
    'KeyboardDoubleArrowRight' |
    'LogoutRounded' |
    'MenuRounded' |
    'MoreVertRounded' |
    'PolylineRounded' |
    'QuestionMark' |
    'RefreshRounded' |
    'RestartAltRounded' |
    'RocketLaunch' |
    'Search' |
    'SettingsRounded' |
    'SupervisedUserCircleRounded' |
    'TextSnippetRounded' |
    'UploadRounded' |
    'WarningRounded'
};

export const SvgIcons = {
    AddBoxRounded: <AddBoxRounded />,
    AddCircle: <AddCircle />,
    AppsRounded: <AppsRounded />,
    ArrowBack: <ArrowBack />,
    BackupRounded: <BackupRounded />,
    Bridge: <Bridge />,
    CancelRounded: <CancelRounded />,
    ContainerRegistry: <ContainerRegistry />,
    CheckCircleRounded: <CheckCircleRounded />,
    CheckRounded: <CheckRounded />,
    ChevronRight: <ChevronRight />,
    CloseRounded: <CloseRounded />,
    CloudRounded: <CloudRounded />,
    DeleteRounded: <DeleteRounded />,
    DescriptionRounded: <DescriptionRounded />,
    Dolittle: <Dolittle />,
    DownloadRounded: <DownloadRounded />,
    DnsRounded: <DnsRounded />,
    EditRounded: <EditRounded />,
    ErrorRounded: <ErrorRounded />,
    Explore: <Explore />,
    ExpandCircleDownRounded: <ExpandCircleDownRounded />,
    ExpandMore: <ExpandMore />,
    ExpandLess: <ExpandLess />,
    FindInPageRounded: <FindInPageRounded />,
    HexagonRounded: <HexagonRounded />,
    InsightsRounded: <InsightsRounded />,
    KeyboardDoubleArrowLeft: <KeyboardDoubleArrowLeft />,
    KeyboardDoubleArrowRight: <KeyboardDoubleArrowRight />,
    LogoutRounded: <LogoutRounded />,
    MenuRounded: <MenuRounded />,
    MoreVertRounded: <MoreVertRounded />,
    PolylineRounded: <PolylineRounded />,
    QuestionMark: <QuestionMark />,
    RefreshRounded: <RefreshRounded />,
    RestartAltRounded: <RestartAltRounded />,
    RocketLaunch: <RocketLaunch />,
    Search: <Search />,
    SettingsRounded: <SettingsRounded />,
    SupervisedUserCircleRounded: <SupervisedUserCircleRounded />,
    TextSnippetRounded: <TextSnippetRounded />,
    UploadRounded: <UploadRounded />,
    WarningRounded: <WarningRounded />,
};

export const availableIcons = Object.keys(SvgIcons);
