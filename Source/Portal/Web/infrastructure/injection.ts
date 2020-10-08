
export type Injectable = Function & { inject?: any[] | (() => any[]) };

function isInjectable(target: any): target is Injectable {
    return !!target;
}

export function autoinject<T>(target?: T): T extends Injectable ? void : (target: Injectable) => void {
    const deco = (target: Injectable): void => {
        const parameters = Reflect.getOwnMetadata('design:paramtypes', target) || [];
        (target as any).__inject = parameters.slice();
    };

    if (isInjectable(target)) {
        return deco(target) as T extends Injectable ? void : (target: Injectable) => void;
    }

    return deco as T extends Injectable ? void : (target: Injectable) => void;
}
