// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Stack } from '@fluentui/react/lib/Stack';
import { Label } from '@fluentui/react/lib/Label';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Spinner } from '@fluentui/react/lib/Spinner';
import { DropDownMenu } from '../../theme/dropDownMenu';
import { TextField as ThemedTextField } from '../../theme/textField';
import { Switch as ThemedSwitch } from '../../theme/switch';

import { Guid } from '@dolittle/rudiments';
import { saveSimpleMicroservice } from '../../stores/microservice';
import { MicroserviceSimple } from '../../api/index';
import { getLatestRuntimeInfo, getRuntimes } from '../../api/api';

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
    const [isLoading, setIsLoading] = React.useState(false);

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
        ms.extra.isPublic = isPublic;
        ms.extra.ingress.path = ingressPath;

        setIsLoading(true);
        try {
            await saveSimpleMicroservice(ms);
            setIsLoading(false);
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

    const handleIsPublicChanged = (ev: React.ChangeEvent<{}>, checked?: boolean) => {
        setIsPublic(checked ?? false);
    };

    return (
        <>
            <Stack tokens={stackTokens}>
                <h2>Microservice Specific</h2>

                <ThemedTextField
                    id='uuid'
                    label='UUID'
                    value={ms.dolittle.microserviceId}
                    readOnly
                />


                <ThemedTextField
                    id='name'
                    label='Name'
                    value={msName}
                    onChange={onChangeHandler(setMsName)}
                />

                <ThemedTextField
                    id='environment'
                    label='Environment'
                    placeholder="Dev"
                    value={ms.environment}
                    readOnly
                />

                <ThemedTextField
                    id='headImage'
                    label='Head Image'
                    value={headImage}
                    onChange={onChangeHandler(setHeadImage)}
                />

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

                <DropDownMenu label='Runtime Image' items={runtimeImageSelections} value={runtimeImage} onChange={handleRuntimeChange}></DropDownMenu>

                <h2>Ingress</h2>
                <ThemedSwitch label='Public path' checked={isPublic} onChange={handleIsPublicChanged} />
                {isPublic &&
                    <>
                        <ThemedTextField
                            id="ingressPath"
                            label='Path'
                            placeholder="/"
                            value={ingressPath}
                            onChange={onChangeHandler(setIngressPath)}
                        />

                        <ThemedTextField
                            id="pathType"
                            label='PathType'
                            placeholder="Prefix"
                            value={ms.extra.ingress.pathType}
                            readOnly
                        />
                    </>
                }
            </Stack>

            <Stack horizontal horizontalAlign="end" tokens={stackTokens}>
                {isLoading
                    ? <PrimaryButton text="Creating" disabled><Spinner /></PrimaryButton>
                    : <PrimaryButton text="Create" onClick={() => _onSave(ms)} />
                }
            </Stack>
        </>
    );
};
