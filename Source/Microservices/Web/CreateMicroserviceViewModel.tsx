import { injectable } from 'tsyringe';
import { IMicroservices } from '@shared/platform';
import { IViewContext } from '@shared/mvvm';
import { CreateMicroserviceProps } from './CreateMicroservice';


@injectable()
export class CreateMicroserviceViewModel {
    microserviceName?: string = '';
    private _props?: CreateMicroserviceProps;

    constructor(readonly microservices: IMicroservices) { }

    activate({ props }: IViewContext<CreateMicroserviceViewModel>) {
        this._props = props;
    }

    async createMicroservice() {
        //Validation?
        if (this.microserviceName) {
            await this.microservices.create({ name: this.microserviceName });
            this._props?.onCreated();
        }
    }
}
