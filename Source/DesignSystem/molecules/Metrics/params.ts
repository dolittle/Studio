// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useCallback, useMemo, useRef, RefObject } from 'react';
import { Vega, VisualizationSpec } from 'react-vega';
import { TopLevelSpec } from 'vega-lite';

/**
 * Defines a parameter that can be used in a Vega-Lite specification.
 */
export type Parameter = NonNullable<TopLevelSpec['params']>[0];
export type VariableParameter = Exclude<Parameter, { select: any }>;

/**
 * Defines a React Ref to a Vega component instance.
 */
export type VegaRef = RefObject<Vega>;

/**
 * Defines a setter-function that can be used to update parameters in a Vega-Lite instance.
 */
export type ParameterSetter = {
    (name: string, value: any): void;
    (params: VariableParameter[]): void;
};

/**
 * Creates an immutable Vega-Lite spec with additional parameters, a React reference to use to link to a Vega component, and a setter-function to update parameters and re-render the visualisation.
 * @param spec The Vega-Lite {@link TopLevelSpec} to be used.
 * @param params List of {@link Parameter} to be added to the specification.
 * @returns A constant {@link VisualizationSpec} and {@link VegaRef} to pass to a {@link Vega} component, and a setter-function to use to update the parameters.
 */
export const useSpecWithParams = (spec: TopLevelSpec, params: Parameter[]): [VisualizationSpec, VegaRef, ParameterSetter] => {
    const specWithParams = useMemo<TopLevelSpec>(() => ({
        ...spec,
        params: spec.params ? params.concat(spec.params) : params,
    }), []);

    const ref = useRef<Vega>(null);

    const setter = useCallback<ParameterSetter>((nameOrParams: string | VariableParameter[], maybeValue?: any) => {
        const view = ref.current?.vegaEmbed.current;

        if (view === undefined || view === null) {
            console.warn('Cannot set parameters before the Vega reference is set');
            return;
        }

        const paramsToSet = typeof nameOrParams === 'string'
            ? [{ name: nameOrParams, value: maybeValue }]
            : nameOrParams;

        view.modifyView(view => {
            for (const { name, value } of paramsToSet) {
                view.signal(name, value);
            }
            view.runAsync();
        });
    }, []);

    return [specWithParams, ref, setter];
};
