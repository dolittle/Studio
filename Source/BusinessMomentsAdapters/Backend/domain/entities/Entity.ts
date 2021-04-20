import { AggregateRoot } from '@dolittle/sdk.aggregates';



export class Entity extends AggregateRoot {
    defineFilter(code: string): void {
    }

    defineTransform(code: string): void {
    }

    defineProjection(code: string): void {
    }
}
