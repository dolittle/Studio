// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { createContext, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

export type NotificationItem = {
    message: string
    level: string
};


export type GlobalContextType = {
    messages: any[],
    lastMessage: NotificationItem,
    lastError: any,
    errors: any[],
    setNotification: (message: string, level: string) => void;
    setError: (obj: any) => void;
    clearNotification: () => void;
};

const _messages: any[] = [];
const _errors: any[] = [];


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
    messages: _messages,
    errors: _errors,
    lastMessage: newNotification('', ''),
    lastError: undefined,
    setError: (obj) => console.warn('setError function not set'),
    setNotification: (message, level) => {
        console.log(message, level);
    },
    clearNotification: () => console.warn('clearNotification function not set'),
});



// eslint-disable-next-line react/prop-types
export const GlobalContextProvider: React.FunctionComponent = ({ children }) => {
    const location = useLocation();
    const initErrors = localStorage.getItem('errors') ? JSON.parse(localStorage.getItem('errors')!) : [];

    const [errors, setErrors] = useState(initErrors as any[]);
    const [messages, setMessages] = useState([] as any[]);
    const [lastError, setLastError] = useState({} as any);
    const [lastMessage, setLastMessage] = useState(newNotification('', ''));
    const setNotification = (message: string, level: string) => {
        const n = newNotification(message, level);
        _messages.unshift(n);
        setMessages(_messages);
        setLastMessage(n);
    };

    const setError = (err: any) => {
        const record = {
            when: new Date().toUTCString(),
            location,
            data: err,
        };
        _errors.unshift(record);
        setErrors(_errors);
        setLastError(record);
        localStorage.setItem('errors', JSON.stringify(_errors));
    };


    const clearNotification = () => {
        const n = newNotification('', '');
        setMessages([]);
        setLastMessage(n);
    };

    return (
        <GlobalContext.Provider value={{
            lastMessage,
            lastError,
            messages,
            errors,
            setError,
            setNotification,
            clearNotification,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useTheme = () => useContext(GlobalContext);
