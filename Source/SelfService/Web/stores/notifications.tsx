// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { createContext, useContext, useState } from 'react';


export type NotificationItem = {
    message: string
    level: string
};

export enum Theme {
    Dark = 'Dark',
    Light = 'Light',
};

export type GlobalContextType = {
    theme: Theme;
    setTheme: (Theme: Theme) => void;
    messages: any[],
    lastMessage: NotificationItem,
    setNotification: (message: string, level: string) => void;
    clearNotification: () => void;
};

const _messages: any[] = [];


export const getCurrentApplicationId = (): string => {
    const current = localStorage.getItem('currentApplicationId');
    return current ? current : '';
};

export const setCurrentApplicationId = (newApplicationId) => {
    localStorage.setItem('currentApplicationId', newApplicationId);
};

export const getCurrentEnvironment = (): string => {
    const current = localStorage.getItem('currentEnvironment');
    return current ? current : '';
};

export const setCurrentEnvironment = (newEnvironment) => {
    localStorage.setItem('currentEnvironment', newEnvironment);
};


export const newNotification = (message: string, level: string): NotificationItem => {
    return { message, level } as NotificationItem;
};

export const GlobalContext = createContext<GlobalContextType>({
    theme: Theme.Dark,
    setTheme: theme => console.warn('no theme provider'),
    messages: _messages,
    lastMessage: newNotification('', ''),
    setNotification: (message, level) => {
        console.log(message, level);
    },
    clearNotification: () => console.warn('clearNotification function not set'),
});



// eslint-disable-next-line react/prop-types
export const GlobalContextProvider: React.FunctionComponent = ({ children }) => {
    const [theme, setTheme] = useState(Theme.Light);
    const [messages, setMessages] = useState([] as any[]);
    const [lastMessage, setLastMessage] = useState(newNotification('', ''));
    const setNotification = (message: string, level: string) => {
        const n = newNotification(message, level);
        _messages.unshift(n);
        setMessages(_messages);
        setLastMessage(n);
    };

    const clearNotification = () => {
        const n = newNotification('', '');
        setMessages([]);
        setLastMessage(n);
    };

    return (
        <GlobalContext.Provider value={{ theme, setTheme, lastMessage, messages, setNotification, clearNotification }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useTheme = () => useContext(GlobalContext);
