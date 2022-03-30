// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Stack } from '@fluentui/react/lib/Stack';
import { Label } from '@fluentui/react/lib/Label';
import { TextField } from '@fluentui/react/lib/TextField';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { Guid } from '@dolittle/rudiments';

import { saveSimpleMicroservice } from '../../stores/microservice';
import { MicroserviceSimple } from '../../api/index';
import { getLatestRuntimeInfo, getRuntimes } from '../../api/api';
import { DropDownMenu } from '../../theme/dropDownMenu';
import { TextField as ThemedTextField } from '../../theme/textField';

import { HttpResponseApplication } from '../../api/application';

const stackTokens = { childrenGap: 15 };

type Props = {
    application: HttpResponseApplication
    environment: string
};

export const Create: React.FunctionComponent<Props> = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const _props = props!;
    const application = _props.application;
    const environment = _props.environment;

    const microserviceId = Guid.create().toString();

    const latestRuntimeInfo = getLatestRuntimeInfo();

    const ms = {
        dolittle: {
            applicationId: application.id,
            customerId: application.customerId,
            microserviceId,
        },
        name: 'Order',
        kind: 'simple',
        environment: _props.environment,
        extra: {
            // nginxdemos/hello:latest
            headImage: 'nginxdemos/hello:latest', //'dolittle/spinner:0.0.0', // Doesnt work
            headPort: 80,
            runtimeImage: latestRuntimeInfo.image,
            isPublic: false,
            ingress: {
                path: '/',
                pathType: 'Prefix',
            }
        }
    } as MicroserviceSimple;

    const [msName, setMsName] = React.useState(ms.name);
    const [headImage, setHeadImage] = React.useState(ms.extra.headImage);
    const [headPort, setHeadPort] = React.useState(ms.extra.headPort);
    const [runtimeImage, setRuntimeImage] = React.useState(ms.extra.runtimeImage);
    const [isPublic, setIsPublic] = React.useState<boolean>(ms.extra.isPublic);
    const [ingressPath, setIngressPath] = React.useState(ms.extra.ingress.path);

    const onChangeHandler = (setter: React.Dispatch<React.SetStateAction<string>>): ((event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void) => {
        return (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
            {
                setter(newValue!);
            };
        };
    };

    const _onSave = async (ms: MicroserviceSimple): Promise<void> => {
        if (isNaN(headPort)) {
            enqueueSnackbar('HeadPort is not a valid port', { variant: 'error' });
            return;
        }

        ms.name = msName;
        ms.extra.headImage = headImage;
        ms.extra.headPort = headPort;
        ms.extra.runtimeImage = runtimeImage;
        ms.extra.ingress.path = ingressPath;

        try {
            await saveSimpleMicroservice(ms);
            const href = `/microservices/application/${application.id}/${environment}/overview`;
            history.push(href);
        } catch (e) {
            enqueueSnackbar(e.message, { variant: 'error' });
        }
    };

    const runtimeImageSelections = [
        ...getRuntimes().map(runtimeInfo => ({ value: runtimeInfo.image, displayValue: runtimeInfo.image })),
        {
            value: 'none',
            displayValue: 'None'
        }
    ];

    const handleRuntimeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const _runtimeImage = event.target.value as string;
        setRuntimeImage(_runtimeImage);
    };

    const handleIsPublicToggleChanged = (ev: React.MouseEvent<HTMLElement>, checked?: boolean) => {
        setIsPublic(checked ?? false);
    };

    return (
        <>
            <Stack tokens={stackTokens}>
                <h2>Microservice Specific</h2>
                <Label>UUID</Label>
                <TextField defaultValue={ms.dolittle.microserviceId} readOnly />

                <Label>Name</Label>
                <TextField defaultValue={msName} onChange={onChangeHandler(setMsName)} />

                <Label>Environment</Label>
                <TextField placeholder="Dev" defaultValue={ms.environment} readOnly />

                <Label>Head Image</Label>
                <TextField defaultValue={headImage} onChange={onChangeHandler(setHeadImage)} />

                <ThemedTextField
                    required
                    id='headPort'
                    label='Head Port'
                    type='number'
                    value={headPort.toString()}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const newHeadPort = parseInt(event.target.value!, 10);
                        setHeadPort(newHeadPort);
                    }}
                />

                <Label>Runtime Image</Label>
                <DropDownMenu items={runtimeImageSelections} value={runtimeImage} onChange={handleRuntimeChange}></DropDownMenu>

                <h2>Ingress</h2>
                <Toggle label='With public path?' onText='Public' offText='Private' onChange={handleIsPublicToggleChanged} checked={isPublic} />
                {isPublic &&
                    <>
                        <Label>Path</Label>
                        <TextField placeholder="/" defaultValue={ingressPath} onChange={onChangeHandler(setIngressPath)} />

                        <Label>PathType</Label>
                        <TextField placeholder="Prefix" defaultValue={ms.extra.ingress.pathType} readOnly />
                    </>
                }
            </Stack>

            <Stack horizontal horizontalAlign="end" tokens={stackTokens}>
                <PrimaryButton text="Create" onClick={() => _onSave(ms)} />
            </Stack>
        </>
    );
};
