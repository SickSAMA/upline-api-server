/**
 * This entity is only used for graphql and typescript. It is JSON stringified and
 * saved as jsonb in Postgres.
 */

import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Skill {
  @Field(() => String)
  key: string;

  @Field(() => String)
  value: string;
}
