// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { createContext, useContext, useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { getCustomers } from '../apis/solutions/customer';

export type NotificationItem = {
    message: string;
    level: string;
};

type GlobalContextProviderProps = {
    children?: React.ReactNode;
};

export type GlobalContextType = {
    messages: any[];
    errors: any[];
    lastMessage: NotificationItem;
    lastError: any;
    hasOneCustomer: boolean;
    currentApplicationId: string;
    currentEnvironment: string;
    setError: (obj: any) => void;
    setNotification: (message: string, level: string) => void;
    clearNotification: () => void;
    setCurrentApplicationId: (applicationId: string) => void;
    setCurrentEnvironment: (environment: string) => void;
    clearGlobalState: () => void;
};

let _messages: any[] = [];
let _errors: any[] = [];

export const newNotification = (message: string, level: string): NotificationItem => {
    return { message, level } as NotificationItem;
};

export const GlobalContext = createContext<GlobalContextType>({
    messages: _messages,
    errors: _errors,
    lastMessage: newNotification('', ''),
    lastError: undefined,
    hasOneCustomer: false,
    currentApplicationId: '',
    currentEnvironment: '',
    setError: (obj) => console.warn('setError function not set'),
    setNotification: (message, level) => { console.log(message, level); },
    clearNotification: () => console.warn('clearNotification function not set'),
    setCurrentApplicationId: (applicationId: string) => console.warn('setCurrentApplicationId function not set'),
    setCurrentEnvironment: (environment: string) => console.warn('setCurrentEnvironment function not set'),
    clearGlobalState: () => console.warn('clearGlobalState function not set'),
});

// getFromLocalStorage a wrapper to protect if the data is not there or not parsable
const getFromLocalStorage = (key: string, defaultValue: any): any => {
    try {
        return localStorage.hasOwnProperty(key) ? JSON.parse(localStorage.getItem(key)!) : defaultValue;
    } catch (e) {
        return defaultValue;
    }
};

const saveToLocalStorage = (key: string, newValue: any): any => {
    localStorage.setItem(key, JSON.stringify(newValue));
};

const getAllCustomers = async () => {
    const customers = await getCustomers();
    return customers;
};

export const GlobalContextProvider = ({ children }: GlobalContextProviderProps) => {
    const location = useLocation();

    const initErrors = getFromLocalStorage('errors', []);
    const initCurrentApplicationId = getFromLocalStorage('currentApplicationId', '');
    const initCurrentEnvironment = getFromLocalStorage('currentEnvironment', '');

    const [messages, setMessages] = useState([] as any[]);
    const [errors, setErrors] = useState(initErrors as any[]);
    const [lastMessage, setLastMessage] = useState(newNotification('', ''));
    const [lastError, setLastError] = useState({} as any);
    const [hasOneCustomer, setHasOneCustomer] = useState(false);
    const [currentApplicationId, _setCurrentApplicationId] = useState(initCurrentApplicationId);
    const [currentEnvironment, _setCurrentEnvironment] = useState(initCurrentEnvironment);

    useEffect(() => {
        getAllCustomers().then(customers =>
            setHasOneCustomer(customers.length === 1)
        );
    }, []);

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
        saveToLocalStorage('errors', _errors);
    };

    const setCurrentApplicationId = (newApplicationId) => {
        saveToLocalStorage('currentApplicationId', newApplicationId);
        _setCurrentApplicationId(newApplicationId);
    };

    const setCurrentEnvironment = (newEnvironment) => {
        saveToLocalStorage('currentEnvironment', newEnvironment);
        _setCurrentEnvironment(newEnvironment);
    };

    const clearNotification = () => {
        const n = newNotification('', '');
        setMessages([]);
        setLastMessage(n);
    };

    const clearGlobalState = () => {
        _errors = [];
        _messages = [];
        setCurrentApplicationId('');
        setCurrentEnvironment('');
        setErrors(_errors);
        setMessages(_messages);
    };

    return (
        <GlobalContext.Provider value={{
            messages,
            errors,
            lastMessage,
            lastError,
            hasOneCustomer,
            currentApplicationId,
            currentEnvironment,
            setError,
            setNotification,
            clearNotification,
            setCurrentApplicationId,
            setCurrentEnvironment,
            clearGlobalState,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
