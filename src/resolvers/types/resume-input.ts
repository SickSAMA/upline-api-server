/* eslint-disable camelcase */
import { Field, InputType, ID } from 'type-graphql';
import { Resume } from '../../entities/resume';
import { ExperienceInput } from './experience-input';
import { SkillInput } from './skill-input';

@InputType()
export class ResumeInput implements Partial<Resume> {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  owner?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  english_name?: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  address?: string;

  @Field(() => [ExperienceInput], { nullable: 'items' })
  education: ExperienceInput[];

  @Field(() => [ExperienceInput], { nullable: 'items' })
  professional_experience: ExperienceInput[];

  @Field(() => [ExperienceInput], { nullable: 'items' })
  leadership_experience: ExperienceInput[];

  @Field(() => [SkillInput], { nullable: 'items' })
  others: SkillInput[];
}
