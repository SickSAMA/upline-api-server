/* eslint-disable camelcase */
import { Field, InputType } from 'type-graphql';
import { Resume } from '../../entities/resume';
import { ExperienceInput } from './experience-input';
import { SkillInput } from './skill-input';

@InputType()
export class ResumeInput implements Partial<Resume> {
  @Field(() => String, { nullable: true })
  uuid?: string;

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

  // Does not allow optional because of the limitation of react-hook-form's useFieldArray
  @Field(() => [ExperienceInput], { nullable: 'items' })
  education: ExperienceInput[];

  @Field(() => [ExperienceInput], { nullable: 'items' })
  professional_experience: ExperienceInput[];

  @Field(() => [ExperienceInput], { nullable: 'items' })
  leadership_experience: ExperienceInput[];

  @Field(() => [SkillInput], { nullable: 'items' })
  others: SkillInput[];
}
