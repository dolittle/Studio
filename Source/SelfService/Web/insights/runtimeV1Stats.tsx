// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { HttpResponseApplications2 } from '../api/api';
import { Pivot, PivotItem, IDropdownOption } from '@fluentui/react';

import { Dropdown } from '@fluentui/react/lib/Dropdown';


import { getRuntimeV1 } from '../api/insights';
import { DumpJson } from './DumpJson';


type Props = {
    application: HttpResponseApplications2
};

export const RuntimeV1Stats: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const application = _props.application;
    const { environment, applicationId } = useParams() as any;
    const [loaded, setLoaded] = useState(false);

    const [selectedKey, setSelectedKey] = useState('runtimeStates');

    // TODO turn this into a struct
    const [data, setData] = useState({
        applicationId: '',
        environment: '',
        eventLogCounts: {},
        latestEvents: {},
        latestEventsPerEventType: {},
        runtimeStates: {}
    } as any);
    const [filterBy, setFilterBy] = useState('*');

    useEffect(() => {
        getRuntimeV1(applicationId, environment).then(data => {
            setData(data);
            setLoaded(true);
            return;
        });

    }, []);

    if (!loaded) {
        return (
            <>
                <h1>Stand by, we are getting a fresh copy</h1>
            </>
        );
    }

    const items = Object.keys(data.eventLogCounts).map(key => {
        return {
            key,
            text: key,
        } as IDropdownOption;
    });
    items.unshift({ key: '*', text: 'All' } as IDropdownOption);


    const onChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
        const _filterBy = option!.key as string;
        setFilterBy(_filterBy);
    };

    return (
        <>

            <Dropdown placeholder="Select"
                options={items}
                selectedKey={filterBy}
                onChange={onChange}
            />

            <Pivot selectedKey={selectedKey}
                onLinkClick={(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) => {
                    const key = item?.props.itemKey as string;
                    if (selectedKey !== key) {
                        setSelectedKey(key);
                    }
                }}
            >

                <PivotItem
                    itemKey="eventLogCounts"
                    headerText="Event Log Counts"
                    onClick={() => {
                        setSelectedKey('eventLogCounts');
                    }}
                >
                    <DumpJson data={data.eventLogCounts} filterBy={filterBy} />
                </PivotItem>

                <PivotItem
                    itemKey="latestEvents"
                    headerText="Latest Events"
                    onClick={() => {
                        setSelectedKey('latestEvents');
                    }}
                >
                    <DumpJson data={data.latestEvents} filterBy={filterBy} />
                </PivotItem>

                <PivotItem
                    itemKey="latestEventsPerEventType"
                    headerText="Latest Events Per Event Type"
                    onClick={() => {
                        setSelectedKey('latestEventsPerEventType');
                    }}
                >
                    <DumpJson data={data.latestEventsPerEventType} filterBy={filterBy} />
                </PivotItem>

                <PivotItem
                    itemKey="runtimeStates"
                    headerText="Runtime States"
                    onClick={() => {
                        setSelectedKey('runtimeStates');
                    }}
                >
                    <DumpJson data={data.runtimeStates} filterBy={filterBy} />
                </PivotItem>
            </Pivot>
        </>
    );
};
