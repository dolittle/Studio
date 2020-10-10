import { autoinject } from '../../../Shared/MVVM';

export class SomeKindaDependency {
}

@autoinject
export class Index {
    someState: number;
    featureEnabled: boolean = false;

    constructor(private _theDependency: SomeKindaDependency) {
        this.someState = 44;

        setInterval(() => {
            this.someState = this.someState + 1;
        }, 1000);
    }
}
