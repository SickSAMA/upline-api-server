/* eslint-disable camelcase */
import { Field, InputType } from 'type-graphql';
import { Experience } from '../../entities/experience';

@InputType()
export class ExperienceInput implements Partial<Experience> {
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
