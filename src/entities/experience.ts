/* eslint-disable camelcase */
/**
 * This entity is only used for graphql and typescript. It is JSON stringified and
 * saved as jsonb in Postgres.
 */

import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Experience {
  @Field(() => String)
  entity: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  summary: string;

  @Field(() => String)
  start_date: string;

  @Field(() => String)
  end_date: string;

  @Field(() => String)
  details: string;
}
