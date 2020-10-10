import { IViewContext } from './IViewContext';

export class ViewModelLifecycle {
    private _activateInvoked: boolean = false;

    constructor(private readonly _viewModel: any) {
    }

    activate(viewContext: IViewContext<any>) {
        if (this._activateInvoked) return;
        if (typeof this._viewModel.activate === 'function') {
            this._viewModel.activate(viewContext);
        }
        this._activateInvoked = true;
    }
}
