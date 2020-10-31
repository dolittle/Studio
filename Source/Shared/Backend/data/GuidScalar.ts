import { Guid } from '@dolittle/rudiments';
import { GraphQLScalarType, ValueNode, StringValueNode } from 'graphql';

export const GuidScalar = new GraphQLScalarType({
    name: 'GuidScalar',
    description: 'Handles serialization and deserialization of a Guid',
    serialize(value: Guid): any {
        return value.toString();
    },
    parseValue(value: string): any {
        return Guid.parse(value);
    },
    parseLiteral(ast: ValueNode): any {
        if (ast.kind === 'StringValue') {
            return Guid.parse((ast as StringValueNode).value);
        }

        return null;
    }
});