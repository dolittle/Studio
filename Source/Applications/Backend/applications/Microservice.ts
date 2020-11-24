import { Field, ObjectType } from 'type-graphql';
import { guid } from '@shared/backend/data';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { Guid } from '@dolittle/rudiments';


@ObjectType()
export class Microservice {
    @Field({ name: 'id' })
    @guid()
    _id?: Guid;

    @Field()
    @prop()
    microserviceId?: string;

    @Field()
    @prop()
    name!: string;
}

export const MicroserviceModel = getModelForClass(Microservice);