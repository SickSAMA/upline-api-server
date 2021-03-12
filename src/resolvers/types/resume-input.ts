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

  @Field(() => [ExperienceInput], { nullable: 'itemsAndList' })
  education?: ExperienceInput[];

  @Field(() => [ExperienceInput], { nullable: 'itemsAndList' })
  professional_experience?: ExperienceInput[];

  @Field(() => [ExperienceInput], { nullable: 'itemsAndList' })
  leadership_experience?: ExperienceInput[];

  @Field(() => [SkillInput], { nullable: 'itemsAndList' })
  others?: SkillInput[];
}
