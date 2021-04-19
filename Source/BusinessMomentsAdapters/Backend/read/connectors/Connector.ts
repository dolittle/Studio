import { ObjectType, Field } from 'type-graphql';
import { Guid } from '@dolittle/rudiments';


@ObjectType()
export class Connector {
    @Field()
    _id!: Guid;
}
