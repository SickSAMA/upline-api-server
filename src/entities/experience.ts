/* eslint-disable camelcase */
/**
 * This entity is only used for graphql and typescript. It is JSON stringified and
 * saved as jsonb in Postgres.
 */

import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Experience {
  @Field(() => String, { nullable: true })
  entity: string;

  @Field(() => String, { nullable: true })
  city: string;

  @Field(() => String, { nullable: true })
  country: string;

  @Field(() => String, { nullable: true })
  summary: string;

  @Field(() => String, { nullable: true })
  start_date: string;

  @Field(() => String, { nullable: true })
  end_date: string;

  @Field(() => [String], { nullable: 'items' })
  details: string[];
}
