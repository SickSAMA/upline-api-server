/* eslint-disable camelcase */
import { Field, InputType } from 'type-graphql';
import { Experience } from '../../entities/experience';

@InputType()
export class ExperienceInput implements Partial<Experience> {
  @Field(() => String, { nullable: true })
  entity?: string;

  @Field(() => String, { nullable: true })
  city?: string;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => String, { nullable: true })
  summary?: string;

  @Field(() => String, { nullable: true })
  start_date?: string;

  @Field(() => String, { nullable: true })
  end_date?: string;

  @Field(() => [String], { nullable: 'items' })
  details: string[];
}
