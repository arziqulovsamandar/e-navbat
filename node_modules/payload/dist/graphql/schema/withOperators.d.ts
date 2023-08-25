import { GraphQLInputObjectType } from 'graphql';
import { FieldAffectingData } from '../../fields/config/types';
export declare const withOperators: (field: FieldAffectingData, parentName: string) => GraphQLInputObjectType;
