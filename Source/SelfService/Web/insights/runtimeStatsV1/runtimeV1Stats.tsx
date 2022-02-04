// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { Pivot, PivotItem, IDropdownOption } from '@fluentui/react';
import { Dropdown } from '@fluentui/react/lib/Dropdown';

import { HttpResponseApplication } from '../../api/application';
import { getRuntimeV1 } from '../../api/insights';
import { DumpJson } from '../dumpJson';
import { FaillingPartitionsSummary } from './failingPartitionsSummary';
import { StateSummary } from './stateSummary';

type Props = {
    application: HttpResponseApplication
    environment: string
};

export const RuntimeV1Stats: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const application = _props.application;
    const applicationId = application.id;
    const environment = _props.environment;

    const [loaded, setLoaded] = useState(false);
    const [errorLoading, setErrorLoading] = useState(false);

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
        }).catch(e => {
            console.error(e);
            setErrorLoading(true);
        });
    }, []);

    if (errorLoading) {
        return (
            <>
                <h1>We failed you.</h1>
                <h2>We might need to connect the platform-api to your application</h2>
            </>
        );
    }

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


    let filtered = data;
    if (filterBy !== '*') {
        filtered = {
            eventLogCounts: {},
            latestEvents: {},
            latestEventsPerEventType: {},
            runtimeStates: {}
        };

        // Filter the data
        Object.keys(filtered).map(_key => {
            const temp = data[_key];

            filtered[_key] = Object.keys(temp)
                .filter((key) => key === filterBy)
                .reduce((obj, key) => {
                    obj[key] = temp[key];
                    return obj;
                }, {});
        });
    }

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
                    <DumpJson data={filtered.eventLogCounts} />
                </PivotItem>

                <PivotItem
                    itemKey="latestEvents"
                    headerText="Latest Events"
                    onClick={() => {
                        setSelectedKey('latestEvents');
                    }}
                >
                    <DumpJson data={filtered.latestEvents} />
                </PivotItem>

                <PivotItem
                    itemKey="latestEventsPerEventType"
                    headerText="Latest Events Per Event Type"
                    onClick={() => {
                        setSelectedKey('latestEventsPerEventType');
                    }}
                >
                    <DumpJson data={filtered.latestEventsPerEventType} />
                </PivotItem>

                <PivotItem
                    itemKey="runtimeStates"
                    headerText="Runtime States"
                    onClick={() => {
                        setSelectedKey('runtimeStates');
                    }}
                >
                    <FaillingPartitionsSummary data={filtered.runtimeStates} />
                    <StateSummary key={filterBy} eventLogCounts={filtered.eventLogCounts} runtimeStates={filtered.runtimeStates} />
                </PivotItem>
            </Pivot>

        </>
    );
};
