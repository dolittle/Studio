// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { createContext, useContext, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { HttpResponseApplications2 } from '../api/api';

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
    setCurrentEnvironment: (environment: string) => void;
    setCurrentApplicationId: (applicationId: string) => void;
    currentEnvironment: string,
    currentApplicationId: string,
    clearGlobalState: () => void,
    isEnvironmentValidFromUri: (application: HttpResponseApplications2, currentEnvironment: string) => boolean,
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
    setError: (obj) => console.warn('setError function not set'),
    setNotification: (message, level) => {
        console.log(message, level);
    },
    clearNotification: () => console.warn('clearNotification function not set'),
    setCurrentEnvironment: (environment: string) => console.warn('setCurrentEnvironment function not set'),
    setCurrentApplicationId: (applicationId: string) => console.warn('setCurrentApplicationId function not set'),
    currentEnvironment: '',
    currentApplicationId: '',
    clearGlobalState: () => console.warn('clearGlobalState function not set'),
    isEnvironmentValidFromUri: (application: HttpResponseApplications2, currentEnvironment: string) => {
        console.warn('isEnvironmentValidFromUri function not set');
        return false;
    },
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

// eslint-disable-next-line react/prop-types
export const GlobalContextProvider: React.FunctionComponent = ({ children }) => {
    const location = useLocation();

    const initErrors = getFromLocalStorage('errors', []);
    const initCurrentApplicationId = getFromLocalStorage('currentApplicationId', '');
    const initCurrentEnvironment = getFromLocalStorage('currentEnvironment', '');

    const [errors, setErrors] = useState(initErrors as any[]);
    const [messages, setMessages] = useState([] as any[]);
    const [lastError, setLastError] = useState({} as any);
    const [currentApplicationId, _setCurrentApplicationId] = useState(initCurrentApplicationId);
    const [currentEnvironment, _setCurrentEnvironment] = useState(initCurrentEnvironment);
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
        saveToLocalStorage('errors', _errors);
    };


    const clearNotification = () => {
        const n = newNotification('', '');
        setMessages([]);
        setLastMessage(n);
    };

    //const getCurrentApplicationId = (): string => {
    //    const current = localStorage.getItem('currentApplicationId');
    //    return current ? current : '';
    //};

    const setCurrentApplicationId = (newApplicationId) => {
        saveToLocalStorage('currentApplicationId', newApplicationId);
        _setCurrentApplicationId(newApplicationId);
    };

    //const getCurrentEnvironment = (): string => {
    //    const current = localStorage.getItem('currentEnvironment');
    //    return current ? current : '';
    //};

    const setCurrentEnvironment = (newEnvironment) => {
        saveToLocalStorage('currentEnvironment', newEnvironment);
        _setCurrentEnvironment(newEnvironment);
    };

    const clearGlobalState = () => {
        _errors = [];
        _messages = [];
        setCurrentEnvironment('');
        setCurrentApplicationId('');
        setErrors(_errors);
        setMessages(_messages);
    };

    const isEnvironmentValidFromUri = (application: HttpResponseApplications2, currentEnvironment: string): boolean => {
        const { environment } = useParams() as any;
        let _environment = currentEnvironment;
        if (currentEnvironment !== environment) {
            _environment = environment;
        }

        const exists = application.environments.some((env) => {
            return env.name === _environment;
        });

        if (exists && currentEnvironment !== environment) {
            //window.setTimeout(() => {
            //    setCurrentEnvironment(_environment);
            //}, 100);

        }

        return exists;
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
            currentEnvironment,
            setCurrentEnvironment,
            currentApplicationId,
            setCurrentApplicationId,
            clearGlobalState,
            isEnvironmentValidFromUri,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
