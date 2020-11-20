import { injectable } from 'tsyringe';
import { IApplications } from '@shared/platform';
import { IViewContext } from '@shared/mvvm';
import { CreateMicroserviceProps } from './CreateMicroservice';


@injectable()
export class CreateMicroserviceViewModel {
    microserviceName?: string = '';
    private _props?: CreateMicroserviceProps;

    constructor(readonly applications: IApplications) { }

    activate({ props }: IViewContext<CreateMicroserviceViewModel>) {
        this._props = props;
    }

    async createMicroservice() {
        //Validation?
        if (this.microserviceName) {
            await this.applications.create({ name: this.microserviceName });
            this._props?.onCreated();
        }
    }
}
