/* eslint-disable camelcase */
/**
 * This entity is only used for graphql and typescript. It is JSON stringified and
 * saved as jsonb in Postgres.
 */

import { Field, Float, ObjectType } from 'type-graphql';

@ObjectType()
export class ResumeStyle {
  @Field(() => String)
  font_family: string;

  @Field(() => Float)
  font_size: number;

  @Field(() => Float)
  line_height: number;

  @Field(() => String)
  margin: string;

  @Field(() => String)
  header_alignment: string;
}
